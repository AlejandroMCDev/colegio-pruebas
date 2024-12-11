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
		AgregarTrasferencia: async function (context, datos) {
			datos = {
				transferencia: datos
			};
			var respuesta = null;
			await global._axios_post('/transferencia/agregar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		ModificarTrasferencia: async function (context, datos) {
			datos = {
				transferencia: datos
			};
			var respuesta = null;
			await global._axios_put('/transferencia/modificar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		ListarTrasferencia: async function (context, parametros) {
			var query_string = '';
			if (parametros != null)
				query_string = global._json_to_query_string(parametros);

			const ruta = 'transferencia/listar?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		EliminarTrasferencia: async function (context, datos) {
			datos = {
				transferencia: datos
			};
			var respuesta = null;
			await global._axios_delete('/transferencia/eliminar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		ObtenerTrasferencia: async function (context, parametros) {
			var query_string = '';
			if (parametros != null)
				query_string = global._json_to_query_string(parametros);
			const ruta = 'transferencia/obtener?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
	}
})
