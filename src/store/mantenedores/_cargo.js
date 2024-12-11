import global from "../../global";
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    CargoDesplegable: async function (context) {
      const ruta = "/cargo/desplegable";
      var respuesta = null;
      await global._axios_get(ruta, (res) => {
        respuesta = res;
      });
      return respuesta;
    },

    AgregarCargo: async function (context, datos) {
      datos = {
        cargo: datos,
      };
      var respuesta = null;
      await global._axios_post("/cargo/agregar", datos, (res, res2) => {
        respuesta = res2;
      });
      return respuesta;
    },
  },
};
