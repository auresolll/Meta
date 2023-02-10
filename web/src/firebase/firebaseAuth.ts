import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import Firebase from "./firebase";

class FirebaseAuth extends Firebase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  public signInWithPopup = () => {
    return signInWithPopup(this.auth, this.googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        return {
          credential,
          token,
          user,
        };
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error({
          errorCode,
          errorMessage,
          email,
          credential,
        });
      });
  };

  public signOut = () => {
    signOut(this.auth);
  };

  public onAuthStateChanged = () => {
    return new Promise(
      (resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
        onAuthStateChanged(this.auth, (user: User | null) => {
          if (user) {
            resolve(user);
          } else {
            reject(new Error("Auth State Changed failed"));
          }
        });
      }
    );
  };
}
const firebaseAuthInstance = new FirebaseAuth();
export default firebaseAuthInstance;
