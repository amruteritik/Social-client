import { useState } from "react";
import { Box, useMediaQuery,IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {useTheme} from "@mui/material";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const { palette } = useTheme();

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    if (document.documentElement.scrollTop > 500) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget
              img="watch.jpg"
              name="Watches"
              web="premiumwear.com"
              content="Your pathway to stunning and immaculate beauty and made 
                      sure your hands is exfoliating and shining like light."
            />
            <Box m="2rem 0" />
          <AdvertWidget
              img="car.webp"
              name="Car"
              web="bookacar.com"
              content="Best place to order a premium car with high discounts 
                       and free of cost delivery at your door steps"
            />
            <Box m="2rem 0" />
          </Box>
        )}
      </Box>
      {visible && <IconButton onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}>
      <ArrowCircleUpIcon style={{
        position: 'fixed',
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

export default HomePage;
