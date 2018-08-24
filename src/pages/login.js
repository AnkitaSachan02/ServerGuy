import React, {Component} from "react";
// import "./App.css";
import "../../src/App.css";

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : ""
        }
    }
    onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value});
    }

    onSubmit =(e) => {
        e.preventDefault();
        let { username, password } = this.state;
        let flag = false;
        if(!username  || username.indexOf(" ")>-1 ){
            alert("Please enter valid username");
            flag=true;
        }
        if(!password){
            alert("Please enter valid password");
            flag=true;
        }
        if(flag){
            return false;
        }
        fetch('http://localhost:8081/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res=>res.json())
            .then(res=>{
                if(res.error){
                    alert(res.error);
                } else {
                    localStorage.setItem("username", username);
                    this.props.history.push("/gitRepositories");
                }
            });
    }

    render(){
        return(
            <div>
                <div id="login-box">
                    <div class="left">
                        <h1>Sign in</h1>
                        <input onChange={this.onChange} type="text" name="username" placeholder="username/email" />
                        <input onChange={this.onChange} type="password" name="password" placeholder="Password" />
                        <input onChange={this.onChange} onClick={this.onSubmit} type="submit" name="signin_submit" value="Sign in" />
                    </div>
                    <div class="right">
                        <span class="loginwith">Sign in with<br />social network</span>
                        <a href="http://localhost:8081/auth/facebook">
                            <button class="social-signin facebook">Log in with facebook</button>
                        </a>
                        <a href="http://localhost:8081/auth/google">
                            <button class="social-signin google">Log in with Google+</button>
                        </a>
                    </div>
                    <div class="or">OR</div>
                </div>
            </div>
        );
    }
}

export default LogIn;