import { login } from './utils';
import './index.css';
import { useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isRequesting, setIsRequesting] = useState(false)

  const handleSubmit = () => {
    setError(null)
    setIsRequesting(true)

    login({ email, password })
      .then(() => {
        alert("Login successful")
        setEmail("")
        setPassword("")
      })
      .catch((err) => setError(err))
      .finally(() => setIsRequesting(false))
  }

  const validsFields = () => {
    if (email.length === 0 || password.length < 6 || isRequesting) {
      return true
    }
    return false
  }

  return (
    <div className='wrapper'>
      <form className='login-form'>
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {error && <div className='errorMessage'>{error.message}</div>}
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input required={true} id={'email'} type={'email'} autoComplete='off' value={email} onChange={({ target }) => setEmail(target.value)} />
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input required id={'password'} type={'password'} value={password} onChange={({ target }) => setPassword(target.value)} />
        </div>

        <div className='button'>
          <button onClick={handleSubmit} disabled={validsFields()}>Login</button>
        </div>
      </form>
    </div>
  );
}
