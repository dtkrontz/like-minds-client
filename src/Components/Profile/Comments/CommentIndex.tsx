import React from 'react';
import CommentCreate from './CommentCreate';
import CommentTable from './CommentsTable';
import CommentEdit from './CommentEdit';

interface CommentIndexProps {
    token: string,
}

interface CommentIndexState {
    favoriteGames: []
    favoriteGamesComments: []
}

export default class GamesIndex extends React.Component<CommentIndexProps, CommentIndexState> {
    constructor (props: any) {
        super(props)
        this.state = {
            favoriteGames: [],
            favoriteGamesComments: []
        }
    };

    componentWillMount() {
        this.fetchFavoriteGames();
        this.fetchComments();
    };

    fetchFavoriteGames = () => {
        fetch('http://localhost:4000/comments/', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then(json => {
            this.setState({
                favoriteGames: json
            })
            console.log('favoriteGames', this.state.favoriteGames)
        })
    }

    fetchComments = () => {
        fetch(`http://localhost:4000/comments/24af7e9a-b200-4cfe-a920-e6115c433c6b`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then(json => {
            this.setState({
                favoriteGamesComments: json
            })
            console.log('favoriteGamesComments', this.state.favoriteGamesComments)
        })
    }

    thing: Boolean = false;

    render() {
        return(
            <div>
                <p>Comment Index - Test</p>
                <CommentCreate  />
                <CommentTable token={this.props.token} fetchFavoriteGames={this.fetchFavoriteGames} favoriteGames={this.state.favoriteGames} fetchComments={this.state.favoriteGamesComments} />
                {this.thing ? <CommentEdit /> : <></>}
            </div>
        )
    }
} 