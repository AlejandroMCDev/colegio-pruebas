<template>
    <div class="row">
        <div class="col-sm-12 col-md-12">
            <div class="form-group">
                <div class="form-floating">
                    <select
                        class="form-control form-select select2"
                        data-bs-placeholder="Tipo de comprobante"
                        v-model="comprobante.forma_pago"
                        @change="tipo_comprobante_seleccionado()"
                    >
                        <option value="" disabled>Seleccione</option>
                        <option :value="FORMA_PAGO_EFECTIVO">Efectivo</option>
                        <!--EFE - 1 -->
                        <option :value="FORMA_PAGO_TRANSACCION_BANCARIA">
                            Transacción Bancaria
                        </option>
                        <!--BAN - 2 -->
                        <option :value="FORMA_PAGO_POS">POS</option>
                        <!--TAR - 3 -->
                    </select>
                    <label>Forma de Pago</label>
                </div>
            </div>
        </div>
        <div v-if="comprobante.forma_pago == '2'" class="col-sm-6 col-md-3">
            <div class="form-group">
                <div class="form-floating">
                    <select
                        class="form-control form-select select2"
                        data-bs-placeholder="Tipo de comprobante"
                        v-model="
                            comprobante.transaccion_bancaria.cod_ventanilla
                        "
                    >
                        <option value="">Ventanilla</option>
                        <option value="01">01-Caja</option>
                        <option value="02">Otros</option>
                    </select>
                    <label>Ventanilla</label>
                </div>
            </div>
        </div>
        <div v-if="comprobante.forma_pago == '2'" class="col-sm-6 col-md-3">
            <div class="form-group">
                <div class="form-floating">
                    <select
                        class="form-control form-select select2"
                        data-bs-placeholder="Tipo de comprobante"
                        v-model="comprobante.transaccion_bancaria.opeban_codigo"
                    >
                        <option
                            v-for="item in operacion_bancaria"
                            :key="item.opeban_codigo"
                            :label="item.opeban_nombre"
                            :value="item.opeban_codigo"
                        ></option>
                    </select>
                    <label>Tipo de operación</label>
                </div>
            </div>
        </div>
        <div v-if="comprobante.forma_pago == '2'" class="col-sm-12 col-md-6">
            <div class="form-group">
                <div class="form-floating">
                    <select
                        class="form-control form-select select2"
                        data-bs-placeholder="Tipo de comprobante"
                        v-model="comprobante.transaccion_bancaria.cta_codigo"
                    >
                        <option
                            v-for="item in banco"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></option>
                    </select>
                    <label>Banco</label>
                </div>
            </div>
        </div>
        <div v-if="comprobante.forma_pago == '2'" class="col-sm-12 col-md-6">
            <div class="form-group">
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        v-model="comprobante.transaccion_bancaria.tra_numoper"
                    />
                    <label>Numero de operacion</label>
                </div>
            </div>
        </div>
        <div v-if="comprobante.forma_pago == '2'" class="col-sm-12 col-md-6">
            <div class="form-group">
                <div class="form-floating">
                    <input
                        type="date"
                        class="form-control"
                        v-model="comprobante.transaccion_bancaria.tra_fechatra"
                    />
                    <label>Fecha de transacción</label>
                </div>
            </div>
        </div>
        <div v-if="comprobante.forma_pago == '3'" class="col-sm-6 col-md-6">
            <div class="form-group">
                <div class="form-floating">
                    <select
                        class="form-control form-select select2"
                        data-bs-placeholder="Tipo de comprobante"
                        v-model="comprobante.transaccion_pos.cod_ventanilla"
                    >
                        <option value="" disabled>Ventanilla</option>
                        <option value="01">01-Caja</option>
                        <option value="02">Otros</option>
                    </select>
                    <label>Ventanilla</label>
                </div>
            </div>
        </div>
        <div v-if="comprobante.forma_pago == '3'" class="col-sm-6 col-md-6">
            <div class="form-group">
                <div class="form-floating">
                    <select
                        class="form-control form-select select2"
                        data-bs-placeholder="Tipo de comprobante"
                        v-model="comprobante.transaccion_pos.pos_id"
                    >
                        <option
                            v-for="item in lista_pos"
                            :key="item.cod_varios"
                            :label="item.dsc_varios"
                            :value="item.cod_varios"
                        ></option>
                    </select>
                    <label>Tipo de Tarjeta</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import global from "../../../../global";
export default {
    name: "DetalleFormaPago",
    props: {
        //comprobante: Object,
    },
    data() {
        return {
            banco: [],
            bancocuenta: [],
            operacion_bancaria: [],

            lista_pos: [],

            FORMA_PAGO_EFECTIVO: global.FORMA_PAGO_EFECTIVO,
            FORMA_PAGO_TRANSACCION_BANCARIA:
                global.FORMA_PAGO_TRANSACCION_BANCARIA,
            FORMA_PAGO_POS: global.FORMA_PAGO_POS,
        };
    },
    computed: {
        ...mapState({
            comprobante: (state) =>
                state._comprobante.comprobante,
        }),
    },
    methods: {
        ...mapActions({
            TransaccionPosMaestros: "_transaccionpos/TransaccionPosMaestros",
            TransaccionBancariaMaestros:
                "_transaccionbancaria/TransaccionBancariaMaestros",
        }),
        tipo_comprobante_seleccionado: function () {
            this.$emit("forma_pago_cambio", this.comprobante.forma_pago);
        },
    },
    async created() {
        var res = await this.TransaccionBancariaMaestros();
        const { banco, bancocuenta, operacion_bancaria } = res;
        this.operacion_bancaria = operacion_bancaria;
        let bancoxcuenta = [];
        bancocuenta.forEach((item) => {
            banco.forEach((item2) => {
                if (item.cod_banco == item2.cod_banco) {
                    let datosnuevos = {
                        value: item.cod_cuenta,
                        label: item2.dsc_banco + " " + item.nro_cuenta,
                    };
                    bancoxcuenta.push(datosnuevos);
                }
            });
        });
        this.banco = bancoxcuenta;

        var res = await this.TransaccionPosMaestros();
        const { lista_pos_id } = res;
        this.lista_pos = lista_pos_id;
    },
};
</script>
