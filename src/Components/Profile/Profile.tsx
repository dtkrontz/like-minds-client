import React from 'react';
import ProfileDisplay from './ProfileDisplay';
import Navigation from '../Navigation/Navigation';
import GameOfTheWeek from '../GameOfTheWeek/GameofTheWeek';


export default class Profile extends React.Component {
    constructor (props: any) {
        super(props)
    };

    render() {
        return(
            <div>
                <p>Profile - Test</p>
                <GameOfTheWeek />
                {/* <ProfileDisplay /> */}
                <Navigation />
            </div>
        )
    }
} 