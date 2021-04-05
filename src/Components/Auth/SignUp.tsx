import React from 'react';

type SignupProps = {
    updateToken: any
    closeHandler: any
}

type SignupState = {
    username: string,
    password: string,
}

export default class Signup extends React.Component<SignupProps, SignupState> {
    constructor (props: SignupProps) {
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
        // console.log(username, password);
        fetch('http://localhost:4000/auth/register', {
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
        .then((data) => {this.props.updateToken(data.sessionToken)
        })
    }


    render() {
        return(
            <div>
                <p>Signup - Test</p>
                <h1>Signup</h1>
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