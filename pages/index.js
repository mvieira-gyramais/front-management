import { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField , SnackbarContent } from '@mui/material';
import axios from 'axios';

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8000/aluno');
    console.log('Dados recebidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
};


export default function HomePage() {
  const [selectedList, setSelectedList] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const [data, setData] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    cursoId: ''
  });
  
  const handleSelectList = async (listName) => {
    console.log('Lista selecionada:', listName);
    if (listName === 'Consulta') {
      console.log('Iniciando consulta de usuários...');
      const data = await fetchUsers();
      console.log('Dados definidos no estado:', data);
      setUsers(data);
    }
    setSelectedList(listName);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event, type) => {
    event.preventDefault();

    if (type === 'aluno') {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        };

        const payload = {
          nome: data.nome,
          email: data.email,
          cpf: data.cpf.replace(/\D/g, ''),
          telefone: data.telefone.replace(/\D/g, ''),
          cursoId: data.cursoId
        };

        console.log('Enviando payload:', payload);

        const response = await axios.post('http://localhost:8000/aluno',
          payload,
          config
        );

        if (response.status === 201) {
          setSuccess('Cadastro efetuado com sucesso');
          event.target.reset();
          setTimeout(() => {
            setSuccess('');
          }, 4000);
        }
      } catch (error) {
        console.error('Erro completo:', error);
        setError(
          error.response?.data?.message || 
          'Erro ao cadastrar. Verifique os dados e tente novamente.'
        );
      }
    }

    if (type === 'professor') {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        };
        
        const payload = {
          nome: data.nome,
          email: data.email,
          cpf: data.cpf.replace(/\D/g, ''),
          telefone: data.telefone.replace(/\D/g, ''),
          cursoId: data.cursoId
        };
    
        console.log('Enviando payload:', payload);
    
        const response = await axios.post('http://localhost:8000/professor', payload, config);
    
        if (response.status === 201) {
          setSuccess('Cadastro efetuado com sucesso');
          event.target.reset();
          setTimeout(() => {
            setSuccess('');
          }, 4000);
        }
      } catch (error) {
        console.error('Erro completo:', error);
        setError(
          error.response?.data?.message || 
          'Erro ao cadastrar. Verifique os dados e tente novamente.'
        );
      }
    }

    if (type === 'curso') {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        };
    
        const payload = {
          nome: data.nome,
          codigo: data.codigo,
          descricao: data.descricao
        };
    
        console.log('Enviando payload:', payload);
    
        const response = await axios.post('http://localhost:8000/curso', payload, config);
    
        if (response.status === 201) {
          setSuccess('Cadastro efetuado com sucesso');
          event.target.reset();
          setTimeout(() => {
            setSuccess('');
          }, 4000);
        }
      } catch (error) {
        console.error('Erro completo:', error);
        setError(
          error.response?.data?.message || 
          'Erro ao cadastrar. Verifique os dados e tente novamente.'
        );
      }
    }  
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
        }}
      >
        <List>
          <ListItem button="true" onClick={() => window.location.href = '/'}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button="true" onClick={() => handleSelectList('Consulta')}>
            <ListItemText primary="Consulta" />
          </ListItem>
          <ListItem button="true" onClick={() => handleSelectList('Cadastro de Professores')}>
            <ListItemText primary="Cadastro de Professores" />
          </ListItem>
          <ListItem button="true" onClick={() => handleSelectList('Cadastro de Alunos')}>
            <ListItemText primary="Cadastro de Alunos" />
          </ListItem>
          <ListItem button="true" onClick={() => handleSelectList('Cadastro de Cursos')}>
            <ListItemText primary="Cadastro de Cursos" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {selectedList ? selectedList : 'Sistema de Gestão'}
        </Typography>
        
        {selectedList === 'Consulta' && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>CPF</TableCell>
                  <TableCell>Telefone</TableCell>
                  <TableCell>ID Curso</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log('Estado users atual:', users)}
                {Array.isArray(users) && users.length > 0 ? (
                  users.map((user) => {
                    console.log(`Dados do usuário:`, user);
                    return(
                      <TableRow key={user.id}>
                        <TableCell>{user.aluno?.nome || 'N/A'}</TableCell>
                        <TableCell>{user.aluno?.email || 'N/A'}</TableCell>
                        <TableCell>{user.aluno?.cpf || 'N/A'}</TableCell>
                        <TableCell>{user.aluno?.telefone || 'N/A'}</TableCell>
                        <TableCell>{user.cursoId || 'N/A'}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      {Array.isArray(users) 
                        ? 'Nenhum usuário encontrado' 
                        : 'Erro: dados em formato inválido'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {selectedList === 'Cadastro de Professores' && (
          <Box component="form" onSubmit={(event) => handleSubmit(event, 'professor')} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1" gutterBottom>
              Preencha os campos abaixo para cadastrar um professor
            </Typography>
            <TextField name="nome" label="Nome" variant="outlined" required />
            <TextField name="email" label="Email" type="email" variant="outlined" required onChange={handleChange}/>
            <TextField name="cpf" label="CPF" variant="outlined" required onChange={handleChange}/>
            <TextField name="telefone" label="Telefone" variant="outlined" required onChange={handleChange}/>
            <TextField name="disciplina" label="Disciplina" variant="outlined" onChange={handleChange}/>
            <TextField name="cursoId" label="ID Curso" variant="outlined" required onChange={handleChange}/>
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
            {success && (
              <Typography variant="overline" gutterBottom>
                {success}
              </Typography>
            )}
          </Box>
        )}

        {selectedList === 'Cadastro de Alunos' && (
          <Box component="form" onSubmit={(event) => handleSubmit(event, 'aluno')} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1" gutterBottom>
              Preencha os campos abaixo para cadastrar um aluno
            </Typography>
            <TextField name="nome" label="Nome" variant="outlined" required onChange={handleChange}/>
            <TextField name="email" label="Email" type="email" variant="outlined" required onChange={handleChange}/>
            <TextField name="cpf" label="CPF" variant="outlined" required onChange={handleChange}/>
            <TextField name="telefone" label="Telefone" variant="outlined" required onChange={handleChange}/>
            <TextField name="cursoId" label="ID Curso" variant="outlined" required onChange={handleChange}/>
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
            {success && (
              <Typography variant="overline" gutterBottom>
                {success}
              </Typography>
            )}
          </Box>
        )}

        {selectedList === 'Cadastro de Cursos' && (
          <Box component="form" onSubmit={(event) => handleSubmit(event, 'curso')} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body1" gutterBottom>
              Preencha os campos abaixo para cadastrar um curso
            </Typography>
            <TextField name="nome" label="Nome do Curso" variant="outlined" required onChange={handleChange}/>
            <TextField name="codigo" label="Código do Curso" variant="outlined" required onChange={handleChange}/>
            <TextField name="descricao" label="Descrição do Curso" variant="outlined" required onChange={handleChange}/>
            <Button type="submit" variant="contained" color="primary">
              Cadastrar
            </Button>
            {success && (
              <Typography variant="overline" gutterBottom>
                {success}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};