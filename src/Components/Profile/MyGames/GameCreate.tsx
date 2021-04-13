import React, { SyntheticEvent } from 'react';
import APIURL from '../../../helpers/environment';
import Modal from '@material-ui/core/Modal';
import { resourceLimits } from 'node:worker_threads';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import {IGameResult, IRawGResult, IRawGGenres, IRawGPlatforms} from '../../Interfaces';


type GameCreateProps = {
    gamesList: IRawGResult[],
    token: string,
    resetSearchState: () => void,
    open: boolean,
    handleClickClose: () => void,
    fetchGames: () => void,
}

type GameCreateState = {
    title: string,
    genre: string,
    system: string,
    description: string,
    image_url: string,
    review: string,
    rating: number,
    favorite: boolean,
}

export default class GamesCreate extends React.Component<GameCreateProps, GameCreateState> {
    constructor (props: GameCreateProps) {
        super(props)
        this.state = {
            title: '',
            genre: '',
            system: '',
            description: '',
            image_url: '',
            review: '',
            rating: 0,
            favorite: false,
        }
    };

    addGame = async (e: SyntheticEvent) : Promise<void> => {
        e.preventDefault();

        await this.props.gamesList.slice(0,1).map((game: IRawGResult, index: number) => {
            this.setState({
                title: game.name,
                genre: `${game.genres.map((genre: IRawGGenres) => {
                    return(genre.name)
                })}`,
                system: `${game.platforms.map((platforms: IRawGPlatforms) => {
                    return(platforms.platform[index].name)
                })}`,
                description: '',
                image_url: game.background_image,
                review: '',
            })
        })
        fetch(`${APIURL}/games/`, {
            method: 'POST',
            body: JSON.stringify({games: {
                title: this.state.title,
                genre: this.state.genre,
                system: this.state.system,
                description: this.state.description,
                image_url: this.state.image_url,
                review: this.state.review,
                rating: this.state.rating,
                favorite: this.state.favorite,
            }}),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => {
            this.props.resetSearchState(); 
            this.props.fetchGames();
            // alert('Game Added To Your List!');
        })
    }

    render() {
        return(
            <div>
                <Dialog open={this.props.open} onClose={this.props.handleClickClose} aria-labelledby="form-dialog-title">          
                {/* <p>Games Create - Test</p> */}
                {this.props.gamesList.slice(0,1).map((game: IRawGResult, index: number) => {
                    return (
                        <div key={index}>
                            <Card style={{maxWidth: '350px'}}>
                                <CardActionArea style={{textAlign: 'center'}}>
                                    <CardMedia component='img' style={{maxHeight: '300px'}} image={game.background_image} title='game img' />
                                    <CardContent>
                                    <Typography gutterBottom variant="h4" component="h2">
                                        {game.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    Genre: 
                                    <Typography gutterBottom variant="h6" component="h4">
                                    {game.genres.map((genre: any) => {
                                        return(
                                            <div>{genre.name}</div>
                                        )
                                    })}
                                    </Typography>
                                    <br/>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    System:
                                    <Typography gutterBottom variant="h6" component="h4">
                                    {game.platforms.map((platforms: any) => {
                                        return(
                                            <div>{platforms.platform.name}</div>
                                        )
                                    })}
                                    </Typography>
                                    </Typography>
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                <Button size="small" color="primary" onClick={this.addGame}>Add to Games List</Button>
                                <Button size="small" color="primary" onClick={this.props.resetSearchState}>Cancel</Button>
                                </CardActions>
                            </Card>
                            {/* <h2>{game.name}</h2>
                            <img src={game.background_image} alt='game img' style={{height: '150px'}} />
                            <h4>{game.genres.map((genre: any) => {
                                return(
                                    <div>{genre.name}</div>
                                )
                            })}</h4>
                            <h4>{game.platforms.map((platforms: any) => {
                                return(
                                    <div>{platforms.platform.name}</div>
                                )
                            })}</h4>
                            <button onClick={this.addGame}>Add to Games List</button>
                            <hr /> */}
                        </div>
                    )
                })}
                </Dialog>
            </div>
        )
    }
} 