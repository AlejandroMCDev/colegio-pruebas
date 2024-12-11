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
        ObtenerCorrelativo: async function (context) {
            const ruta = '/correlativo/obtener';
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },

        ModificarCorrelativo: async function (context, datos) {
           
            datos = {
                correlativo: datos
            };
           
            var respuesta = null;
            await global._axios_put('/correlativo/modificar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },

    }
})
