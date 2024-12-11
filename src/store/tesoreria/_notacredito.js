import global from "../../global";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    AgregarNotaCredito: async function (context, datos) {
      datos = {
        notacredito: datos,
      };
      var respuesta = null;
      await global._axios_post("/notacredito/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ModificarNotaCredito: async function (context, datos) {
      datos = {
        notacredito: datos,
      };
      var respuesta = null;
      await global._axios_post(
        "/auxiliar/agregar-modificar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    EliminarNotaCredito: async function (context, datos) {
      datos = {
        notacredito: datos,
      };
      var respuesta = null;
      await global._axios_put("/notacredito/eliminar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ListarRegistros: async function (context, parametros) {
      parametros =
        global.validar_valores_por_defecto_obj_paginacion(parametros);
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "notacredito/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ObtenerComprobante: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "notacredito/comprobante/obtener?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ObtenerComprobanteDetalle: async function (context, parametros) {
      parametros =
        global.validar_valores_por_defecto_obj_paginacion(parametros);
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "notacredito/detallecomprobante/obtener?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    NumeracionNotaCreditoGet: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "notacredito/numeracionget?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
  },
};
