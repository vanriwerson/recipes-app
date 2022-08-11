import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { User, Key, SignIn } from 'phosphor-react';
import validEmail from '../helpers/regexEmail';
import RecipesContext from '../context/RecipesContext';
import {
  setProfileInLocalStorage,
  setTokenInLocalStorage,
} from '../services/localStorage';
import LoginScreenAnimation from '../animations/LoginScreenAnimation';

function Login() {
  const { email, setEmail } = useContext(RecipesContext);
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => { // utilizado para validar o email
    const minCaracter = 6;
    const isValidInputs = password.length > minCaracter && validEmail(email);
    setIsButtonDisabled(!isValidInputs);
  }, [email, password]);

  const handleClick = () => {
    setProfileInLocalStorage({ email });
    setTokenInLocalStorage('mealsToken');
    setTokenInLocalStorage('cocktailsToken');
    history.push('/foods');
  };

  return (
    <div className="login-container">
      <div className="login-animation">
        <LoginScreenAnimation />
      </div>
      <form>
        <div>
          <input
            placeholder="Email"
            type="email"
            data-testid="email-input"
            onChange={ (e) => setEmail(e.target.value) }
            value={ email }
          />
          <span>
            <User size={ 24 } weight="duotone" />
          </span>
        </div>
        <div>
          <input
            placeholder="Senha"
            type="password"
            data-testid="password-input"
            onChange={ (e) => setPassword(e.target.value) }
            value={ password }
          />
          <span>
            <Key size={ 24 } weight="duotone" />
          </span>
        </div>

        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleClick }
          disabled={ isButtonDisabled }
        >
          <SignIn size={ 25 } weight="duotone" />
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
