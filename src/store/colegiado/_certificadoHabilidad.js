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
		AgregarCertificadoHabilidad: async function (context, datos) {
			datos = {
				certificado: datos
			};
			var respuesta = null;
			await global._axios_post('/certificado_habilidad/agregar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		ModificarCertificadoHabilidad: async function (context, datos) {
			datos = {
				certificado: datos
			};
			var respuesta = null;
			await global._axios_put('/certificado_habilidad/modificar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		ObtenerCertificadoHabilidad: async function (context, parametros) {
			var query_string = '';
			if (parametros != null)
				query_string = global._json_to_query_string(parametros);
			const ruta = 'certificado_habilidad/obtener?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		GenerarUrlCertificado: async function (context, datos) {
			datos = {
				certificado: datos
			};
			var respuesta = null;
			await global._axios_post('/certificado_habilidad/generar_url', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		EliminarCertificadoHabilidad: async function (context, datos) {
			datos = {
				certificado: datos
			};
			var respuesta = null;
			await global._axios_delete('/certificado_habilidad/eliminar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		ListarCertificadoHabilidad: async function (context, parametros) {
			var query_string = '';
			if (parametros != null)
				query_string = global._json_to_query_string(parametros);

			const ruta = 'certificado_habilidad/listar?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},		
	}

})
