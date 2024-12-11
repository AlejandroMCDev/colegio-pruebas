import global from "../../global";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    Agregar: async function (context, datos) {
      datos = {
        reembolso_caja_detalle: datos,
      };
      var respuesta = null;
      await global._axios_post(
        "/reembolso_caja_detalle/agregar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    Modificar: async function (context, datos) {
      datos = {
        reembolso_caja_detalle: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/reembolso_caja_detalle/modificar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    Eliminar: async function (context, datos) {
      datos = {
        reembolso_caja_detalle: datos,
      };
      var respuesta = null;
      await global._axios_delete("/reembolso_caja_detalle/eliminar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
  },
};
