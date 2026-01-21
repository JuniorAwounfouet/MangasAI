import './PromptUpgrade.css'
import '../GenerateButton/GenerateButton.css'

function PromptUpgrade({ value, onChange, onSubmit, disabled }) {
  return (
    <div className="prompt-upgrade">
      <div className="prompt-upgrade__header">Améliorer l'image</div>
      <div className="prompt-upgrade__controls">
        <input
          className="prompt-upgrade__input"
          type="text"
          placeholder="Décris les améliorations que tu souhaites"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          className="generate-btn prompt-upgrade__button"
          onClick={onSubmit}
          disabled={disabled}
        >
          ⚡ Optimiser l'image
        </button>
      </div>
    </div>
  )
}

export default PromptUpgrade
