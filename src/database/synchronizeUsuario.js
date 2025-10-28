import db from './db'; 


export const createUsuario = async (all_users) => {
	for (const user of all_users) {
        const {
			id, nomeTecnico, status
		} = user;
		db.transaction(tx => {
			tx.executeSql(
				`SELECT * FROM Technician_users WHERE user_id = ?`,
				[id],
				async (_, { rows }) => {
					if (rows.length > 0) {
					// Atualiza se o registro existir
					tx.executeSql(
						`UPDATE Technician_users SET user_id = ?, name = ?, status = ? WHERE user_id = ?`,
						[id, nomeTecnico, status, id],
						() => console.log(`Usuario ${id} atualizado com sucesso`),
						error => console.log('Erro ao atualizar Usuario: ', error)
					);
					} else {
					// Insere se o registro não existir
					tx.executeSql(
						`INSERT INTO Technician_users (user_id, name, status) VALUES (?, ?, ?)`,
						[id, nomeTecnico, status],
						() => console.log(`Usuario ${id} inserido com sucesso`),
						error => console.log('Erro ao inserir Usuario: ', error)
					);
					}
				},
				error => console.log('Erro ao verificar Usuario: ', error)
			);
		});
	}
};