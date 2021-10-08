import React from 'react';
import Satsi from "./pages/Satsi";
import Hangkhong from "./pages/Hangkhong";

import NotFound from "../../components/NotFound"
import {useRouteMatch} from "react-router";
import {Route, Switch} from "react-router-dom";
import UserLayout from "../../components/UserLayout"

export default function UserPage() {
    let {path} = useRouteMatch()
    return (
        <React.Fragment>
            <UserLayout>
                <Switch>
                    <Route
                        exact
                        path={path+"/satsi"}
                        component={Satsi}
                    />
                    <Route exact path={path + '/hang-khong'} component={Hangkhong}/>


                    <Route path="*" component={NotFound}/>
                </Switch>
            </UserLayout>
        </React.Fragment>

    )
}
