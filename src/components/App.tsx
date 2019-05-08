import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Landing from './landing';
import AdminDashboard from './admin/dashboard';
import Login from './login';
import NoMatch from './no-match';

const httpLink = createHttpLink({
    uri: `/graphql`
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#43cfff'
        },
        secondary: {
            main: '#ff7243'
        }
    }
});

const App = () => {
    return (
        <Router>
            <ApolloProvider client={client}>
                <MuiThemeProvider theme={theme}>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/admin" component={AdminDashboard} />
                        <Route path="/:role(admin|teacher|student)/login" component={Login} />
                        <Route component={NoMatch} />
                    </Switch>
                </MuiThemeProvider>
            </ApolloProvider>
        </Router>
    )
};

export default App;
