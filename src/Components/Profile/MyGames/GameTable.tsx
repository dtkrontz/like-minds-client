//Map the Get request from the profile.tsx

import React from 'react';
import Modal from '@material-ui/core/Modal';
import GameEdit from './GameEdit'


type GameTableProps = {
    token: string,
    input: string,
}

type GameTableState = {
    games: [],
    input: string,
    edit: boolean
}

export default class GamesTable extends React.Component<GameTableProps, GameTableState> {
    constructor (props: any) {
        super(props)
        this.state = {
            games: [],
            input: '',
            edit: false
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

    deleteGame = async (result: any, index: any) => {
        console.log(result);
        await fetch(`http://localhost:4000/games/${result[index].id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => this.fetchGames())
    }

    componentDidMount() {
        this.fetchGames();
    }

    updateInput = (e: any) => {
        this.setState(
            {input: e.target.value}
        )
    }

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

    // editfields = () => {
    //     return (
    //         <div>
    //             <p>Test</p>
    //             <button onClick={this.handleEditCancel}>Cancel</button>
    //         </div>
    //     )
    // }

    render() {
        return(
            <div>
                <p>Games Table - Test</p>
                <label>Search Saved Games: <input type='text' placeholder='Game Title'  onChange={((e) => this.updateInput(e))} /></label>
                {/* {this.state.games.filter((table: any) => table.includes(this.state.input)).map((result: any, index: any) => { */}
                {this.state.games.map((result: any, index: any) => {
                    return (
                        <div key={index}>
                            <img src={result.image_url} alt='server img' style={{height: '150px'}} />
                            <p>{result.id}</p>
                            <h2>{result.title}</h2>
                            <p>{result.genre}</p>
                            <p>{result.system}</p>
                            <p>{result.description}</p>
                            <p>Review: {result.review}</p>
                            <p>Rating: {result.rating}</p>
                            <p>Favorite: {result.favorite}</p>
                            <button onClick={((e: any) => this.deleteGame(this.state.games, index))}>Delete from List</button>
                            <button onClick={this.handleEdit}>Edit Game - open modal with fields</button>
                            {this.state.edit ? <GameEdit fetchGames={this.fetchGames} token={this.props.token} handleEditCancel={this.handleEditCancel} /> : null}
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }
} 