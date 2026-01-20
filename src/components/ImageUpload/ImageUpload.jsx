import { useRef, useState } from 'react'
import './ImageUpload.css'

function ImageUpload({ onImageSelect }) {
  const [preview, setPreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [showWebcam, setShowWebcam] = useState(false)
  const streamRef = useRef(null)

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        onImageSelect(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    handleFile(file)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setShowWebcam(true)
      }
    } catch (error) {
      console.error('Error accessing webcam:', error)
      alert('Impossible d\'accéder à la webcam. Veuillez vérifier les permissions.')
    }
  }

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setShowWebcam(false)
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)
      
      const dataUrl = canvas.toDataURL('image/png')
      setPreview(dataUrl)
      onImageSelect(dataUrl)
      stopWebcam()
    }
  }

  const removeImage = () => {
    setPreview(null)
    onImageSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="image-upload-container">
      {!preview ? (
        <>
          <div
            className={`upload-area ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <div className="upload-icon">📷</div>
            <p className="upload-text">
              Glissez-déposez une image ici<br />
              ou cliquez pour sélectionner
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
          </div>
          
          <div className="upload-buttons">
            <button className="upload-btn" onClick={openFileDialog}>
              📁 Choisir un fichier
            </button>
            <button className="upload-btn webcam-btn" onClick={startWebcam}>
              📸 Prendre une photo
            </button>
          </div>

          {showWebcam && (
            <div className="webcam-modal">
              <div className="webcam-content">
                <video ref={videoRef} autoPlay playsInline className="webcam-video" />
                <div className="webcam-controls">
                  <button className="capture-btn" onClick={capturePhoto}>
                    📸 Capturer
                  </button>
                  <button className="cancel-btn" onClick={stopWebcam}>
                    ❌ Annuler
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
      ) : (
        <div className="image-preview-container">
          <img src={preview} alt="Preview" className="image-preview" />
          <button className="remove-btn" onClick={removeImage}>
            ✕ Supprimer l'image
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageUpload

