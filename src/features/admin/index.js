import React from 'react';
import {PrivateRoute} from "../../components/PrivateRoute";
import RegisterOnline2 from "./pages/LandingPage/RegisterOnline2";
import RegisterInfor2 from "./pages/LandingPage/RegisterInfor2";
import RegisterProgram2 from "./pages/Satsi/RegisterProgram2";
import RegisterPartner2 from "./pages/Satsi/RegisterPartner2";
import NotFound from "../../components/NotFound"
import {useRouteMatch} from "react-router";
import {Route, Switch} from "react-router-dom";
import Layout from "../../components/Layout"

export default function AdminPage() {
    let {path} = useRouteMatch()
    return (
        // <Layout>
        <React.Fragment>
           <Layout>
               <Switch>
                   <Route
                       exact
                       path={path+"/so-tuyen-lp2"}
                       component={RegisterOnline2}
                   />
                   <Route exact path={path + '/tu-van-lp2'} component={RegisterInfor2}/>

                   <Route
                       exact
                       path={path + '/dang-ky-chuong-trinh2'}
                       component={RegisterProgram2}
                   />
                   <Route exact path={path + '/ctv2'} component={RegisterPartner2}/>
                   <Route path="*" component={NotFound}/>
               </Switch>
           </Layout>
        </React.Fragment>
        // </Layout>

    )
}
