import { OAuthCredential } from "firebase/auth";
import "./App.css";
import firebaseAuthInstance from "./firebase/firebaseAuth";
import logo from "./logo.svg";

function App() {
  const auth = firebaseAuthInstance;
  const handleSignInGoogle = () => {
    auth.signInWithPopup().then((result) => {
      if (result) {
        const token = (result.credential as OAuthCredential).idToken;
        fetch("http://localhost:3001/auth/google", {
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          }),
        })
          .then((token) => token.json())
          .then((token) => {
            console.log(token);
          });
      }
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p onClick={handleSignInGoogle} className="App-link">
          Sign With Google
        </p>
      </header>
    </div>
  );
}

export default App;
