import db from './db';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export const getInseminacaoScheduleId = (setInseminacaoVisit, id) => {
	setInseminacaoVisit([]);
	db.transaction(tx => {
		tx.executeSql(
			`SELECT * FROM Inseminacao_visits WHERE inseminacao_schedule_id = ?`,
		[id],
		(tx, results) => {
			if (results.rows.length > 0) {
				setInseminacaoVisit(results.rows.item(0));
			} else {
			//console.log('No user found with the given ID');
			}
		},
		error => {
			console.log('Error fetching user:', error); 
		}
		);
	});
};

export const getUpdatedInseminacaoScheduleId = (id, haveAttendence, message, lat, log, justification_visit_id, motivo) => {
	const currentDateTime = new Date().toLocaleString('pt-BR', { timeZone: 'America/Cuiaba' });
	if(!haveAttendence){
		var justificationVisitId = justification_visit_id;
		if(justificationVisitId == 4){
			var mensagem = message;
		} else{
			var mensagem = motivo;
		}
	} else {
		var justificationVisitId = null;
		var mensagem = '';
	}
	db.transaction(tx => {
        tx.executeSql(
          'UPDATE Inseminacao_visits SET pending = ?, checkout = ?, latitude_out = ?, longitude_out = ?, haveAttendence = ?, message = ?, justification_visit_id = ?  WHERE inseminacao_schedule_id = ?',
          [1, currentDateTime, lat, log, haveAttendence, mensagem, justificationVisitId, id],
          (tx, results) => {
            if (results.rowsAffected > 0) {
				return Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Sucesso',
                    textBody: 'Atendimento finalizado com sucesso.',
                    button: 'Fechar',
                });
            } else {
				console.log('Erro', 'Falha ao atualizar a Inseminacao_visits');
            }
          },
          error => console.log('Erro ao atualizar Inseminacao_visits: ', error)
        );
    });
};

export const getInseminacaoScheduleExist = (setInseminacaoVisitExist) => {
	setInseminacaoVisitExist(false);
	db.transaction(tx => {
		tx.executeSql(
			`SELECT * FROM Inseminacao_visits WHERE pending = ?`,
		[0],
		(tx, results) => {
			if (results.rows.length > 0) {
				setInseminacaoVisitExist(true);
			} else {
			//console.log('No user found with the given ID');
			}
		},
		error => {
			console.log('Error fetching user:', error);
		}
		);
	});
};

export const insertInseminacaoVisit = (inseminacaoScheduleId, technician, lat, log, inseminacao_visit_id) => {
	const currentDateTime = new Date().toLocaleString('pt-BR', { timeZone: 'America/Cuiaba' });
	db.transaction(tx => {
	  tx.executeSql(
		'INSERT INTO Inseminacao_visits (inseminacao_schedule_id, checkin, sent, technician, pending, latitude_in, longitude_in, inseminacao_visit_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
		[inseminacaoScheduleId, currentDateTime, 0, technician, 0, lat, log, inseminacao_visit_id],
		() => getInseminacaoScheduleId(),
		error => console.log('Erro ao inserir produto: ', error)
	  );
	});
};