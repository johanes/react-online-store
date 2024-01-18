import { useState, useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { auth, upsertAuthUser } from "../../utils/firebase/firebase.utils";
import {
  signInWithGoogleRedirect,
  signAuthUserInWithEmailAndPassowrd,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

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

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { user } = await signAuthUserInWithEmailAndPassowrd(
        email,
        password
      );
      resetFormFields();
      console.log({ user });
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-credential"){
        alert("Email e/ou Senha errados.")
      }
    }
  }

  // const logGoogleUserPopup = async () => {
  //   const { user } = await signInWithGooglePopup();
  //   upsertAuthUser(user);
  // };

  const logGoogleUserRedirect = async () => {
    signInWithGoogleRedirect();
  };
  const resetFormFields = () => setFormFields(defaultFormFields);
  return (
    <div className="sign-up-container">
      <h2>Ja tem uma conta?</h2>
      <span>Entre com e-mail</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          value={email}
          name="email"
          onChange={onChangeHandler}
        />
        <FormInput
          label="Senha"
          type="password"
          required
          value={password}
          name="password"
          onChange={onChangeHandler}
        />
        <div className="buttons-container">
          <Button type="submit">Login</Button>
          <Button type="button" onClick={logGoogleUserRedirect} buttonType="google">
            Login Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
