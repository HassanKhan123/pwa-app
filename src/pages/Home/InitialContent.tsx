import { Box, Typography, useMediaQuery } from "@mui/material";
import { Stars } from "../../assets";
import DefaultQuery from "./DefaultQuery";
import useWindowInnerHeightLessThan750 from "../../hooks/useWindowInnerHeightLessThan750";
import useWindowInnerHeight from "../../hooks/useWindowInnerHeight";
import axios from "axios";

interface InitialContentProps {
  handleSubmit: (text: string) => void;
}

const InitialContent: React.FC<InitialContentProps> = ({ handleSubmit }) => {
  const isDown1200 = useMediaQuery("(max-width:1200px)");
  const isDown600 = useMediaQuery("(max-width:600px)");
  const navbarHeight = 78;
  const isLessThan750 = useWindowInnerHeightLessThan750();
  const currentWindowInnerHeight = useWindowInnerHeight();
  const mobileContainerHeight = `calc(${currentWindowInnerHeight}px * 0.92)`;
  const innerBoxHeight = `calc(${
    isLessThan750 ? mobileContainerHeight : "100vh"
  } - ${navbarHeight}px - 50px
  - ${isLessThan750 ? "0px" : "120px"}
  )`;

  const defaultQuestions = [
    "What is the price of Solana now?",
    "What are the most active cryptocurrency exchanges?",
    "What is the volume and price of Ethereum?",
    "What is the market cap of Matic?",
  ];

  // stream
  // let sse: EventSource | undefined;
  // const testStream = async () => {
  //   sse = new EventSource("http://localhost:4000/users/stream");

  //   console.log("stream");
  //   // await axios.get("http://localhost:4000/stream");
  //   sse.onmessage = (event) => {
  //     console.log("message", event?.data);
  //   };
  // };

  // const closeStream = () => {
  //   console.log('close click')
  //   sse?.close();
  // }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: isDown1200 ? "100vh" : "100%",
        maxHeight: innerBoxHeight,
        overflowY: isLessThan750 ? "auto" : "hidden",
        gap: "50px",
        justifyContent: "space-between",
      }}
    >
      {/* <button onClick={testStream}>Test</button>
      <button onClick={closeStream} >Close</button> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: isDown1200 ? "95%" : "60%",
          marginTop: isDown1200
            ? `${
                currentWindowInnerHeight > 900
                  ? currentWindowInnerHeight * 0.2
                  : currentWindowInnerHeight * 0.1
              }px`
            : "0px",
        }}
        id="stars-container"
      >
        <img src={Stars} alt="stars" height={"52px"} width={"52px"} />
        <Typography
          sx={{
            fontFamily: "Nunito Sans",
            // fontFamily: 'Avenir',
            fontSize: isDown600 ? '28px' : "34px",
            fontWeight: 500,
            textAlign: "center",
            lineHeight: "24px",
            paddingBottom: "16px",
            color: "#ffffff",
          }}
        >
          How can I help you today?
        </Typography>
        <Typography
          sx={{
            // fontFamily: "IBM Plex Sans",
            fontFamily: "Nunito Sans",
            fontSize: isDown600 ? "16px" : "18px",
            fontWeight: 400,
            textAlign: "center",
            lineHeight: "23.4px",
            color: "#ffffff",
            opacity: 0.5,
          }}
        >
          Give TARS a task to work and earn points
        </Typography>
      </Box>

      <Box
        sx={{
          position: isLessThan750 ? "relative" : "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          marginTop: isLessThan750 ? "20px" : "0px",
          marginBottom: isLessThan750 ? "10px" : "120px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        id="default-queries-container"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: isDown1200 ? "95%" : "60%",
            gap: "12px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <DefaultQuery
              text={defaultQuestions[0]}
              onClick={() => handleSubmit(defaultQuestions[0])}
            />
            <DefaultQuery
              text={defaultQuestions[1]}
              onClick={() => handleSubmit(defaultQuestions[1])}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <DefaultQuery
              text={defaultQuestions[2]}
              onClick={() => handleSubmit(defaultQuestions[2])}
            />
            <DefaultQuery
              text={defaultQuestions[3]}
              onClick={() => handleSubmit(defaultQuestions[3])}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InitialContent;
