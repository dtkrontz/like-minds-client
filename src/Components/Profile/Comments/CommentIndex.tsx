import React from 'react';
import './Comment.css'
import APIURL from '../../../helpers/environment';
import CommentCreate from './CommentCreate';
import CommentTable from './CommentsTable';
import CommentEdit from './CommentEdit';
import {ICommentResult, IGameResult, IUsername} from '../../Interfaces';

interface CommentIndexProps {
    token: string,
    userId: string,
    admin: boolean,
}

interface CommentIndexState {
    favoriteGames: IGameResult[],
    // favoriteGamesComments: [],
    edit: boolean,
    commentToUpdate: ICommentResult,
    add: boolean,
    gameId: string,
    openCreate: boolean,
    openEdit: boolean,
}

export default class GamesIndex extends React.Component<CommentIndexProps, CommentIndexState> {
    constructor (props: CommentIndexProps) {
        super(props)
        this.state = {
            favoriteGames: [],
            // favoriteGamesComments: [],
            edit: false,
            commentToUpdate: {
                content: '',
                userId: '',
                user: {
                    username: '',
                },
                id: ''
            },
            add: false,
            gameId: '',
            openCreate: false,
            openEdit: false,
        }
    };

    componentDidMount() {
        this.fetchFavoriteGames();
        // this.fetchComments();
    };

    fetchFavoriteGames = () => {
        fetch(`${APIURL}/comments/`, {
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

    // fetchComments = () => {
    //     fetch(`http://localhost:4000/comments/24af7e9a-b200-4cfe-a920-e6115c433c6b`, {
    //         method: 'GET',
    //         headers: new Headers ({
    //             'Content-Type': 'application/json',
    //             'Authorization': this.props.token
    //         })
    //     }).then(res => res.json())
    //     .then(json => {
    //         this.setState({
    //             favoriteGamesComments: json
    //         })
    //         console.log('favoriteGamesComments', this.state.favoriteGamesComments)
    //     })
    // }

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

    handleAdd = (result: string) => {
        console.log(result);
        this.setState({
            add: true,
            gameId: result
        })
    }

    handleAddCancel = () => {
        this.setState({
            add: false,
        })
    }

    editComment = (content: ICommentResult) => {
        this.setState ({
            commentToUpdate: content
        })
        console.log(content);
    }

    handleClickOpenCreate = () => {
        this.setState({
            openCreate: true
        })
    }

    handleClickCloseCreate = () => {
        this.setState({
            openCreate: false
        })
    }

    handleClickOpenEdit = () => {
        this.setState({
            openEdit: true
        })
    }

    handleClickCloseEdit = () => {
        this.setState({
            openEdit: false
        })
    }

    render() {
        return(
            <div>
                {/* <p>Comment Index - Test</p> */}
                <div className='commentTable'>
                <CommentTable token={this.props.token} fetchFavoriteGames={this.fetchFavoriteGames} favoriteGames={this.state.favoriteGames} handleEdit={this.handleEdit} handleAdd={this.handleAdd} editComment={this.editComment} userId={this.props.userId} admin={this.props.admin} handleClickOpenCreate={this.handleClickOpenCreate} handleClickOpenEdit={this.handleClickOpenEdit} />
                </div>
                {this.state.openEdit ? <CommentEdit token={this.props.token}  handleEditCancel={this.handleEditCancel} commentToUpdate={this.state.commentToUpdate} fetchFavoriteGames={this.fetchFavoriteGames} handleClickOpenEdit={this.handleClickOpenEdit} handleClickCloseEdit={this.handleClickCloseEdit} openEdit={this.state.openEdit} /> : null}
                {this.state.openCreate ? <CommentCreate token={this.props.token} gameId={this.state.gameId} fetchFavoriteGames={this.fetchFavoriteGames} handleClickOpenCreate={this.handleClickOpenCreate} handleClickCloseCreate={this.handleClickCloseCreate} openCreate={this.state.openCreate} /> : null}
            </div>
        )
    }
} 