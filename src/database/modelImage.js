import db from './db';


export const getLoadImages = (setImages, id) => {
	db.transaction(tx => {
	  tx.executeSql(
		'SELECT * FROM Images WHERE inseminacao_schedule_id = ?',
		[id],
		(tx, results) => {
		  const rows = results.rows;
		  let loadedImages = [];
		  for (let i = 0; i < rows.length; i++) {
			loadedImages.push(rows.item(i));
		  }
		  setImages(loadedImages);
		},
		error => console.log('Erro ao buscar imagens: ', error)
	  );
	});
};
  
export const saveImage = (id, latitude, longitude, name, uri, callback) => {
	const currentDateTime = new Date().toLocaleString('pt-BR', { timeZone: 'America/Cuiaba' });
	db.transaction(tx => {
	  tx.executeSql(
		'INSERT INTO Images (inseminacao_schedule_id, name, uri, date_time, sent, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)',
		[id, name, uri, currentDateTime, 0, latitude, longitude], // 0 para "sent"
		(tx, results) => {
		  if (results.rowsAffected > 0) {
			console.log('Imagem salva com sucesso');
			callback();
		  } else {
			console.log('Falha ao salvar a imagem');
		  }
		},
		error => console.log('Erro ao salvar imagem: ', error)
	  );
	});
};

export const deleteImage = (id, callback) => {
	db.transaction(tx => {
	  tx.executeSql(
		'DELETE FROM Images WHERE id = ?',
		[id],
		(tx, results) => {
		  if (results.rowsAffected > 0) {
			console.log('Imagem excluída com sucesso');
			callback();
		  } else {
			console.log('Falha ao excluir a imagem');
		  }
		},
		error => console.log('Erro ao excluir imagem: ', error)
	  );
	});
  };
  