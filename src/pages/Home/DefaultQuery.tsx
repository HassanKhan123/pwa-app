import { Box, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { UpArrow } from "../../assets";

interface DefaultQueryProps {
  onClick: () => void;
  text: string;
}

const DefaultQuery: React.FC<DefaultQueryProps> = ({ onClick, text }) => {
  const isDown1200 = useMediaQuery("(max-width:1200px)");
  return (
    <Box
      sx={{
        background: '#1b0c33',
        // background: "linear-gradient(92.11deg, #7730F5 0%, #12FDA0 100%)",
        position: "relative",
        width: isDown1200 ? "95%" : "340px",
        height: "70px",
        cursor: "pointer",
        borderRadius: '15px',
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
      onClick={onClick}
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
            justifyContent: "space-between",
          }}
        >
          <Tooltip title={text} placement="top">
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "20.8px",
                fontFamily: "IBM Plex Sans",
                paddingBottom: "6px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                marginTop: "10px",
                // top: '48px',
                // right: '14px',
              }}
            >
              {text}
            </Typography>
          </Tooltip>
          <img
            src={UpArrow}
            alt="up arrow"
            height={"14px"}
            width={"14px"}
            style={{
              position: "absolute",
              top: "28px",
              right: "14px",
            }}
          />
        </Box>

        {/* <Typography
          sx={{
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '0.8rem',
            fontFamily: 'IBM Plex Sans',
            opacity: 0.4,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur
        </Typography> */}
      </Box>
    </Box>
  );
};

export default DefaultQuery;
