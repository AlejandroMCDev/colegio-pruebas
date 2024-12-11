import global from '../global'
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default ({
	namespaced: true,
	state: {
		maestros: {
			tipodoc: [],
			lista_conceptos: [],
		}
	},
	getters: {
	},
	mutations: {
		CargarMaestros: function (state, payload) {
			state.maestros.tipodoc = payload.tipodoc;
			state.maestros.lista_conceptos = payload.lista_conceptos;
			state.maestros.lista_conceptos.forEach(element => {
				element.precio = parseFloat(element.precio)
				element.seleccionado = false;
			});
			console.log(state.maestros.lista_conceptos);
		},
		CambiarEstado_lista_conceptos: function (state, payload) {
			state.maestros.lista_conceptos.forEach((item, index) => {
				if (item.cod_concepto == payload.cod_concepto)
					state.maestros.lista_conceptos[index].seleccionado = payload.estado;
			});
		},
	},
	actions: {
		CargarMaestros: async function (context) {
			await global._axios_get('/pagos/maestros', (res) => {
				context.commit("CargarMaestros", res);
			});
		},
		ObtenerDeuda: async function (context, cod_ficha) {
			const ruta = '/deuda/' + cod_ficha;
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		RealizarPago: async function (context, data) {
			var respuesta = null;
			await global._axios_post('/pagos/pagar', data, (res, res2) => {
				respuesta = res2;
			});
			return respuesta;
		},
		AgregarDeuda: async function (context, data) {
			var respuesta = null;
			await global._axios_patch('/deuda/agregar', data, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
		QuitarDeuda: async function (context, data) {
			var respuesta = null;
			await global._axios_patch('/deuda/quitar', data, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
	}
})
