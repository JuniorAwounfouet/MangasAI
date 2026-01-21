import './DownloadButton.css'

function DownloadButton({ imageBase64, disabled }) {
  const handleDownload = () => {
    if (!imageBase64) return

    // Create a link element
    const link = document.createElement('a')
    link.href = `data:image/png;base64,${imageBase64}`
    link.download = `manga-generated-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button 
      className="download-btn" 
      onClick={handleDownload}
      disabled={disabled}
    >
      📥 Télécharger l'image
    </button>
  )
}

export default DownloadButton
