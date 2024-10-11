import Link from 'next/link';

export default function MenuLateral() {
  return (
    <div style={{ width: '200px', position: 'fixed', left: 0, top: 0, height: '100%', backgroundColor: '#f4f4f4', padding: '20px' }}>
      <h3>Menu</h3>
      <ul>
        <li><Link href="/consulta">Consulta</Link></li>
        <li><Link href="/aluno">Aluno</Link></li>
        <li><Link href="/professor">Professor</Link></li>
        <li><Link href="/curso">Curso</Link></li>
      </ul>
    </div>
  );
}
