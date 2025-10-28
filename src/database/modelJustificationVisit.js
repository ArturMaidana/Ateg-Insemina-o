import db from './db';

export const allJustifications = (setJustifications) => {
	db.transaction(tx => {
	  tx.executeSql(
		'SELECT * FROM Justification_visits WHERE status = ?',
		[1],
		(tx, results) => {
		  const rows = results.rows;
		  let loadedJustifications = [];
		  for (let i = 0; i < rows.length; i++) {
			loadedJustifications.push(rows.item(i));
		  }
		  setJustifications(loadedJustifications);
		},
		error => console.log('Erro ao buscar Justifications: ', error)
	  );
	});
};