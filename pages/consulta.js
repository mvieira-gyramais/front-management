import React, { useState, useEffect } from 'react';

export default function Consulta() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const dadosCadastrados = [
      { id: 1, nome: 'João', email: 'joao@gmail.com', tipo: 'Aluno' },
      { id: 2, nome: 'Maria', email: 'maria@gmail.com', tipo: 'Professor' },
      { id: 3, nome: 'Matemática', codigo: 'M123', tipo: 'Curso' },
    ];

    setDados(dadosCadastrados);
  }, []);

  return (
    <div>
      <h1>Consulta de Dados Cadastrados</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nome/Curso</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email/Código</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((dado) => (
            <tr key={dado.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{dado.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{dado.nome}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{dado.email || dado.codigo}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{dado.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
