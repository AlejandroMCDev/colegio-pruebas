import global from "../../global";

export default ({
	namespaced: true,
	state: {
	},
	getters: {
	},
	mutations: {
	},
	actions: {
		Agregar: async function (context, datos) {
			datos = {
				evento: datos
			};
			var respuesta = null;
			await global._axios_post('/evento/agregar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		Modificar: async function (context, datos) {
			datos = {
				evento: datos
			};
			var respuesta = null;
			await global._axios_put('/evento/modificar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		Listado: async function (context, parametros) {
			var query_string = '';
			if (parametros != null)
				query_string = global._json_to_query_string(parametros);

			const ruta = 'evento/listar?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		Obtener: async function (context, parametros) {
			var query_string = '';
			if (parametros != null)
				query_string = global._json_to_query_string(parametros);
			const ruta = 'evento/obtener?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		Eliminar: async function (context, datos) {
			datos = {
				evento: datos
			};
			var respuesta = null;
			await global._axios_delete('/evento/eliminar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		TipoEventoDesplegable: async function (context) {
			const ruta = '/tipoEvento/desplegable';
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		ListadoParticipantes: async function (context, parametros) {
			var query_string = '';
			if (parametros != null)
				query_string = global._json_to_query_string(parametros);

			const ruta = 'evento/participante/listar?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		ConceptoDesplegable: async function (context) {
			const ruta = '/concepto/desplegable';
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		AgregarModificarParticipante: async function (context, datos) {
			datos = {
				evento: datos
			};
			var respuesta = null;
			await global._axios_post('/evento/participante/agregar_modificar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		EliminarParticipante: async function (context, datos) {
			datos = {
				evento: datos
			};
			var respuesta = null;
			await global._axios_delete('/evento/participante/eliminar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
	}
})
