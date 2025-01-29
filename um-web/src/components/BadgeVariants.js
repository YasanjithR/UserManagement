import React from "react"

const  BadgeVariants = () =>{
  return (
    <div className="d-flex flex-wrap gap-2">
      <span className="badge bg-primary">Primary</span>
      <span className="badge border border-primary text-primary">Outline</span>
      <span className="badge bg-light text-primary">Secondary</span>
    </div>
  )
}

export default BadgeVariants

