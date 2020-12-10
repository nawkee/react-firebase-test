import './App.css';
import Signup from "./components/Signup";
import {AuthProvider} from "./context/authContext";

function App() {
  return (
      <AuthProvider>
        <div className={"App d-flex-center"}>
          <Signup />
        </div>
      </AuthProvider>
  );
}

export default App;
