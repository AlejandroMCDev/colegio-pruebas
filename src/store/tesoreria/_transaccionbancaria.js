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
        AgregarTransaccionBancaria: async function (context, datos) {
            datos = {
                transaccion_bancaria: datos
            };
            var respuesta = null;
            await global._axios_post('/transaccion-bancaria/agregar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        ModificarTransaccionBancaria: async function (context, datos) {
            datos = {
                transaccion_bancaria: datos
            };
            var respuesta = null;
            await global._axios_put('/transaccion-bancaria/modificar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },        
        EliminarTransaccionBancaria: async function (context, datos) {
            datos = {
                transaccion_bancaria: datos
            };
            var respuesta = null;
            await global._axios_delete('/transaccion-bancaria/eliminar', datos, (res, res2) => {
                respuesta = res2;
            });
            return respuesta;
        },
        ListarRegistros: async function (context, parametros) {
            var query_string = '';
            if (parametros != null)
                query_string = global._json_to_query_string(parametros);

            const ruta = 'transaccion-bancaria/listar?' + query_string;
            var respuesta = null;
            await global._axios_get(ruta, (res) => {
                respuesta = res;
            });
            return respuesta;
        },
        TransaccionBancariaMaestros: async function (context) {
			const ruta = '/transaccion-bancaria/maestros';
			var respuesta = null;
			await global._axios_get(ruta, (res) => {
				respuesta = res;
			});
			return respuesta;
		},
    }

})
