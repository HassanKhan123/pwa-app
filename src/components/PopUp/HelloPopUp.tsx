import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import TarsLogo from "../../assets/TARS Logo.svg";
import { Box } from "@mui/material";
import {
  PopUpBackground,
  SideArrow,
} from "../../assets";
interface IHelloPopUp {
  setShowPopUp: (e: boolean) => void;
}

const HelloPopUp: React.FC<IHelloPopUp> = ({ setShowPopUp }) => {
  const [open, setOpen] = React.useState(true);

  const centerText = "Your Web3 Assistant. Talk to TARS & help train the Beta model. Ask TARS anything related to Web3. It’s trained to learn & answer in real-time!";

  const handleClickOpen = (e: any) => {
    console.log("click");
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => {
    setShowPopUp(false);
    setOpen(false);
  };

  return (
    <Box>
      <React.Fragment>
        <Dialog
          onClose={handleClose}
          open={open}
          sx={{
            "& .MuiDialog-paper": {
              padding: "20px",
              width: "500px",
              background: "linear-gradient(180deg, #000000 0%, #150925 100%)",
              position: "relative",
              border: "1px solid #863CFF80",
              borderRadius: "20px",
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
            }}
          />
          <img
            src={TarsLogo}
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />

          <Typography
            fontSize={"25px"}
            style={{
              fontWeight: 600,
              lineHeight: "38.25px",
              letterSpacing: "5%",
              marginLeft: "auto",
              marginRight: "auto",
              paddingTop: "20px",
            }}
            gutterBottom
          >
            Say Hello to TARS AI
          </Typography>
          <Typography
            style={{
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "27px",
              letterSpacing: "5%",
              alignItems: "center",
              color: '#FFFFFFB2',
              // color: "grey",
              marginLeft: "auto",
              marginRight: "auto",
              padding: "30px",
            }}
          >
            {centerText}
          </Typography>

          <Button
            style={{
              color: "white",
              borderRadius: "30px",
              fontSize: "17px",
              width: "140px",
              marginLeft: "auto",
              marginRight: "auto",
              background: "linear-gradient(90deg, #A93CFF 0%, #7A3CFF 100%)",
            }}
            onClick={handleClose}
          >
            Next
            <img src={SideArrow} />
          </Button>
        </Dialog>
      </React.Fragment>
    </Box>
  );
};

export default HelloPopUp;
