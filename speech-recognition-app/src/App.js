import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useRef, useState } from "react";
import "./App.css";
import microPhoneIcon from "./microphone.svg";

function App() {
  const commands = [
    {
      command: "open *",
      callback: (website) => {
        window.open("http://youtube.com");
      },
    },
    {
      command: "change background colour to *",
      callback: (color) => {
        document.body.style.background = color;
      },
    },
    {
      command: "reset",
      callback: () => {
        handleReset();
      },
    },
    {
      command: "reset background colour",
      callback: () => {
        document.body.style.background = `rgba(0, 0, 0, 0.8)`;
      },
    },
  ];
  const { transcript, resetTranscript } = useSpeechRecognition(commands);
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);

  // to check whether the browser supports the Web Speech APIs or not, we can use this function:
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  //To start listening to the user’s voice, we need to call the startListening function:
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  //To stop listening, we can call stopListening:
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  // To reset or clear the value of transcript, you can call resetTranscript:
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  return (
    <div className="microphone-wrapper">
      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          <img
            src={microPhoneIcon}
            className="microphone-icon"
            onClick={handleListing}
          />
        </div>
        <div className="microphone-status">
          {isListening ? "Listening" : "Click to start Listening"}
        </div>
        {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>

      {transcript && (
        <div className="microphone-result-container">
          <div className="microphone-result-text"></div>
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
