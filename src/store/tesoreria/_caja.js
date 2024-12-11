import global from "../../global";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    InformeCuadreCaja: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "caja/cuadrecaja/informe?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    CerrarCaja: async function (context, datos) {
      datos = {
        cuadrecaja: datos,
      };
      var respuesta = null;
      await global._axios_post("/caja/cuadrecaja/close", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    AbrirCaja: async function (context, datos) {
      datos = {
        cuadrecaja: datos,
      };
      var respuesta = null;
      await global._axios_put("/caja/cuadrecaja/open", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
  },
};
