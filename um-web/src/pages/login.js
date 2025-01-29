import React, { useState } from "react"
import Logo from "../components/Logo"
import CardWithLogo from "../components/CardWithLogo"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    console.log("Login attempted with:", { email, password })
  }

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="text-center mb-4">
            <center><Logo size="lg" letter="H" /></center>
            <h2 className="mt-3 text-primary">Welcome Back</h2>
          </div>
          <CardWithLogo title="Login" description="Enter your credentials to access your account">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-primary text-decoration-none">
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Log In
              </button>
            </form>
          </CardWithLogo>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <a href="#" className="text-primary text-decoration-none">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

