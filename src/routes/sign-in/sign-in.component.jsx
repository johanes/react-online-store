import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  upsertAuthUser,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";

import "./sign-in.styles.scss";

const SignIn = () => {
  try {
    useEffect(() => {
      async function handleRedirect() {
        const response = await getRedirectResult(auth);
        if (response) {
          upsertAuthUser(response.user);
        }
      }
      handleRedirect();
    }, []);
  } catch (error) {
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
      <Button type="submit" buttonType="google" onClick={logGoogleUserRedirect}>
        Sign in with Google
      </Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
