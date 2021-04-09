import React from 'react';
import Navigation from '../Navigation/Navigation';
import GameOfTheWeek from '../GameOfTheWeek/GameofTheWeek';

type ProfileProps = {
    token: string,
    userId: string,
    admin: boolean,
    clearToken: any,
}

type ProfileState = {
    
}

export default class Profile extends React.Component<ProfileProps, ProfileState> {
    constructor (props: any) {
        super(props)
        this.state = {
            
        }
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
                <button onClick={this.props.clearToken}>Logout</button>
                {/* <ProfileDisplay /> */}
                <Navigation token={this.props.token} userId={this.props.userId} admin={this.props.admin} />
            </div>
        )
    }
} 