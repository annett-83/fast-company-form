import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import Edit from "./components/ui/edit";
import UserPage from "./components/page/userPage";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?/edit" component={Edit} />
                <Route path="/edit" element={UserPage} />
                <Route path="/users/:userId?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
