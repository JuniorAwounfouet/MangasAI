import './GenerateButton.css'

function GenerateButton({ onGenerate, disabled }) {
  return (
    <button 
      className="generate-btn" 
      onClick={onGenerate}
      disabled={disabled}
    >
      ✨ Générer l'image
    </button>
  )
}

export default GenerateButton

