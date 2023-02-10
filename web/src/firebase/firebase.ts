import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "./firebase.config";

export default class Firebase {
  protected app: FirebaseApp;
  protected auth: Auth;
  protected googleProvider: GoogleAuthProvider;

  constructor() {
    this.app = initializeApp(firebaseConfig);

    this.auth = getAuth(this.app);
    this.googleProvider = new GoogleAuthProvider();

    this.googleProvider.addScope(
      "https://www.googleapis.com/auth/contacts.readonly"
    );
  }
}
