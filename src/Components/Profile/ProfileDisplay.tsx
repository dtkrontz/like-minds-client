import React from 'react';
import GameIndex from './MyGames/GameIndex';
import CommentIndex from './Comments/CommentIndex';
import GameOfTheWeek from '../GameOfTheWeek/GameofTheWeek';

export default class ProfileDisplay extends React.Component {
    constructor (props: any) {
        super(props)
    };

    render() {
        return(
            <div>
                <p>Profile Display - Test</p>
                <GameOfTheWeek />
            </div>
        )
    }
} 