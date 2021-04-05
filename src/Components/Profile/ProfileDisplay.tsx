import React from 'react';
import GameOfTheWeek from '../GameOfTheWeek/GameofTheWeek';
import GameCreate from './MyGames/GameCreate';

type ProfileProps = {
    token: string,

}

type ProfileState = {
    gamesList: [],
    apiKey: string,
    searchTerm: string,
    create: boolean,
}

export default class ProfileDisplay extends React.Component<ProfileProps, ProfileState> {
    constructor (props: any) {
        super(props)
        this.state = {
            gamesList: [],
            apiKey: '9df708d3da4e4c31968e89c6491797c2',
            searchTerm: '',
            create: true,
        }
    };

    searchGamesFetch = async () => {
        await fetch (`https://api.rawg.io/api/games?key=${this.state.apiKey}&search=${this.state.searchTerm}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            this.setState({
                gamesList: json.results,
                create: true,
            })
        })
        console.log(this.state.gamesList);
    }

    updateSearchTerm = (e: any) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    // componentDidMount() {
    //     this.fetchGames();
    // }

    // fetchGames = () => {
    //     fetch('http://localhost:4000/games/', {
    //         method: 'GET',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRlZGNhNGFhLTE5ZDktNGI1Ni1hMmMzLWE1NWE2OWViZmUxMCIsImlhdCI6MTYxNzYzNjk4NiwiZXhwIjoxNjE3NzIzMzg2fQ.g8BspfPPnU4nqTiJdxJYNH9Hp5ps7AJvE3kUNSPptNQ'
    //         })
    //     }).then(res => res.json())
    //     .then(json => {
    //         this.setState({
    //             games: json
    //         })
    //         console.log('games', json)
    //     })
    // }

    render() {
        return(
            <div>
                <p>Profile - Test</p>
                <GameOfTheWeek />
                <label>Search Games: <input type='text' placeholder='Game Title' onChange={this.updateSearchTerm} /></label>
                <button onClick={this.searchGamesFetch}>Search</button>
                {this.state.create ? <GameCreate token={this.props.token} gamesList={this.state.gamesList} /> : null}
            </div>
        )
    }
} 