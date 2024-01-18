const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');


//@description     Get or Search all users
//@route           GET /api/user?search=query
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search ? {
        $or: [   // or = logical OR operatore 
          { name: { $regex: req.query.search, $options: "i" } },  // $options: "i" = for caseSencetive
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }); //$ne: req.user._id = its mean  dont seach login user
  res.send(users);
});


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400); 
        throw new Error("Please Enter All The Fields");
    }

    let userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists");
    }
    const result = await User.create({
        name,
        email,
        password,
        pic: pic ? pic : process.env.PROFILE_PIC_URL
    })

    if (result) {
        res.status(201).json({
            _id: result._id, 
            name: result.name,
            email: result.email,
            pic: result.pic,
            token: generateToken(User._id)
        })
    } else {
        res.status(400);
        throw new Error("Failed To Create The User")
    }

})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});


module.exports = { registerUser, authUser, allUsers};