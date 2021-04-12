import React from 'react';
import './Profile.css';
import GameOfTheWeek from '../GameOfTheWeek/GameofTheWeek';
import GameCreate from './MyGames/GameCreate';
import Button from '@material-ui/core/Button';


type ProfileProps = {
    token: string,
    userId: string,
    admin: boolean,
    fetchGames: any,
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
            create: false,
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

    resetSearchState = () => {
        this.setState({
            gamesList: [],
            // searchTerm: '',
            create: false,
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
                <GameOfTheWeek />
                <div className='searchBar'>
                <label>Search for Games to Add: <input type='text' placeholder='Game Title' value={this.state.searchTerm} onChange={this.updateSearchTerm} />
                <Button className='searchButton' onClick={this.searchGamesFetch}>Search</Button></label>
                </div>
                <div>
                <GameCreate token={this.props.token} gamesList={this.state.gamesList} resetSearchState={this.resetSearchState} open={this.state.create} handleClickClose={this.resetSearchState} fetchGames={this.props.fetchGames} />
                </div>
            </div>
        )
    }
} 