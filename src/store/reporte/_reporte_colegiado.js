import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    RelacionColegiadosPorFechas: async function (context, parametros) {
        var query_string = "";
        if (parametros != null)
          query_string = global._json_to_query_string(parametros);
        const ruta = "/reporte/colegiado/porfechas?" + query_string;
        var respuesta = null;
        await global._axios_get(ruta, (res) => {
          respuesta = res;
        });
        return respuesta;
      },
      ListarAgremiados: async function (context, parametros) {
        var query_string = "";
        if (parametros != null)
          query_string = global._json_to_query_string(parametros);
        const ruta = "/reporte/colegiado/listar/agremiados?" + query_string;
        var respuesta = null;
        await global._axios_get(ruta, (res) => {
          respuesta = res;
        });
        return respuesta;
      },
  },
};



