import global from "../../global";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    Agregar: async function (context, datos) {
      datos = {
        resolucion: datos,
      };
      var respuesta = null;
      await global._axios_post("/resolucion/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    Modificar: async function (context, datos) {
      datos = {
        resolucion: datos,
      };
      var respuesta = null;
      await global._axios_put("/resolucion/modificar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    Listar: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "resolucion/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    Eliminar: async function (context, datos) {
      datos = {
        resolucion: datos,
      };
      var respuesta = null;
      await global._axios_delete("/resolucion/eliminar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    Obtener: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "resolucion/obtener?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListarDescuentoResolucion: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "resolucion/listar/descuento?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    AplicarDescuentoResolucion: async function (context, datos) {
      datos = {
        descuento: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/resolucion/aplicar/descuento",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    AnularDescuentoResolucion: async function (context, datos) {
      datos = {
        descuento: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/resolucion/anular/descuento",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
  },
};
