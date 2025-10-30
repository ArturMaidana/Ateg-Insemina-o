import db from './db';

export const loadSchedules = (year, month) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT Schedules.*,
                      Associates.producer,
                      Associates.property,
                      Inseminacao_visits.pending,
                      Inseminacao_visits.sent,
                      Inseminacao_visits.checkin
              FROM Schedules 
              INNER JOIN Associates ON(Associates.id = Schedules.associate_id)
              LEFT JOIN Inseminacao_visits ON (inseminacao_schedule_id = Schedules.id)
              WHERE strftime('%Y', Schedules.DATE) = ? 
              AND strftime('%m', Schedules.DATE) = ? 
              AND (Schedules.status_groups_property IS NULL OR Schedules.status_groups_property != '3')
              AND (Schedules.schedule_status IS NULL OR Schedules.schedule_status == '1')
              ORDER BY Schedules.visited ASC, Schedules.DATE ASC`,
        [year.toString(), month.toString().padStart(2, '0')],
        (tx, results) => {
          const rows = results.rows;
          let loadedSchedules = [];
          for (let i = 0; i < rows.length; i++) {
            loadedSchedules.push(rows.item(i));
          }
          resolve(loadedSchedules);
        },
        (tx, error) => {
          console.log('Erro ao carregar agendas: ', error);
          reject(error);
        },
      );
    });
  });
};

export const getMonthlyScheduleCounts = year => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Schedules (id INTEGER PRIMARY KEY AUTOINCREMENT, DATE TEXT, status_groups_property TEXT, schedule_status TEXT);',
        [],
      );

      tx.executeSql(
        `SELECT 
           strftime('%m', Schedules.DATE) as month, 
           COUNT(Schedules.id) as count
         FROM Schedules
         WHERE strftime('%Y', Schedules.DATE) = ?
           AND (Schedules.status_groups_property IS NULL OR Schedules.status_groups_property != '3')
           AND (Schedules.schedule_status IS NULL OR Schedules.schedule_status == '1')
         GROUP BY month`,
        [String(year)],
        (tx, results) => {
          const counts = {};
          for (let i = 0; i < 12; i++) {
            counts[i] = 0;
          }
          for (let i = 0; i < results.rows.length; i++) {
            const row = results.rows.item(i);
            const monthIndex = parseInt(row.month, 10) - 1;
            counts[monthIndex] = row.count;
          }
          resolve(counts);
        },
        (tx, error) => {
          console.error('Erro ao contar agendamentos por mês:', error);
          reject(error);
        },
      );
    });
  });
};

export const loadDateSchedules = (setAgendas, date) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT Schedules.*,
                    Associates.producer,
                    Associates.property,
                    Inseminacao_visits.pending,
                    Inseminacao_visits.sent,
                    Inseminacao_visits.checkin
            FROM Schedules 
            INNER JOIN Associates ON(Associates.id = Schedules.associate_id)
            LEFT JOIN Inseminacao_visits ON (inseminacao_schedule_id = Schedules.id)
            WHERE  Schedules.DATE = ? 
            AND (Schedules.status_groups_property IS NULL OR Schedules.status_groups_property != '3')
            AND (Schedules.schedule_status IS NULL OR Schedules.schedule_status == '1')
            ORDER BY Schedules.visited ASC, Schedules.DATE ASC`,
      [date],
      (tx, results) => {
        const rows = results.rows;
        let loadedSchedules = [];
        for (let i = 0; i < rows.length; i++) {
          loadedSchedules.push(rows.item(i));
        }
        setAgendas(loadedSchedules);
      },
      error => console.log('Erro ao carregar agendas: ', error),
    );
  });
};

export const getLastSchedule = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Synchronize ORDER BY id DESC LIMIT 1`,
        [],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0).started_at);
          } else {
            resolve(null);
          }
        },
        (_, error) => {
          console.log('Erro ao buscar última sincronização: ', error);
          reject(error);
        },
      );
    });
  });
};

export const getScheduleId = (setSchedule, id) => {
  setSchedule([]);
  db.transaction(tx => {
    tx.executeSql(
      `SELECT Schedules.*,
                Associates.producer,
                Associates.property,
                Associates.protocolo,
                Associates.diagnosis_gestation,
                Associates.telephone,
                Technicians.name as name_tecnico,
                Associates.latitude,
                Associates.longitude
            FROM Schedules 
            INNER JOIN Associates ON(Associates.id = Schedules.associate_id)
            INNER JOIN Technicians ON(Technicians.id = Associates.id_technician)
            INNER JOIN Productive_chains ON(Productive_chains.id = Associates.id_productive_chain)
            WHERE  Schedules.id = ?`,
      [id],
      (tx, results) => {
        if (results.rows.length > 0) {
          setSchedule(results.rows.item(0));
        } else {
          console.log('No user found with the given ID');
        }
      },
      error => {
        console.log('Error fetching user:', error);
      },
    );
  });
};

export const getRacas = (setRacas, id) => {
  setRacas([]);
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM Racas WHERE schedule_id = ?`,
      [id],
      (tx, results) => {
        if (results.rows.length > 0) {
          setRacas(results.rows.item(0));
        } else {
          console.log('No user found with the given ID');
        }
      },
      error => {
        console.log('Error fetching user:', error);
      },
    );
  });
};
