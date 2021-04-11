let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4000';
        break;
    case 'dk-like-minds-client.herokuapp.com':
        APIURL = 'https://dk-like-minds-client.herokuapp.com'
};

export default APIURL;