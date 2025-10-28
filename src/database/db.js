import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'ateginseminacao.db',
    location: 'default',
  },
  () => console.log('Banco de dados aberto com sucesso'),
  error => console.log('Erro ao abrir o banco de dados: ', error)
);

export default db;
