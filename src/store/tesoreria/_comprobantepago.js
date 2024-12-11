import global from "../../global";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    ListarPagados: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "comprobante_pago/listar_pagados?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListarApagarPendiente: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "comprobante_pago/listar_apagar_pendiente?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    TipoDocumentoDesplegable: async function (context) {
      const ruta = "comprobantedepago/tipodocumento/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    AgregarComprobantePago: async function (context, datos) {
      datos = {
        comprobantepago: datos,
      };
      var respuesta = null;
      await global._axios_post(
        "/comprobantedepago/agregar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ModificarComprobantePago: async function (context, datos) {
      datos = {
        comprobantepago: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/comprobantedepago/modificar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    AnularComprobantePago: async function (context, datos) {
      datos = {
        comprobantepago: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/comprobantedepago/anular",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ListarComprobantesDePago: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "comprobantedepago/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListarDetalleComprobantesDePago: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "comprobantedepago/detalle/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ObtenerComprobantesDePago: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "comprobantedepago/obtener?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },   
    ObtenerEstadoPagadoComprobantesDePago: async function (
      context,
      parametros
    ) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "comprobantedepago/estadopagado/obtener?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ProgramarComprobantePago: async function (context, datos) {
      datos = {
        comprobantepago: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/comprobantedepago/programacion/agregar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ListarProgramacionPagoPendientes: async function (context) {
      const ruta = "comprobantedepago/programacionpago/pendientes";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListarProgramacionPagoProgramadas: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta =
        "comprobantedepago/programacionpago/programados?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    EliminarProgramacionComprobantePago: async function (context, datos) {
      datos = {
        programacionpago: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/comprobantedepago/programacion/eliminar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ListarComprobantePagoARendir: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "comprobantedepago/listar/arendir?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListarComprobantePagoARendirPDF: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "comprobantedepago/listar/arendir?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    QuitarListaRendir: async function (context, datos) {
      datos = {
        regularizar: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/comprobantedepago/quitar/listarendir",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ListarComprobantesDePagoAll: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "comprobantedepago/listar/all?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    EliminarComprobantePagoDetalle: async function (context, datos) {
      datos = {
        comprobantepago: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/comprobantedepagodetalle/eliminar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
  },
};
