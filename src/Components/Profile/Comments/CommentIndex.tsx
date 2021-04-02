import React from 'react';
import CommentCreate from './CommentCreate';
import CommentTable from './CommentsTable';
import CommentEdit from './CommentEdit';

export default class GamesIndex extends React.Component {
    constructor (props: any) {
        super(props)
    };

    thing: Boolean = false;

    render() {
        return(
            <div>
                <p>Comment Index - Test</p>
                <CommentCreate />
                <CommentTable />
                {this.thing ? <CommentEdit /> : <></>}
            </div>
        )
    }
} 