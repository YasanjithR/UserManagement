import React from "react"
import Logo from "./Logo"

const CardWithLogo = ({ title, description, children }) =>{
  return (
    <div className="card border-primary" style={{ maxWidth: "400px" }}>
      <div className="card-header bg-white d-flex align-items-center gap-3">
        <Logo size="sm" />
        <div>
          <h5 className="card-title mb-0">{title}</h5>
          <p className="card-text text-muted small">{description}</p>
        </div>
      </div>
      <div className="card-body">{children}</div>
      <div className="card-footer bg-white d-flex justify-content-end gap-2">
        <button className="btn btn-link text-primary">Cancel</button>
        <button className="btn btn-primary">Continue</button>
      </div>
    </div>
  )
}

export default CardWithLogo

