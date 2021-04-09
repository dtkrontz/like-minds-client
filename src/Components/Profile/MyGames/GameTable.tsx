//Map the Get request from the profile.tsx

import React, { ChangeEvent } from 'react';
import Modal from '@material-ui/core/Modal';
import GameEdit from './GameEdit'
import { resourceLimits } from 'node:worker_threads';


type GameTableProps = {
    token: string,
    input: string,
    fetchGames: any,
    games: any,
    handleEdit: any,
    editGame: any
}

type GameTableState = {
    // games: [],
    input: string,
    edit: boolean
}

export default class GamesTable extends React.Component<GameTableProps, GameTableState> {
    constructor (props: any) {
        super(props)
        this.state = {
            // games: [],
            input: '',
            edit: false
        }
    };

    // fetchGames = () => {
    //     fetch('http://localhost:4000/games/', {
    //         method: 'GET',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': this.props.token
    //         })
    //     }).then(res => res.json())
    //     .then(json => {
    //         this.setState({
    //             games: json
    //         })
    //         console.log('games', json)
    //     })
    // }

    deleteGame = async (id: number) => {
        console.log(id);
        await fetch(`http://localhost:4000/games/${id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => {this.props.fetchGames(); alert('Game Converted To Binary')})
    }

    // componentDidMount() {
    //     this.props.fetchGames();
    // }

    updateInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState(
            {input: e.target.value}
        )
    }

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

    // editfields = () => {
    //     return (
    //         <div>
    //             <p>Test</p>
    //             <button onClick={this.handleEditCancel}>Cancel</button>
    //         </div>
    //     )
    // }

    mapSort = (): [] => {
        return (
            this.props.games.sort((a: any, b: any) => {
            let nameA: string = a.title.toUpperCase();
            let nameB: string = b.title.toUpperCase();
            console.log(nameA, nameB);
            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            } else {
                return 0;
            };
        }))
    };

    render() {
        return(
            <div>
                <p>Games Table - Test</p>
                <label>Search Saved Games: <input type='text' placeholder='Game Title'  onChange={((e) => this.updateInput(e))} /></label>
                {/* {this.props.games.filter((table: any) => table.includes(this.state.input)).map((result: any, index: any) => { */}
                {this.mapSort().map((result: any, index: any) => {
                    console.log(result);
                    return (
                        <div key={index}>
                            <img src={result.image_url} alt='server img' style={{height: '150px'}} />
                            <h2>{result.title}</h2>
                            <h4>{result.id}</h4>
                            <p>Genre: {result.genre}</p>
                            <p>System: {result.system}</p>
                            <p>{result.description}</p>
                            <p>Review: {result.review}</p>
                            <p>Rating: {result.rating}</p>
                            <p>Favorite: {result.favorite ? 'My Favorite Game' : 'Not My Favorite Game'}</p>
                            <button onClick={((e: any) => this.deleteGame(result.id))}>Delete from List</button>
                            <button onClick={() => {this.props.editGame(result); this.props.handleEdit()}}>Edit Game - open modal with fields - dialog box</button>
                            {/* {this.state.edit ? <GameEdit fetchGames={this.props.fetchGames} token={this.props.token} handleEditCancel={this.handleEditCancel} result={result} index={index} /> : <div>
                            <button key={index} onClick={this.handleEdit}>Edit Game - open modal with fields - dialog box</button></div>} */}
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    };
};