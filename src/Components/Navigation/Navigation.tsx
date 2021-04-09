import React from 'react';
import {
    Route,
    Link,
    Switch,
} from 'react-router-dom';
import {
    BrowserRouter as Router,
  } from 'react-router-dom';
import GamesIndex from '../Profile/MyGames/GameIndex';
import Profile from '../Profile/ProfileDisplay';
import CommentsIndex from '../Profile/Comments/CommentIndex';

type NavigationProps = {
    token: string,
    userId: string,
    admin: boolean,
}

type NavigationState = {
    
}

export default class Navigation extends React.Component<NavigationProps, NavigationState> {
    constructor (props: any) {
        super(props)
        this.state = {
            
        }
    };

    render() {
        return(
            <div>
                <Router>
                <div>
                    <ul>
                        <li><Link to='/profiledisplay'>Profile Display</Link></li>
                        <li><Link to='/gamesindex'>Games Index</Link></li>
                        <li><Link to='/commentsindex'>Comments Index</Link></li>
                    </ul>
                </div>
                <div>
                    <Switch>
                        <Route exact path='/profiledisplay'><Profile token={this.props.token} userId={this.props.userId} admin={this.props.admin} /></Route>
                        <Route exact path='/gamesindex'><GamesIndex token={this.props.token} userId={this.props.userId} admin={this.props.admin} /></Route>
                        <Route exact path='/commentsindex'><CommentsIndex token={this.props.token} userId={this.props.userId} admin={this.props.admin} /></Route>
                    </Switch>
                </div>
                </Router>
            </div>
        )
    }
}