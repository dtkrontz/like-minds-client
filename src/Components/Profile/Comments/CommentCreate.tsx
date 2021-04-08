import { Interface } from 'node:readline';
import React from 'react';
import GamesIndex from '../MyGames/GameIndex';

interface CommentCreateProps {
    token: string,
    gameId: string,
    fetchFavoriteGames: any,
}

interface CommentCreateState {
    content: string,
    gameId: string
}

export default class CommentCreate extends React.Component<CommentCreateProps, CommentCreateState> {
    constructor (props: any) {
        super(props)
        this.state = {
            content: '',
            gameId: this.props.gameId // pull this id from somewhere
        }
    };

    updateContent = (e: any) => {
        this.setState({
            content: e.target.value
        })
    }

    addComment = () => {
        fetch('http://localhost:4000/comments/comment', {
            method: 'POST',
            body: JSON.stringify({
                comment: {
                    content: this.state.content,
                    gameId: this.state.gameId
                }
            }),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => this.props.fetchFavoriteGames())
    }

    render() {
        return(
            <div>
                <p>Comment Create - Test</p>
                <label>Comment: <input type='text' onChange={this.updateContent} /></label>
                <button onClick={this.addComment}>Add Comment</button>
                <button>Cancel</button>
            </div>
        )
    }
} 