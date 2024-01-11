import { useState } from "react"

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {


  const [formFields, setFormFields] = useState(defaultFormFields);
  const {displayName, email, password, confirmPassword} = formFields;

  console.log(formFields);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  }


  return (
    <div>
      <h1>Cadastre-se com seu email</h1>
      <form onSubmit={ () => {}}>
      <label>Nome</label>
      <input type="text" required value={displayName} name="displayName" onChange={handleChange}/>
      
      <label>Email</label>
      <input type="email" required value={email} name="email" onChange={handleChange}/>
      
      <label>Senha</label>
      <input type="password" required value={password} name="password" onChange={handleChange}/>
      
      <label>Confirme sua senha</label>
      <input type="password" required value={confirmPassword} name="confirmPassword" onChange={handleChange}/>

      <button type="submit">Salvar</button>
      </form>
    </div>
  )
}

export default SignUpForm;