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
        AgregarConcepto: async function (context, datos) {
            datos = {
                concepto: datos
            };
            var respuesta = null;
            await global._axios_post('/concepto/agregar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        ModificarConcepto: async function (context, datos) {
            datos = {
                concepto: datos
            };
            var respuesta = null;
            await global._axios_put('/concepto/modificar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        ObtenerConcepto: async function (context, parametros) {
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);
            const ruta = 'concepto/obtener?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },       
        EliminarConcepto: async function (context, datos) {
            datos = {
                concepto: datos
            };
            var respuesta = null;
            await global._axios_delete('/concepto/eliminar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        ListarRegistros: async function (context, parametros) {
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);

            const ruta = 'concepto/listar?' + query_string;
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
        LineaDesplegable: async function (context) {
			const ruta = '/linea/desplegable';
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
    }

})
