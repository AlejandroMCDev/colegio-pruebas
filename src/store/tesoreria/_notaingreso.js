import global from "../../global";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    Agregar: async function (context, datos) {
      datos = {
        nota_ingreso: datos,
      };
      var respuesta = null;
      await global._axios_post("/nota-ingreso/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    Modificar: async function (context, datos) {
      datos = {
        nota_ingreso: datos,
      };
      var respuesta = null;
      await global._axios_put("/nota-ingreso/modificar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    Anular: async function (context, datos) {
      datos = {
        nota_ingreso: datos,
      };
      var respuesta = null;
      await global._axios_patch("/nota-ingreso/anular", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ListarRegistros: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "nota-ingreso/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ObtenerNotaIngresoNumero: async function (context) {
      const ruta = "nota-ingreso/obtener/numero";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
  },
};
