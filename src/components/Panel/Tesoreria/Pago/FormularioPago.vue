<template>
    <div class="card-body pb-2">
        <h3 class="text-center">Resumen de Pago</h3>
        <form @submit.prevent="GoGenerarComprobante()">
            <div class="row" v-if="comprobante != null">
                <div class="col-sm-4 col-md-3">
                    <div class="form-group">
                        <div class="form-floating">
                            <input
                                type="number"
                                class="form-control"
                                placeholder="DNI"
                                :value="comprobante.nro_doc"
                                readonly
                            />
                            <label>DNI</label>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8 col-md-3">
                    <div class="form-group">
                        <div class="form-floating">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Cliente"
                                :value="comprobante.cod_ficha"
                                readonly
                            />
                            <label>N° CQFLL</label>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8 col-md-6">
                    <div class="form-group">
                        <div class="form-floating">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Nombres"
                                :value="comprobante.nombres"
                                readonly
                            />
                            <label>Nombres</label>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3">
                    <div class="form-group">
                        <div class="form-floating">
                            <input
                                type="date"
                                class="form-control"
                                :value="fecha_actual"
                                readonly
                            />
                            <label>Fecha</label>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3">
                    <div class="form-group">
                        <div class="form-floating">
                            <input
                                type="text"
                                class="form-control"
                                value="Nuevo Sol (S./)"
                                readonly
                            />
                            <label>Moneda</label>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6">
                    <div class="form-group">
                        <div class="form-floating">
                            <select
                                class="form-control form-select select2"
                                data-bs-placeholder="Tipo de comprobante"
                                v-model="comprobante.tipo_comprobante"
                                @change="tipo_comprobante_seleccionado()"
                                :disabled="flagForzarPagoFactura"
                            >
                                <option value="" disabled>Filtros</option>
                                <option :value="CODIGO_RECIBO">
                                    Ticket Recibo
                                </option>
                                <option :value="CODIGO_FACTURA">
                                    Factura Electrónica
                                </option>
                                <option :value="CODIGO_BOLETA">
                                    Boleta Electrónica
                                </option>
                            </select>
                            <label>Tipo de comprobante</label>
                        </div>
                    </div>
                </div>
                <div
                    class="col-sm-8 col-md-8"
                    v-if="comprobante.tipo_comprobante == CODIGO_FACTURA"
                >
                    <div class="form-group">
                        <div class="form-floating">
                            <input
                                type="number"
                                class="form-control"
                                v-model="comprobante.ruc"
                                required
                                maxlength="11"
                            />
                            <label>RUC</label>
                        </div>
                    </div>
                </div>
                <div
                    class="col-sm-4 col-md-4"
                    v-if="comprobante.tipo_comprobante == CODIGO_FACTURA"
                >
                    <div class="d-flex justify-content-center">
                        <button
                            class="btn btn-outline-primary mt-2"
                            type="button"
                            @click="BuscaAuxiliarRuc()"
                        >
                            Buscar RUC
                        </button>
                    </div>
                </div>
                <div
                    class="col-sm-12 col-md-12"
                    v-if="comprobante.tipo_comprobante == CODIGO_FACTURA"
                >
                    <div class="form-group">
                        <div class="form-floating">
                            <input
                                type="text"
                                class="form-control"
                                v-model="comprobante.razon_social"
                                required
                                maxlength="50"
                            />
                            <label>Razon social</label>
                        </div>
                    </div>
                </div>
                <div
                    class="col-sm-12 col-md-12"
                    v-if="comprobante.tipo_comprobante == CODIGO_FACTURA"
                >
                    <div class="form-group">
                        <div class="form-floating">
                            <input
                                type="text"
                                class="form-control"
                                v-model="comprobante.direccion"
                                required
                                maxlength="80"
                            />
                            <label>Dirección</label>
                        </div>
                    </div>
                </div>
            </div>

            <DetallePago :detallePago="comprobanteDetalle" @procesarComprobanteDetalle="procesarComprobanteDetalle"/>

            <fieldset class="border p-2">
                <legend class="float-none w-auto">
                    <h5>Forma de Pago</h5>
                </legend>
                <DetalleFormaPago @forma_pago_cambio="forma_pago_cambio" />
            </fieldset>

            <fieldset class="border p-2 mt-2">
                <legend class="float-none w-auto">
                    <h5>Observación</h5>
                </legend>
                <div class="form-group">
                    <textarea
                        class="form-control"
                        rows="3"
                        placeholder="Escribir observación"
                        v-model="comprobante.observacion"
                    >
                    </textarea>
                </div>
            </fieldset>

            <div class="text-center mt-2">
                <loading :mostrar="procesando_pago" />
                <button
                    :disabled="procesando_pago"
                    class="btn btn-primary"
                    type="submit"
                >
                    Pagar
                </button>
            </div>
        </form>
        <!-- Modal -->
        <div
            class="modal fade"
            id="staticBackdropResumenPago"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                            Resumen de Pago
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            aria-label="Close"
                            @click="RecargarPagina"
                        >
                            <i class="fa fa-close"></i>
                        </button>
                    </div>
                    <div
                        class="modal-body container"
                        v-if="resultado_comprobante != null"
                    >
                        <ResumenPago :comprobante="resultado_comprobante" />
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="RecargarPagina"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapState } from "vuex";
import global from "../../../../global";
import DetallePago from "../Pago/DetallePago.vue";
import DetalleFormaPago from "../Pago/DetalleFormaPago.vue";
import ResumenPago from "../Pago/ResumenPago.vue";
import Loading from "../../../varios/Loading.vue";
export default {
    props: {
        persona: Object,
        comprobanteDetalle: Array,
        flagForzarPagoFactura: Boolean,
    },
    components: { DetallePago, DetalleFormaPago, ResumenPago, Loading },
    data() {
        return {
            /*comprobante: {
                tipo_comprobante: 9,
                forma_pago: 1,
                modo_pago: "EFE",
            },*/
            fecha_actual: moment(new Date()).format("YYYY-MM-DD"),
            CODIGO_RECIBO: global.CODIGO_RECIBO,
            CODIGO_FACTURA: global.CODIGO_FACTURA,
            CODIGO_BOLETA: global.CODIGO_BOLETA,
            resultado_comprobante: null,
            procesando_pago: false,

            FORMA_PAGO_EFECTIVO: global.FORMA_PAGO_EFECTIVO,
            FORMA_PAGO_TRANSACCION_BANCARIA:
                global.FORMA_PAGO_TRANSACCION_BANCARIA,
            FORMA_PAGO_POS: global.FORMA_PAGO_POS,
        };
    },
    computed: {
        ...mapState({
            comprobante: (state) => state._comprobante.comprobante,

            PARAMETRO_PAGO_POS_CONCEPTO: (state) =>
                state._parametro.PARAMETRO_PAGO_POS_CONCEPTO,
            PARAMETRO_PAGO_POS_PORCENTAJE: (state) =>
                state._parametro.PARAMETRO_PAGO_POS_PORCENTAJE,
        }),
    },
    watch: {
        /*comprobanteDetalle: function () {
            this.procesarComprobanteDetalle();
        },*/
    },
    methods: {
        ...mapActions({
            ListarRegistrosAuxiliar: "_auxiliar/ListarRegistros",
        }),
        ...mapActions({
            RealizarPago: "_tesoreria/RealizarPago",
        }),
        AbrirModal: function () {
            new bootstrap.Modal($("#staticBackdropResumenPago")).show();
        },
        CerrarModal: function () {
            var modal = bootstrap.Modal.getInstance(
                document.getElementById("staticBackdropResumenPago")
            );
            modal.hide();
        },
        RecargarPagina: function () {
            this.$router.go();
        },
        BuscaAuxiliarRuc: async function () {
            var res = await this.ListarRegistrosAuxiliar({
                ruc: this.comprobante.ruc,
            });
            var encontrado = false;
            var persona = null;
            try {
                console.log(res.datos[0].ruc.length);
                if (res.datos[0].ruc.length == 11) {
                    persona = res.datos[0];
                    encontrado = true;
                }
            } catch (e) {
                encontrado = false;
            }
            if (encontrado == true) {
                this.comprobante.razon_social =
                    persona.nombres +
                    " " +
                    persona.apellidoPaterno +
                    " " +
                    persona.apellidoMaterno;
                this.comprobante.direccion = persona.direccion;
            } else {
                global._mensaje_error(
                    "RUC no encontrado, si esta seguro que el ruc existe, por favor contactarse con el administrador"
                );
            }
        },
        procesarComprobanteDetalle: async function () {
            if (this.comprobanteDetalle.length == 0) return;
            this.comprobante.subtotal = this.comprobanteDetalle
                .map((x) => x.importe)
                .reduce((x, y) => parseFloat(x) + parseFloat(y));
            this.comprobante.subtotal = parseFloat(
                this.comprobante.subtotal
            ).toFixed(2);
            this.comprobante.total = this.comprobanteDetalle
                .map((x) => x.importe)
                .reduce((x, y) => parseFloat(x) + parseFloat(y));
            this.comprobante.total = parseFloat(this.comprobante.total).toFixed(
                2
            );

            this.comprobante.transaccion_bancaria.tra_importe =
                this.comprobante.total;
            this.comprobante.transaccion_pos.trapos_importe =
                this.comprobante.total;

            // eliminando forma pago pos, y si tiene, se agrega recalculado
            await this.comprobanteDetalle.forEach(async (x, index) => {
                if (x.cod_concepto == this.PARAMETRO_PAGO_POS_CONCEPTO) {
                    await this.$emit("eliminar_detalle", index);
                }
            });
            if (this.comprobante.forma_pago == this.FORMA_PAGO_POS) {
                var precio_pos =
                    parseFloat(this.comprobante.total) *
                    this.PARAMETRO_PAGO_POS_PORCENTAJE;
                precio_pos = parseFloat(precio_pos.toFixed(2));
                this.comprobanteDetalle.push({
                    cod_concepto: this.PARAMETRO_PAGO_POS_CONCEPTO,
                    descripcion: "CARGO POS",
                    cantidad: 1,
                    flagCantidadModificable: false,
                    precio: precio_pos,
                    flagPrecioModificable: false,
                    importe: precio_pos,
                    valorventa: precio_pos,
                    afecto: true,
                });
            }
            console.log(this.comprobanteDetalle);
        },
        tipo_comprobante_seleccionado: function () {
            this.comprobante.ruc = "";
            this.comprobante.razon_social = "";
            this.comprobante.direccion = "";
            if (this.comprobante.tipo_comprobante == this.CODIGO_RECIBO) {
                this.comprobanteDetalle.forEach((item) => {
                    item.afecto = false;
                });
            } else if (
                this.comprobante.tipo_comprobante == this.CODIGO_FACTURA ||
                this.comprobante.tipo_comprobante == this.CODIGO_BOLETA
            ) {
                this.comprobanteDetalle.forEach((item) => {
                    item.afecto = true;
                });
            }
        },
        GoGenerarComprobante: async function () {
            this.procesando_pago = true;
            this.procesarComprobanteDetalle();
            var res = await this.RealizarPago({
                comprobante: this.comprobante,
                comprobante_detalle: this.comprobanteDetalle,
            });
            this.procesando_pago = false;
            if (res.exito) {
                this.resultado_comprobante = res.datos;
                var cod_comprobante = res.datos.comprobante.cod_comprobante;
                await global._mensaje_exito(
                    `El pago se ha realizado correctamente. Codigo de comprobante: ${cod_comprobante}`
                );
                this.AbrirModal();
                //this.$router.go();
            }
        },
        generarObjetoComprobante: function () {
            this.comprobante.cod_persona = this.persona.id;
            this.comprobante.cod_ficha = this.persona.cqfll;
            this.comprobante.nro_doc = this.persona.dni;
            this.comprobante.nombres = `${this.persona.apellidoPaterno} ${this.persona.apellidoMaterno}, ${this.persona.nombres}`;
            //ruc: this.persona.ruc,
            //razon_social: `${this.persona.apellidoPaterno} ${this.persona.apellidoMaterno}, ${this.persona.nombres}`,
            //direccion: this.persona.direccion,

            if (this.persona.id == "") this.comprobante.nombres = "";
        },
        forma_pago_cambio: function (forma_pago) {
            if (this.comprobante.forma_pago == this.FORMA_PAGO_EFECTIVO)
                this.comprobante.modo_pago = "EFE";
            else if (
                this.comprobante.forma_pago ==
                this.FORMA_PAGO_TRANSACCION_BANCARIA
            )
                this.comprobante.modo_pago = "BAN";
            else if (this.comprobante.forma_pago == this.FORMA_PAGO_POS)
                this.comprobante.modo_pago = "TAR";
            this.$forceUpdate();

            this.procesarComprobanteDetalle();
        },
        iniciar: function () {
            this.generarObjetoComprobante();
            if (this.flagForzarPagoFactura == true)
                this.comprobante.tipo_comprobante = this.CODIGO_FACTURA;
        },
    },
    mounted() {
        this.iniciar();
    },
};
</script>
