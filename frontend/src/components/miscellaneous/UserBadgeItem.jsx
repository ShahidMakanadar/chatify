import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user, admin , handleFunction}) => {
  return (
      <Badge
        px={2}
        py={1}
        borderRadius="lg"
        m={1}
        mb={2}
        variant="solid"
        fontSize={12}
        colorScheme="purple"
        cursor="pointer"
      >
        {user.name}
        {admin === user._id ? <span> (Admin)</span> : null}
        <CloseIcon pb={'3px'} pl={1}  onClick={handleFunction} />
      </Badge>
  );
};

export default UserBadgeItem;