import React from 'react';
import GameIndex from './MyGames/GameIndex';
import CommentIndex from './Comments/CommentIndex';

export default class ProfileDisplay extends React.Component {
    constructor (props: any) {
        super(props)
    };

    thing: Boolean = false;

    render() {
        return(
            <div>
                <p>Profile Display - Test</p>
                {this.thing ? <GameIndex /> : <CommentIndex />}
            </div>
        )
    }
} 