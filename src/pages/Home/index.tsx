import { useState, useRef, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Backgroundlines } from "../../assets";
import Message from "./Message";
import ChatInput from "./ChatInput";
import InitialContent from "./InitialContent";
import useWindowInnerHeightLessThan750 from "../../hooks/useWindowInnerHeightLessThan750";
import useWindowInnerHeight from "../../hooks/useWindowInnerHeight";
import axios from "axios";
import { SERVER_URL } from "../../utils";
import { useAppSelector } from "../../hooks";
import { useDispatch } from "react-redux";
import {
  setBalance,
  setCount,
  setThreadId,
  setShowError,
} from "../../redux/slices/userSlice";
import {
  HelloPopUp,
  OopsPopUp,
  SignInPopUp,
  OutOfCreditsPopUp,
} from "../../components/PopUp";
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    mozSpeechRecognition: any;
    msSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const Home = () => {
  const navbarHeight = 78;
  const innerContainerRef = useRef<HTMLDivElement | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [boxes, setBoxes] = useState([]) as any[];
  const currentWindowInnerHeight = useWindowInnerHeight();
  const innerBoxHeight = `calc(${currentWindowInnerHeight}px - ${navbarHeight}px - 60px - 20px)`;
  const isDown1200 = useMediaQuery("(max-width:1200px)");
  const isDown800 = useMediaQuery("(max-width:800px)");
  const isLessThan750 = useWindowInnerHeightLessThan750();

  const token = localStorage.getItem("token");

  const { googleId, email, name, count, isLoggedIn, threadId, showError } =
    useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleInputChange = (event: any) => {
    if (event.target.value.length > 250) {
      return;
    }
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setBoxes([]);
      setTimePassed([]);
    }
  }, [isLoggedIn]);

  const millisToMinutesAndSeconds = (time: number) => {
    const subtract = Date.now() - time;
    var minutes: number = Math.floor(subtract / 60000);
    // setTimePassed(minutes);
    return minutes;
  };

  const [timePassed, setTimePassed] = useState([]);

  useEffect(() => {
    let timer: any;
    if (boxes.length > 0) {
      timer = setInterval(() => {
        const timepassedArray = boxes.map((box: any) => {
          const res = millisToMinutesAndSeconds(box.time);
          return res;
        });
        setTimePassed(timepassedArray);
      }, 60000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [boxes]);

  const handleKeyPress = async (event: any) => {
    console.log("key press");
    if (!isLoggedIn) {
      return;
    }
    try {
      if (event.key === "Enter" && inputValue.trim() !== "" && !isSending) {
        if (inputValue.trim() !== "" && !isSending) {
          const queryParams = {
            question: inputValue,
            email,
            threadId,
          };
          setIsSending(true);
          if (rebuildPrompt.show) {
            setBoxes((prevBoxes: any) => {
              const newBoxes = [...prevBoxes];
              newBoxes.pop();
              newBoxes.pop();
              return newBoxes;
            });
          }
          setBoxes((prevBoxes: any) => [
            ...prevBoxes,
            { text: inputValue, isUser: true, time: Date.now() },
          ]);
          setInputValue("");

          setBoxes((prevBoxes: any) => [
            ...prevBoxes,
            {
              text: "Loading...",
              isUser: false,
              responseInProcess: true,
              time: Date.now(),
            },
          ]);

          const res = await axios.get(`${SERVER_URL}/users/ask`, {
            params: queryParams,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const {
            data: { answer, count, balance, thread_id },
          } = res;
          console.log("ask res", res.data);

          setTimeout(async () => {
            setBoxes((prevBoxes: any) => {
              const newBoxes = [...prevBoxes];
              newBoxes.pop();
              newBoxes.push({
                text: answer,
                isUser: false,
                responseInProcess: false,
                chartData: res?.data?.data?.prices,
                isChart: res?.data?.chart,
                currency: res?.data?.data?.currency,
                time: Date.now(),
              });
              return newBoxes;
            });

            dispatch(setCount(count));
            dispatch(setBalance(balance));
            dispatch(setThreadId(thread_id));
            setIsSending(false);
          }, 1000);
        }
      }
    } catch (err: any) {
      // console.clear()
      console.log("error in res", err.response.data);
      setBoxes((prevBoxes: any) => {
        const newBoxes = [...prevBoxes];
        newBoxes.pop();
        newBoxes.pop();
        return newBoxes;
      });
      setIsSending(false);
      if (err?.response?.data?.message == "You have no more questions left") {
        console.log("if chala error bhejo");
        dispatch(setShowError("Credit"));
      } else {
        dispatch(setShowError("Oops"));
      }
    }
  };

  const handleSubmitClick = async () => {
    console.log("submit click");
    if (!isLoggedIn) {
      return;
    }
    try {
      if (inputValue.trim() !== "" && !isSending) {
        const queryParams = {
          question: inputValue,
          email,
          threadId,
        };
        setIsSending(true);
        if (rebuildPrompt.show) {
          setBoxes((prevBoxes: any) => {
            const newBoxes = [...prevBoxes];
            newBoxes.pop();
            newBoxes.pop();
            return newBoxes;
          });
        }
        setBoxes((prevBoxes: any) => [
          ...prevBoxes,
          { text: inputValue, isUser: true, time: Date.now() },
        ]);
        setInputValue("");

        setBoxes((prevBoxes: any) => [
          ...prevBoxes,
          {
            text: "Loading...",
            isUser: false,
            responseInProcess: true,
            time: Date.now(),
          },
        ]);

        const res = await axios.get(`${SERVER_URL}/users/ask`, {
          params: queryParams,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const {
          data: { answer, count, balance, thread_id },
        } = res;
        console.log("res", res.data);

        setTimeout(async () => {
          setBoxes((prevBoxes: any) => {
            const newBoxes = [...prevBoxes];
            newBoxes.pop();
            newBoxes.push({
              text: answer,
              isUser: false,
              responseInProcess: false,
              chartData: res?.data?.data?.prices,
              isChart: res?.data?.chart,
              currency: res?.data?.data?.currency,
              time: Date.now(),
            });
            return newBoxes;
          });

          dispatch(setCount(count));
          dispatch(setBalance(balance));
          dispatch(setThreadId(thread_id));
          setIsSending(false);
        }, 1000);
      }
    } catch (err: any) {
      // console.clear()
      console.log("error in res", err.response.data);
      setBoxes((prevBoxes: any) => {
        const newBoxes = [...prevBoxes];
        newBoxes.pop();
        newBoxes.pop();
        return newBoxes;
      });
      setIsSending(false);
      if (err?.response?.data?.message == "You have no more questions left") {
        console.log("if chala error bhejo");
        dispatch(setShowError("Credit"));
      } else {
        dispatch(setShowError("Oops"));
      }
    }
  };

  const handleSubmitDefaultQuestions = async (question: string) => {
    console.log("default question");
    console.log("only submit");
    try {
      if (!isLoggedIn) {
        return;
      }
      setInputValue(question);
      console.log("input value", inputValue);

      const queryParams = {
        question: question,
        email,
        threadId,
        // ...(threadId && { threadId: threadId }),
      };

      console.log("query params", queryParams);

      const trimmedInputValue = question.trim();

      if (trimmedInputValue === "") {
        console.log("in this if return");
        return;
      }

      if (question.trim() !== "" && !isSending) {
        setIsSending(true);
        setBoxes((prevBoxes: any) => [
          ...prevBoxes,
          { text: question, isUser: true, time: Date.now() },
        ]);
        setInputValue("");
      }
      setBoxes((prevBoxes: any) => [
        ...prevBoxes,
        {
          text: "Loading...",
          isUser: false,
          responseInProcess: true,
          time: Date.now(),
        },
      ]);

      const res = await axios.get(`${SERVER_URL}/users/ask`, {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("res", res);
      const {
        data: { answer, count, balance, thread_id },
      } = res;
      console.log("answer res [][][]", balance);

      setTimeout(async () => {
        setBoxes((prevBoxes: any) => {
          const newBoxes = [...prevBoxes];
          newBoxes.pop();
          newBoxes.push({
            text: answer,
            isUser: false,
            responseInProcess: false,
            time: Date.now(),
          });
          return newBoxes;
        });
        dispatch(setCount(count));
        dispatch(setBalance(balance));
        dispatch(setThreadId(thread_id));

        setIsSending(false);
      }, 1000);
    } catch (err: any) {
      console.log("error in res", err);
      setBoxes((prevBoxes: any) => {
        const newBoxes = [...prevBoxes];
        newBoxes.pop();
        newBoxes.pop();
        return newBoxes;
      });
      setIsSending(false);
      if (err?.response?.data?.message == "You have no more questions left") {
        console.log("if chala error bhejo");
        dispatch(setShowError("Credit"));
      } else {
        dispatch(setShowError("Oops"));
      }
    }
  };

  const scrollToLatestMessage = () => {
    if (innerContainerRef.current) {
      innerContainerRef.current.scrollTop =
        innerContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToLatestMessage();
  }, [boxes]);

  // const handleMicClick = () => {
  //   console.log('is listening', isListening)
  //   const recognition = new (window.SpeechRecognition ||
  //     window.webkitSpeechRecognition ||
  //     window.mozSpeechRecognition ||
  //     window.msSpeechRecognition)();

  //   recognition.lang = "en-US";
  //   // recognition.finalResults = true;
  //   recognition.interimResults = true;
  //   recognition.maxAlternatives = 1;
  //   recognition.continuous = true;

  //   if (isListening) {
  //     console.log('state', isListening)
  //     console.log('stop recognition')
  //     recognition.stop();
  //     setIsListening(false);
  //     return;
  //   }

  //   let text = ''
  //   recognition.onresult = (event: any) => {
  //     const transcript = event.results[0][0].transcript;
  //     console.log("transcript", transcript);
  //     setInputValue(transcript);

  //     // let transcript = "";
  //     // for (let i = 0; i < event.results.length; i++) {
  //     //   transcript += event.results[i][0].transcript;
  //     // }
  //     // setInputValue(transcript);
  //     // setInputValue((prevState) => prevState + transcript);
  //   };

  //   // recognition.onend = () => {
  //   //   console.log('ended', isListening)
  //   //   if (!isListening) {
  //   //     recognition.start();
  //   //   }
  //   // };

  //   // recognition.onerror = (event: any) => {
  //   //   console.error("Speech recognition error:", event.error);
  //   //   if(isListening) {
  //   //     setIsListening(false);
  //   //   }
  //   // };

  //   recognition.start();

  //   setIsListening(true);
  //   setTimeout(() => {
  //     recognition.stop();
  //     setIsListening(false);
  //   }, 15000);
  // };

  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition)();

  recognition.lang = "en-US";
  // recognition.finalResults = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;
  recognition.continuous = true;

  const handleMicClick = () => {
    console.log("is listening", isListening);
    if (!isListening) {
      setIsListening(true);
      recognition.start();
      recognition.oneend = () => {
        recognition.start();
        console.log("on end hit");
      };
    } else {
      recognition.stop();
      console.log("stop krdo");
      setIsListening(false);
    }

    let finalTranscript = "";
    let interimTranscript = "";
    recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        console.log("transcript", transcript);
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
          setInputValue(finalTranscript);
        } else {
          interimTranscript += transcript;
          // setInputValue(prevState => prevState + transcript)
        }
        console.log("final transcript", finalTranscript);
        console.log("interim transcript", interimTranscript);
      }
    };

    setTimeout(() => {
      console.log("stop krdo 3");
      recognition.stop();
      setIsListening(false);
    }, 15000);
  };

  const [showPopUp, setShowPopUp] = useState(false);

  const handleEditClick = (index: number) => {
    setInputValue(boxes[index].text);
  };

  const [rebuildPrompt, setRebuildPrompt] = useState({
    show: false,
    index: 0,
  });

  useEffect(() => {
    if (rebuildPrompt.show) {
      handleKeyPress({ key: "Enter" });
      setRebuildPrompt({
        show: false,
        index: 0,
      });
    }
  }, [rebuildPrompt.show]);

  const handleRebuildPrompt = async (index: number) => {
    setInputValue(boxes[index - 1].text);
    setRebuildPrompt({
      show: true,
      index,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          backgroundImage: isDown800 ? "none" : `url(${Backgroundlines})`,
          backgroundSize: isLessThan750 && !isDown1200 ? "cover" : "contain",
          backgroundPosition: "center",
          minHeight: isDown1200 ? "max-content" : "calc(100vh)",
          display: "flex",
          flexDirection: "column",
          justifyContent:
            isLessThan750 && !boxes?.length && isDown1200 ? "start" : "center",
          width: "100%",
          alignItems: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {showPopUp && <HelloPopUp setShowPopUp={setShowPopUp} />}
        {/* {!isLoggedIn && <SignInPopUp setShowPopUp={setShowPopUp} />} */}
        {showError == "Oops" && <OopsPopUp />}
        {showError == "Credit" && <OutOfCreditsPopUp />}
        {!boxes.length ? (
          <InitialContent
            handleSubmit={(question: string) =>
              handleSubmitDefaultQuestions(question)
            }
          />
        ) : (
          <Box
            sx={{
              overflowY: "auto",
              padding: "10px",
              // 60% here
              width: isDown1200 ? "95%" : "60%",
              display: "flex",
              // flexDirection: 'column-reverse',
              flexDirection: "column",
              alignItems: "flex-start",
              height: innerBoxHeight,
            }}
            id="inner-container"
            ref={innerContainerRef}
          >
            {boxes.map((box: any, index: number) => {
              return (
                <Message
                  key={index}
                  index={index}
                  showReloadIcon={boxes.length == index + 1}
                  message={box}
                  isUser={box.isUser}
                  responseInProcess={box.responseInProcess}
                  chartData={box.chartData}
                  isChart={box.isChart}
                  currency={box.currency}
                  time={box.time}
                  handleEditClick={handleEditClick}
                  handleRebuildPrompt={handleRebuildPrompt}
                  timePassed={timePassed[index]}
                />
              );
            })}
          </Box>
        )}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            marginBottom: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "0px 10px",
          }}
        >
          <ChatInput
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleKeyPress={handleKeyPress}
            isSending={isSending}
            isListening={isListening}
            handleMicClick={handleMicClick}
            handleSubmitClick={handleSubmitClick}
            count={count}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
