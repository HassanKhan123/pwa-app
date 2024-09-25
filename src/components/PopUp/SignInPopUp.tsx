import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { Box, useMediaQuery } from "@mui/material";
import GoogleLogo from "../../assets/googleLogo.svg";
import { PopUpBackground, TarsLogo } from "../../assets";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { SERVER_URL } from "../../utils";
import { setLoginDetails, setShowError } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

interface ISignInPopUpProps {
  setShowPopUp: (e: boolean) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const SignInPopUp: React.FC<ISignInPopUpProps> = ({ setShowPopUp }) => {
  const [open, setOpen] = React.useState(true);
  const isDown550 = useMediaQuery("(max-width:550px)");

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async (response: any) => {
    try {
      console.log(response);
      const res = await axios.post(
        `${SERVER_URL}/users/createUser`,
        {
          email: response.profileObj.email,
          name: response.profileObj.name,
        },
        {
          headers: {
            Authorization: `Bearer ${response.tokenObj.id_token}`,
          },
        }
      );
      console.log("res login", res);
      const payload = {
        googleId: response.googleId,
        email: response.profileObj.email,
        name: response.profileObj.name,
        imageUrl: response.profileObj.imageUrl,
        firstName: response.profileObj.givenName,
        count: res.data.user.count,
        balance: res.data.user.balance,
        threadId: res.data.user.threadId,
        isLoggedIn: true,
        tokenExpiry: response.tokenObj.expires_at,
      };
      dispatch(setLoginDetails(payload));

      localStorage.setItem("token", response.tokenObj.id_token);
      setShowPopUp(true);
      console.log("google done");
      console.log("========================================");
    } catch (err) {
      console.log("Login error:", err);
      dispatch(setShowError("Oops"));
    }
  };


  return (
    <Box>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open dialog
        </Button>
        <BootstrapDialog
          // onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          sx={{
            "& .MuiDialog-paper": {
              background: "linear-gradient(180deg, #000000 0%, #150925 100%)",
              padding: "30px",
              border: "1px solid #863CFF",
              borderRadius: "30px",
              width: "500px",
              position: "relative",
            },
          }}
        >
          <img
            src={PopUpBackground}
            style={{
              position: "absolute",
              bottom: 0,
              width: "90%",
              height: "100%",
              zIndex: 0,
            }}
          />
          <img
            src={TarsLogo}
            style={{
              height: isDown550 ? "70%" : "55%",
              width: isDown550 ? "70%" : "55%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />

          <Typography
            gutterBottom
            style={{
              fontWeight: 600,
              fontSize: "26px",
              lineHeight: "38.25px",
              letterSpacing: "5%",
              marginLeft: "auto",
              marginRight: "auto",
              paddingTop: "20px",
              zIndex: 1,
            }}
          >
            SIGN IN TO TARS
          </Typography>

          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
            scope="profile email"
            render={(renderProps) => (
              <Box
                style={{
                  height: "44px",
                  background: "#863CFF33",
                  borderRadius: "30px",
                  cursor: "pointer",
                  zIndex: 1
                }}
              >
                <img
                  src={GoogleLogo}
                  style={{
                    width: "60%",
                    marginLeft: "22%",
                    // paddingTop: '8px'
                    paddingTop: isDown550 ? '12px' : "4px",
                    
                  }}
                  onClick={() => renderProps.onClick()}
                />
              </Box>
            )}
            buttonText="Sign In with Google"
            onSuccess={handleLogin}
            onFailure={(response) => console.log(response)}
          />
        </BootstrapDialog>
      </React.Fragment>
    </Box>
  );
};

export default SignInPopUp;
