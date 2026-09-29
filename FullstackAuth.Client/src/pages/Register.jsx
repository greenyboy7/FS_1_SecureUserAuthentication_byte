import { useState } from "react";
import { registerUser } from "../services/AuthService";

function Registration({ onGoToLogin }) {
    const [error, setError] = useState("")
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassWord] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !fullname || !password || !confirmedPassword) {
            setError("All inputs are Required ❌");
            return;
        }

        if (password !== confirmedPassword) {
            setError("Passwords do not match ❌");
            return;
        }

        setError("");

        console.log("FULLNAME:", fullname);
        console.log("EMAIL:", email);
        console.log("PASSWORD ENTERED:", password.length);

        try {
            const result = await registerUser(fullname, email, password);
            console.log("Registration successful", result);
        } catch (error) {
            console.log("Registration failed", error);
        }
    };


return (
    <div>
        <form className="register-form" onSubmit={handleSubmit}>
            <h1>Register New User</h1>
            <div>
                <label>Fullname</label>
                <input type="text" placeholder="Fullname"
                    value={fullname}
                    onChange={(e) => { setFullname(e.target.value); setError(""); }} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                />

            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }} />
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password"
                    value={confirmedPassword}
                    onChange={(e) => { setConfirmedPassWord(e.target.value); setError(""); }}
                    placeholder="confirm password" />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div>
                <button type="submit">Register</button>
            </div>
            <div>
                <button type="button" onClick={onGoToLogin}>Already registered? login</button>
            </div>
        </form>
    </div>
);
} export default Registration