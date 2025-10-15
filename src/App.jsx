import { useSelector, useDispatch } from 'react-redux';
import { LoginPage } from './LoginPage';
import { startLogout } from './store/auth/thunks';

export const App = () => {
  const { status, displayName } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };

  if (status === 'checking') {
    return <h3>Verificando...</h3>
  }
  
  return (
    <div>
      <h1>Challenge 11</h1>
      <hr />
      {
        (status === 'authenticated')
          ? (
            <div>
              <h3>Bienvenido, {displayName}</h3>
              <button onClick={onLogout}>
                Cerrar Sesión
              </button>
            </div>
          )
          : <LoginPage />
      }
    </div>
  );
};

