import React, { useState } from 'react';

export default function Professor() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    disciplina: ''
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/professor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensagem('Professor cadastrado com sucesso!');
        setFormData({ nome: '', email: '', cpf: '', telefone: '', disciplina: '' });
      } else {
        setMensagem('Erro ao cadastrar professor. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div>
      <h1>Cadastro de Professor</h1>
      {mensagem && <p>{mensagem}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>CPF:</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />
        </div>
        <div>
          <label>Telefone:</label>
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} required />
        </div>
        <div>
          <label>Disciplina:</label>
          <input type="text" name="disciplina" value={formData.disciplina} onChange={handleChange} required />
        </div>
        <button variant="contained">Cadastrar Professor</button>
      </form>
    </div>
  );
}
