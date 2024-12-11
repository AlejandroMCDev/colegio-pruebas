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
                diversos: datos
            };
            var respuesta = null;
            await global._axios_post('/detalle_movimiento/diversos/agregar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        Modificar: async function (context, datos) {
            datos = {
                diversos: datos
            };
            var respuesta = null;
            await global._axios_put('/detalle_movimiento/diversos/modificar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        Eliminar: async function (context, datos) {
            datos = {
                diversos: datos
            };
            var respuesta = null;
            await global._axios_delete('/detalle_movimiento/diversos/eliminar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        ListarRegistros: async function (context, parametros) {
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);

            const ruta = 'detalle_movimiento/diversos/listar?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
        ObtenerRegistros: async function (context, parametros) {
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);

            const ruta = 'detalle_movimiento/diversos/obtener?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
        ConsultarPagosPendientesDiversos: async function (context, parametros) {
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);

            const ruta = 'detalle_movimiento/diversos/listar-por-persona?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
    }
})
