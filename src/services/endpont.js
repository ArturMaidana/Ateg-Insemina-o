import api from '../services/api';

export default {

    getUsuario: async () => {
		const json = await api.get('/usuario');
		return json?.data || [];
    },

    getJustificationVisits: async () => {
		const json = await api.get('/ateg/inseminacao/mobile/justificativa-visita');
		return json?.data || [];
    },

	getInsemincaoVisita: async (date) => {
		const response = await api.post('/ateg/inseminacao/mobile/schedule', {
			date: date
		});
		return response?.data || [];
    },

	postVisita: async (imageSent) => {
		const response = await api.post('/ateg/inseminacao/mobile/registrar-inseminacao', imageSent, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
		});
		return response?.data || [];
    },

	postSendVisita: async (data) => {
		const response = await api.post('/ateg/inseminacao/mobile/registrar-visita-inseminacao', data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
		});
		return response?.data || [];
    },

	postSendVisitaImage: async (id, data) => {
		const response = await api.post(`/ateg/inseminacao/mobile/registrar-visita-inseminacao-imagem/${id}`, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
		});
		return response?.data || [];
    },

	postSendVisitaVisited: async (data) => {
		const response = await api.post('/ateg/inseminacao/mobile/registrar-visita-inseminacao-visited', data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
		});
		return response?.data || [];
    },

	postInsemincaoVisita: async (checkin, 
		checkout,
		haveAttendence,
		id,
		inseminacao_schedule_id,
		latitude_in,
		latitude_out,
		longitude_in,
		longitude_out,
		message,
		pending,
		sent,
		status,
		technician) => {
		const response = await api.post('/mobile/registrar-inseminacao', {
			checkin: checkin,
			checkout: checkout,
			haveAttendence: haveAttendence,
			id: id,
			inseminacao_schedule_id: inseminacao_schedule_id,
			latitude_in: latitude_in,
			latitude_out: latitude_out,
			longitude_in: longitude_in,
			longitude_out: longitude_out,
			message: message,
			pending: pending,
			sent: sent,
			status: status,
			technician: technician
		});
		return response?.data || [];
    },
};
