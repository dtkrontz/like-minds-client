import React from 'react';
import Login from './Login';
import Signup from './SignUp';
import GameOfTheWeek from '../GameOfTheWeek/GameofTheWeek';

type AuthProps = {
    updateToken: any,
    clearToken: any,
    setUser: any
}

type AuthState = {
    signupOpen: boolean,
    loginOpen: boolean,
}

export default class Auth extends React.Component<AuthProps, AuthState> {
    constructor (props: any) {
        super(props)
        this.state = {
            signupOpen: false,
            loginOpen: false,
        }
    };

    signupHandler = () => {
        this.setState({
            signupOpen: true
        })
    }

    loginHandler = () => {
        this.setState({
            loginOpen: true
        })
    }

    closeHandler = () => {
        this.setState({
            signupOpen: false,
            loginOpen: false,
        })
    }

    render() {
        return(
            <div>
                <p>Auth - Test</p>
                <div>
                    <button onClick={this.signupHandler}>Signup</button>
                    <button onClick={this.loginHandler}>Login</button>
                </div>
                {this.state.signupOpen ? <Signup updateToken={this.props.updateToken} closeHandler={this.closeHandler} /> : null}
                {this.state.loginOpen ? <Login updateToken={this.props.updateToken} closeHandler={this.closeHandler} setUser={this.props.setUser} /> : null}
                {/* <Login updateToken={this.props.updateToken}/> */}
                {/* <Signup updateToken={this.props.updateToken} /> */}
                <GameOfTheWeek />
                <button onClick={this.props.clearToken}>Clear Token</button>
            </div>
        )
    }
} 