import { useState } from "react";
import "./Translator.css";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import TextToSpeech from "../components/Voice/TextToSpeech";
import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faStop,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../components/Voice/Voice.css";

const Translator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputText, setInputText] = useState(""); // Text input state
  const [inputLang, setInputLang] = useState(""); // Input language state
  const [outputLang, setOutputLang] = useState("si"); // Output language state (default to Sinhala)
  const [outputText, setOutputText] = useState(""); // Translated text output state
  const [isTranslated, setIsTranslated] = useState(null); // Translation status state
  const [selectedImage, setSelectedImage] = useState(null); // Image input state
  const [translatedImageText, setTranslatedImageText] = useState(""); // Image translation output state
  const [sourceLanguage, setSourceLanguage] = useState("en-US"); // source language
  const { transcript, resetTranscript } = useSpeechRecognition(); // Hook to manage speech recognition transcript
  const [listening, setListening] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  // Text translation function using RapidAPI
  const translateText = async (e) => {
    e.preventDefault();
    setIsTranslating(true);
    const url = "https://nlp-translation.p.rapidapi.com/v1/translate";

    const data = new URLSearchParams(); // Use URLSearchParams instead of FormData for API request
    data.append("text", inputText);
    data.append("to", outputLang); // Target language
    data.append("from", inputLang); // Source language, 'auto' to auto-detect

    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "330032f6a6msh2c040c52967a8b4p18ff0fjsn9302f7579e4e",
        "x-rapidapi-host": "nlp-translation.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (
        response.ok &&
        result.translated_text &&
        result.translated_text[outputLang]
      ) {
        setIsTranslated(true);
        setOutputText(result.translated_text[outputLang]); // Set translated text from response

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inputText,
            outputText: result.translated_text[outputLang],
          }),
        };
        fetch("http://localhost:4000/api/tasks", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            //TODO
          });
      } else {
        setIsTranslated(false);
        console.error("Translation response format error:", result);
      }
    } catch (error) {
      setIsTranslated(false);
      console.error("Translation failed:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  // Function to handle image input change
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // Image translation function using Python backend
  const handleImageTranslation = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch("/api/process_image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setTranslatedImageText(data.translated_text || "No text extracted"); // Display the translated text
      } else {
        throw new Error("Image translation failed");
      }
    } catch (error) {
      console.error(error);
      setTranslatedImageText("Image translation failed.");
    }
  };

  // Function to clear text input and reset the translation state
  const clearInput = () => {
    setInputText("");
    setOutputText("");
    setIsTranslated(null);
    resetTranscript();
  };

  useEffect(() => {
    if (listening) {
      try {
        // Start continuous listening
        SpeechRecognition.startListening({
          continuous: true,
          language: sourceLanguage,
        });
      } catch (error) {
        console.error("Error starting speech recognition:", error);
      }
    } else {
      // Stop listening and assign the transcript to inputText if transcript exists
      SpeechRecognition.stopListening();
      if (transcript !== "") {
        setInputText(transcript); // Assign transcript to inputText after stopping listening
      }
    }
  }, [listening, sourceLanguage, transcript]); // Include transcript in the dependencies

  const handleAddBookmark = () => {
    console.log("Navigating to AddBookmark with data:", {
      inputText,
      translatedText: outputText,
    });

    navigate("/AddBookMark", {
      state: {
        inputText,
        translatedText: outputText,
      },
    });
  };
 
  const handleAddNote =() => {
    console.log("Navigating to addnote with data:", {
      inputText,
      translatedText: outputText,
    });

    navigate("/addnote", {
      state: {
        inputText,
        translatedText: outputText,
      },
    });
  };
  const handleTranslation = async () => {
    setIsTranslating(true); // Start translation
    try {
      // Call your translation logic here
      const translatedText = await translateText(inputText);
      setOutputText(translatedText);
      setIsTranslated(true); // Successful translation
    } catch (error) {
      setIsTranslated(false); // Translation failed
    } finally {
      setIsTranslating(false); // End translation
    }
  };

  return (
    <section className="translator">
      {/* Text Translation Section */}
      <div className="row-wrapper">
        <div className="translator-container input-lang">
          <div className="top-row">
            {/* jeethu's */}
            {/* <SpeechToText></SpeechToText> */}
            {/*<label htmlFor="language-select">Select Language:</label>*/}
            <select
              className="language-select"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)} // Update language state
            >
              <option value="en-US">English</option>
              <option value="si-LK">Sinhala</option>
            </select>
            <button
              onClick={(e) => {
                // Button to start listening
                e.preventDefault();
                setListening(true);
              }}
              className="start"
            >
              <FontAwesomeIcon icon={faMicrophone} /> {/* Microphone icon */}
            </button>
            <button
              className="stop"
              onClick={(e) => {
                // Button to stop listening
                e.preventDefault();
                setListening(false);
              }}
            >
              <FontAwesomeIcon icon={faStop} /> {/* Stop icon */}
            </button>
            <TextToSpeech text={inputText} language={sourceLanguage} />{" "}
            {/*Render TextToSpeech component*/}
            {/* jeethu's end */}
            <button className="btn-translate" onClick={translateText}>
              Translate Text
            </button>
          </div>
          <form className="input-form">
            <textarea
              className="text-box output-box"
              placeholder="Enter text"
              value={listening ? transcript : inputText} // Set value based on listening state
              onChange={(e) => {
                if (!listening) {
                  setInputText(e.target.value); // Update the inputText only if not listening
                }
              }}
            ></textarea>
            {inputText !== "" && (
              <AiOutlineClose
                className="icon-btn close-btn"
                onClick={clearInput}
              />
            )}
          </form>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              className="btn btn-primary me-md-2"
              type="button"
              onClick={handleAddNote}
            >
              Add Notes
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleAddBookmark} // Call handleAddBookmark directly
            >
              AddBookMark
            </button>
          </div>
        </div>

        <div className="translator-container output-lang">
          <div className="top-row">
            {/*<label htmlFor="languages">Output Language</label>*/}
            <select
              name="languages"
              className="language-select"
              onChange={(e) => setOutputLang(e.target.value)}
            >
              <option value="si">Sinhala</option>
              <option value="en">English</option>
            </select>
            {/* jeethu's */}
            <TextToSpeech text={outputText} language={outputLang} />{" "}
            {/*speaker for text to speech*/}
          </div>
          <p className="text-box">
            {isTranslating ? (
              <span className="output-placeholder">Translating...</span>
            ) : isTranslated === false ? (
              <span className="output-placeholder translation-error">
                Translation failed
              </span>
            ) : outputText === "" ? (
              <span className="output-placeholder">No translation yet</span>
            ) : (
              outputText
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Translator;
