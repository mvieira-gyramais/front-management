import React, { useState } from 'react';

export default function Curso() {
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nome, codigo });
    alert('Curso cadastrado com sucesso!');
  };

  return (
    <div>
      <h1>Cadastro de Curso</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do curso:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          <label>Código do curso:</label>
          <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
        </div>
        <button variant="contained">Cadastrar Curso</button>
      </form>
    </div>
  );
}
