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

    handleSubmit = (event: any) => {
        event.preventDefault();
        // console.log(username, password);
        fetch('http://localhost:4000/user/register', {
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
                <button onClick={this.props.closeHandler} >Close</button>
            </div>
        )
    }
} 