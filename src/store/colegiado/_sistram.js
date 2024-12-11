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
		AgregarExpediente: async function (context, datos) {
			datos = {
				expediente: datos
			};
			var respuesta = null;
			await global._axios_post('/sistram/expediente/agregar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		ModificarExpediente: async function (context, datos) {
			datos = {
				expediente: datos
			};
			var respuesta = null;
			await global._axios_put('/sistram/expediente/modificar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		ListarExpediente: async function (context, parametros) {
			var query_string = '';
			if (parametros != null)
				query_string = global._json_to_query_string(parametros);

			const ruta = 'sistram/expediente/listar?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		EliminarExpediente: async function (context, datos) {
			datos = {
				expediente: datos
			};
			var respuesta = null;
			await global._axios_delete('/sistram/expediente/eliminar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		ObtenerExpediente: async function (context, parametros) {
			var query_string = '';
			if (parametros != null)
				query_string = global._json_to_query_string(parametros);
			const ruta = 'sistram/expediente/obtener?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
	}
})
