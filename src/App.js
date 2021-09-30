import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Layout from './components/Layout';
import RegisterOnline from './pages/LandingPage/RegisterOnline';
import RegisterInfor from './pages/LandingPage/RegisterInfor';
import LoginPage from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
import RegisterPartner from './pages/Satsi/RegisterPartner';
import RegisterProgram from './pages/Satsi/RegisterProgram';


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
        <Layout>
          <Switch>
            <Route path='/login' component={LoginPage} />
            <PrivateRoute
              exact
              path='/so-tuyen-lp'
              component={RegisterOnline}
            />
            <PrivateRoute exact path='/tu-van-lp' component={RegisterInfor} />
            <PrivateRoute
              exact
              path='/dang-ky-chuong-trinh'
              component={RegisterProgram}
            />
            <PrivateRoute exact path='/ctv' component={RegisterPartner} />
            <Redirect from='/' to='/login' />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
