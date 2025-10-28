import { add, format } from 'date-fns';

export function formatDate(date) {
  const [year, month, day] = date.split('-');
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

export function formatDateTime(dataHora) {
  const data = new Date(dataHora);
  const dia = String(data.getDate()).padStart(2, '0'); // Dia
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês (0-11)
  const ano = data.getFullYear(); // Ano
  const hora = String(data.getHours()).padStart(2, '0'); // Hora
  const minuto = String(data.getMinutes()).padStart(2, '0'); // Minutos
  const segundo = String(data.getSeconds()).padStart(2, '0'); // Segundos

  return `${dia}-${mes}-${ano} ${hora}:${minuto}:${segundo}`;
}
