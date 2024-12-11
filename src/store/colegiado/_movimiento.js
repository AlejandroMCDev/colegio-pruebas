import global from "../../global";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    AgregarMovimiento: async function (context, datos) {
      datos = {
        movimiento: datos,
      };
      var respuesta = null;
      await global._axios_post("/movimiento/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ModificarMovimiento: async function (context, datos) {
      datos = {
        movimiento: datos,
      };
      var respuesta = null;
      await global._axios_put("/movimiento/modificar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ListarMovimiento: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "movimiento/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    EliminarMovimiento: async function (context, datos) {
      datos = {
        movimiento: datos,
      };
      var respuesta = null;
      await global._axios_delete("/movimiento/eliminar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
    ObtenerMovimiento: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "movimiento/obtener?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    OperacionDesplegable: async function (context) {
      const ruta = "/operacion/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    MovimientoDetalleDeudaColegiado: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "movimientodetalle/listardeuda/colegiado?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    MovimientoDetalleDeudaDetalleColegiado: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "movimientodetalle/listardeuda/detalle/colegiado?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
  },
};
