import React, {Component} from 'react';

type LoginProps = {
    updateToken: any
    closeHandler: any
}

type LoginState = {
    username: string,
    password: string,
}

export default class Login extends Component<LoginProps, LoginState> {
    constructor (props: any) {
        super(props)
        this.state ={
            username: '',
            password: '',
        }
    };

    updateUsername = (e: any) => {
        this.setState(
            {username: e.target.value}
        )
    };

    updatePassword =(e: any) => {
        this.setState(
            {password: e.target.value}
        )
    };

    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            body: JSON.stringify(
                {user: 
                    {
                    username: this.state.username, 
                    password: this.state.password
                }
            }
            ),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((data) => {
            this.props.updateToken(data.sessionToken);
            console.log(data);
        })
    }

    render() {
        return(
            <div>
                <p>Login - Test</p>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label> Username:
                        <input onChange={this.updateUsername} type='username' value={this.state.username} />
                    </label>
                    <label> Password:
                        <input onChange={this.updatePassword} type='password' value={this.state.password} />
                    </label>
                    <br />
                    <button>Submit</button>
                </form>
                <button onClick={this.props.closeHandler} >Close</button>
            </div>
        )
    }
} 