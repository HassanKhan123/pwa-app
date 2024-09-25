import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { Box, useMediaQuery } from "@mui/material";
import { setShowError } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import {
  PopUpBackground,
} from "../../assets";

const OutOfCreditsPopUp = () => {
  const isDown550 = useMediaQuery("(max-width:550px)");
  const isDown1200 = useMediaQuery("(max-width:1200px)");

  const dispatch = useDispatch();

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  return (
    <Box>
      <React.Fragment>
        <Button variant="outlined">Open dialog</Button>
        <BootstrapDialog
          //   onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={true}
          sx={{
            "& .MuiDialog-paper": {
              padding: "30px",
              background: "linear-gradient(180deg, #000000 0%, #150925 100%)",
              position: "relative",
              border: "1px solid #863CFF",
              borderRadius: "30px",
              width: "500px",
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

          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "28px",
              lineHeight: "38.25px",
              letterSpacing: "5%",
              marginLeft: "auto",
              marginRight: "auto",
              paddingTop: "40px",
              color: "#963cff",
            }}
          >
            0 Credits
          </Typography>

          <Typography
            gutterBottom
            sx={{
              fontWeight: 600,
              fontSize: "26px",
              lineHeight: "38.25px",
              letterSpacing: "5%",
              marginLeft: "auto",
              marginRight: "auto",
              paddingTop: "40px",
            }}
          >
            SORRY!
          </Typography>

          <Typography
            gutterBottom
            sx={{
              color: "grey",
              paddingTop: "15px",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "25.6px",
              letterSpacing: "0.05em",
              textAlign: "center",
            }}
          >
            YOU HAVE USED ALL OF YOUR CREDITS
          </Typography>
          <Box
            style={{
              height: "44px",
              background: "#28124c",
              borderRadius: "30px",
              cursor: "pointer",
              marginTop: "20px",
              zIndex: 1
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                paddingTop: "8px",
                fontSize: "20px",
              }}
              onClick={() => {
                dispatch(setShowError(""));
              }}
            >
              OK
            </Typography>
          </Box>
        </BootstrapDialog>
      </React.Fragment>
    </Box>
  );
};

export default OutOfCreditsPopUp;
