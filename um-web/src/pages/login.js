import React, { useState } from "react"
import Logo from "../components/Logo"
import CardWithLogo from "../components/CardWithLogo"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../features/authSlice"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth)


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const auth = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
     
        const response = dispatch(login({ email, password }))
        console.log("Login attempted with:", { email })
    

        response.then((result) => {
            if (result.meta.requestStatus === "fulfilled") {
            navigate("/users");
            }
        });
   
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/users")
        }
    }, [isAuthenticated, navigate])

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
                            <button type="submit" className="btn btn-primary w-100" disabled={auth.loading}>
                            {auth.loading ? "Logging in..." : "Login"}
                            </button>
                            {auth.error && <div className="alert alert-danger m-3">{auth.error}</div>}

                            
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

