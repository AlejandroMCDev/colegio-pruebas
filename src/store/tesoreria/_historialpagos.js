import global from "../../global";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    ListarRegistros: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "comprobantes/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    AnularComprobante: async function (context, parametros) {
      var respuesta = null;
      await global._axios_patch("comprobante/anular", parametros, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
  },
};
