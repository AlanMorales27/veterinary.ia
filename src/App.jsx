import React, { useEffect, useState } from 'react';

const App = () => {
  const [net, setNet] = useState(null);
  
  useEffect(() => {
    // Cargar brain.js desde CDN
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/brain.js';
    script.async = true;
    script.onload = () => initNetwork();
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initNetwork = () => {
    if (window.brain) {
      const network = new window.brain.NeuralNetwork();
      network.train([
        { input: [0, 0], output: [0] },
        { input: [0, 1], output: [1] },
        { input: [1, 0], output: [1] },
        { input: [1, 1], output: [0] }
      ]);
      setNet(network);
    }
  };

  const predict = () => {
    if (net) {
      const result = net.run([1, 0]);
      alert(`Predicción: ${result[0].toFixed(4)}`);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={predict}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={!net}
      >
        Hacer predicción
      </button>
    </div>
  );
};

export default App;