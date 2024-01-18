import React, { useState } from 'react'
import { ChatState } from '../contex/ChatProvider'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import { Box } from '@chakra-ui/react'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

export default function ChatPage() {
  const {user} = ChatState()
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%"}}>
    {user && <SideDrawer />}
    <Box display="flex" justifyContent="space-between" w="100%" h="90.8%" p="10px">
      {user && <MyChats fetchAgain={fetchAgain} />}
      {user && (
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      )}
    </Box>
  </div>

  )
}
