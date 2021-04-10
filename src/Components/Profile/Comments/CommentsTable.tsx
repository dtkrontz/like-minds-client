import React from 'react';
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

interface CommentIndexProps {
    token: string,
    fetchFavoriteGames: any,
    favoriteGames: [],
    // fetchComments: any,
    handleEdit: any,
    handleAdd: any,
    editComment: any,
    userId: string,
    admin: boolean,
}

interface CommentIndexState {
    favoriteGames: []
}

export default class CommentTable extends React.Component<CommentIndexProps, CommentIndexState> {
    constructor (props: any) {
        super(props)
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

    deleteComment = async (id: number) => {
        console.log('delete');
        console.log(this.props.admin);
        console.log(`${this.props.admin}`);
        await fetch(`http://localhost:4000/comments/${id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token,
                'Admin': `${this.props.admin}`,
            })
        }).then(() => this.props.fetchFavoriteGames())
    }

    mapGamesSort = (): [] => {
        return (
            this.props.favoriteGames.sort((a: any, b: any) => {
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

    mapCommentsSort = (): [] => {
        return (
            this.props.favoriteGames.sort((a: any, b: any) => {
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

    commentMap = (result: any,) => {
        console.log(result);
        console.log(this.props.userId);
        console.log(this.props.admin);
        // console.log(result.id);
        // console.log(this.props.favoriteGamesComments[index].gameId);
        //game table ID vs comments table gameID
        // if (result.id === this.props.favoriteGamesComments[index].gameId && this.props.favoriteGamesComments[0] !== undefined) {
            if (result.comments.length > 0) {
            return result.comments.map((commentResult: any, index: any) => {
                    console.log(index, commentResult);
                    return (
                        <div key={index}>
                            <Typography>
                            {commentResult.content} - {commentResult.user.username}
                            </Typography>
                            <CardActionArea>
                                {this.props.userId === result.comments[index].userId || this.props.admin ? <div> <Button size="small" color="primary" onClick={((e: any) => this.deleteComment(commentResult.id))}>Delete comment</Button>
                                <Button size="small" color="primary"  onClick={() => {this.props.editComment(commentResult); this.props.handleEdit()}}>Edit comment - open modal with fields - dialog box</Button> </div> : null}
                            </CardActionArea>
                            {/* Ternary to check token id with comment id || admin is true*/}
                            
                        </div>
                    );
                })
            } else {
                return null
            }
    // }
}

    // commentMap = () => {
    //     console.log(this.props.favoriteGamesComments)
    //     //game table ID vs comments table gameID
    //     if (this.props.favoriteGamesComments.length > 0) {
    //        return this.props.favoriteGamesComments.map((commentResult: any, index: number) => {
    //                 console.log(commentResult.content);
    //                 return (
    //                     <div key={index}>
    //                         <ul>
    //                         <li>{commentResult.content}</li>
    //                         </ul>
    //                         <button>Delete comment</button>
    //                         <button>Edit comment - open modal with fields - dialog box</button>
    //                     </div>
    //                 );
    //             })
    //     } else {
    //         return (
    //             null
    //         )
    //     }  
    // }

    render() {
        return(
            <div>
                <p>FAVORITE GAMES:</p>
                {this.mapGamesSort().map((result: any, index: any) => {
                    return (
                        <div key={index} style={{padding: '15px'}}>
                            <Card style={{maxWidth: '350px'}}>
                            <CardActionArea style={{textAlign: 'center'}}>
                                    <CardMedia component='img' style={{height: '150px'}}
                                    image={result.image_url}
                                    title='Favorite Games' />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                            {result.title}
                                        </Typography>
                                        <Typography>
                                            Genre: {result.genre}<br />
                                            System: {result.system} <br />
                                        </Typography>
                                        <Typography>
                                            Comments: {this.commentMap(result)}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={(e) => this.props.handleAdd(result.id)}>
                                        Add Comment
                                    </Button>
                                </CardActions>
                            </Card>
                            {/* <img src={result.image_url} alt='server img' style={{height: '150px'}} />
                            <h2>{result.title}: <br/> {result.user.username}'s Favorite Game!</h2>
                            <h4>{result.id}</h4>
                            <p>Genre: {result.genre}</p>
                            <p>System: {result.system}</p>
                            <p>{result.description}</p>
                            <p>Comments: {this.commentMap(result)}</p>
                            <button onClick={(e) => this.props.handleAdd(result.id)}>Add comment - open modal with fields - dialog box</button>
                            <hr /> */}
                        </div>
                    )
                })}
            </div>
            // <div>
            //     <p>Comments</p>
            //     <p>Comments: {this.commentMap()}</p>
            // </div>
        )
    }
} 