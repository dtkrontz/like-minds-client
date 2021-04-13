import React from 'react';
import './Navigation.css';
import {
    Route,
    Link,
    Switch,
    Redirect,
} from 'react-router-dom';
import {
    BrowserRouter as Router,
  } from 'react-router-dom';
import GamesIndex from '../Profile/MyGames/GameIndex';
import CommentsIndex from '../Profile/Comments/CommentIndex';
import Button from '@material-ui/core/Button';

type NavigationProps = {
    token: string,
    userId: string,
    admin: boolean,
    clearToken: () => void,
}

type NavigationState = {
}

export default class Navigation extends React.Component<NavigationProps, NavigationState> {
    constructor (props: NavigationProps) {
        super(props)
        this.state = {
        }
    };

    render() {
        return(
            <div>
                <Router>
                <div className='navbar' >
                    <ul className='navbar'>
                        {/* <li><Link to='/profiledisplay'>Profile Display</Link></li> */}
                        <Button><Link to='/gamesindex' className='navbarButton'>Your Saved Games</Link></Button>
                        <Button><Link to='/commentsindex' className='navbarButton'>Favorite Games</Link></Button>
                        <Button onClick={this.props.clearToken}><Link to='/auth' onClick={this.props.clearToken} className='navbarButton'>Logout</Link></Button>
                    </ul>
                </div>
                <div>
                    <Switch>
                        {/* <Route exact path='/profiledisplay'><Profile token={this.props.token} userId={this.props.userId} admin={this.props.admin} fetchGames={this.props.fetchGames} /></Route> */}
                        <Route exact path='/auth'>
                            {localStorage.token ? <Redirect to='/gamesindex' /> : null}
                            <GamesIndex token={this.props.token} userId={this.props.userId} admin={this.props.admin} />
                        </Route>
                        <Route exact path='/gamesindex'>
                            <GamesIndex token={this.props.token} userId={this.props.userId} admin={this.props.admin} />
                        </Route>
                        <Route exact path='/commentsindex'><CommentsIndex token={this.props.token} userId={this.props.userId} admin={this.props.admin} /></Route>
                    </Switch>
                </div>
                </Router>
            </div>
        )
    }
}