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

type LoginProps = {
    updateToken: (newToken: string) => void,
    closeHandler: () => void,
    setUser: (data: IData) => void,
    loginOpen: boolean,
}

type LoginState = {
    username: string,
    password: string,
}

export default class Login extends Component<LoginProps, LoginState> {
    constructor (props: LoginProps) {
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

    updatePassword =(e: ChangeEvent<HTMLInputElement>) => {
        this.setState(
            {password: e.target.value}
        )
    };

    handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        await fetch(`${APIURL}/auth/login`, {
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
            this.props.setUser(data);
            console.log(data);
        })
    }

    render() {
        return(
            <div>
                <Dialog open={this.props.loginOpen} onClose={this.props.closeHandler} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To login, please enter your username, and password.
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
                        type="password"
                        fullWidth
                        onChange={this.updatePassword}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.props.closeHandler} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Login
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
} 