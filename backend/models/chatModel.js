const mongoose = require('mongoose')

const chatModel =  mongoose.Schema(
    {
        chatName: { type: String, trime: true },
        isGroupChat: { type: Boolean, default: false },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "messages"
        },
        groupAdmine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        }
    },
    {
        timestamps: true
    }
);

const Chat = mongoose.model('chats', chatModel);

module.exports = Chat;

