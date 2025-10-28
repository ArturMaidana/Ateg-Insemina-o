export function dataAtual() {
    let hoje = new Date();
    let ano = hoje.getFullYear();
    let mes = hoje.getMonth() + 1;
    let dia = hoje.getDate();
    let mesFormatado = mes.toString().padStart(2, '0');
    let diaFormatado = dia.toString().padStart(2, '0');
    let dataFormatada = `${ano}-${mesFormatado}-${diaFormatado}`;
    return dataFormatada;
}

export function dateInteger() {
    const agora = new Date();
    const ano = agora.getFullYear(); // Ano (ex: 2024)
    const mes = agora.getMonth() + 1; // Mês (0-11, então +1 para 1-12)
    const dia = agora.getDate(); // Dia do mês (1-31)
    const hora = agora.getHours(); // Horas (0-23)
    const minuto = agora.getMinutes(); // Minutos (0-59)
    const segundo = agora.getSeconds(); // Segundos (0-59)
    return `${ano}${mes.toString().padStart(2, '0')}${dia.toString().padStart(2, '0')}${hora.toString().padStart(2, '0')}${minuto.toString().padStart(2, '0')}${segundo.toString().padStart(2, '0')}`;
}