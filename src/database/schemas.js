import db from './db';

export const createSchedulesTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        inseminacao_groups_id INTEGER NULL,
        inseminacao_groups_property_id INTEGER NULL,
        associate_id INTEGER NULL,
        protocol_step TEXT,
        date TEXT,
        time TEXT,
        visited INTEGER,
        group_name TEXT
      )`,
      [],
      () => {
        console.log('Tabela schedules criada com sucesso');
        addStatusGroupsPropertyColumn();  
      },
      error => console.log('Erro ao criar tabela schedules: ', error)
    );
  });
};

export const createAssociateTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Associates (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_sisateg INTEGER NULL,
          inseminacao_groups_properties_id INTEGER NULL,
          id_technician INTEGER NULL,
          id_productive_chain INTEGER NULL,
          producer TEXT NULL,
          property TEXT NULL,
          syndicate TEXT NULL,
          telephone TEXT NULL,
          cellphone TEXT NULL,
          latitude TEXT NULL,
          longitude TEXT NULL,
          status INTEGER NULL,
          protocolo TEXT NULL,
          diagnosis_gestation TEXT NULL,
          step TEXT NULL
        )`,
        [],
        () => console.log('Tabela Associate criada com sucesso'),
        error => console.log('Erro ao criar tabela schedules: ', error)
      );
    });
};

export const createTechnicianTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Technicians (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          participant_id INTEGER NULL,
          document TEXT NULL,
          name TEXT NULL,
          property TEXT NULL,
          email TEXT NULL,
          status INTEGER
        )`,
        [],
        () => console.log('Tabela Tecnicos criada com sucesso'),
        error => console.log('Erro ao criar tabela schedules: ', error)
      );
    });
};

export const createProductiveChainTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Productive_chains (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          path TEXT NULL,
          name TEXT NULL,
          visiting_time INTEGER NULL,
          center_coust TEXT NULL,
          status INTEGER
        )`,
        [],
        () => console.log('Tabela Cadeias Produtivas criada com sucesso'),
        error => console.log('Erro ao criar tabela schedules: ', error)
      );
    });
};

export const createSynchronizeTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Synchronize (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          started_at TEXT,
          ended_at TEXT,
          type_sent TEXT
        )`,
        [],
        () => console.log('Tabela Synchronize criada com sucesso'),
        error => console.log('Erro ao criar tabela Synchronize: ', error)
      );
    });
};

export const createJustificationVisitTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Justification_visits (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          status BOOLEAN NULL
        )`,
        [],
        () => console.log('Tabela Justificativa criada com sucesso'),
        error => console.log('Erro ao criar tabela Justificativa: ', error)
      );
    });
};

export const createTechnicianUserTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Technician_users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NULL,
          name TEXT,
          status BOOLEAN NULL
        )`,
        [],
        () => console.log('Tabela Tecnico Usuario criada com sucesso'),
        error => console.log('Erro ao criar tabela  Tecnico Usuario : ', error)
      );
    });
};

export const createInseminacaoVisitTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Inseminacao_visits (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          inseminacao_schedule_id INTEGER NULL,
          justification_visit_id INTEGER NULL,
          inseminacao_visit_id TEXT NULL,
          checkin TEXT NULL,
          checkout TEXT NULL,
          duration TEXT NULL,
          latitude_in TEXT NULL,
          longitude_in TEXT NULL,
          latitude_out TEXT NULL,
          longitude_out TEXT NULL,
          technician TEXT NULL,
          haveAttendence TEXT NULL,
          message TEXT NULL,
          justification_visit_obs TEXT NULL,
          status INTEGER NULL,
		      sent BOOLEAN NULL,
          pending BOOLEAN NULL	  
        )`,
        [],
        () => console.log('Tabela Inseminacao Visita criada com sucesso'),
        error => console.log('Erro ao criar tabela Inseminacao Visita: ', error)
      );
    });
};

export const createImagesTable = () => {
	db.transaction(tx => {
	  tx.executeSql(
		`CREATE TABLE IF NOT EXISTS Images (
			id INTEGER PRIMARY KEY AUTOINCREMENT, 
			inseminacao_schedule_id INTEGER NULL,
			name TEXT, 
			uri TEXT, 
			date_time TEXT, 
      latitude TEXT NULL,
      longitude TEXT NULL,
			sent BOOLEAN
		)`,
		[],
		() => console.log('Tabela Images criada/modificada com sucesso'),
		error => console.log('Erro ao criar/modificar tabela: ', error)
	  );
	});
};

export const createRacasTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Racas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        raca_id INTEGER NULL,
        schedule_id INTEGER NULL,
        name TEXT
      )`,
      [],
      () => console.log('Tabela Raças criada com sucesso'),
      error => console.log('Erro ao criar tabela  Raças : ', error)
    );
  });
};

const checkColumnExists = (tableName, columnName, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `PRAGMA table_info(${tableName})`, // Consulta para obter informações sobre as colunas da tabela
      [],
      (_, result) => {
        const columns = result.rows.raw(); // Obtém as colunas como um array
        const columnExists = columns.some(column => column.name === columnName); // Verifica se a coluna já existe
        callback(columnExists); // Chama o callback com true ou false
      },
      error => console.log('Erro ao verificar colunas: ', error)
    );
  });
};

// export const addStatusGroupsPropertyColumn = () => {
//   checkColumnExists('Schedules', 'status_groups_property', columnExists => {
//     if (!columnExists) {
//       // A coluna não existe, então podemos adicionar
//       db.transaction(tx => {
//         tx.executeSql(
//           `ALTER TABLE Schedules ADD COLUMN status_groups_property TEXT NULL`,
//           [],
//           () => console.log('Coluna status_groups_property adicionada com sucesso'),
//           error => console.log('Erro ao adicionar coluna status_groups_property: ', error)
//         );
//       });
//     } else {
//       console.log('A coluna status_groups_property já existe, não será adicionada.');
//     }
//   });
// };

export const addStatusGroupsPropertyColumn = () => {
  checkColumnExists('Schedules', 'status_groups_property', columnExists => {
    if (!columnExists) {
      // A coluna 'status_groups_property' não existe, então podemos adicioná-la
      db.transaction(tx => {
        tx.executeSql(
          `ALTER TABLE Schedules ADD COLUMN status_groups_property TEXT NULL`,
          [],
          () => {
            console.log('Coluna status_groups_property adicionada com sucesso');
            // Agora que a primeira coluna foi adicionada, vamos adicionar a segunda
            tx.executeSql(
              `ALTER TABLE Schedules ADD COLUMN schedule_status TEXT NULL`,
              [],
              () => console.log('Coluna schedule_status adicionada com sucesso'),
              error => console.log('Erro ao adicionar coluna schedule_status: ', error)
            );
          },
          error => console.log('Erro ao adicionar coluna status_groups_property: ', error)
        );
      });
    } else {
      console.log('A coluna status_groups_property já existe, não será adicionada.');
    }
  });
};



export const initializeTables = () => {
    createSchedulesTable();
    createSynchronizeTable();
    createAssociateTable();
    createTechnicianTable();
    createProductiveChainTable();
    createInseminacaoVisitTable();
    createImagesTable();
    createJustificationVisitTable();
    createTechnicianUserTable();
    createRacasTable();
};
