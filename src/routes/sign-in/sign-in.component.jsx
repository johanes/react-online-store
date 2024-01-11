import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  upsertAuthUser,
} from "../../utils/firebase.utils";
import "./sign-in.styles.scss";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

  try {
    useEffect(() => {
      async function fetchData() {
        const response = await getRedirectResult(auth);
        if (response) {
          upsertAuthUser(response.user);
        }
      }
      fetchData();
    }, []);
  } catch(error){
    console.log(error);
  }
  
  const logGoogleUserPopup = async () => {
    const { user } = await signInWithGooglePopup();
    upsertAuthUser(user);
  };

  const logGoogleUserRedirect = async () => {
    signInWithGoogleRedirect();
  };

  return (
    <div>
      <h1>Sign-in Page</h1>
      {/* <button onClick={logGoogleUserPopup}>Sign in with Google Popup</button> */}
      <button onClick={logGoogleUserRedirect}>
        Sign in with Google
      </button>
      <SignUpForm/>
    </div>
  );
};

export default SignIn;
