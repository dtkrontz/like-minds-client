import React, { ChangeEvent } from 'react';
import APIURL from '../../../helpers/environment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface CommentEditProps {
    token: string,
    // fetchComments: any,
    handleEditCancel: () => void,
    commentToUpdate: any,
    fetchFavoriteGames: () => void,
    handleClickOpenEdit: () => void,
    handleClickCloseEdit: () => void,
    openEdit: boolean,
};

interface CommentEditState {
    content: string
}

export default class CommentEdit extends React.Component<CommentEditProps, CommentEditState> {
    constructor (props: CommentEditProps) {
        super(props)
        this.state = {
            content: this.props.commentToUpdate.content,
        }
    };

    componentDidMount() {
        console.log('this.props.commentToUpdate');
        console.log(this.props.commentToUpdate);
    };

    componentWillUnmount() {
        console.log('I unmounted')
    }

    updateInput = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(typeof(e));
        this.setState({
            content: e.target.value
        })
    };

    updateComment = () => {
        console.log('update');
        fetch(`${APIURL}/comments/${this.props.commentToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                comment: {
                    content: this.state.content
                }
            }),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then(() => this.props.fetchFavoriteGames());
    }

    render() {
        return(
            <div>
                <Dialog open={this.props.openEdit} onClose={this.props.handleClickCloseEdit} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit Comment</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To edit a comment, please adjust your comment below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        // id="name"
                        label="Comment"
                        type="text"
                        fullWidth
                        onChange={this.updateInput}
                        value={this.state.content}
                        InputProps={{inputProps: {maxlength: 20}}}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.props.handleClickCloseEdit} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {this.updateComment(); this.props.handleClickCloseEdit()}} color="primary">
                        Edit
                    </Button>
                    </DialogActions>
                </Dialog>
                {/* <p>Comment Edit - Test</p>
                <label>Comment: <input type='text' value={this.state.content} onChange={this.updateInput} /></label>
                <button onClick={(() => this.updateComment())}>Submit</button>
                <button onClick={(() => this.props.handleEditCancel())}>Cancel</button> */}
            </div>
        )
    }
} 