import React from 'react';
import MenuLateral from '../components/MenuLateral';

export default function Home() {
  return (
    <div style={{ display: 'flex' }}>
      <MenuLateral />
      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <h1>SISTEMA DE GESTÃO</h1>
        <p>Selecione uma opção no menu lateral</p>
      </div>
    </div>
  );
}
