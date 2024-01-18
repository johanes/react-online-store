import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassowrd,
  upsertAuthUser,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.log("passwords dont match!");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassowrd(
        email,
        password
      );
      if (user) {
        user.displayName = displayName;
        upsertAuthUser(user);
        resetFormFields();
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Este email ja esta cadastrado.");
      }
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Não tem uma conta?</h2>
      <span>Registre-se com seu e-mail</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Nome"
          type="text"
          required
          value={displayName}
          name="displayName"
          onChange={onChangeHandler}
        />
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
          minLength={6}
        />
        <FormInput
          label="Confirme sua senha"
          type="password"
          required
          value={confirmPassword}
          name="confirmPassword"
          onChange={onChangeHandler}
          minLength={6}
        />

        <Button type="submit">Registrar</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
