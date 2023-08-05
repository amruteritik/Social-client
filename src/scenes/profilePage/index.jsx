import { Box, useMediaQuery,IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {useTheme} from "@mui/material";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`https://social-server-cu09.onrender.com/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  
    const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (document.documentElement.scrollTop > 500) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisible);



  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
      {visible && <IconButton onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}>
      <ArrowCircleUpIcon style={{
        position: 'fixed',
          // padding: '1rem 2rem',
          fontSize: '4rem',
          bottom: '40px',
          right: '40px',
          color: palette.primary.main,
          
          textAlign: 'center',
      }} />
      </IconButton>}
    </Box>
  );
};

export default ProfilePage;
