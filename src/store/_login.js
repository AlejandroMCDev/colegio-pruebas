import global from '../global'
//import { useCookies } from "vue3-cookies";
//const { cookies } = useCookies();

export default ({
	namespaced: true,
	state: {
		jwt: null,
		usuario: {},
		//jwt: cookies.get('jwt') || null,
		//usuario: cookies.get('usuario') || {},
		//tipo_usuario: cookies.get('tipo_usuario') || '',
		//usuario: cookies.get('usuario') || null,
		//acciones: cookies.get('acciones') || null,
	},
	getters: {
		usuario: ({ usuario }) => {
			return usuario;
		},
		/*
		usuario_nombre : (state) => () => {
			return state.usuario?.nombres ?? null;
		},
		*/
		/*usuario: ({ usuario }) => {
			return usuario;
		},
		usuario_nombre: ({ usuario }) => {
			return `${usuario.paterno} ${usuario.materno} ${usuario.nombres}`;
		},
		tipo_usuario: (state) => {
			switch (state.tipo_usuario) {
				case 'A': case 'C': return state.tipo_usuario;
			}
			return null;
		},
		tipo_usuario_txt: (state) => {
			switch (state.tipo_usuario) {
				case 'A': return "Administrador";
				case 'C': return "Colegiado";
			}
			return null;
		},
		esta_logueado: (state) => {
			return (cookies.get('jwt') || null) != null;
		}
		*/
	},
	mutations: {
		login(state, data) {
			state.usuario = data;
		},
		/*login(state, data) {
			state.jwt = data.jwt;
			state.usuario = data.user;			
		},
		logout: function (state) {
			state.jwt = null;
			state.usuario = null;			
		},*/
	},
	actions: {
		/*login: async function (context, datos) {
			var respuesta = false;
			await global._axios_post('/login', datos, (res) => {
				context.commit('login', res);
				respuesta = true;
			});
			return respuesta;
		},*/
		login: async function (context, datos) {
			var respuesta = false;
			await global._axios_post("/login/usuario", datos, (res) => {
				if (res != null) {
					context.commit("login", res);
					localStorage.setItem("login", JSON.stringify(res));
					respuesta = true;
				} else {
					respuesta = false;
				}
			});
			return respuesta;
		},
	}
})
