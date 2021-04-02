import React from 'react';
import ProfileDisplay from './ProfileDisplay';

export default class Profile extends React.Component {
    constructor (props: any) {
        super(props)
    };

    thing: Boolean = false;

    render() {
        return(
            <div>
                <p>Profile - Test</p>
                <ProfileDisplay />
            </div>
        )
    }
} 