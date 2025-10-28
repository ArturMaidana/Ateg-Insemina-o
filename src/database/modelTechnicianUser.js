import db from './db';

export const allTechnicianUsers = async () => {
	return new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`SELECT * FROM Technician_users WHERE status = 1`,
				[],
				async (tx, results) => {
					const rows = results.rows;
					let loadeds = [];
					for (let i = 0; i < rows.length; i++) {
						loadeds.push(rows.item(i));
					}
					resolve(loadeds);  
				},
				error => {
					console.error('Erro ao atualizar visita: ', error);
					reject(error); // Rejeitado caso haja erro na busca de imagens
				}
			);
		});
	});
};

