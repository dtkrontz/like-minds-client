import React from 'react';

interface CommentIndexProps {
    token: string,
    fetchFavoriteGames: any,
    favoriteGames: []
    fetchComments: any
}

interface CommentIndexState {
    favoriteGames: []
}

export default class CommentTable extends React.Component<CommentIndexProps, CommentIndexState> {
    constructor (props: any) {
        super(props)
    };

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
    }

    // commentMap = () => {
    //     if ('gameID' === 'gametableId') {
                // this.props.fetchComments.map((result: any, index: any) => {
                //     return (
                //         <div>{result.content}</div>
                //     )
                // })
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
                            <h2>{result.title}</h2>
                            <h4>{result.id}</h4>
                            <p>Genre: {result.genre}</p>
                            <p>System: {result.system}</p>
                            <p>{result.description}</p>
                            <p>Comments: </p>
                            <button>Delete comment</button>
                            <button>Edit comment - open modal with fields - dialog box</button>
                            <hr />
                        </div>
                    )
                })}
                <p>Comments mapper</p>
            </div>
        )
    }
} 