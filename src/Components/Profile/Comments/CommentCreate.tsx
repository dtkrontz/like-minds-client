import { Interface } from 'node:readline';
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


interface CommentCreateProps {
    token: string,
    gameId: string,
    fetchFavoriteGames: any,
    handleClickOpenCreate: any,
    handleClickCloseCreate: any,
    openCreate: boolean,
}

interface CommentCreateState {
    content: string,
    gameId: string,
    open: boolean,
}

export default class CommentCreate extends React.Component<CommentCreateProps, CommentCreateState> {
    constructor (props: any) {
        super(props)
        this.state = {
            content: '',
            gameId: this.props.gameId, // pull this id from somewhere
            open: false,
        }
    };

    updateContent = (e: any) => {
        this.setState({
            content: e.target.value
        })
    }

    addComment = () => {
        fetch('http://localhost:4000/comments/comment', {
            method: 'POST',
            body: JSON.stringify({
                comment: {
                    content: this.state.content,
                    gameId: this.state.gameId
                }
            }),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => this.props.fetchFavoriteGames())
    }

    render() {
        return(
            <div>
                {/* <p>Comment Create - Test</p>
                <label>Comment: <input type='text' onChange={this.updateContent} /></label>
                <button onClick={this.addComment}>Add Comment</button>
                <button>Cancel</button>
                <div>
                <Button variant="outlined" color="primary" onClick={this.props.handleClickOpen}>
        Open form dialog
      </Button> */}
                <Dialog open={this.props.openCreate} onClose={this.props.handleClickCloseCreate} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Comment</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To create a comment, please enter your comment below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        // id="name"
                        label="Comment"
                        type="text"
                        fullWidth
                        onChange={this.updateContent}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.props.handleClickCloseCreate} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {this.addComment(); this.props.handleClickCloseCreate()}} color="primary">
                        Comment
                    </Button>
                    </DialogActions>
                </Dialog>
                </div>
        )
    }
} 