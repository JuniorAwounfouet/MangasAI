import './StyleSelector.css'
import cyberpunkLogo from '../../assets/cyberpunkLogo.png'
import jojoLogo from '../../assets/jojoLogo.png'
import onePieceLogo from '../../assets/onepieceLogo.png'
import southParkLogo from '../../assets/southparkLogo.png'
import narutoLogo from '../../assets/narutoLogo.png'

const STYLES = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    logo: cyberpunkLogo,
    color: '#00f5ff'
  },
  {
    id: 'jojo',
    name: 'Jojo\'s Bizarre',
    logo: jojoLogo,
    color: '#ff6b00'
  },
  {
    id: 'onepiece',
    name: 'One Piece',
    logo: onePieceLogo,
    color: '#ffd700'
  },
  {
    id: 'naruto',
    name: 'Naruto',
    logo: narutoLogo,
    color: '#ff8c00'
  },
  {
    id: 'southpark',
    name: 'South Park',
    logo: southParkLogo,
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
            <div>
              <img src={style.logo} className="style-logo" alt="Logo" />
            </div>
            <div className="style-name">{style.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StyleSelector

