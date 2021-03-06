import React, { ChangeEvent } from 'react';
import './Profile.css';
import GameOfTheWeek from '../GameOfTheWeek/GameofTheWeek';
import GameCreate from './MyGames/GameCreate';
import Button from '@material-ui/core/Button';
import { IRawGResult} from '../Interfaces';

type ProfileProps = {
    token: string,
    userId: string,
    admin: boolean,
    fetchGames: () => void,
}

type ProfileState = {
    gamesList: IRawGResult[],
    apiKey: string,
    searchTerm: string,
    create: boolean,
}

export default class ProfileDisplay extends React.Component<ProfileProps, ProfileState> {
    constructor (props: ProfileProps) {
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

    updateSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
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

    render() {
        return(
            <div>
                <GameOfTheWeek />
                <div className='searchBar'>
                <label>Search for Games to Add: <input type='text' placeholder='Game Title' value={this.state.searchTerm} onChange={this.updateSearchTerm} />
                <Button style={{fontFamily: 'jaf-mashine, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                color: 'white',
                padding: '20px'}} className='searchButton' onClick={this.searchGamesFetch}>Search</Button></label>
                </div>
                <div>
                <GameCreate token={this.props.token} gamesList={this.state.gamesList} resetSearchState={this.resetSearchState} open={this.state.create} handleClickClose={this.resetSearchState} fetchGames={this.props.fetchGames} />
                </div>
            </div>
        )
    }
} 