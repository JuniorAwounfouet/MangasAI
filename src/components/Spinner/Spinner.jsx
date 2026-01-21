import './Spinner.css'

function Spinner({ label }) {
  return (
    <div className="spinner">
      <div className="spinner__circle" aria-hidden="true" />
      {label && <div className="spinner__label">{label}</div>}
    </div>
  )
}

export default Spinner
