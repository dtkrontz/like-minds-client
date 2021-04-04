import React, {Component} from 'react';
import { updateShorthandPropertyAssignment } from 'typescript';

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

    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch('http://localhost:4000/user/login', {
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
        })
    }

    render() {
        return(
            <div>
                <p>Login - Test</p>
                <button onClick={this.props.closeHandler} >Close</button>
            </div>
        )
    }
} 