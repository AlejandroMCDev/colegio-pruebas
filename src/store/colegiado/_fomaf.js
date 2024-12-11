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
		Generar: async function (context, datos) {
			datos = {
				documento: datos
			};
			var respuesta = null;
			await global._axios_post('/fomaf/documento/generar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		Modificar: async function (context, datos) {
			datos = {
				beneficiario: datos
			};
			var respuesta = null;
			await global._axios_put('/fomaf/modificar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		ListarDocumento: async function (context, parametros) {
			var query_string = '';
			if (parametros != null)
				query_string = global._json_to_query_string(parametros);

			const ruta = 'fomaf/documento/listar?' + query_string;
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
			const ruta = 'fomaf/obtener?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		Subir_Archivo: async function (context, datos) {

			let fd = new FormData();
			fd.append("archivo", datos.archivo);
			fd.append("idPersona", datos.idPersona);

			var respuesta = null;
			await global._axios_post('fomaf/documento/Subir_Archivo', fd, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		EliminarDocumento: async function (context, datos) {
			datos = {
				documento: datos
			};
			var respuesta = null;
			await global._axios_delete('/fomaf/documento/eliminar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},		
	}
})
