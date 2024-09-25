import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Button,
  Typography,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks";
import {
  setEmail,
  setGoogleId,
  setImageUrl,
  setName,
  setFirstName,
  setCount,
  setBalance,
  setIsLoggedIn,
  setTokenExpiry,
  setLoginDetails,
  setShowError,
} from "../redux/slices/userSlice";
import axios from "axios";
import { SERVER_URL } from "../utils";
import { UserAvatar } from "../assets";
import styled from "styled-components";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import TarsLogo from "../assets/TARS Logo 2.svg";
import GoogleIcon from "@mui/icons-material/Google";

const drawerWidth = "100%";

const navItems = [
  { name: "Home" },
  { name: "Docs" },
  { name: "AI HUB" },
  { name: "STAKE & GPU" },
];

const Text = styled(Typography)({
  fontFamily: "FuturaMedium !important",
  fontSize: "18px !important",
  color: "#ffffff important",
  fontWeight: "500 !important",
  lineHeight: "24px !important",
  letterSpacing: "0.02em !important",
  cursor: "pointer !important",
  // color: 'red'
});

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serverTime, setServerTime] = useState(0);
  const [showToolTip, setShowToolTip] = useState('');
  const isDown1200 = useMediaQuery("(max-width:1200px)");
  const isDown1600 = useMediaQuery("(max-width:1600px)");

  const dispatch = useDispatch();
  const { firstName, imageUrl, balance, isLoggedIn, tokenExpiry } =
    useAppSelector((state) => state.user);

  const state = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const response = await axios.get("https://worldtimeapi.org/api/ip");
        const currentTime = new Date(response.data.unixtime * 1000).getTime();
        setServerTime(currentTime);
      } catch (error) {
        console.error("Error fetching server time:", error);
      }
    };

    fetchServerTime();
  }, []);

  useEffect(() => {
    if (serverTime && tokenExpiry) {
      const timeLeft = tokenExpiry - serverTime;

      const timer = setTimeout(() => {
        handleLogout();
      }, timeLeft);

      return () => clearTimeout(timer);
    }
  }, [serverTime, tokenExpiry]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
    } catch (err) {
      console.log("Login error:", err);
      // alert('An error occurred')
      dispatch(setShowError('Oops'));
    }
  };

  const handleLogout = () => {
    dispatch(setGoogleId(""));
    dispatch(setEmail(""));
    dispatch(setName(""));
    dispatch(setImageUrl(""));
    dispatch(setFirstName(""));
    dispatch(setCount(0));
    dispatch(setBalance(0));
    dispatch(setIsLoggedIn(false));
    dispatch(setTokenExpiry(0));
    dispatch(setShowError(''))
  };

  const BalanceBox = () => {
    return (
      <Box
        sx={{
          backgroundColor: "#1b0c33",
          height: "40px",
          width: "180px",
          display: "flex",
          borderRadius: "20px",
          // clipPath:
          //   "polygon(0% 0%, calc(100% - 1.5rem) 0%, 100% 20%, 100% 80%, 100% 100%, 1.5rem 100%, 0% calc(100% - 0.5rem), 0 0)",
          fontFamily: "FuturaMedium",
          fontSize: "18px",
          fontWeight: 500,
          lineHeight: "24px",
          color: "#ffffff",
          mx: "44px",
          marginRight: isDown1200 ? "0px" : "44px",
          marginTop: isDown1200 ? "44px" : "0px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Balance: {balance}{" "}
        <img src={TarsLogo} alt="tars" width="26px" height="26px" />
      </Box>
    );
  };

  const GoogleSignInBox = () => {
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
        scope="profile email"
        render={(renderProps) => (
          <Box
          sx={{
            position: "relative",
            width: "180px",
            height: "40px",
            cursor: "pointer",
            marginLeft: "44px",
            marginTop: isDown1200 ? "44px" : "0px",
            borderRadius: "20px",
            border: "1px solid #863CFF",
  
          }}
          onClick={renderProps.onClick}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              padding: "12px 20px",
            }}
            className="childBox"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                gap: "4px",
                fontFamily: "FuturaMedium",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                color: "#ffffff",
                marginTop: "-6px",
              }}
            >
              <GoogleIcon />
              <Typography>
                Sign In
              </Typography>
            </Box>
          </Box>
        </Box>
        )}
        buttonText=""
        onSuccess={handleLogin}
        onFailure={(response) => console.log(response)}
      />
    );
  };

  const GoogleSignOutBox = () => {
    return (
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
        render={(renderProps) => (
          <Box
            sx={{
              // background: "linear-gradient(92.11deg, #7730F5 0%, #12FDA0 100%)",
              position: "relative",
              width: "180px",
              height: "40px",
              cursor: "pointer",
              marginLeft: "44px",
              marginTop: isDown1200 ? "44px" : "0px",
              borderRadius: "20px",
              border: "1px solid #863CFF",
              // clipPath:
              //   "polygon(0% 0%, calc(100% - 1.5rem) 0%, 100% 20%, 100% 80%, 100% 100%, 1.5rem 100%, 0% calc(100% - 0.5rem), 0 0)",
              // "& > .childBox": {
              //   clipPath:
              //     "polygon(0% 0%, calc(100% - 1.5rem) 0%, 100% 20%, 100% 80%, 100% 100%, 1.5rem 100%, 0% calc(100% - 0.5rem), 0 0)",
              //   background: "#000000",
              //   width: "calc(100% - 2px)",
              //   height: "calc(100% - 2px)",
              //   position: "absolute",
              //   left: "1px",
              //   top: "1px",
              // },
            }}
            onClick={renderProps.onClick}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                padding: "12px 20px",
              }}
              className="childBox"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                  gap: "4px",
                  fontFamily: "FuturaMedium",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  color: "#ffffff",
                  marginTop: "-6px",
                }}
              >
                <img
                  src={imageUrl || UserAvatar}
                  // src={"https://lh3.googleusercontent.com/a/ACg8ocIobvBUCjVLkTKm5HAbyXWuQXhYhqsHfudabdfEnb2kyY0-Yw=s96-c"}
                  style={{
                    height: "24px",
                    width: "24px",
                    borderRadius: "50%",
                  }}
                />
                {firstName}
              </Box>
            </Box>
          </Box>
        )}
        onLogoutSuccess={handleLogout}
      />
    );
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        marginTop: "16px",
      }}
    >
      <Box textAlign={"right"}>
        <IconButton onClick={handleDrawerToggle}>
          <Close sx={{ color: "#ffffff" }} />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "left",
                paddingLeft: "10%",
                paddingY: "5%",
                gap: "4px",
                justifyContent: isDown1200 ? "center" : "flex-start",
              }}
              onClick={handleDrawerToggle}
            >
              <Text
                style={{ color: item.name == "Home" ? "#863CFF" : "white" }}
              >
                {item.name}
              </Text>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem
          disablePadding
          sx={{
            justifyContent: isDown1200 ? "center" : "flex-start",
          }}
        >
          <BalanceBox />
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            justifyContent: isDown1200 ? "center" : "flex-start",
          }}
        >
          {!isLoggedIn ? <GoogleSignInBox /> : <GoogleSignOutBox />}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        position: isDown1200 ? "static" : "absolute",
        zIndex: 1,
        width: "calc(100% - 8px)",
        paddingRight: isDown1200 ? "20px" : "2%",
        paddingLeft: isDown1200 ? "10px" : "2%",
        height: "78px",
      }}
    >
      <AppBar
        component="nav"
        sx={{
          background: "transparent",
          boxShadow: "none",
          width: "100%",
        }}
        position="static"
      >
        <Toolbar sx={{ px: "0px" }}>
          <Box
            sx={{
              flexGrow: 1,
              display: { md: "block" },
              WebkitWritingMode: "vertical-lr",
            }}
          >
            <img
              src={TarsLogo}
              alt="Logo"
              style={{
                // width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
              onClick={() => window.location.replace("/")}
            />
        
          <Typography
            sx={{
              fontFamily: 'Koulen',
              writingMode: "horizontal-tb",
              fontSize: '30px',
              paddingTop: '18px',
              fontWeight: 400
            }}
          >Tars AI</Typography>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "none", lg: "flex" },
              gap: "50px",
              marginRight: isDown1600 ? "20px" : "180px",
            }}
          >
             
            {navItems.map((item) => (
               <Tooltip 
               key={item.name} 
               title={'Coming soon!'} 
               disableHoverListener
               open={showToolTip !== 'Home' ? showToolTip === item.name : false}
             >
              <Button
                key={item.name}
                sx={{
                  textTransform: "none",
                  fontSize: "18px",
                  fontWeight: 500,
                  fontFamily: "FuturaMedium",
                  padding: 0,
                }}
                disableRipple
                onMouseOver={() => setShowToolTip(item.name)}
                onMouseLeave={() => setShowToolTip('')}
              >                
                <Text
                  style={{ color: item.name == "Home" ? "#863CFF" : "white" }}
                >
                  {item.name}
                </Text>
               
              </Button>
              </Tooltip>
            ))}
          </Box>

          {!isDown1200 && (
            <> {!isLoggedIn ? <GoogleSignInBox /> : <GoogleSignOutBox />}</>
          )}

          {!isDown1200 && <BalanceBox />}

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{
              display: { md: "flex", lg: "none" },
              visibility: mobileOpen ? "hidden" : "visible",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="right"
          ModalProps={{
            keepMounted: true,
          }}
          disableRestoreFocus
          sx={{
            display: { sm: "block", md: "block", lg: "none" },
            zIndex: 2,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              zIndex: 2,
              backgroundColor: "rgba(0, 0, 0, 1)",
              opacity: 0.9,
              backgroundImage:
                "linear-gradient(180deg, #070E0BB2 0%, #070E0BB2 20%)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
