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
        CuotaGenerar: async function (context, datos) {
            datos = {
                cod_cuota: datos
            };
            var respuesta = null;
            await global._axios_post('/cuota/generar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        MesesGenerar: async function (context, datos) {
            datos = {
                anio: datos
            };
            var respuesta = null;
            await global._axios_post('/cuota/generar-meses', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        ListarRegistros: async function (context, parametros) {
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);

            const ruta = 'cuota?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
        ObtenerCuotaActual: async function (context) {
            const ruta = '/cuota-actual';
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
        GenerarCuotasMensuales: async function (context, datos) {
            datos = {
                cuotas: datos
            };
            var respuesta = null;
            await global._axios_post('/cuotas-mensuales/generar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
    }
})
