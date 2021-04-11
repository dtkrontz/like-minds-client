import React from 'react';
import GameCreate from './GameCreate';
import GameTable from './GameTable';
import GameEdit from './GameEdit';
import ProfileDisplay from '../ProfileDisplay';

type GameIndexProps = {
    token: string,
    userId: string,
    admin: boolean,
}

type GameIndexState = {
    games: [],
    input: string,
    // edit: boolean,
    gameToUpdate: [],
    open: boolean,
}

export default class GamesIndex extends React.Component<GameIndexProps, GameIndexState> {
    constructor (props: any) {
        super(props)
        this.state = {
            games: [],
            input: '',
            // edit: false,
            gameToUpdate: [],
            open: false,
        }
    };

    // thing: Boolean = false;

    fetchGames = () => {
        fetch('http://localhost:4000/games/', {
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

    // searchGamesFetch = async () => {
    //     await fetch (`https://api.rawg.io/api/games?key=${this.state.apiKey}&search=${this.state.searchTerm}`)
    //     .then(res => res.json())
    //     .then(json => {
    //         console.log(json);
    //         this.setState({
    //             gamesList: json.results,
    //             create: true,
    //         })
    //     })
    //     console.log(this.state.gamesList);
    // }

    // updateSearchTerm = (e: any) => {
    //     this.setState({
    //         searchTerm: e.target.value
    //     })
    // }

    // handleEdit = () => {
    //     this.setState({
    //         edit: true
    //     })
    // }

    // handleEditCancel = () => {
    //     this.setState({
    //         edit: false
    //     })
    // }

    editGame = (game: any) => {
        this.setState({
            gameToUpdate: game
        })
        // console.log(game);
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
            <div style={{marginTop: '5vh'}}>
                {/* <p>Games Index - Test</p> */}
                {/* <p>Games Table</p> */}
                <ProfileDisplay token={this.props.token} userId={this.props.userId} admin={this.props.admin} fetchGames={this.fetchGames} />
                <GameTable token={this.props.token} fetchGames={this.fetchGames} games={this.state.games} input={this.state.input} editGame={this.editGame} handleClickOpen={this.handleClickOpen} />
                {/* <p>Games Edit</p> */}
                {this.state.open ? <GameEdit fetchGames={this.fetchGames} token={this.props.token} gameToUpdate={this.state.gameToUpdate} handleClickOpen={this.handleClickOpen} handleClickClose={this.handleClickClose} open={this.state.open} /> : null}
                {/* <button onClick={this.searchGamesFetch}>Search</button> */}
                {/* {this.state.create ? <GameCreate gamesList={this.state.gamesList} /> : null}
                <GameTable /> */}
                {/* {this.thing ? <GameEdit /> : <></>} */}
            </div>
        )
    }
} 