import './StyleSelector.css'

const STYLES = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    emoji: '🤖',
    color: '#00f5ff'
  },
  {
    id: 'jojo',
    name: 'Jojo\'s Bizarre',
    emoji: '💪',
    color: '#ff6b00'
  },
  {
    id: 'onepiece',
    name: 'One Piece',
    emoji: '🏴‍☠️',
    color: '#ffd700'
  },
  {
    id: 'naruto',
    name: 'Naruto',
    emoji: '🍜',
    color: '#ff8c00'
  },
  {
    id: 'southpark',
    name: 'South Park',
    emoji: '🧒',
    color: '#32cd32'
  }
]

function StyleSelector({ selectedStyle, onStyleSelect }) {
  return (
    <div className="style-selector-container">
      <h2 className="style-selector-title">Choisissez un style</h2>
      <div className="style-grid">
        {STYLES.map(style => (
          <button
            key={style.id}
            className={`style-card ${selectedStyle === style.id ? 'selected' : ''}`}
            onClick={() => onStyleSelect(style.id)}
            style={{
              borderColor: selectedStyle === style.id ? style.color : '#4d4d4f',
              boxShadow: selectedStyle === style.id ? `0 0 20px ${style.color}40` : 'none'
            }}
          >
            <div className="style-emoji">{style.emoji}</div>
            <div className="style-name">{style.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StyleSelector

