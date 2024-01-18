import { Box } from "@chakra-ui/layout";
import "./style.css";
import SingleChat from "../components/miscellaneous/SingleChat";
import { ChatState } from "../contex/ChatProvider";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      // alignItems="center"
      flexDir="column"
      pb={'5px'}
      pt={'20px'}
      pl={'20px'}
      pr={'20px'}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;