import './BackButton.css'

function BackButton({ onBack }) {
  return (
    <button 
      className="back-btn" 
      onClick={onBack}
    >
      ← Retour à l'accueil
    </button>
  )
}

export default BackButton
