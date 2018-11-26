import React from 'react'

const SwappingWindow = ({
  resource,
  robber,
  handleClickAdd,
  handleClickSubtract,
  displayValue
}) => {
  return (
    <div key={resource.type} className="robber-modal-group">
      <div className="robber-modal-item resource-group">
        <h2 className="subtract-text">{robber.quantity}</h2>
        <div
          key={resource.type}
          className={`modal-resource ${resource.type}`}
        />
      </div>
      <div className="add-subtract-container robber-modal-item">
        <div
          className="btn-container add"
          data-resource={resource.type}
          onClick={handleClickAdd}
        >
          +
        </div>
        <div
          className="btn-container subtract"
          data-resource={resource.type}
          onClick={handleClickSubtract}
        >
          -
        </div>
      </div>
      <div className="robber-modal-item resource-group">
        <div className={`modal-resource ${resource.type}`} />
        <h2>{displayValue && resource.quantity}</h2>
      </div>
    </div>
  )
}

export default SwappingWindow
