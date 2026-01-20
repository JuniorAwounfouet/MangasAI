import { useState } from 'react'
import Header from '../components/header'
import Footer from '../components/Footer'
import ImageUpload from '../components/ImageUpload/ImageUpload'
import StyleSelector from '../components/StyleSelector/StyleSelector'
import GenerateButton from '../components/GenerateButton/GenerateButton'
import './App.css'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState(null)

  const handleImageSelect = (image) => {
    setSelectedImage(image)
  }

  const handleStyleSelect = (styleId) => {
    setSelectedStyle(styleId)
  }

  const handleGenerate = () => {
    if (selectedImage && selectedStyle) {
      // TODO: Appeler l'API pour générer l'image
      console.log('Génération de l\'image avec le style:', selectedStyle)
      console.log('Image:', selectedImage)
      
      // Pour l'instant, juste un message
      alert(`Génération de l'image avec le style ${selectedStyle}...\n\nCette fonctionnalité nécessitera une API backend pour la génération d'images.`)
    }
  }

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <div className="content-wrapper">
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
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
