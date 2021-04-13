import React, { SyntheticEvent } from 'react';
import APIURL from '../../../helpers/environment';
import {  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {ICommentResult, IGameResult} from '../../Interfaces';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import EditIcon from '@material-ui/icons/Edit';

interface CommentIndexProps {
    token: string,
    fetchFavoriteGames: () => void,
    favoriteGames: IGameResult[],
    handleEdit: () => void,
    handleAdd: (result: string) => void,
    editComment: (content: ICommentResult) => void,
    userId: string,
    admin: boolean,
    handleClickOpenCreate: () => void,
    handleClickOpenEdit: () => void,
}

interface CommentIndexState {
}

export default class CommentTable extends React.Component<CommentIndexProps, CommentIndexState> {
    constructor (props: CommentIndexProps) {
        super(props)
        this.state = {
        }
    };

    deleteComment = async (id: string): Promise<void> => {
        // console.log('delete');
        // console.log(this.props.admin);
        // console.log(`${this.props.admin}`);
        await fetch(`${APIURL}/comments/${id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token,
                'Admin': `${localStorage.admin}`,
            })
        }).then(() => this.props.fetchFavoriteGames())
    }

    mapGamesSort = (): IGameResult[] => {
        return (
            this.props.favoriteGames.sort((a: IGameResult, b: IGameResult) => {
            let nameA: string = a.title.toUpperCase();
            let nameB: string = b.title.toUpperCase();
            // console.log(nameA, nameB);
            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            } else {
                return 0;
            };
        }))
    };

    commentMap = (result: IGameResult,) => {
        console.log(result);
        // console.log(this.props.userId);
        // console.log(this.props.admin);
        // console.log(result.id);
        // console.log(this.props.favoriteGamesComments[index].gameId);
        //game table ID vs comments table gameID
        // if (result.id === this.props.favoriteGamesComments[index].gameId && this.props.favoriteGamesComments[0] !== undefined) {
            if (result.comments.length > 0) {
            return result.comments.map((commentResult: ICommentResult, index: number) => {
                    console.log(index, commentResult);
                    return (
                        <div key={index}>
                            <Typography>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Grid container xs={12} spacing={0}>
                                <Grid item xs={12} sm={8} alignItems='center' justify='flex-start'>
                                <Box display='flex' flexWrap='wrap'><Typography style={{overflowWrap: 'normal'}}>{commentResult.content} </Typography></Box>
                                <Box display='flex' justifyContent='flex-end'><Typography> - {commentResult.user.username}</Typography></Box>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                <Box>{localStorage.id === result.comments[index].userId || localStorage.admin === 'true' ? <div> <Button size="small" color="primary"  onClick={() => {this.props.editComment(commentResult); this.props.handleClickOpenEdit()}}><EditIcon/></Button>
                                <Button size="small" color="secondary" onClick={((e: SyntheticEvent) => this.deleteComment(commentResult.id))}><HighlightOffSharpIcon /></Button>
                                 </div> : null}
                                 </Box>
                                 </Grid>
                            </Grid>
                            </div>
                            </Typography>
                            <CardActionArea>
                            </CardActionArea>
                        </div>
                    );
                })
            } else {
                return null
            }
        }

    render() {
        return(
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Grid container justify='center'>
                    <Grid item xs={12}>
                        <h4>FAVORITE GAMES:</h4>
                    </Grid>
                {this.mapGamesSort().map((result: IGameResult, index: number) => {
                    return (
                        <Grid container xs={12} sm={5} justify='center' spacing={0} max-width='400px'>
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
                                    <Button size="small" color="primary" onClick={() => {this.props.handleAdd(result.id); this.props.handleClickOpenCreate()}}>
                                        Add Comment
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
    }
} 

