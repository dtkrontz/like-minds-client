import React from 'react';
import Navigation from '../Navigation/Navigation';
import GameOfTheWeek from '../GameOfTheWeek/GameofTheWeek';

type ProfileProps = {
    token: string,
    userId: string,
    admin: boolean,
    clearToken: () => void,
}

type ProfileState = {
    
}

export default class Profile extends React.Component<ProfileProps, ProfileState> {
    constructor (props: ProfileProps) {
        super(props)
        this.state = {
        }
    };

    render() {
        return(
            <div>
                <Navigation token={this.props.token} userId={this.props.userId} admin={this.props.admin} clearToken={this.props.clearToken} />
                <GameOfTheWeek />
            </div>
        )
    }
} 