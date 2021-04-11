//Map the Get request from the profile.tsx

import React, { ChangeEvent } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


type GameTableProps = {
    token: string,
    input: string,
    fetchGames: any,
    games: any,
    // handleEdit: any,
    editGame: any,
    handleClickOpen: any,

}

type GameTableState = {
    // games: [],
    input: string,
}

export default class GamesTable extends React.Component<GameTableProps, GameTableState> {
    constructor (props: any) {
        super(props)
        this.state = {
            // games: [],
            input: '',
        }
    };

    makeStyles() {
        return ({
        root: {
          maxWidth: 345,
        },
        media: {
          height: 140,
        },
      })
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
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Grid container justify='center'>
                    <Grid item xs={12}>
                        <h4>YOUR SAVED GAMES:</h4>
                    </Grid>
                {/* <label>Search Saved Games: <input type='text' placeholder='Game Title'  onChange={((e) => this.updateInput(e))} /></label> */}
                {/* {this.props.games.filter((table: any) => table.includes(this.state.input)).map((result: any, index: any) => { */}
                {this.mapSort().map((result: any, index: any) => {
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
                                        <Typography >
                                            Genre: {result.genre} <br />
                                            System: {result.system} <br />
                                            Rating: {result.rating} <br />
                                            Review: {result.review} <br />
                                            Favorite: {result.favorite ? 'My Favorite Game' : 'Not My Favorite Game'} <br />
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={((e: any) => this.deleteGame(result.id))}>
                                        Delete Game
                                    </Button>
                                    {/* <Button size="small" color="primary" onClick={() => {this.props.editGame(result); this.props.handleEdit()}}>
                                        Edit Game
                                    </Button> */}
                                    <Button size="small" color="primary" onClick={() => {this.props.editGame(result); this.props.handleClickOpen()}}>
                                        Edit Game
                                    </Button>
                                </CardActions>
                            {/* <img src={result.image_url} alt='server img' style={{height: '150px'}} />
                            <h2>{result.title}</h2>
                            <h4>{result.id}</h4>
                            <p>Genre: {result.genre}</p>
                            <p>System: {result.system}</p>
                            <p>{result.description}</p>
                            <p>Review: {result.review}</p>
                            <p>Rating: {result.rating}</p>
                            <p>Favorite: {result.favorite ? 'My Favorite Game' : 'Not My Favorite Game'}</p>
                            <button onClick={((e: any) => this.deleteGame(result.id))}>Delete from List</button>
                            <button onClick={() => {this.props.editGame(result); this.props.handleEdit()}}>Edit Game - open modal with fields - dialog box</button> */}
                            
                            </Card>
                            {/* {this.state.edit ? <GameEdit fetchGames={this.props.fetchGames} token={this.props.token} handleEditCancel={this.handleEditCancel} result={result} index={index} /> : <div>
                            <button key={index} onClick={this.handleEdit}>Edit Game - open modal with fields - dialog box</button></div>} */}
                        </div>
                            </Grid>
                    )
                })}
                {/* <div>
                <Card style={{maxWidth: '345px',}}>
      <CardActionArea>
        <CardMedia
          style={{maxHeight: '140px'}}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
                </div> */}
                </Grid>
            </div>
        )
    };
};