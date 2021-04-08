import React from 'react';

interface CommentIndexProps {
    token: string,
    fetchFavoriteGames: any,
    favoriteGames: [],
    // fetchComments: any,
    handleEdit: any,
    handleAdd: any,
    editComment: any
}

interface CommentIndexState {
    favoriteGames: []
}

export default class CommentTable extends React.Component<CommentIndexProps, CommentIndexState> {
    constructor (props: any) {
        super(props)
    };

    deleteComment = async (id: number) => {
        console.log('delete');
        await fetch(`http://localhost:4000/comments/${id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
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

    commentMap = (result: any,) => {
        console.log(result);
        // console.log(result.id);
        // console.log(this.props.favoriteGamesComments[index].gameId);
        //game table ID vs comments table gameID
        // if (result.id === this.props.favoriteGamesComments[index].gameId && this.props.favoriteGamesComments[0] !== undefined) {
            if (result.comments.length > 0) {
            return result.comments.map((commentResult: any, index: any) => {
                    console.log(index, commentResult);
                    return (
                        <div key={index}>
                            <ul>
                            <li>{commentResult.content} - {commentResult.user.username}</li>
                            </ul>
                            <button onClick={((e: any) => this.deleteComment(commentResult.id))}>Delete comment</button>
                            <button  onClick={() => {this.props.editComment(commentResult); this.props.handleEdit()}}>Edit comment - open modal with fields - dialog box</button>
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
                <p>Comment Table - Test</p>
                {this.mapGamesSort().map((result: any, index: any) => {
                    return (
                        <div key={index}>
                            <img src={result.image_url} alt='server img' style={{height: '150px'}} />
                            <h2>{result.title}: <br/> {result.user.username}'s Favorite Game!</h2>
                            <h4>{result.id}</h4>
                            <p>Genre: {result.genre}</p>
                            <p>System: {result.system}</p>
                            <p>{result.description}</p>
                            <p>Comments: {this.commentMap(result)}</p>
                            <button onClick={this.props.handleAdd}>Add comment - open modal with fields - dialog box</button>
                            <hr />
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