import global from '../global'
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default ({
	namespaced: true,
	state: {
	},
	getters: {
	},
	mutations: {
	},
	actions: {
		ListarDocumentos: async function (context, parametros) {
			var query_string = '';
			if (parametros != null)
				query_string = global._json_to_query_string(parametros);
			const ruta = '/documentos/listar?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		AgregarDocumento: async function (context, datos) {
            datos = {
                documento: datos
            };
			var respuesta = null;
			await global._axios_post('/documento/agregar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		ModificarDocumento: async function (context, datos) {
			console.log(datos);
            datos = {
                documento: datos
            };
			console.log(datos);
			var respuesta = null;
			await global._axios_put('/documento/modificar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		EliminarDocumento: async function (context, datos) {
            datos = {
                documento: datos
            };
			var respuesta = null;
			await global._axios_delete('/documento/eliminar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
	}
})
