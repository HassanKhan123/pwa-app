import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  UserAvatar,
  BotAvatar,
  TarsLogo,
  CopyIcon,
  ReloadIcon,
  EditIcon,
} from "../../assets";
import { useAppSelector } from "../../hooks";
import React, { useEffect, useState } from "react";
import LineChart from "../../components/ApexChart";
import MarkdownRenderer from "./MarkdownRenderer";
import CloseIcon from "@mui/icons-material/Close";

const Message: React.FC<{
  index: number;
  message: any;
  isUser: boolean;
  responseInProcess?: boolean;
  chartData?: any;
  isChart?: boolean;
  currency?: string;
  time: number;
  showReloadIcon: boolean;
  handleEditClick: (index: number) => void;
  handleRebuildPrompt: (index: number) => void;
  timePassed: number;
}> = (
  {
    index,
    message,
    isUser,
    responseInProcess = false,
    chartData,
    isChart,
    currency,
    time,
    showReloadIcon,
    handleEditClick,
    handleRebuildPrompt,
    timePassed,
    // chartData = []
  },
  props
) => {
  const isDown800 = useMediaQuery("(max-width:800px)");
  const isDown1200 = useMediaQuery("(max-width:1200px)");
  const { imageUrl } = useAppSelector((state) => state.user);

  const [showSnackbar, setShowSnackbar] = useState(false);
  
  const action = (
    <React.Fragment>
      {/* <Button color="secondary" size="small" onClick={() => setShowSnackbar(false)}>
        UNDO
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setShowSnackbar(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box
      sx={{
        height: "max-content",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginLeft: isUser ? "auto" : "0",
        marginRight: isUser ? "0" : "auto",
        marginBottom: "20px",
      }}
      id={`message-${message.index}`}
    >
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
        message="Text copied"
        action={action}
      />
      {!message.isUser && (
        <img
          src={TarsLogo}
          alt="Bot"
          style={{
            height: "42px",
            width: "42px",
            display: isDown1200 ? "none" : "block",
          }}
        />
      )}
      <Box
        sx={{
          backgroundColor: message.isUser ? "#000000" : "#140926",
          padding: "15px",
          borderRadius: "10px",
          marginRight: isDown800 ? "0px" : message.isUser ? "15px" : "0",
          marginLeft: isDown800 ? "0px" : message.isUser ? "0" : "15px",
          width: isDown800 ? "100%" : "90%",
          border: message.isUser
            ? "1px solid #863CFF"
            : "1px solid rgba(255, 255, 255, 0.1)",
          borderImageSlice: "1",
          borderImageWidth: "1px",
        }}
      >
        <Typography
          sx={{
            color: message.isUser ? "white" : "#7730F5",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "20.8px",
            fontFamily: "IBM Plex Sans",
            paddingLeft: "20px",
            paddingTop: "30px",
          }}
        >
          {message.isUser ? (
            <>
              <span style={{ fontWeight: 600 }}>YOU</span>
              <span style={{ marginLeft: "20px", color: "grey" }}>
                {timePassed == undefined
                  ? " Few secs now"
                  : timePassed + ` minute${timePassed > 1 ? "s" : ""} ago`}
              </span>{" "}
            </>
          ) : (
            <>
              <span style={{ fontWeight: 600 }}>TARS</span>
              <span style={{ marginLeft: "20px", color: "grey" }}>
                {timePassed == undefined
                  ? " Few secs now"
                  : timePassed + ` minute${timePassed > 1 ? "s" : ""} ago`}
              </span>{" "}
            </>
          )}
        </Typography>

        {responseInProcess ? (
          <Box
            sx={{
              // color: "rgba(30, 251, 156, 1)",
              color: "#A93CFF",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "24px",
              fontFamily: "Inter",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginTop: "10px",
            }}
          >
            <React.Fragment>
              <svg width={0} height={0}>
                <defs>
                  <linearGradient
                    id="my_gradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#A93CFF" />
                    <stop
                      offset="100%"
                      stopColor="rgba(255, 255, 255, 0.0001)"
                      // stopColor="#A93CFF"
                    />
                  </linearGradient>
                </defs>
              </svg>
              <CircularProgress
                sx={{
                  "svg circle": { stroke: "url(#my_gradient)" },
                }}
                size={28}
              />
            </React.Fragment>
            {/* here */}
            Loading ...
          </Box>
        ) : (
          <div style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "20.8px",
                fontFamily: "IBM Plex Sans",
                wordWrap: "break-word",
              }}
            >
              {/* here msg */}
              <MarkdownRenderer text={message.text} />
            </Typography>
            {!message.isUser &&
              isChart &&
              chartData &&
              chartData.length > 0 && (
                <LineChart chartData={chartData} currency={currency} />
              )}
          </div>
        )}

        {/* {message.isUser ? <p>H</p> } */}

        {/* { message.isUser ? (
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              marginLeft: "15px",
              marginTop: "10px",
              alignItems: "center",
              border: "1px solid #FFFFFF1A",
              borderRadius: "20px",
              width: "95px",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "5px",
              paddingBottom: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              handleEditClick(index);
            }}
          >
            <img
              src={EditIcon}
              alt="Edit"
            />
            <span style={{ fontSize: "15px", color: "#D9D9D980" }}>Edit</span>
          </Box> */}
        {/* ) :  */}
        { !message.isUser && !responseInProcess ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                marginLeft: "15px",
                marginTop: "10px",
                alignItems: "center",
                border: "1px solid #FFFFFF1A",
                borderRadius: "20px",
                width: "100px",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "5px",
                paddingBottom: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowSnackbar(true);
                navigator.clipboard.writeText(message.text);
              }}
            >
              <img src={CopyIcon} alt="Copy" />
              <span style={{ fontSize: "15px", color: "#D9D9D980" }}>Copy</span>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "10px",
                marginLeft: "15px",
                marginTop: "10px",
                alignItems: "center",
                border: "1px solid #FFFFFF1A",
                borderRadius: "20px",
                width: "115px",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "5px",
                paddingBottom: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleRebuildPrompt(index)}
            >
              <img src={ReloadIcon} alt="Reload" />
              <span style={{ fontSize: "15px", color: "#D9D9D980" }}>
                Rebuild
              </span>
            </Box>
          </Box>
        ) : null}
      </Box>
      {message.isUser && (
        <img
          src={imageUrl || UserAvatar}
          alt="User"
          style={{
            height: "42px",
            width: "42px",
            borderRadius: "50%",
            border: imageUrl ? "1px solid rgba(255, 255, 255, 0.2)" : "none",
            padding: imageUrl ? "2px" : "0px",
            alignItems: "center",
            display: isDown1200 ? "none" : "block",
          }}
        />
      )}
    </Box>
  );
};

export default Message;
