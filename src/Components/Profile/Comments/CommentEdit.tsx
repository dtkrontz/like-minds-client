import React from 'react';

interface CommentEditProps {
    token: string,
    fetchComments: any,
    handleEditCancel: any,
    commentToUpdate: any,
};

interface CommentEditState {
    content: string
}

export default class CommentEdit extends React.Component<CommentEditProps, CommentEditState> {
    constructor (props: any) {
        super(props)
        this.state = {
            content: this.props.commentToUpdate.content,
        }
    };

    componentDidMount() {
        console.log('this.props.commentToUpdate');
        console.log(this.props.commentToUpdate);
    };

    componentWillUnmount() {
        console.log('I unmounted')
    }

    updateInput = (e: any) => {
        console.log(typeof(e));
        this.setState({
            content: e.target.value
        })
    };

    updateComment = () => {
        fetch(`http://localhost:4000/comments/${this.props.commentToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                comment: {
                    content: this.state.content
                }
            }),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
    }

    render() {
        return(
            <div>
                <p>Comment Edit - Test</p>
                <label>Comment: <input type='text' value={this.state.content} onChange={this.updateInput} /></label>
                <button onClick={(() => this.updateComment())}>Submit</button>
                <button onClick={this.props.handleEditCancel()}>Cancel</button>
            </div>
        )
    }
} 