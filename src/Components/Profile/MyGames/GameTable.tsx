//Map the Get request from the profile.tsx

import React from 'react';

type GameTableProps = {
    token: string,

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

    deleteGame = (games: any, index: any) => {
        fetch(`http://localhost:4000/games/${this.state.games}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => this.fetchGames)
    }

    componentDidMount() {
        this.fetchGames();
    }

    render() {
        return(
            <div>
                <p>Games Table - Test</p>
                {this.state.games.map((result: any, index: any) => {
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
                            <button onClick={((e: any) => this.deleteGame(e, index))}>Delete from List</button>
                            <button>Edit Game - open modal with fields</button>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }
} 