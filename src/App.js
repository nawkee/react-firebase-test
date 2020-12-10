import './App.css';
import Signup from "./components/Signup";
import {AuthProvider} from "./context/authContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Timer from "./components/Timer";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (

        <div className={"App d-flex-center"}>
            <Router>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute exact path={"/"} component={Timer}/>
                        <Route path={"/signup"} component={Signup} />
                        <Route path={"/login"} component={Login} />
                    </Switch>
                </AuthProvider>
            </Router>
        </div>

  );
}

export default App;
