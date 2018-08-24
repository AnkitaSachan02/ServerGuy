import React, {Component} from "react";
// import "./App.css";
import "../../src/App.css";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            email: "",
            password : ""
        }
    }

    onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value});
    };

    onSubmit =(e) => {
        e.preventDefault();
        let { username , email, password } = this.state;
        let flag = false;
        if(!username  || username.indexOf(" ")>-1 || username.indexOf("@")>-1){
            alert("Please enter valid username");
            flag=true;
        }
        if(!email || email.indexOf(" ")>-1 || email.indexOf("@")===-1){
            alert("Please enter valid email");
            flag=true;
        }
        if(!password){
            alert("Please enter password");
            flag=true;
        }
        if(flag){
            return false;
        }
        fetch('http://localhost:8081/auth/sign-up',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username , email, password })
        })
            .then(res=>res.json())
            .then(res=>{
                if(res.error){
                    alert(res.error);
                } else {
                    localStorage.setItem("username", email || username);
                    this.props.history.push("/gitRepositories");
                }
            });
    }

    render(){
        return(
            <div>
                <div id="login-box" style={{width: "340px"}}>
                    <div class="left">
                        <h1>Sign up</h1>
                        <input onChange={this.onChange} type="text" name="username" placeholder="Username" />
                        <input onChange={this.onChange} type="text" name="email" placeholder="E-mail" />
                        <input onChange={this.onChange} type="password" name="password" placeholder="Password" />
                        <input onChange={this.onChange} onSubmit={this.onSubmit} type="submit" name="signup_submit" value="Sign me up" />
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;