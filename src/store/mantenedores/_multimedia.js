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
        ListarMultimedia: async function (context, parametros) {
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);
            const ruta = '/sistram/multimedia/listar?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
        EliminarMultimedia: async function (context, datos) {
            datos = {
                multimedia: datos
            };
            var respuesta = null;
            await global._axios_delete('/sistram/multimedia/eliminar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        GenerarUrl: async function (context, datos) {
            let fd = new FormData();
            fd.append("archivo", datos.archivo);

            var respuesta = null;
            await global._axios_post('/sistram/multimedia/generar_url', fd, (res, res2) => {
                respuesta = res2;
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

    }
})
