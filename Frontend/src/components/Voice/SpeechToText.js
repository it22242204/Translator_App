import { useEffect, useState } from "react"; 
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import TextToSpeech from "./TextToSpeech"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';

const VoiceToText = () => {
    const [language, setLanguage] = useState('en-US'); // Single language state
    const { transcript, resetTranscript } = useSpeechRecognition(); // Hook to manage speech recognition transcript
    const [listening, setListening] = useState(false); 

    useEffect(() => { 
        if (listening) {
            try {
                SpeechRecognition.startListening({ continuous: true, language }); // Start continuous listening
            } catch (error) {
                console.error('Error starting speech recognition:', error); 
            }
        } else {
            SpeechRecognition.stopListening(); 
        }
    }, [listening, language]); 

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) { // Check for browser support
        return <span>Browser doesn’t support speech recognition.</span>; 
    }

    return (
        <form>
            <div className="textarea-container">
                <textarea
                    className="textarea"
                    value={transcript} // Display the speech recognition transcript
                    readOnly
                />
                <button className="close-button" onClick={(e) => { // Button to reset transcript
                    e.preventDefault(); 
                    resetTranscript(); 
                }}>
                    &times; {/* Close icon */}
                </button>
            </div>
            <div>
                <label htmlFor="language-select">Select Language:</label>
                <select
                    id="language-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)} // Update language state
                >
                    <option value="en-US">English</option>
                    <option value="si-LK">Sinhala</option>
                </select>
            </div>
            <button onClick={(e) => { // Button to start listening
                e.preventDefault(); 
                setListening(true); 
            }}>
                <FontAwesomeIcon icon={faMicrophone} /> {/* Microphone icon */}
            </button>
            <button onClick={(e) => { // Button to stop listening
                e.preventDefault(); 
                setListening(false); 
            }}>
                <FontAwesomeIcon icon={faStop} /> {/* Stop icon */}
            </button>
            <TextToSpeech text={transcript} language={language} /> {/* Render TextToSpeech component */}
        </form>
    );
};

export default VoiceToText;
