import React from 'react';
import Login from './Login';
import Signup from './SignUp';
import GameOfTheWeek from '../GameOfTheWeek/GameofTheWeek';
import Button from '@material-ui/core/Button';

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
                <div className='navbar'>
                    <div>
                        <Button  onClick={this.signupHandler}><p className='navbarButton'>Signup</p></Button>
                        <Button className='navbarButton' onClick={this.loginHandler}><p className='navbarButton'>Login</p></Button>
                    </div>
                </div>
                <div>
                    <h1 style={{fontSize: '150px'}}>Like Minds</h1>
                </div>
                {this.state.signupOpen ? <Signup updateToken={this.props.updateToken} closeHandler={this.closeHandler} signupOpen={this.state.signupOpen} /> : null}
                {this.state.loginOpen ? <Login updateToken={this.props.updateToken} closeHandler={this.closeHandler} setUser={this.props.setUser} loginOpen={this.state.loginOpen} /> : null}
                {/* <Login updateToken={this.props.updateToken}/> */}
                {/* <Signup updateToken={this.props.updateToken} /> */}
                <GameOfTheWeek />
                <h3>Where like minds connect!</h3>
                {/* <button onClick={this.props.clearToken}>Clear Token</button> */}
            </div>
        )
    }
} 