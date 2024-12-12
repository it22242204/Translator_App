import React, { useEffect, useState } from 'react';
import Translator from './Translator/Translator';
import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Home = () => {
  const [translatedText, setTranslatedText] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('/api/translate_text', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Image translation failed');
      }

      const data = await response.json();
      setTranslatedText(data.translated_text);
    } catch (error) {
      console.error(error);
      setTranslatedText('Image translation failed.');
    }
  };

  return (
    <div className="App">
      <Header />
      <Translator />

      {/* Image input form */}
      <div className="image-uploader-container">
        <h2>Translate Image</h2>

        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          <button type="submit" className="btn btnupload">Translate Image</button>
        </form>

        {/* Display the translated text */}
        <div className="text-box output-box">
          <p>{translatedText}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
