import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type SignupProps = {
    updateToken: any,
    closeHandler: any,
    signupOpen: any,
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
        .then((data) => {this.props.updateToken(data.sessionToken); alert('Username already in use')
        })
    }


    render() {
        return(
            <div>
                <Dialog open={this.props.signupOpen} onClose={this.props.closeHandler} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Signup</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To signup, please enter a username, and password.
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