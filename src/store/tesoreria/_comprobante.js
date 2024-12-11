import global from "../../global";
import moment from "moment";

export default {
    namespaced: true,
    state: {
        comprobante: {
            tipo_comprobante: global.CODIGO_RECIBO,
            forma_pago: global.FORMA_PAGO_EFECTIVO,
            modo_pago: "EFE",
            ruc: "",
            razon_social: "",
            cod_ventanilla: "01",
            tipo_operacion: "CON", // CON -> CONTADO | CRE -> CREDITO
            subtotal: 60,
            total: 60,
            direccion: "",
            descuento: 0,
            convenio: false,
            transaccion_bancaria: {
                cod_ventanilla: "01",
                opeban_codigo: "DEP",
                cta_codigo: "01",
                tra_numoper: "",
                tra_importe: 0,
                tra_importeexceso: 0,
                tra_fechatra: moment(new Date()).format("YYYY-MM-DD"),
                tra_fechainf: moment(new Date()).format("YYYY-MM-DD"),
                tra_fechareg: moment(new Date()).format("YYYY-MM-DD"),
                tra_usuarioreg: "",
                cod_comprobante: 0,
            },
            transaccion_pos:
            {
                cod_ventanilla: "01",
                pos_id: "VIS",
                cod_comprobante: 0,
                trapos_importe: 0,
                trapos_importeexceso: 0,
                trapos_fechatra: moment(new Date()).format("YYYY-MM-DD"),
                trapos_fechainf: moment(new Date()).format("YYYY-MM-DD"),
                trapos_fechareg: moment(new Date()).format("YYYY-MM-DD"),
                trapos_usuarioreg: "",
            },
            observacion: ''
        }
    },
    getters: {},
    mutations: {},
    actions: {
    },
};
