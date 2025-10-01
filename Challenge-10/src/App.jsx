import { Cajero } from './challenge9/Cajero';
import { Contador } from './challenge10/Contador';
import { Pila } from './challenge10/Pila';

export const App = () => {
  return (
    <>
      <h1>Challenge 9: Fila del Cajero</h1>
      <Cajero />
      <hr />
      <h1>Challenge 10: Redux</h1>
      <Contador />
      <hr />
      <Pila />
    </>
  );
};