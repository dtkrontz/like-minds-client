import React from 'react';
import APIURL from '../../../helpers/environment';
import GameCreate from './GameCreate';
import GameTable from './GameTable';
import GameEdit from './GameEdit';
import ProfileDisplay from '../ProfileDisplay';
import {IGameResult} from '../../Interfaces';

type GameIndexProps = {
    token: string,
    userId: string,
    admin: boolean,
}

type GameIndexState = {
    games: IGameResult[],
    input: string,
    gameToUpdate: IGameResult,
    open: boolean,
}

export default class GamesIndex extends React.Component<GameIndexProps, GameIndexState> {
    constructor (props: GameIndexProps) {
        super(props)
        this.state = {
            games: [],
            input: '',
            gameToUpdate: {
                image_url: '',
                title: '',
                genre: '',
                system: '',
                rating: 0,
                review: '',
                favorite: false,
                id: '',
                comments: [],
            },
            open: false,
        }
    };

    fetchGames = () => {
        fetch(`${APIURL}/games/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then(json => {
            this.setState({
                games: json
            })
            console.log('games', json)
        })
    }

    componentDidMount() {
        this.fetchGames();
    };

    editGame = (game: IGameResult) => {
        this.setState({
            gameToUpdate: game
        })
        console.log(game);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClickClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        return(
            <div>
                <div className='profileDisplay'>
                <ProfileDisplay token={this.props.token} userId={this.props.userId} admin={this.props.admin} fetchGames={this.fetchGames} />
                </div>
                <div className='gameTable'>
                <GameTable token={this.props.token} fetchGames={this.fetchGames} games={this.state.games} input={this.state.input} editGame={this.editGame} handleClickOpen={this.handleClickOpen} />
                </div>
                {this.state.open ? <GameEdit fetchGames={this.fetchGames} token={this.props.token} gameToUpdate={this.state.gameToUpdate} handleClickOpen={this.handleClickOpen} handleClickClose={this.handleClickClose} open={this.state.open} /> : null}
            </div>
        )
    }
} 