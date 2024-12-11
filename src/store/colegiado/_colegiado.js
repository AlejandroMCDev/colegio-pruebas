import global from "../../global";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    AgregarColegiado: async function (context, datos) {
      datos = {
        persona: datos,
      };
      var respuesta = null;
      await global._axios_post(
        "/colegiado/persona/agregar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    AgregarProfesional: async function (context, datos) {
      datos = {
        profesional: datos,
      };
      var respuesta = null;
      await global._axios_post(
        "colegiado/profesional/agregar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    AgregarAcademicoEstudio: async function (context, datos) {
      datos = {
        estudio: datos,
      };
      var respuesta = null;
      await global._axios_post(
        "colegiado/academico/estudio/agregar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    AgregarAcademicoCertificado: async function (context, datos) {
      datos = {
        certificado: datos,
      };
      var respuesta = null;
      await global._axios_post(
        "colegiado/academico/certificado/agregar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    AgregarLaboral: async function (context, datos) {
      datos = {
        laboral: datos,
      };
      var respuesta = null;
      await global._axios_post(
        "colegiado/laboral/agregar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    AgregarFamiliar: async function (context, datos) {
      datos = {
        familia: datos,
      };
      var respuesta = null;
      await global._axios_post(
        "colegiado/familia/agregar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    AgregarDeporte: async function (context, datos) {
      datos = {
        deporte: datos,
      };
      var respuesta = null;
      await global._axios_post(
        "colegiado/deporte/agregar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    AgregarDocumento: async function (context, datos) {
      let fd = new FormData();
      fd.append("archivo", datos.archivo);
      fd.append("idPersona", datos.idPersona);
      fd.append("nombre", datos.nombre);

      var respuesta = null;
      await global._axios_post(
        "colegiado/documento/agregar",
        fd,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    AgregarFoto: async function (context, datos) {
      let fd = new FormData();
      fd.append("archivo", datos.archivo);
      fd.append("idPersona", datos.idPersona);

      var respuesta = null;
      await global._axios_post(
        "colegiado/persona/modificar/foto",
        fd,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ListarColegiados: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "colegiado/persona/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListarColegiadosNew: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "colegiado/persona/listarnew?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListarColegiados2: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);

      const ruta = "colegiado/persona/listar2?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListarAcademicoEstudio: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "colegiado/academico/estudio/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListarAcademicoCertificado: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "colegiado/academico/certificado/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListarLaboral: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "colegiado/laboral/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListarFamiliar: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "colegiado/familia/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListarDeporteActividad: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "colegiado/deporte/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListarProfesional: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "colegiado/profesional/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListarDocumento: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "colegiado/documento/listar?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ObtenerColegiado: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "colegiado/persona/obtener?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ObtenerColegiadoAll: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "persona/buscar_all?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ListadoColegiadoCQF: async function (context) {
      const ruta = "colegiado/persona/listar_colegiado";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ColegiadoDesplegable: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "colegiado/persona/desplegable_colegiado?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    PaisDesplegable: async function (context) {
      const ruta = "/pais/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    EspecialidadDesplegable: async function (context) {
      const ruta = "/especialidad/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },

    CentroLaboralDesplegable: async function (context) {
      const ruta = "/centroLaboral/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ColegioCQFDesplegable: async function (context) {
      const ruta = "/colegioCQF/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    DeporteActividadDesplegable: async function (context) {
      const ruta = "/deporteActividad/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    GradoDesplegable: async function (context) {
      const ruta = "/grado/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    InstitucionDesplegable: async function (context) {
      const ruta = "/institucion/desplegable";
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
    SectorLaboralDesplegable: async function (context) {
      const ruta = "/sectorLaboral/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    TipoDocumentoDesplegable: async function (context) {
      const ruta = "/tipoDocumento/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    TipoEventoDesplegable: async function (context) {
      const ruta = "/tipoEvento/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    DepartamentoDesplegable: async function (context) {
      const ruta = "ubicacion/departamento/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ProvinciaDesplegable: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "ubicacion/provincia/desplegable?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    DistritoDesplegable: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "ubicacion/distrito/desplegable?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ZonaDesplegable: async function (context, parametros) {
      var query_string = "";
      if (parametros != null)
        query_string = global._json_to_query_string(parametros);
      const ruta = "/ubicacion/zona/desplegable?" + query_string;
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    TipoColegiadoDesplegable: async function (context) {
      const ruta = "/tipoPersona/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ModalidadDesplegable: async function (context) {
      const ruta = "/modalidad/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
    ModificarColegiado: async function (context, datos) {
      datos = {
        persona: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "colegiado/persona/modificar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ModificarProfesional: async function (context, datos) {
      datos = {
        profesional: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "colegiado/profesional/modificar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ModificarEstudio: async function (context, datos) {
      datos = {
        estudio: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/colegiado/academico/estudio/modificar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ModificarCertificado: async function (context, datos) {
      datos = {
        certificado: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/colegiado/academico/certificado/modificar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ModificarLaboral: async function (context, datos) {
      datos = {
        laboral: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/colegiado/laboral/modificar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ModificarFamiliar: async function (context, datos) {
      datos = {
        familia: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/colegiado/familia/modificar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    ModificarDeporte: async function (context, datos) {
      datos = {
        deporte: datos,
      };
      var respuesta = null;
      await global._axios_put(
        "/colegiado/deporte/modificar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    EliminarCertificado: async function (context, datos) {
      datos = {
        certificado: datos,
      };
      var respuesta = null;
      await global._axios_delete(
        "/colegiado/academico/certificado/eliminar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    EliminarEstudio: async function (context, datos) {
      datos = {
        estudio: datos,
      };
      var respuesta = null;
      await global._axios_delete(
        "/colegiado/academico/estudio/eliminar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    EliminarLaboral: async function (context, datos) {
      datos = {
        laboral: datos,
      };
      var respuesta = null;
      await global._axios_delete(
        "/colegiado/laboral/eliminar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    EliminarFamiliar: async function (context, datos) {
      datos = {
        familia: datos,
      };
      var respuesta = null;
      await global._axios_delete(
        "/colegiado/familia/eliminar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    EliminarDeporte: async function (context, datos) {
      datos = {
        deporte: datos,
      };
      var respuesta = null;
      await global._axios_delete(
        "/colegiado/deporte/eliminar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    EliminarDocumento: async function (context, datos) {
      datos = {
        documento: datos,
      };
      var respuesta = null;
      await global._axios_delete(
        "colegiado/documento/eliminar",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    GenerarDiplomaColegiado: async function (context, datos) {
      datos = {
        idPersona: datos,
      };
      var respuesta = null;
      await global._axios_post(
        "/colegiado/documento/diploma_duplicado",
        datos,
        (res, res2) => {
          respuesta = res2;
        }
      );
      return respuesta;
    },
    CorrelativoCqfTempGet: async function (context) {  

      const ruta = "colegiado/persona/correlativo_temp_get";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },
  },
};
