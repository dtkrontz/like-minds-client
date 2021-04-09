import React from 'react';

type GameCreateProps = {
    gamesList: any,
    token: string,
    resetSearchState: any,
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
    constructor (props: any) {
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

    addGame = async (e: any) => {
        e.preventDefault();

        await this.props.gamesList.slice(0,1).map((game: any, index: any) => {
            this.setState({
                title: game.name,
                genre: `${game.genres.map((genre: any) =>{
                    return(genre.name)
                })}`,
                system: `${game.platforms.map((platforms: any) => {
                    return(platforms.platform.name)
                })}`,
                description: '',
                image_url: game.background_image,
                review: '',
            })
        })
        fetch('http://localhost:4000/games/', {
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
        }).then(() => {this.props.resetSearchState(); alert('Game Added To Your List!')})
    }

    render() {
        return(
            <div>
                <p>Games Create - Test</p>
                {this.props.gamesList.slice(0,1).map((game: any, index: any) => {
                    return (
                        <div>
                            <h2>{game.name}</h2>
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
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }
} 