import React, { useState, useCallback, memo } from 'react';

const MuestraNumero = memo(({ numero, incrementar, textBoton }) => {
  console.log(`Dibujando el componente ${textBoton}`);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-gray-800">{textBoton}</h3>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 mb-4">
          {numero}
        </div>
        <button
          onClick={incrementar}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 font-semibold"
        >
          {textBoton}
        </button>
      </div>
    </div>
  );
});

const ContadorOptimizado = () => {
  const [numero1, setNumero1] = useState(0);
  const [numero2, setNumero2] = useState(0);
  const [numero3, setNumero3] = useState(0);
  const [contadorAdicional, setContadorAdicional] = useState(0);

  const incrementar1 = useCallback(() => {
    setNumero1(n => n + 1);
  }, []);

  const incrementar2 = useCallback(() => {
    setNumero2(n => n + 2);
  }, []);

  const incrementar3 = useCallback(() => {
    setNumero3(n => n + 3);
  }, []);

  const incrementarAdicional = () => {
    setContadorAdicional(n => n + 1);
  };

  const reiniciarContadores = useCallback(() => {
    setNumero1(0);
    setNumero2(0);
    setNumero3(0);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Contadores Optimizados
      </h1>
      
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={incrementarAdicional}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
        >
          Contador Adicional: {contadorAdicional}
        </button>
        <button
          onClick={reiniciarContadores}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
        >
          Reiniciar Todo
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <MuestraNumero
          numero={numero1}
          incrementar={incrementar1}
          textBoton="Sumar 1"
        />
        <MuestraNumero
          numero={numero2}
          incrementar={incrementar2}
          textBoton="Sumar 2"
        />
        <MuestraNumero
          numero={numero3}
          incrementar={incrementar3}
          textBoton="Sumar 3"
        />
      </div>
    </div>
  );
};

export default ContadorOptimizado;