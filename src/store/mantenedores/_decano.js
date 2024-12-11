import global from "../../global";
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
		ListarRegistros: async function (context, parametros) {
			var query_string = '';
			if (parametros != null)
				query_string = global._json_to_query_string(parametros);
			const ruta = '/decano/listar?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		AgregarDecano: async function (context, datos) {

			let fd = new FormData();
			fd.append("nombre", datos.nombre);
			fd.append("fecha_inicio", datos.fecha_inicio);
			fd.append("fecha_fin", datos.fecha_fin);
			fd.append("firma", datos.firma);
			fd.append("sello", datos.sello);

			var respuesta = null;
			await global._axios_post('/decano/agregar', fd, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		ModificarDecano: async function (context, datos) {

			let fd = new FormData();
			fd.append("id", datos.id);
			fd.append("nombre", datos.nombre);
			fd.append("fecha_inicio", datos.fecha_inicio);
			fd.append("fecha_fin", datos.fecha_fin);
			fd.append("firma", datos.firma);
			fd.append("sello", datos.sello);
			fd.append("urlFirma", datos.urlFirma);
			fd.append("urlSello", datos.urlSello);		

			var respuesta = null;
			await global._axios_post('/decano/modificar', fd, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		ObtenerDecano: async function (context, parametros) {
			var query_string = '';
			if (parametros != null)
				query_string = global._json_to_query_string(parametros);
			const ruta = 'decano/obtener?' + query_string;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		EliminarDecano: async function (context, datos) {
			datos = {
				decano: datos
			};
			var respuesta = null;
			await global._axios_delete('/decano/eliminar', datos, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
	}
})
