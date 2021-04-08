import React from 'react';
import CommentCreate from './CommentCreate';
import CommentTable from './CommentsTable';
import CommentEdit from './CommentEdit';

interface CommentIndexProps {
    token: string,
}

interface CommentIndexState {
    favoriteGames: [],
    favoriteGamesComments: [],
    edit: boolean,
    commentToUpdate: [],
}

export default class GamesIndex extends React.Component<CommentIndexProps, CommentIndexState> {
    constructor (props: any) {
        super(props)
        this.state = {
            favoriteGames: [],
            favoriteGamesComments: [],
            edit: true,
            commentToUpdate: [],
        }
    };

    componentDidMount() {
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

    editComment = (content: any) => {
        this.setState ({
            commentToUpdate: content
        })
    }

    render() {
        return(
            <div>
                <p>Comment Index - Test</p>
                <CommentCreate token={this.props.token} />
                <CommentTable token={this.props.token} fetchFavoriteGames={this.fetchFavoriteGames} favoriteGames={this.state.favoriteGames} favoriteGamesComments={this.state.favoriteGamesComments} fetchComments={this.fetchComments} handleEdit={this.handleEdit} editComment={this.editComment} />
                {this.state.edit ? <CommentEdit token={this.props.token} fetchComments={this.fetchComments} handleEditCancel={this.handleEditCancel} commentToUpdate={this.state.commentToUpdate} /> : <></>}
            </div>
        )
    }
} 