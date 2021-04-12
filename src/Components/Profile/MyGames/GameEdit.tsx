import React, { SyntheticEvent, ChangeEvent } from 'react';
import APIURL from '../../../helpers/environment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {IGameResult} from '../../Interfaces';

type GameEditProps = {
    // handleEditCancel: any
    // result: any,
    // index: any,
    // handleEditCancel: any,
    token: string,
    fetchGames: () => void,
    gameToUpdate: IGameResult,
    handleClickOpen: () => void,
    handleClickClose: () => void,
    open: boolean,
}

type GameEditState = {
    edit: boolean,
    review: string,
    favorite: boolean,
    rating: number,
}

export default class GamesEdit extends React.Component<GameEditProps, GameEditState> {
    constructor (props: GameEditProps) {
        super(props)
        this.state = {
            edit: false,
            review: this.props.gameToUpdate.review,
            favorite: this.props.gameToUpdate.favorite,
            rating: this.props.gameToUpdate.rating,
        }
    };

    componentDidMount() {
        console.log(this.props.gameToUpdate);
        // console.log(this.props.result);
    }

    updateAllInput = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(typeof(e));
        const value = e.target.value;
        this.setState({
            ...this.state, // spreading existing state into a new state value and merging it. 
            [e.target.name]: value,
        })
    };

    updateGame = () => {
        fetch(`${APIURL}/games/${this.props.gameToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({games: {
                review: this.state.review,
                rating: this.state.rating,
                favorite: this.state.favorite,
            }}),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then(() => this.props.fetchGames())
    };

    handleFavorite = (e: string) => {
        this.state.favorite ? 
        this.setState({
            favorite: false
        })
        :
        this.setState({
            favorite: true
        })
    }

    render() {
        return(
            <div>
            <div>
                {/* <p>Edit Games</p>
                <label>Review: <input type='text' name='review' value={this.state.review} onChange={this.updateAllInput} /></label>
                <br />
                <label>Favorite: <input type='checkbox' checked={this.state.favorite} name='favorite' onChange={(e) => this.handleFavorite(e.target.value)} /></label>
                <br />
                <label>Rating: <input type='text' name='rating' value={this.state.rating} onChange={this.updateAllInput} /></label>
                <br />
                <button onClick={(() => this.updateGame())}>Submit</button> */}
                {/* <button onClick={this.props.handleEditCancel}>Cancel</button> */}
            </div>
            <div>
            <Dialog open={this.props.open} onClose={this.props.handleClickClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Edit Game</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To edit a game, please enter your rating (0-10), a brief review, and mark if this game is your favorite.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name='rating'
                        // id="name"
                        label="Rating"
                        type="number"
                        fullWidth
                        onChange={this.updateAllInput}
                        InputProps={{inputProps: {min: 0, max: 10}}}
                        value={this.state.rating}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name='review'
                        // id="name"
                        label="Review"
                        type="text"
                        fullWidth
                        onChange={this.updateAllInput}
                        InputProps={{inputProps: {maxlength: 10}}}
                        value={this.state.review}
                    />
                    <label>Favorite: <input type='checkbox' checked={this.state.favorite} name='favorite' onChange={(e) => this.handleFavorite(e.target.value)} /></label>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.props.handleClickClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {this.updateGame(); this.props.handleClickClose()}} color="primary">
                        Edit
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
            </div>
        )
    }
} 