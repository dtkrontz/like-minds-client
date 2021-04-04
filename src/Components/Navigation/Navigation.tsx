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
import Profile from '../Profile/Profile';
import CommentsIndex from '../Profile/Comments/CommentIndex';

export default class Navigation extends React.Component {
    constructor (props: any) {
        super(props)
    };

    render() {
        return(
            <div>
                <Router>
                <div>
                    <ul>
                        <li><Link to='/'>Profile</Link></li>
                        <li><Link to='/gamesindex'>Games Index</Link></li>
                        <li><Link to='/commentsindex'>Comments Index</Link></li>
                    </ul>
                </div>
                <div>
                    <Switch>
                        <Route exact path='/profile'><Profile /></Route>
                        <Route exact path='/gamesindex'><GamesIndex /></Route>
                        <Route exact path='/commentsindex'><CommentsIndex /></Route>
                    </Switch>
                </div>
                </Router>
            </div>
        )
    }
}