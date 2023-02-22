import {
  buttonSignUpWithLocal,
  inputFelidPasswordSignUpWithLocal,
  inputFelidUsernameSignUpWithLocal,
} from "./dom.js";
import { authentication } from "./authentication.js";

const events = (() => {
  const handleSignInClick = (e) => {
    e.preventDefault();
    console.log(`[events] => starting click event Sign In`);
    const loginData = {
      username: inputFelidUsernameSignUpWithLocal.value,
      password: inputFelidPasswordSignUpWithLocal.value,
    };
    console.log(`[events] => handleSignInClick => loginData:`, loginData);
    authentication.signIn(loginData);
  };
  return {
    handleSignInClick,
  };
})();

// buttonSignUpWithLocal.addEventListener("click", (e) =>
//   events.handleSignInClick(e)
// );
