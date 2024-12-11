import global from '../global'
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default ({
	namespaced: true,
	state: {
		filtros: {
			filtrosColegiado: "dni",
			searchFiltro: "",
		},
		busqueda: {
			dni: "",
			cqf: "",
			nombreApellido: "",
			page_index: 1,
		},
		resultadoBusqueda: {
			totalRegistros: 0,
			registrosPorPagina: 0,
			paginaActual: 0,
			totalPaginas: 0,
			datos: [],
		},
	},
	getters: {
	},
	mutations: {
		SetResultadoBusqueda: function (state, payload) {
			state.resultadoBusqueda = payload;
		},
		SetBusquedaPagina: function (state, payload) {
			state.busqueda.page_index = payload;
		},
		SetPersonaSeleccionada: async function (state, payload) {
			state.busqueda.dni = payload.dni;
			state.busqueda.cqf = payload.cqfll;
			state.busqueda.nombres = payload.nombres;
		},
		LimpiarPersonaSeleccionada: async function (state, payload) {
			state.busqueda.dni = "";
			state.busqueda.cqf = "";
			state.busqueda.nombres = "";
			state.busqueda.page_index = 1;
			state.filtros.filtrosColegiado = '';
			state.filtros.searchFiltro = '';
		}
	},
	actions: {
		BuscarPersona: async function (context, parametros) {
			var query_string = '';
			if (parametros != null)
				query_string = global._json_to_query_string(parametros);
			const ruta = '/persona/buscar?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				context.commit('SetResultadoBusqueda', res)
				respuesta = res;
			});
			return respuesta;
		},
		SetResultadoBuscarPersona: async function (context, data) {
			context.commit('SetResultadoBusqueda', data)
		},
	}
})
