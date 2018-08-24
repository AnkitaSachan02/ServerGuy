import React, {Component} from "react";
import { Link } from 'react-router-dom';
import "../../src/App.css";

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            email: "",
            password : "",
        }
    }
    onChange = () => {
      console.log("e.target.value");
    }

    render(){
        return(
            <div>
             <h1 style={{margin: '100px', color: 'blue'}}>   
            Welcome! Here You can access Git Repositories according to stack you entered.
            </h1>
            <div>
                <Link to="/log-in">
                    <button class="social-signin facebook">Log in</button>
                </Link>
            </div>
            <div style={{border:'1px solid black', width: '30%', marginBottom: '20px', marginLeft: '35%'}}></div>
            <div>
                <Link to="/sign-up">
                    <button class="social-signin google">Sign up</button>
                </Link>
            </div>    
            </div>    
            
        );
    }
}

export default LogIn;