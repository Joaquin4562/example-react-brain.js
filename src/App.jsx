// libreria usada : https://github.com/BrainJS/brain.js

import React, { useEffect, useState } from "react";
import palmera from "./assets/palmera.png";

import brain from "brain.js/src";

export const App = () => {
  const config = {
    hiddenLayers: [3],
  };
  const net = new brain.NeuralNetwork(config);
  const [trainData, setTrainData] = useState([]);
  const [q1, setQ1] = useState("0");
  const [q2, setQ2] = useState("0");
  const [q3, setQ3] = useState("0");
  const [q4, setQ4] = useState("0");
  const [isVacaciones, setIsVacaciones] = useState(true);

  useEffect(() => {
    setTrainData([
      { input: ["1", "1", "1", "1"], output: [0] },
      { input: ["0", "0", "0", "0"], output: [1] },
    ]);
  }, []);

  const q1SelectChange = (event) => setQ1(event.target.value);
  const q2SelectChange = (event) => setQ2(event.target.value);
  const q3SelectChange = (event) => setQ3(event.target.value);
  const q4SelectChange = (event) => setQ4(event.target.value);

  const onSubmit = () => {
    console.log(trainData);
    net.train(trainData);
    const result = net.run([q1, q2, q3, q4]);
    trainData.push({ input: [q1, q2, q3, q4], output: [Math.round(result)] });
    if (Math.round(result) > 0) {
      setIsVacaciones(true);
    } else {
      setIsVacaciones(false);
    }
  };
  return (
    <div className="container-fluid h-100">
      {isVacaciones ? (
        <div className="vacaciones-container">
          <div className="sol"></div>
          <div className="agua"></div>
          <img src={palmera} alt="palmera" className="palmera"></img>
          <div className="vacaciones">Vacaciones</div>
        </div>
      ) : (
        <div className="vacaciones-container">
          <div className="luna"></div>
          <div className="agua-noche"></div>
          <img src={palmera} alt="palmera" className="palmera-noche"></img>
          <div className="vacaciones">Sin vacaciones</div>
        </div>
      )}
      <h1 className="title">Sistema experto</h1>
      <h2 className="sub-title">Desicion para salir de vacaciones</h2>
      <form className="row">
        <div className="form-group col-6">
          <label className="form-label">¿Tengo dinero?</label>
          <select className="form-select" value={q1} onChange={q1SelectChange}>
            <option value="0">Si</option>
            <option value="1">No</option>
          </select>
        </div>
        <div className="form-group col-6">
          <label className="form-label">¿Tengo tiempo?</label>
          <select className="form-select" value={q2} onChange={q2SelectChange}>
            <option value="0">Si</option>
            <option value="1">No</option>
          </select>
        </div>
        <div className="form-group col-6">
          <label className="form-label">¿Quiero ir?</label>
          <select className="form-select" value={q3} onChange={q3SelectChange}>
            <option value="0">Si</option>
            <option value="1">No</option>
          </select>
        </div>
        <div className="form-group col-6">
          <label className="form-label">¿Esta bueno el clima?</label>
          <select className="form-select" value={q4} onChange={q4SelectChange}>
            <option value="0">Si</option>
            <option value="1">No</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={onSubmit}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
