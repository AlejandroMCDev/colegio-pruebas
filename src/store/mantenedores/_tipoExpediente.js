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
        ListarEstablecimiento: async function (context, parametros) {
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);
            const ruta = '/establecimiento/listar?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
        AgregarEstablecimiento: async function (context, datos) {
            datos = {
                establecimiento: datos
            };
            var respuesta = null;
            await global._axios_post('/establecimiento/agregar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        ModificarEstablecimiento: async function (context, datos) {
            console.log(datos);
            datos = {
                establecimiento: datos
            };
            console.log(datos);
            var respuesta = null;
            await global._axios_put('/establecimiento/modificar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        EliminarEstablecimiento: async function (context, datos) {
            datos = {
                establecimiento: datos
            };
            var respuesta = null;
            await global._axios_delete('/establecimiento/eliminar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        TipoExpedienteDesplegable: async function (context) {
            const ruta = '/sistram/tipo_expediente/desplegable';
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
    }
})
