import { useDispatch, useSelector } from 'react-redux';
import { startLoginWithEmailPassword, startGoogleSignIn } from './store/auth/thunks';
import { useState } from 'react';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(state => state.auth);

  const [formState, setFormState] = useState({
    email: 'test@test.com',
    password: 'password123'
  });

  const { email, password } = formState;

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  const isAuthenticating = status === 'checking';

  return (
    <div>
      <h3>Iniciar Sesión</h3>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="correo@google.com"
          name="email"
          value={email}
          onChange={onInputChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          value={password}
          onChange={onInputChange}
          style={{ marginRight: '10px' }}
        />
        {
          !!errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>
        }
        <div style={{ marginTop: '10px' }}>
          <button type="submit" disabled={isAuthenticating}>
            Login
          </button>
          <button type="button" onClick={onGoogleSignIn} disabled={isAuthenticating} style={{ marginLeft: '10px' }}>
            Google
          </button>
        </div>
      </form>
    </div>
  );
};

