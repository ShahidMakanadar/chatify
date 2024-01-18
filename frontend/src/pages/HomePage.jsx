import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats");
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        display={"flex"}
        justifyContent={"center"}
        backgroundColor={"white"}
        p={2}
        m={"20px 0 15px 0"}
        w={"100%"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text
          fontSize={"2xl"} 
          id="authTital"
          fontFamily={"work sans"}
          color={"black"}
        >
          Chatify
        </Text>
      </Box>

      <Box
        p={4}
        w={"100%"}
        borderRadius={"lg"}
        borderWidth={"1px"}
        backgroundColor={"white"}
        color="black"
      >
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"}>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {" "}
              <Login />{" "}
            </TabPanel>
            <TabPanel>
              {" "}
              <Signup />{" "}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
