import { useState } from 'react'
import Header from '../components/header'
import Footer from '../components/Footer'
import ImageUpload from '../components/ImageUpload/ImageUpload'
import StyleSelector from '../components/StyleSelector/StyleSelector'
import GenerateButton from '../components/GenerateButton/GenerateButton'
import BackButton from '../components/BackButton/BackButton'
import './App.css'
import {  generateMistralImageFromPrompt, getImageDescription } from '../services/mistralApiRequest'
import { generateGeminiImageFromPrompt } from '../services/geminiApiRequest'
import { getStyleImage } from '../services/imageService'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [generatedImageBase64, setGeneratedImageBase64] = useState(null)

  const handleImageSelect = (image) => {
    setSelectedImage(image)
  }

  const handleStyleSelect = (styleId) => {
    setSelectedStyle(styleId)
  }

  const handleGenerate = () => {
    if (selectedImage && selectedStyle) {
      console.log('Génération de l\'image avec le style:', selectedStyle)

    
      setShowResults(true);
      generateImage();
    }
  }

  const generateImage = async () => {
    try {
      setIsLoading(true);
      const imageDescription = await getImageDescription(selectedImage)
      if (imageDescription) {
        console.log('Description de l\'image:', imageDescription)
        const style = await getStyleImage(selectedStyle);
        const generatedImageBase64 = await generateGeminiImageFromPrompt(style, imageDescription)
        setGeneratedImageBase64(generatedImageBase64);
        setIsLoading(false);
        console.log('Image générée avec succès.')
        
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.error('Erreur lors de la description de l\'image:', error)
    }


  }

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <div className="content-wrapper">
          {!showResults && (<>
            <h1 className="main-title">Générateur d'Image Manga AI</h1>
            <p className="main-subtitle">
              Téléchargez une image ou prenez une photo, puis choisissez un style pour générer votre image
            </p>

            <ImageUpload onImageSelect={handleImageSelect} />

            {selectedImage && (
              <>
                <StyleSelector
                  selectedStyle={selectedStyle}
                  onStyleSelect={handleStyleSelect}
                />
                <GenerateButton
                  onGenerate={handleGenerate}
                  disabled={!selectedStyle}
                />

              </>
            )}
          </>)}

          {showResults && (
            isLoading ? (
              <div>Ok c'est parti ! Patiente un peu et tu te retrouveras dans ton univers favori.</div>
            ) : (

              error ? (<>
                <div className="error-message">Une erreur est survenue lors de la génération de votre image, veuillez réessayer.</div>
                <BackButton onBack={() => {setShowResults(false); setError(null); setGeneratedImageBase64(null);}} />
                </>
              ) : (
              <>
                <div>
                  <h2>Résultats de la Génération</h2>
                  <div className="results-section">
                    <div className="generated-image-container">
                      <h3>Image Générée:</h3>
                      <img src={`data:image/png;base64,${generatedImageBase64}`} alt="Generated" className="generated-image" />
                    </div>
                  </div>
                </div>
                <BackButton onBack={() => {setShowResults(false); setError(null); setGeneratedImageBase64(null);}} />
              </>
            ))
          )}
        </div>
      </div>
        <Footer />
    </div>
  )
}

export default App
