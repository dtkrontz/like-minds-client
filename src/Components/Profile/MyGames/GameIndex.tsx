import React from 'react';
import GameCreate from './GameCreate';
import GameTable from './GameTable';
import GameEdit from './GameEdit';

export default class GamesIndex extends React.Component {
    constructor (props: any) {
        super(props)
    };

    thing: Boolean = false;

    render() {
        return(
            <div>
                <p>Games Index - Test</p>
                <GameCreate />
                <GameTable />
                {this.thing ? <GameEdit /> : <></>}
            </div>
        )
    }
} 