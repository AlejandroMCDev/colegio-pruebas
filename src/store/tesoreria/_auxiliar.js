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
        AgregarAuxiliar: async function (context, datos) {
            datos = {
                auxiliar: datos
            };
            var respuesta = null;
            await global._axios_post('/auxiliar/agregar-modificar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        ModificarAuxiliar: async function (context, datos) {
            datos = {
                auxiliar: datos
            };
            var respuesta = null;
            await global._axios_post('/auxiliar/agregar-modificar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },      
        EliminarAuxiliar: async function (context, datos) {
            datos = {
                auxiliar: datos
            };
            var respuesta = null;
            await global._axios_delete('/auxiliar/eliminar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        ListarRegistros: async function (context, parametros) {
            parametros = global.validar_valores_por_defecto_obj_paginacion(parametros);
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);

            const ruta = 'auxiliar/listar?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
        TipoPersonaDesplegable: async function (context) {
            const ruta = '/tipoPersona-auxiliar/desplegable';
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
        ValidaPersonaExiste: async function (context, parametros) {
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);
            const ruta = 'auxiliar/verificar/persona/existe?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
    }

})
