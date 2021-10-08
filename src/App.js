import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from 'react-router-dom';
import {PrivateRoute} from './components/PrivateRoute';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';

import LoginPage from './components/Login';
import AdminPage from './features/admin';
import UserPage from './features/user';
import NotFound from "./components/NotFound";


const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#8c9dfa',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path='/login' component={LoginPage}/>
                    <PrivateRoute path='/admin' component={AdminPage}/>
                    <PrivateRoute path='/cong-tac-vien' component={UserPage}/>
                    <Route path="*" component={NotFound}/>
                    <Redirect from="/" to="/login"/>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
