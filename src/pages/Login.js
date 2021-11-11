import "./Login.css"
import { Link } from "react-router-dom"

const Login = props => {
    return (
        <form method="post" id="login-form" >
            <div class="login-container">
                {/* <p>{loginErrorMessage}</p> */}
                <h1>Login</h1>
                <div class="textbox">
                    <input type="text" placeholder="Username" id="username" name="username"  /><br />
                </div>
                <div class="textbox">
                    <input type="password" placeholder="Password" id="password" name="password"  /><br />
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