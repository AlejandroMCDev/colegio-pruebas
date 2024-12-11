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
        Listar: async function (context, parametros) {
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);
            const ruta = '/sistram/movimiento/listar?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
        Agregar: async function (context, datos) {
            datos = {
                movimiento: datos
            };
            var respuesta = null;
            await global._axios_post('/sistram/movimiento/agregar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        Modificar: async function (context, datos) {
            console.log(datos);
            datos = {
                movimiento: datos
            };
            console.log(datos);
            var respuesta = null;
            await global._axios_put('/sistram/movimiento/modificar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        Eliminar: async function (context, datos) {
            datos = {
                movimiento: datos
            };
            var respuesta = null;
            await global._axios_delete('/sistram/movimiento/eliminar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        Obtener: async function (context, parametros) {
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);
            const ruta = 'sistram/movimiento/obtener?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },

    }
})
