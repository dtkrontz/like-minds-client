import React from 'react';
import GameCreate from './GameCreate';
import GameTable from './GameTable';
import GameEdit from './GameEdit';

type GameIndexProps = {
    token: string,
    userId: string,
    admin: boolean,
}

type GameIndexState = {
    games: [],
    input: string,
    edit: boolean
    gameToUpdate: []
}

export default class GamesIndex extends React.Component<GameIndexProps, GameIndexState> {
    constructor (props: any) {
        super(props)
        this.state = {
            games: [],
            input: '',
            edit: false,
            gameToUpdate: [],
        }
    };

    thing: Boolean = false;

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

    handleEdit = () => {
        this.setState({
            edit: true
        })
    }

    handleEditCancel = () => {
        this.setState({
            edit: false
        })
    }

    editGame = (game: any) => {
        this.setState({
            gameToUpdate: game
        })
        // console.log(game);
    }

    render() {
        return(
            <div>
                {/* <p>Games Index - Test</p> */}
                {/* <p>Games Table</p> */}
                <GameTable token={this.props.token} fetchGames={this.fetchGames} games={this.state.games} input={this.state.input} handleEdit={this.handleEdit} editGame={this.editGame} />
                <p>Games Edit</p>
                {this.state.edit ? <GameEdit fetchGames={this.fetchGames} token={this.props.token} handleEditCancel={this.handleEditCancel} gameToUpdate={this.state.gameToUpdate} /> : null}
                {/* <button onClick={this.searchGamesFetch}>Search</button> */}
                {/* {this.state.create ? <GameCreate gamesList={this.state.gamesList} /> : null}
                <GameTable /> */}
                {/* {this.thing ? <GameEdit /> : <></>} */}
            </div>
        )
    }
} 