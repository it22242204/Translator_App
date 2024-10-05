from flask import Flask, request, jsonify
import cv2 as cv
import pytesseract
from googletrans import Translator
import numpy as np

# Set the path to the Tesseract executable (ensure this is correct on your system)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

app = Flask(__name__)

@app.route('/api/translate_text', methods=['POST'])
def translate_text_route():
    """
    Route that processes an uploaded image, extracts text using Tesseract OCR,
    and translates it between Sinhala and English.
    """
    # Check if an image was uploaded
    if 'image' not in request.files:
        return jsonify({"error": "No image provided."}), 400

    try:
        # Read the image file from the request
        file = request.files['image']
        image_np = np.fromfile(file, np.uint8)
        img = cv.imdecode(image_np, cv.IMREAD_COLOR)

        if img is None:
            return jsonify({"error": "Unable to load image."}), 400

        # Preprocess the image for better OCR results
        preprocessed_image = preprocess_image(img)

        # Extract text using Tesseract
        extracted_text = extract_text(preprocessed_image)

        # Translate the extracted text
        translated_text = translate_text(extracted_text)

        if translated_text is None:
            return jsonify({"error": "Translation failed."}), 500

        # Return the extracted and translated text as a JSON response
        return jsonify({
            "extracted_text": extracted_text,
            "translated_text": translated_text
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def preprocess_image(img):
    """
    Preprocess an image for better OCR results.
    
    Parameters:
    - img: The image array to preprocess.
    
    Returns:
    - thresh: The preprocessed image (thresholded binary image).
    """
    # Convert the image to grayscale
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

    # Apply GaussianBlur to reduce noise and improve OCR accuracy
    blurred = cv.GaussianBlur(gray, (5, 5), 0)

    # Apply binary thresholding to enhance contrast
    _, thresh = cv.threshold(blurred, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)

    return thresh

def extract_text(image, lang='sin+eng'):
    """
    Extract text from a preprocessed image using Tesseract OCR.
    
    Parameters:
    - image: The preprocessed image to extract text from.
    - lang: str, language codes for OCR (default is 'sin+eng' for both Sinhala and English).
    
    Returns:
    - text: Extracted text from the image.
    """
    # Extract text using the specified languages
    text = pytesseract.image_to_string(image, lang=lang)
    return text

def translate_text(text):
    """
    Translate the extracted text between Sinhala and English based on the detected language.
    
    Parameters:
    - text: The text to translate.
    
    Returns:
    - Translated text.
    """
    translator = Translator()

    # Detect the language of the input text
    detected_lang = translator.detect(text).lang

    # Translate from English to Sinhala or Sinhala to English
    if detected_lang == 'en':
        src_lang = 'en'
        dest_lang = 'si'  # Sinhala
    elif detected_lang == 'si':
        src_lang = 'si'
        dest_lang = 'en'
    else:
        return None

    # Perform translation
    translation = translator.translate(text, src=src_lang, dest=dest_lang).text
    return translation

# Start the Flask application
if __name__ == '__main__':
    app.run(debug=True)
