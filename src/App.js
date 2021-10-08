import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Layout from './components/Layout';
// import RegisterOnline from './pages/LandingPage/RegisterOnline';
import RegisterOnline2 from './pages/LandingPage/RegisterOnline2';

// import RegisterInfor from './pages/LandingPage/RegisterInfor';
import RegisterInfor2 from './pages/LandingPage/RegisterInfor2';

import LoginPage from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
// import RegisterPartner from './pages/Satsi/RegisterPartner';
import RegisterPartner2 from './pages/Satsi/RegisterPartner2';

// import RegisterProgram from './pages/Satsi/RegisterProgram';
import RegisterProgram2 from './pages/Satsi/RegisterProgram2';

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
            {/* <PrivateRoute
              exact
              path='/so-tuyen-lp'
              component={RegisterOnline}
            /> */}

            <PrivateRoute
              exact
              path='/so-tuyen-lp2'
              component={RegisterOnline2}
            />
            {/* <PrivateRoute exact path='/tu-van-lp' component={RegisterInfor} /> */}
            <PrivateRoute exact path='/tu-van-lp2' component={RegisterInfor2} />

            {/* <PrivateRoute
              exact
              path='/dang-ky-chuong-trinh'
              component={RegisterProgram}
            /> */}
            <PrivateRoute
              exact
              path='/dang-ky-chuong-trinh2'
              component={RegisterProgram2}
            />
            {/* <PrivateRoute exact path='/ctv' component={RegisterPartner} /> */}
            <PrivateRoute exact path='/ctv2' component={RegisterPartner2} />

            <Redirect from='/' to='/login' />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
