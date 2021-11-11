import "./Register.css"
import { Link } from "react-router-dom"

const Register = props => {
    return (
        <form method="post" id="register-form" >
        <div class="register-container">
            {/* <p>{errorMessage}</p> */}
            <h1>Register</h1>
            <div class="reg-container-1">
                <div class="textbox">
                    <input type="text" placeholder="First Name" id="first-name" name="first-name" /><br />
                </div>
                <div class="textbox">
                    <input type="text" placeholder="Last Name" id="last-name" name="last-name" /><br />
                </div>
                {/* <div class="textbox">
                    <input type="text" placeholder="Date of Birth" id="date-of-birth" name="date-of-birth" /><br />
                </div> */}
            </div>
            <div class="reg-container-2">
                <div class="textbox">
                    <input type="text" placeholder="E-mail address" id="email" name="email" /><br />
                </div>
                <div class="textbox">
                    <input type="text" placeholder="Username" id="username" name="username"  /><br />
                </div>
                <div class="textbox">
                    <input type="password" placeholder="Password" id="password" name="password" /><br />
                </div>
                <div class="textbox">
                    <input type="password" placeholder="Confirm Password" id="confirm-password" name="confirm-password"  /><br />
                </div>
            </div>
            <input class="btn" type="submit" value="Confirm" id="btnSubmit" />
            <div class="btn-reg">
                <p>
                    Already have an account? <Link to="/login">Click here to log in.<br /><br /></Link>
                </p>
            </div>
        </div>
    </form >
    )


}

export default Register