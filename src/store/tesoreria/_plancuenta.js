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
        AgregarPlanCuenta: async function (context, datos) {
            datos = {
                planCuenta: datos
            };
            var respuesta = null;
            await global._axios_post('/plan_cuenta/agregar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        ModificarPlanCuenta: async function (context, datos) {
            datos = {
                planCuenta: datos
            };
            var respuesta = null;
            await global._axios_put('/plan_cuenta/modificar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        ObtenerPlanCuenta: async function (context, parametros) {
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);
            const ruta = 'plan_cuenta/obtener?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
        EliminarPlanCuenta: async function (context, datos) {
            datos = {
                planCuenta: datos
            };
            var respuesta = null;
            await global._axios_delete('/plan_cuenta/eliminar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        ListarRegistros: async function (context, parametros) {
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);

            const ruta = 'plan_cuenta/listar?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        }, 
        PlanCuentaDesplegable: async function (context) {
            const ruta = '/plan_cuenta/desplegable';
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
    }

})
