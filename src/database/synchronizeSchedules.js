import db from './db'; // Seu arquivo de conexão ao banco

export const saveSchedules = async (schedules) => {
    schedules.forEach(schedule => {
        const {
          id, inseminacao_groups_id, inseminacao_groups_property_id, associate_id, protocol_step, date, time, visited, group_name, associate, status_groups_property, schedule_status
        } = schedule;
        
        // Verifica ou atualiza a tabela Schedules
        db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM Schedules WHERE id = ?`,
            [id],
            (_, { rows }) => {
              if (rows.length > 0) {
                // Atualiza se o registro existir
                tx.executeSql(
                  `UPDATE Schedules SET inseminacao_groups_id = ?, inseminacao_groups_property_id = ?, associate_id = ?, protocol_step = ?, date = ?, time = ?, visited = ?, group_name = ?, status_groups_property = ?, schedule_status = ? WHERE id = ?`,
                  [inseminacao_groups_id, inseminacao_groups_property_id, associate_id, protocol_step, date, time, visited, group_name, status_groups_property, schedule_status, id],
                  () => console.log(`Schedule ${id} atualizado com sucesso`),
                  error => console.log('Erro ao atualizar schedule: ', error)
                );
              } else {
                // Insere se o registro não existir
                tx.executeSql(
                  `INSERT INTO Schedules (id, inseminacao_groups_id, inseminacao_groups_property_id, associate_id, protocol_step, date, time, visited, group_name, status_groups_property, schedule_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                  [id, inseminacao_groups_id, inseminacao_groups_property_id, associate_id, protocol_step, date, time, visited, group_name, status_groups_property, schedule_status],
                  () => console.log(`Schedule ${id} inserido com sucesso`),
                  error => console.log('Erro ao inserir schedule: ', error)
                );
              }
            },
            error => console.log('Erro ao verificar schedule: ', error)
          );
        });
    
        // Verifica ou atualiza a tabela Associates
        const { id: associateId, id_sisateg, producer, syndicate, telephone, cellphone, latitude, longitude, status, protocolo, diagnosis_gestation, step, property, productive_chain, technician, id_technician, id_productive_chain, racas } = associate;
    
        db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM Associates WHERE id = ?`,
            [associateId],
            (_, { rows }) => {
              if (rows.length > 0) {
                // Atualiza se o registro existir
                tx.executeSql(
                  `UPDATE Associates SET id_sisateg = ?, producer = ?, syndicate = ?, telephone = ?, cellphone = ?, latitude = ?, longitude = ?, status = ?, protocolo = ?, diagnosis_gestation = ?, step = ?, property = ?, id_technician = ?, id_productive_chain = ? WHERE id = ?`,
                  [id_sisateg, producer, syndicate, telephone, cellphone, latitude, longitude, status, protocolo, diagnosis_gestation, step, property, id_technician, id_productive_chain, associateId],
                  () => console.log(`Associate ${associateId} atualizado com sucesso`),
                  error => console.log('Erro ao atualizar associate: ', error)
                );
              } else {
                // Insere se o registro não existir
                tx.executeSql(
                  `INSERT INTO Associates (id, id_sisateg, producer, syndicate, telephone, cellphone, latitude, longitude, status, protocolo, diagnosis_gestation, step, property, id_technician, id_productive_chain) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                  [associateId, id_sisateg, producer, syndicate, telephone, cellphone, latitude, longitude, status, protocolo, diagnosis_gestation, step, property, id_technician, id_productive_chain],
                  () => console.log(`Associate ${associateId} inserido com sucesso`),
                  error => console.log('Erro ao inserir associate: ', error)
                );
              }
            },
            error => console.log('Erro ao verificar associate: ', error)
          );
        });
    
        // Verifica ou atualiza a tabela Technicians
        const { id: technicianId, document, name, email, status: technicianStatus } = technician;
    
        db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM Technicians WHERE id = ?`,
            [technicianId],
            (_, { rows }) => {
              if (rows.length > 0) {
                // Atualiza se o registro existir
                tx.executeSql(
                  `UPDATE Technicians SET document = ?, name = ?, email = ?, status = ? WHERE id = ?`,
                  [document, name, email, technicianStatus, technicianId],
                  () => console.log(`Technician ${technicianId} atualizado com sucesso`),
                  error => console.log('Erro ao atualizar technician: ', error)
                );
              } else {
                // Insere se o registro não existir
                tx.executeSql(
                  `INSERT INTO Technicians (id, document, name, email, status) VALUES (?, ?, ?, ?, ?)`,
                  [technicianId, document, name, email, technicianStatus],
                  () => console.log(`Technician ${technicianId} inserido com sucesso`),
                  error => console.log('Erro ao inserir technician: ', error)
                );
              }
            },
            error => console.log('Erro ao verificar technician: ', error)
          );
        });
    
        // Verifica ou atualiza a tabela Productive_chains
        const { id: productiveChainId, name: chainName, visiting_time, path, status: chainStatus } = productive_chain;
    
        db.transaction(tx => {
          tx.executeSql(
            `SELECT * FROM Productive_chains WHERE id = ?`,
            [productiveChainId],
            (_, { rows }) => {
              if (rows.length > 0) {
                // Atualiza se o registro existir
                tx.executeSql(
                  `UPDATE Productive_chains SET name = ?, visiting_time = ?, path = ?, status = ? WHERE id = ?`,
                  [chainName, visiting_time, path, chainStatus, productiveChainId],
                  () => console.log(`Productive Chain ${productiveChainId} atualizado com sucesso`),
                  error => console.log('Erro ao atualizar productive_chain: ', error)
                );
              } else {
                // Insere se o registro não existir
                tx.executeSql(
                  `INSERT INTO Productive_chains (id, name, visiting_time, path, status) VALUES (?, ?, ?, ?, ?)`,
                  [productiveChainId, chainName, visiting_time, path, chainStatus],
                  () => console.log(`Productive Chain ${productiveChainId} inserido com sucesso`),
                  error => console.log('Erro ao inserir productive_chain: ', error)
                );
              }
            },
            error => console.log('Erro ao verificar productive_chain: ', error)
          );
        });

        const resultName = formatNames(racas);

        db.transaction(tx => {
            tx.executeSql(
              `SELECT * FROM Racas WHERE schedule_id = ?`,
              [id],
              (_, { rows }) => {
                if (rows.length > 0) {
                  // Atualiza se o registro existir
                  tx.executeSql(
                    `UPDATE Racas SET name = ? WHERE schedule_id = ?`,
                    [resultName, id],
                    () => console.log(`Raça ${id} atualizado com sucesso`),
                    error => console.log('Erro ao atualizar raça: ', error)
                  );
                } else {
                  // Insere se o registro não existir
                  tx.executeSql(
                    `INSERT INTO Racas (schedule_id, name) VALUES (?, ?)`,
                    [id, resultName],
                    () => console.log(`Raça ${id} inserido com sucesso`),
                    error => console.log('Erro ao inserir raça: ', error)
                  );
                }
              },
              error => console.log('Erro ao verificar raça: ', error)
            );
        });

        // racas.forEach(raca => {
        // // Verifica ou atualiza a tabela Raças
        //   const { id: racasId, name: racasName } = raca;
      
        //   db.transaction(tx => {
        //     tx.executeSql(
        //       `SELECT * FROM Racas WHERE raca_id = ? AND schedule_id = ?`,
        //       [racasId, id],
        //       (_, { rows }) => {
        //         if (rows.length > 0) {
        //           // Atualiza se o registro existir
        //           tx.executeSql(
        //             `UPDATE Racas SET name = ?, raca_id = ?, schedule_id = ? WHERE raca_id = ? AND schedule_id = ?`,
        //             [racasName, racasId, id, racasId, id],
        //             () => console.log(`Raça ${racasId} atualizado com sucesso`),
        //             error => console.log('Erro ao atualizar raça: ', error)
        //           );
        //         } else {
        //           // Insere se o registro não existir
        //           tx.executeSql(
        //             `INSERT INTO Racas (raca_id, schedule_id, name) VALUES (?, ?, ?)`,
        //             [racasId, id, racasName],
        //             () => console.log(`Raça ${racasId} inserido com sucesso`),
        //             error => console.log('Erro ao inserir raça: ', error)
        //           );
        //         }
        //       },
        //       error => console.log('Erro ao verificar raça: ', error)
        //     );
        //   });
        // });
    });
};

const formatNames = (records) => {
  // Extrai os nomes do array
  const names = records.map(record => record.name);

  // Se houver mais de 1 nome, substitui a última vírgula por "e"
  if (names.length > 1) {
    const lastName = names.pop(); // Remove o último nome
    return `${names.join(', ')} e ${lastName}`; // Junta os nomes com vírgula e adiciona "e" no último
  }

  // Se houver apenas 1 nome, retorna o nome sem alterações
  return names.join('');
};

export const saveJustification = async (justifications) => {
	for (const justification of justifications) {
        const {
			id, name, status
		} = justification;
		db.transaction(tx => {
			tx.executeSql(
				`SELECT * FROM Justification_visits WHERE id = ?`,
				[id],
				async (_, { rows }) => {
					if (rows.length > 0) {
					// Atualiza se o registro existir
					tx.executeSql(
						`UPDATE Justification_visits SET id = ?, name = ?, status = ? WHERE id = ?`,
						[id, name, status, id],
						() => console.log(`Justificativa ${id} atualizado com sucesso`),
						error => console.log('Erro ao atualizar Usuario: ', error)
					);
					} else {
					// Insere se o registro não existir
					tx.executeSql(
						`INSERT INTO Justification_visits (id, name, status) VALUES (?, ?, ?)`,
						[id, name, status],
						() => console.log(`Justificativa ${id} inserido com sucesso`),
						error => console.log('Erro ao inserir justificativa: ', error)
					);
					}
				},
				error => console.log('Erro ao verificar justificativa: ', error)
			);
		});
	}
};
