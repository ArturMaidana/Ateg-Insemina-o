// src/utils/HomeScreenMocks.js

// 4. DADOS DE EVENTOS PARA A HOME SCREEN
export const mockEventsData = [
  {
    id: 1,
    tagText: 'D0',
    idText: 'Fazenda Nativa Agropecuária',
    productor: 'Josmar Otto',
    tecnico: 'Nelson Tente',
    telefone: '65984227220',
    protocolo: '321',
    group: 'Teste Nativo',
    diagnostico: '123',
    racas: 'Gir Leiteiro',
    date: '2025-10-15',
    statusText: 'Realizado',
    photos: [],
  },
  {
    id: 2,
    tagText: 'D9',
    idText: 'Fazenda Santa Maria',
    productor: 'Ana Clara',
    tecnico: 'Fernando França',
    telefone: '65911112222',
    protocolo: '456',
    group: 'Grupo B',
    diagnostico: '80',
    racas: 'Nelore',
    date: '2025-10-15',
    statusText: 'Aguardando',
    photos: [],
  },
  {
    id: 3,
    tagText: 'D10',
    idText: 'Fazenda Água Boa',
    productor: 'Carlos Souza',
    tecnico: 'Nelson Tente',
    telefone: '65933334444',
    protocolo: '789',
    group: 'Grupo C',
    diagnostico: '50',
    racas: 'Angus',
    date: '2025-10-15',
    statusText: 'Cancelado',
    photos: [],
  },

  {
    id: 403,
    tagText: 'D10',
    idText: 'Fazenda Água Boa',
    productor: 'Carlos Souza',
    tecnico: 'Nelson Tente',
    telefone: '65933334444',
    protocolo: '789',
    group: 'Grupo C',
    diagnostico: '50',
    racas: 'Angus',
    date: '2025-10-23',
    statusText: 'Aguardando',
    photos: [],
  },
  {
    id: 402,
    tagText: 'D10',
    idText: 'Fazenda Água Boa',
    productor: 'Carlos Souza',
    tecnico: 'Nelson Tente',
    telefone: '65933334444',
    protocolo: '789',
    group: 'Grupo C',
    diagnostico: '50',
    racas: 'Angus',
    date: '2025-10-23',
    statusText: 'Realizado',
    photos: [],
  },
];

export const mockApiData = [
  {
    id: 1,
    type: 'Eventos',
    title: 'Mutirão Rural - Comodoro',
    subtitle: 'Nº - 2025M1620091219T',
    tags: ['mutirão', 'rural', 'comodoro'],
    icon: '📅',
    navigation: 'EventDetail',
  },
  {
    id: 2,
    type: 'Eventos',
    title: 'Mutirão Urbano - Alta Floresta',
    subtitle: 'Nº - 2025M1620091220T',
    tags: ['mutirão', 'urbano', 'alta floresta'],
    icon: '📅',
    navigation: 'EventDetail',
  },
  {
    id: 3,
    type: 'Eventos',
    title: 'Mutirão Urbano - Vila Rica',
    subtitle: 'Nº - 2025M1620091220T',
    tags: ['mutirão', 'urbano', 'vila rica'],
    icon: '📅',
    navigation: 'EventDetail',
  },
  {
    id: 4,
    type: 'Atendimentos',
    title: 'Artur Guilherme dos Santos Maidana',
    subtitle: 'Oftalmologia - Realizada',
    tags: ['oftalmologia', 'realizada'],
    icon: '👥',
    navigation: 'Atendimento',
  },
  {
    id: 5,
    type: 'Atendimentos',
    title: 'Amauri Constantine Duarte',
    subtitle: 'Oftalmologia - Realizada',
    tags: ['oftalmologia', 'realizada'],
    icon: '👥',
    navigation: 'Atendimento',
  },
  {
    id: 6,
    type: 'Atendimentos',
    title: 'Rafael Edigio Souza Martins',
    subtitle: 'Oftalmologia - Realizada',
    tags: ['oftalmologia', 'realizada'],
    icon: '👥',
    navigation: 'Atendimento',
  },
  {
    id: 7,
    type: 'Atendimentos',
    title: 'Felipe Douglas',
    subtitle: 'Odontologia - Aguardando',
    tags: ['odontologia', 'aguardando'],
    icon: '👥',
    navigation: 'Atendimento',
  },
  {
    id: 8,
    type: 'Serviços',
    title: 'Oftalmologia',
    subtitle: 'Consultas e exames oftalmológicos',
    tags: ['consulta', 'exame', 'visão'],
    icon: '🔧',
    navigation: 'Services',
  },
  {
    id: 9,
    type: 'Serviços',
    title: 'Enfermagem',
    subtitle: 'Tratamentos dentários',
    tags: ['dente', 'consulta', 'tratamento'],
    icon: '🔧',
    navigation: 'Services',
  },
  {
    id: 10,
    type: 'Serviços',
    title: 'Barbearia',
    subtitle: 'Tratamentos dentários',
    tags: ['dente', 'consulta', 'tratamento'],
    icon: '🔧',
    navigation: 'Services',
  },
  {
    id: 11,
    type: 'Serviços',
    title: 'Confecção Óculos',
    subtitle: 'Tratamentos dentários',
    tags: ['dente', 'consulta', 'tratamento'],
    icon: '🔧',
    navigation: 'Services',
  },
];

export const mockNotifications = [
  {
    id: 1,
    title: 'Nova atualização no atendimento',
    description:
      'D8 - Fazenda Nativa Teste foi adicionada e está aguardando atendimento.',
    time: '2 horas atrás',
    read: false,
  },
  {
    id: 2,
    title: 'Atualização de Status',
    description: 'O atendimento da Fazenda Nativa Teste foi cancelado.',
    time: 'Ontem',
    read: false,
  },
  {
    id: 3,
    title: 'Evento Concluído',
    description:
      'O Mutirão Rural em Cáceres foi marcado como "Realizado" com sucesso.',
    time: '3 dias atrás',
    read: true,
  },
  {
    id: 4,
    title: 'Lembrete',
    description:
      'Não se esqueça de submeter os relatórios do evento de Sapezal.',
    time: '1 semana atrás',
    read: true,
  },
];

export const fetchApiData = async query => {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (!query) return [];
  const queryLower = query.toLowerCase();
  return mockApiData.filter(
    item =>
      item.title.toLowerCase().includes(queryLower) ||
      item.subtitle.toLowerCase().includes(queryLower) ||
      (item.tags &&
        item.tags.some(tag => tag.toLowerCase().includes(queryLower))),
  );
};

export const fetchUserData = async () => {
  return {
    name: 'Luis Felipe',
    avatarUrl: 'https://i.pravatar.cc/44',
  };
};

export const getCurrentLocation = async () => {
  return {
    city: 'Cuiabá',
    state: 'Mato Grosso',
  };
};
