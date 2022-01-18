import "./Login.css"
import { Link } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { createBrowserHistory } from "history";


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    const history = createBrowserHistory();

    const login = (username, password) => {
        axios
            .post("http://localhost:8080/login", { username, password })
            .then((res) => {
                if (res.data.error) {
                    console.log(res.data);
                    
                } else {
                    console.log(res.data);
    
                    localStorage.setItem('accessToken', JSON.stringify(res.data));
    
                    history.push("/")
                    window.location.reload();
                }
            })
            .catch((error) => {
                if(error){
                    setLoginErrorMessage("Invalid credentials"); 
                    return;
                }
            })
    
    };

    const handleUsernameChange = (e) => {
        e.preventDefault();

        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        e.preventDefault();

        setPassword(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            setLoginErrorMessage("Please fill in all the required fields.");
            return;
        } else {
        setLoginErrorMessage("");
        login(username, password);
        }
    };

    // const redirectUrl = () => {
    //     axios
    //         .get("http://localhost:8080/oauth/google")
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    // }

    // const getPrincipal = () => {
    //     axios
    //         .post("http://localhost:8080/user/auth")
    //         .then((res) => { 
    //             console.log(res.data);
    //         })
    // }


    return (
        <div>
            <form method="post" id="login-form" onSubmit={handleFormSubmit}>
                <div class="login-container">
                    <p className="error-msg">{loginErrorMessage}</p>
                    <h1>Login</h1>
                    <div class="textbox">
                        <input type="text" placeholder="Username" id="username" name="username" onChange={handleUsernameChange} /><br />
                    </div>
                    <div class="textbox">
                        <input type="password" placeholder="Password" id="password" name="password" onChange={handlePasswordChange} /><br />
                    </div>
                    <input class="btn" type="submit" value="Sign in" id="btnSubmit" />
                    <div class="btn-reg">
                        <p>
                            Don't have an account? <Link to="/register">Click here to register.</Link>
                        </p>
                    </div>


                </div>
            </form>
            {/* <button onClick={getPrincipal}>Login with google.</button> */}
        </div>
    )


}

export default Login