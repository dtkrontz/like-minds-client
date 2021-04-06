import React from 'react';
import Modal from '@material-ui/core/Modal';


type GameEditProps = {
    // handleEditCancel: any
    token: any,
    fetchGames: any,
    // result: any,
    // index: any,
    handleEditCancel: any,
    gameToUpdate: any,
}

type GameEditState = {
    edit: boolean,
    review: string,
    favorite: boolean,
    rating: number,
}

export default class GamesEdit extends React.Component<GameEditProps, GameEditState> {
    constructor (props: any) {
        super(props)
        this.state = {
            edit: false,
            review: '',
            favorite: this.props.gameToUpdate.favorite,
            rating: 0,
        }
    };

    componentDidMount() {
        console.log(this.props.gameToUpdate);
        // console.log(this.props.result);
    }

    updateAllInput = (e: any) => {
        console.log(typeof(e));
        const value = e.target.value;
        this.setState({
            ...this.state, // spreading existing state into a new state value and merging it. 
            [e.target.name]: value,
        })
    };

    updateGame = () => {
        fetch(`http://localhost:4000/games/${this.props.gameToUpdate.id}`, {
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

    handleFavorite = (e: any) => {
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
                <p>Games Edit - Test</p>
            <div>
                <p>Edit Games</p>
                <label>Review: <input type='text' name='review' placeholder='Your Review' onChange={this.updateAllInput} /></label>
                <br />
                <label>Favorite: <input type='checkbox' checked={this.state.favorite} name='favorite' onChange={(e) => this.handleFavorite(e.target.value)} /></label>
                <br />
                <label>Rating: <input type='text' name='rating' placeholder='Rating 0-10' onChange={this.updateAllInput} /></label>
                <br />
                <button onClick={(() => this.updateGame())}>Submit</button>
                <button onClick={this.props.handleEditCancel}>Cancel</button>
            </div>
            </div>
        )
    }
} 