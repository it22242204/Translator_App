import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faVolumeUp } from "@fortawesome/free-solid-svg-icons"; 
import "./Voice.css";

const TextToSpeech = ({ text, language }) => { // TextToSpeech component, accepting text and language as props
    const handleTextToSpeech = (e) => { // function to handle text-to-speech functionality
        e.preventDefault(); // Prevent the default button behavior
        const speech = new SpeechSynthesisUtterance(text); // Create a new SpeechSynthesisUtterance object with the provided text
        speech.lang = language; // Set the language for the speech synthesis
        window.speechSynthesis.speak(speech); // Use the speechSynthesis API to speak the text
    };
  
    return (
        <button onClick={handleTextToSpeech} className='speaker'> {/* Button to trigger text-to-speech */}
            <FontAwesomeIcon icon={faVolumeUp} />
        </button>
    );
};

export default TextToSpeech; 
