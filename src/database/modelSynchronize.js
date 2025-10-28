import db from './db';

// export const getLastSynchronization = () => {
// 	return new Promise((resolve, reject) => {
// 		db.transaction(tx => {
// 			tx.executeSql( 
// 				`SELECT started_at FROM Synchronize ORDER BY id DESC LIMIT 1`,
// 				[],
// 				(_, { rows }) => {
// 				if (rows.length > 0) {
// 					resolve(rows.item(0).started_at);  // Retorna o started_at do último registro
// 				} else {
// 					resolve(null);  // Se não houver registros, retorna null
// 				}
// 				},
// 				(_, error) => {
// 				console.log('Erro ao buscar última sincronização: ', error);
// 				reject(error);
// 				}
// 			);
// 		});
// 	});
// };

export const getLastSynchronization = async () => {
	return new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`SELECT started_at FROM Synchronize ORDER BY id DESC LIMIT 1`,
				[],
				async (_, { rows }) => {
					if (rows.length > 0) {
						resolve(rows.item(0).started_at);  // Retorna o started_at do último registro
					} else {
						resolve(null);  // Se não houver registros, retorna null
					}
				},
				error => {
					console.error('Erro ao atualizar visita: ', error);
					reject(error); // Rejeitado caso haja erro na busca de imagens
				}
			);
		});
	});
};


export const listPending = () => {
	return new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`SELECT * FROM Inseminacao_visits WHERE sent = ? AND pending = ?`,
				[0, 1],
				(tx, results) => {
					const rows = results.rows;
					let loadedSynchronizations = [];
					for (let i = 0; i < rows.length; i++) {
						loadedSynchronizations.push(rows.item(i));
					}
					resolve(loadedSynchronizations);  
				},
				error => console.log('Erro ao carregar As Lista de Visitas: ', error)
			);
		});
	});
};

export const listImagePending = async (visit) => {
	return new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`SELECT * FROM Images WHERE inseminacao_schedule_id = ?`,
				[visit.inseminacao_schedule_id],
				async (tx, imageResults) => {
					const images = [];
					for (let j = 0; j < imageResults.rows.length; j++) {
					images.push(imageResults.rows.item(j));
					}
					const payload = new FormData();
					payload.append('visit', JSON.stringify(visit));
					
					images.forEach((image, index) => {
						const fileUri = image.uri;
						const fileName = image.name || `image_${index}.jpg`;
						
						payload.append(`images[${index}]`, {
							uri: fileUri,
							type: 'image/jpeg',  // Garanta que o tipo MIME esteja correto
							name: fileName,
						});
					
						// Adicionando metadados da imagem
						payload.append(`imageData[${index}][name]`, image.name);
						payload.append(`imageData[${index}][uri]`, image.uri);
						payload.append(`imageData[${index}][latitude]`, image.latitude);
						payload.append(`imageData[${index}][longitude]`, image.longitude);
						payload.append(`imageData[${index}][date_time]`, image.date_time);
					});
					resolve(payload); 
				},
				error => {
					console.error('Erro ao buscar imagens relacionadas: ', error);
					reject(error); // Rejeitado caso haja erro na busca de imagens
				}
			);
		});
	});
};

export const updateInseminacaoPending = async (id) => {
	return new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`UPDATE Inseminacao_visits SET sent = 1 WHERE id = ?`,
				[id],
				async () => {
					console.log(`Visita ${id} enviada com sucesso e atualizada`);
					resolve();  
				},
				error => {
					console.error('Erro ao atualizar visita: ', error);
					reject(error); // Rejeitado caso haja erro na busca de imagens
				}
			);
		});
	});
};

export const getListVisits = (setVisitsPending) => {
	db.transaction(tx => {
		tx.executeSql(
		`SELECT * FROM Inseminacao_visits WHERE sent = ? AND pending = ?`,
		[0, 1],
		(tx, results) => {
			const rows = results.rows;
			let loadedSynchronizations = [];
			for (let i = 0; i < rows.length; i++) {
				loadedSynchronizations.push(rows.item(i));
			}
			setVisitsPending(loadedSynchronizations);  
		},
		error => console.log('Erro ao carregar As Lista de Visitas: ', error)
		);
	});
};

export const getListVisitImages = (setVisitsPending) => {
	db.transaction(tx => {
		tx.executeSql(
		`SELECT * FROM Images`,
		[],
		(tx, results) => {
			const rows = results.rows;
			let loadedSynchronizations = [];
			for (let i = 0; i < rows.length; i++) {
				loadedSynchronizations.push(rows.item(i));
			}
			setVisitsPending(loadedSynchronizations);  
		},
		error => console.log('Erro ao carregar As Lista de Visitas: ', error)
		);
	});
};

export const loadSynchronizations = (setSynchronization) => {
	db.transaction(tx => {
		tx.executeSql(
		`SELECT * FROM Synchronize  ORDER BY id DESC`,
		[],
		(tx, results) => {
			const rows = results.rows;
			let loadedSynchronizations = [];
			for (let i = 0; i < rows.length; i++) {
				loadedSynchronizations.push(rows.item(i));
			}
			setSynchronization(loadedSynchronizations);  
		},
		error => console.log('Erro ao carregar As Sincronizações: ', error)
		);
	});
};
	