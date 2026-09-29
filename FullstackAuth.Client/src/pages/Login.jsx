import { useState } from "react";
import loginUser, { getCurrentUser } from "../services/AuthService";
import "../App.css";


function Login({ onLogInSuccess, onGoToRegister }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await loginUser(email, password);
            console.log(result);

            localStorage.setItem("token", result.data.token)
            const user = await getCurrentUser();
            console.log("CURRENT USER", user.data)
            onLogInSuccess();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="login-container">

            <div className="login-card">
                <h2>ENTER YOUR DETAIL TO LOGIN</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username"> Email</label>
                        <input type="email" id="username" placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} required/>


                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"> Password</label>
                        <input type={showPassword ? "text":"password"} id="password" placeholder="password"
                            value={password}

                            onChange={(e) => setPassword(e.target.value)} required/>
                        
                        <label className="password-toggle">
                            <input type="checkbox"
                            checked={ showPassword }
                            onChange={(e) => setShowPassword(e.target.checked)}
                            />Show password
                        </label>
                    </div>
                    <div>
                        <button className="login-button" type="submit">Login</button>
                    </div>
                    <div>
                        <label>
                            <button className="button-to-register" type="button" onClick={onGoToRegister}>New go to register</button>
                        </label>
                    </div>
                </form>

            </div>
        </div>
    );
} export default Login