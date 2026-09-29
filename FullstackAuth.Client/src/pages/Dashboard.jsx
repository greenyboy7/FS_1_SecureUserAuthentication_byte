import { useState } from "react";
import { getCurrentUser } from "../services/AuthService";
import { useEffect } from "react";
import "../App.css";

function Dashboard( {onLogOut} ) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getCurrentUser()
                setUser(response.data)
            } catch (error) {
                console.log("You're not Authorized", error)
            }
        }
        loadUser()
    }, []);

    return (
        <div className="dashboard-container">
            <h1>WELCOME TO DASHBOARD</h1>

            {user && (
                <div className="dashboard-card">
                    <p>{user.message}</p>
                    <p>Logged in as: {user.user}</p>
                </div>
            )}
            <div>
                <button className="logout-button" type="submit"
                onClick={() => {
                    localStorage.removeItem("token");
                    onLogOut();
                }}>LogOut</button>
            </div>
        </div>
    );

} export default Dashboard