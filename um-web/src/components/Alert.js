import React, { useEffect, useState } from "react"

const Alert = ({ type, message, duration = 5000 }) =>{
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  const alertClass = type === "success" ? "customer-alert-success text-white" : "bg-red-500 text-white"

  return (
    <div className={`mt-4 p-4 rounded-lg ${alertClass}`} role="alert">
      {message}
    </div>
  )
}

export default Alert

