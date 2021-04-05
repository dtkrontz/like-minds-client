//Map the Get request from the profile.tsx

import React from 'react';

type GameTableProps = {

}

type GameTableState = {
    games: [],

}

export default class GamesTable extends React.Component<GameTableProps, GameTableState> {
    constructor (props: any) {
        super(props)
        this.state = {
            games: [],

        }
    };

    fetchGames = () => {
        fetch('http://localhost:4000/games/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRlZGNhNGFhLTE5ZDktNGI1Ni1hMmMzLWE1NWE2OWViZmUxMCIsImlhdCI6MTYxNzYzNjk4NiwiZXhwIjoxNjE3NzIzMzg2fQ.g8BspfPPnU4nqTiJdxJYNH9Hp5ps7AJvE3kUNSPptNQ'
            })
        }).then(res => res.json())
        .then(json => {
            this.setState({
                games: json
            })
            console.log('games', json)
        })
    }

    deleteGame = () => {
        
    }

    componentDidMount() {
        this.fetchGames();
    }

    render() {
        return(
            <div>
                <p>Games Table - Test</p>
                {this.state.games.map((result: any) => {
                    return (
                        <div>
                            <img src={result.image_url} alt='server img' style={{height: '150px'}} />
                            <h2>{result.title}</h2>
                            <p>{result.genre}</p>
                            <p>{result.system}</p>
                            <p>{result.description}</p>
                            <p>Review: {result.review}</p>
                            <p>Rating: {result.rating}</p>
                            <p>Favorite: {result.favorite}</p>
                            <button>Delete from List</button>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }
} 