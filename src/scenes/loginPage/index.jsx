import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import WebhookIcon from '@mui/icons-material/Webhook';
import Form from "./Form";
import FlexBetween from "components/FlexBetween";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
      <FlexBetween gap="1rem" width="15%" alignContent="center" margin="auto">

        <WebhookIcon sx={{ fontSize: "50px" , color: theme.palette.primary.main }}/>
        <Typography fontWeight="bold" fontSize="38px" color="primary">
          Social
        </Typography>

      </FlexBetween>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to the Arena of Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
