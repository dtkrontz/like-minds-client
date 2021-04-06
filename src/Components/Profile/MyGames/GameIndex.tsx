import React from 'react';
import GameCreate from './GameCreate';
import GameTable from './GameTable';
import GameEdit from './GameEdit';

type GameIndexProps ={
    token: string,

}

type GameIndexState = {
    games: [],
    input: string,
}

export default class GamesIndex extends React.Component<GameIndexProps, GameIndexState> {
    constructor (props: any) {
        super(props)
        this.state = {
            games: [],
            input: '',
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
    }

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

    render() {
        return(
            <div>
                <p>Games Index - Test</p>
                <GameTable token={this.props.token} input={this.state.input} />
                {/* <button onClick={this.searchGamesFetch}>Search</button> */}
                {/* {this.state.create ? <GameCreate gamesList={this.state.gamesList} /> : null}
                <GameTable /> */}
                {/* {this.thing ? <GameEdit /> : <></>} */}
            </div>
        )
    }
} 