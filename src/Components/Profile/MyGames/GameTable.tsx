//Map the Get request from the profile.tsx

import React, { ChangeEvent, SyntheticEvent } from 'react';
import './Game.css';
import APIURL from '../../../helpers/environment';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { IGameResult } from '../../Interfaces';

type GameTableProps = {
    token: string,
    input: string,
    fetchGames: () => void,
    games: IGameResult[],
    // handleEdit: any,
    editGame: (game: IGameResult) => void,
    handleClickOpen: () => void,
}

type GameTableState = {
    input: string,
}

export default class GamesTable extends React.Component<GameTableProps, GameTableState> {
    constructor (props: GameTableProps) {
        super(props)
        this.state = {
            input: '',
        }
    };
    
    deleteGame = async (id: string): Promise<void> => {
        console.log(id);
        await fetch(`${APIURL}/games/${id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => {
            this.props.fetchGames(); 
            // alert('Game Converted To Binary')
        })
    }

    // componentDidMount() {
    //     this.props.fetchGames();
    // }

    updateInput = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState(
            {input: e.target.value}
        )
    }

    mapSort = (): IGameResult[] => {
        console.log(this.props.games);
        return (
            this.props.games.sort((a: IGameResult, b: IGameResult) => {
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
            <div className='searchBar'>
                <Grid container justify='center'>
                    <Grid item xs={12}>
                        <h4>YOUR SAVED GAMES:</h4>
                    </Grid>
                {this.mapSort().map((result: IGameResult, index: number) => {
                    console.log(result);
                    return (
                        <Grid container xs={12} sm={5} justify='center' spacing={0} max-width='400px'>
                        <div key={index} style={{padding: '15px'}}>
                            <Card style={{maxWidth: '350px'}}>
                            <CardActionArea style={{textAlign: 'center'}}>
                                    <CardMedia component='img' style={{height: '150px'}} image={result.image_url} title='saved Game' />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {result.title}
                                        </Typography>
                                        <Typography>
                                            Genre: {result.genre} <br />
                                            System: {result.system} <br />
                                            Rating: {result.rating} <br />
                                            Review: {result.review} <br />
                                            Favorite: {result.favorite ? 'My Favorite Game' : 'Not My Favorite Game'} <br />
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={((e: SyntheticEvent) => this.deleteGame(result.id))}>
                                        Delete Game
                                    </Button>
                                    <Button size="small" color="primary" onClick={() => {this.props.editGame(result); this.props.handleClickOpen()}}>
                                        Edit Game
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    </Grid>
                    )
                })}
                </Grid>
            </div>
        )
    };
};