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
            const ruta = '/tipoResolucion/listar?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
        Agregar: async function (context, datos) {
            datos = {
                tipo_resolucion: datos
            };
            var respuesta = null;
            await global._axios_post('/tipoResolucion/agregar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        Modificar: async function (context, datos) {
            console.log(datos);
            datos = {
                tipo_resolucion: datos
            };
            console.log(datos);
            var respuesta = null;
            await global._axios_put('/tipoResolucion/modificar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        Eliminar: async function (context, datos) {
            datos = {
                tipo_resolucion: datos
            };
            var respuesta = null;
            await global._axios_delete('/tipoResolucion/eliminar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        TipoResolucionDesplegable: async function (context) {
            const ruta = '/tipoResolucion/desplegable';
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },

    }
})
