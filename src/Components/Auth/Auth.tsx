import React from 'react';
import Login from './Login';
import Signup from './SignUp';

export default class Auth extends React.Component {
    constructor (props: any) {
        super(props)
    };

    render() {
        return(
            <div>
                <p>Auth - Test</p>
                <Login />
                <Signup />
            </div>
        )
    }
} 