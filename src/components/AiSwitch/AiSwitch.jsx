import './AiSwitch.css'

function AiSwitch({ value, onChange }) {
  const options = [
    { id: 'gemini', label: 'Gemini' },
    { id: 'mistral', label: 'Mistral' }
  ]

  return (
    <div className="ai-switch">
        <div className="ai-switch__hint">
            <h3>Choisis l'IA pour générer l'image</h3>
        </div>
      <div className="ai-switch__buttons">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`ai-switch__btn ${value === opt.id ? 'is-active' : ''}`}
            onClick={() => onChange(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>
     
    </div>
  )
}

export default AiSwitch
