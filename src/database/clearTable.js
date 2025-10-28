import db from './db';

export const clearRegister = async () => {
	db.transaction(tx => {
		tx.executeSql('DELETE FROM Schedules', [], () => console.log('Registros de Schedules removidos com sucesso'), 
		error => console.log('Erro ao limpar tabela Schedules: ', error));
		
		tx.executeSql('DELETE FROM Associates', [], () => console.log('Registros de Associates removidos com sucesso'), 
		error => console.log('Erro ao limpar tabela Associates: ', error));
		
		tx.executeSql('DELETE FROM Technicians', [], () => console.log('Registros de Technicians removidos com sucesso'), 
		error => console.log('Erro ao limpar tabela Technicians: ', error));
		
		tx.executeSql('DELETE FROM Productive_chains', [], () => console.log('Registros de Productive_chains removidos com sucesso'), 
		error => console.log('Erro ao limpar tabela Productive_chains: ', error));
		
		tx.executeSql('DELETE FROM Synchronize', [], () => console.log('Registros de Synchronize removidos com sucesso'), 
		error => console.log('Erro ao limpar tabela Synchronize: ', error));
		
		tx.executeSql('DELETE FROM Inseminacao_visits', [], () => console.log('Registros de Inseminacao_visits removidos com sucesso'), 
		error => console.log('Erro ao limpar tabela Inseminacao_visits: ', error));
		
		tx.executeSql('DELETE FROM Images', [], () => console.log('Registros de Images removidos com sucesso'), 
		error => console.log('Erro ao limpar tabela Images: ', error));

		tx.executeSql('DELETE FROM Racas', [], () => console.log('Registros de Racas removidos com sucesso'), 
		error => console.log('Erro ao limpar tabela racas: ', error));
	});
};
