import React from 'react';
import CommentCreate from './CommentCreate';
import CommentTable from './CommentsTable';
import CommentEdit from './CommentEdit';

interface CommentIndexProps {
    token: string,
    userId: string,
    admin: boolean,
}

interface CommentIndexState {
    favoriteGames: [],
    // favoriteGamesComments: [],
    edit: boolean,
    commentToUpdate: [],
    add: boolean,
    gameId: string,
    openCreate: boolean,
    openEdit: boolean,
}

export default class GamesIndex extends React.Component<CommentIndexProps, CommentIndexState> {
    constructor (props: any) {
        super(props)
        this.state = {
            favoriteGames: [],
            // favoriteGamesComments: [],
            edit: false,
            commentToUpdate: [],
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

    editComment = (content: any) => {
        this.setState ({
            commentToUpdate: content
        })
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
            <div style={{marginTop: '5vh'}}>
                {/* <p>Comment Index - Test</p> */}
                <CommentTable token={this.props.token} fetchFavoriteGames={this.fetchFavoriteGames} favoriteGames={this.state.favoriteGames} handleEdit={this.handleEdit} handleAdd={this.handleAdd} editComment={this.editComment} userId={this.props.userId} admin={this.props.admin} handleClickOpenCreate={this.handleClickOpenCreate} handleClickOpenEdit={this.handleClickOpenEdit} />
                {this.state.openEdit ? <CommentEdit token={this.props.token}  handleEditCancel={this.handleEditCancel} commentToUpdate={this.state.commentToUpdate} fetchFavoriteGames={this.fetchFavoriteGames} handleClickOpenEdit={this.handleClickOpenEdit} handleClickCloseEdit={this.handleClickCloseEdit} openEdit={this.state.openEdit} /> : null}
                {this.state.openCreate ? <CommentCreate token={this.props.token} gameId={this.state.gameId} fetchFavoriteGames={this.fetchFavoriteGames} handleClickOpenCreate={this.handleClickOpenCreate} handleClickCloseCreate={this.handleClickCloseCreate} openCreate={this.state.openCreate} /> : null}
            </div>
        )
    }
} 