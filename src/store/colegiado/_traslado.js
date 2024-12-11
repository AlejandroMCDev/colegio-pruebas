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
		AgregarTraslado: async function (context, datos) {
			datos = {
				traslado: datos
			};
			var respuesta = null;
			await global._axios_post('/traslado/agregar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		ModificarTraslado: async function (context, datos) {
			datos = {
				traslado: datos
			};
			var respuesta = null;
			await global._axios_put('/traslado/modificar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		ListarTraslado: async function (context, parametros) {
			var query_string = '';
			if (parametros != null)
				query_string = global._json_to_query_string(parametros);

			const ruta = 'traslado/listado?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		ListarCuotasAll: async function (context) {			
			const ruta = 'traslado/cuotas/listar';
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		EliminarTrasferencia: async function (context, datos) {
			datos = {
				traslado: datos
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
			const ruta = 'traslado/obtener?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		GenerarUrlTraslado: async function (context, datos) {
			datos = {
				traslado: datos
			};
			var respuesta = null;
			await global._axios_post('/traslado/generar_url', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
	}
})
