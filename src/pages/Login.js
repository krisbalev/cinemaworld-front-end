import "./Login.css"
import { Link } from "react-router-dom"
import { useState } from "react";


const Login = props => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginErrorMessage, setLoginErrorMessage] = useState("");


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
            props.login(username, password);
        }
    };
    

    return (
        <form method="post" id="login-form" onSubmit={handleFormSubmit}>
            <div class="login-container">
                <p>{loginErrorMessage}</p>
                <h1>Login</h1>
                <div class="textbox">
                    <input type="text" placeholder="Username" id="username" name="username"  onChange={handleUsernameChange}/><br />
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
    )


}

export default Login