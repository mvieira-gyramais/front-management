import MenuLateral from '../components/MenuLateral';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import react from 'react';

export default function Aluno() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/aluno', data);
      alert('Aluno cadastrado com sucesso!');
      reset();
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error.response?.data || error.message);
      alert('Erro ao cadastrar aluno.');
    }
  };

  return (
    <div style={{ marginLeft: '220px', padding: '20px' }}>
      <MenuLateral />
      <h2>Cadastro de Aluno</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome</label>
          <input {...register('nome')} />
        </div>
        <div>
          <label>Email</label>
          <input {...register('email')} />
        </div>
        <div>
          <label>CPF</label>
          <input {...register('cpf')} />
        </div>
        <div>
          <label>Telefone</label>
          <input {...register('telefone')} />
        </div>
        <button variant="contained">Cadastrar Aluno</button>
      </form>
    </div>
  );
}
