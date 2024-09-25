import {
  TextField,
  IconButton,
  InputAdornment,
  Box,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Mic, SendIcon } from "../../assets";
import { useAppSelector } from "../../hooks";
import MicNoneIcon from '@mui/icons-material/MicNone';
import { UpArrow } from "../../assets";

const ChatInput: React.FC<{
  inputValue: string;
  handleInputChange: (event: any) => void;
  handleKeyPress: (event: any) => void;
  handleMicClick: () => void;
  handleSubmitClick: () => void;
  isSending: boolean;
  isListening: boolean;
  count: number;
}> = ({
  inputValue,
  handleInputChange,
  handleKeyPress,
  handleMicClick,
  handleSubmitClick,
  isSending,
  isListening,
  count,
}) => {
  const { isLoggedIn, email } = useAppSelector((state) => state.user);
  const isDown1200 = useMediaQuery("(max-width:1200px)");
  const isDown800 = useMediaQuery("(max-width:800px)");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: isDown1200 ? "95%" : "60%",
      }}
    >
      <TextField
        placeholder="Give TARS a task..."
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        disabled={isSending || !isLoggedIn}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {/* if email == Jerry.icba@gmail.com 1000 else 10 */}
              <p>{count ?? 0} / {email == 'Jerry.icba@gmail.com' ? 1000 : 10} </p>
              <IconButton
                edge="end"
                aria-label="toggle mic"
                onClick={handleMicClick}
                disabled={isSending || !isLoggedIn}
                sx={{
                  height: "44px",
                  width: "44px",
                  borderRadius: "12px",
                  left: "4px",
                }}
              >
                <MicNoneIcon sx={{ color: isListening ? '#A93CFF' : 'white' }} fontSize="large" />
                {/* #A93CFF 0%, #7A3CFF */}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          maxHeight: "56px",
          ".MuiInputBase-root": {
            height: "56px",
            paddingX: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
          },
          ".MuiOutlinedInput-input": {
            textAlign: "left",
            maxHeight: "56px",
            padding: 0,
            // fontFamily: "IBM Plex Sans",
            color: "#ffffff",
            fontSize: isDown800 ? "16px" : "18px",
            fontWeight: 400,
          },
          "&:hover": {
            border: "none",
          },
          ".MuiOutlinedInput-notchedOutline": {
            border: "none",
            maxHeight: "56px",
          },
        }}
      />
      <Button
        variant="contained"
        sx={{
          outline: "none",
          boxShadow: "none",
          border: "none",
          // borderRadius: "0px",
          fontSize: "24px",
          marginLeft: "10px",
          overflow: "hidden",
          // background: "#72AFF2",
          height: "54px",
          maxWidth: "54px",
          minWidth: '54px',
          borderRadius: '40px',
           background: "linear-gradient(92.11deg, #A93CFF 0%, #7A3CFF 100%)",
          // clipPath:
          //   "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 100% 100%, 20% 100%, 0% 80%, 0 0)",
          // "&:hover": {
          //   opacity: 0.9,
          //   backgroundColor: "#72AFF2",
          // },
          "&:disabled": {
            backgroundColor: "##1b0c33",
          },
        }}
        onClick={ () => isLoggedIn && handleSubmitClick()}
      >
        <img src={UpArrow} alt="Send" style={{ height: '30px', width: '20px' }} />
      </Button>
    </Box>
  );
};

export default ChatInput;
