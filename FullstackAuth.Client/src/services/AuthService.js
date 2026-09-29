
import axios from "axios";

function loginUser (email, password) {
    const response = axios.post("http://localhost:5093/api/Auth/login",
    {
        email: email,
        password: password
    })
    return response;

}export default loginUser;

function getCurrentUser (){
    const token = localStorage.getItem("token");
    const response = axios.get("http://localhost:5093/api/Auth/me", {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
return response;
}export { getCurrentUser };

async function registerUser(fullname, email, password) {
    // 2. Add await here 
    const response = await axios.post("http://localhost:5093/api/Auth/register", {
        // 3. Map properties explicitly to match your C# DTO keys exactly
        FullName: fullname,
        Email: email,
        Password: password
    });
    
    // 4. Return just the data payload back to the component
    return response.data;
}

export { registerUser };