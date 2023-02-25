import {
  buttonChangeFormRegister,
  buttonChangeFormSignIn,
  buttonSignUpWithLocal,
  formRegister,
  formSignIn,
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

  const handleChangeFormClick = (event, form) => {
    event.preventDefault ();
    if (form === true) {
      formSignIn.classList.remove('show-form')
      formSignIn.classList.add('display-form')
      formRegister.classList.remove('display-form')
      formRegister.classList.add('show-form')

    } else {
      formSignIn.classList.add('show-form')
      formSignIn.classList.remove('display-form')
      formRegister.classList.remove('show-form')
      formRegister.classList.add('display-form')
    }
  }


  return {
    handleSignInClick,
    handleChangeFormClick
  };
})();

// buttonSignUpWithLocal.addEventListener("click", (e) =>
//   events.handleSignInClick(e)
// );

buttonChangeFormSignIn.addEventListener("click", (e) => events.handleChangeFormClick(e, false))
buttonChangeFormRegister.addEventListener("click", (e) => events.handleChangeFormClick(e, true))