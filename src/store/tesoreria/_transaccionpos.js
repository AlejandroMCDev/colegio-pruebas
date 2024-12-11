import global from "../../global";

export default ({
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        AgregarTransaccionPos: async function (context, datos) {
            datos = {
                transaccion_pos: datos
            };
            var respuesta = null;
            await global._axios_post('/transaccion-pos/agregar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        ModificarTransaccionPos: async function (context, datos) {
            datos = {
                transaccion_pos: datos
            };
            var respuesta = null;
            await global._axios_put('/transaccion-pos/modificar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },        
        EliminarTransaccionPos: async function (context, datos) {
            datos = {
                transaccion_pos: datos
            };
            var respuesta = null;
            await global._axios_delete('/transaccion-pos/eliminar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        ListarRegistros: async function (context, parametros) {
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);

            const ruta = 'transaccion-pos/listar?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
        TransaccionPosMaestros: async function (context) {
			const ruta = '/transaccion-pos/maestros';
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
    }

})
