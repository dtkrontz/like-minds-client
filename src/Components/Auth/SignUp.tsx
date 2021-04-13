import React, {ChangeEvent, Component, SyntheticEvent} from 'react';
import APIURL from '../../helpers/environment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {IData} from '../Interfaces';

type SignupProps = {
    updateToken: (newToken: string) => void,
    closeHandler: () => void,
    signupOpen: boolean,
    setUser: (data: IData) => void,
}

type SignupState = {
    username: string,
    password: string,
}

export default class Signup extends Component<SignupProps, SignupState> {
    constructor (props: SignupProps) {
        super(props)
        this.state ={
            username: '',
            password: '',
        }
    };

    updateUsername = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState(
            {username: e.target.value}
        )
    };
    componentDidUpdate() {
        console.log(this.state.username);
    }

    updatePassword =(e: ChangeEvent<HTMLInputElement>) => {
        this.setState(
            {password: e.target.value}
        )
    };

    handleSubmit = (event: SyntheticEvent) => {
        console.log('event started');
        event.preventDefault();
        // const regEx = new RegExp (/[a-z]{1,10}[0-9]{1,10}/i);
        if(this.state.password.length <= 5 || this.state.username.length <= 5){
            alert('Username and Password require 6 or more characters.')
            console.log('user wrong');
       } else {
        // console.log(username, password);
        console.log('user correct');
        fetch(`${APIURL}/auth/register`, {
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
        .then((data) => {this.props.updateToken(data.sessionToken);
        this.props.setUser(data);
        console.log(data);
        })
    }
    }

    render() {
        return(
            <div>
                <Dialog open={this.props.signupOpen} onClose={this.props.closeHandler} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Signup</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To signup, please enter a username, and password, each with 6 or more characters.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name='Username'
                        // id="name"
                        label="Username"
                        type="text"
                        fullWidth
                        onChange={this.updateUsername}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name='Password'
                        // id="name"
                        label="Password"
                        type="text"
                        fullWidth
                        onChange={this.updatePassword}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.props.closeHandler} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Signup
                    </Button>
                    </DialogActions>
                </Dialog>
                {/* <p>Signup - Test</p>
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
                <button onClick={this.props.closeHandler} >Close</button> */}
            </div>
        )
    }
} 