<template>
    <div class="card-header">
        <h3 class="card-title">Control de Cuotas</h3>
    </div>
    <div class="card-body pb-2">
        <h3 class="text-center">Control de Cuotas</h3>

        <BusquedaColegiado @PersonaSeleccionada="PersonaSeleccionada" :persona="persona" />

        <br />

        <fieldset class="border p-2" v-if="persona != null">
            <legend class="float-none w-auto">
                <h5>Deuda</h5>
            </legend>
            <div class="accordion" id="accordionExample">
                <div
                    class="accordion-item"
                    v-if="listaDeuda?.cuota?.length != 0"
                >
                    <h2 class="accordion-header" id="headingOne">
                        <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseCuotaOrdinaria"
                            aria-expanded="true"
                            aria-controls="collapseCuotaOrdinaria"
                        >
                            CuotaOrdinaria (Seleccionados:
                            {{
                                listaDeuda?.cuota?.filter((x) => x.seleccionado)
                                    .length
                            }})
                        </button>
                    </h2>
                    <div
                        id="collapseCuotaOrdinaria"
                        class="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                    >
                        <div class="accordion-body">
                            <SelectorCuotas :listaCuota="listaDeuda.cuota" />
                        </div>
                    </div>
                </div>
                <div
                    class="accordion-item"
                    v-if="listaDeuda?.fomaf?.length != 0"
                >
                    <h2 class="accordion-header" id="headingTwo">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseCuotaFOMAF"
                            aria-expanded="false"
                            aria-controls="collapseCuotaFOMAF"
                        >
                            Cuota FOMAF (Seleccionados:
                            {{
                                listaDeuda?.fomaf?.filter((x) => x.seleccionado)
                                    .length
                            }})
                        </button>
                    </h2>
                    <div
                        id="collapseCuotaFOMAF"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                    >
                        <div class="accordion-body">
                            <SelectorCuotas :listaCuota="listaDeuda.fomaf" />
                        </div>
                    </div>
                </div>
                <div
                    class="accordion-item"
                    v-if="listaDeuda?.multas?.length != 0"
                >
                    <h2 class="accordion-header" id="headingThree">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseMultas"
                            aria-expanded="false"
                            aria-controls="collapseMultas"
                        >
                            Multas (Seleccionados:
                            {{
                                listaDeuda?.multas?.filter(
                                    (x) => x.seleccionado
                                ).length
                            }})
                        </button>
                    </h2>
                    <div
                        id="collapseMultas"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                    >
                        <div class="accordion-body">
                            <SelectorCuotas :listaCuota="listaDeuda.multas" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div
                    class="alert alert-success"
                    role="alert"
                    v-if="
                        listaDeuda?.cuota?.length == 0 &&
                        listaDeuda?.fomaf?.length == 0 &&
                        listaDeuda?.multas?.length == 0
                    "
                >
                    Felicidades, no hay deuda pendiente
                </div>
            </div>
            <div class="text-center">
                <button
                    class="btn btn-outline-primary m-2"
                    @click="GoModalAgregarCuotas"
                >
                    Agregar cuotas
                </button>
            </div>
        </fieldset>

        <br />

        <fieldset class="border p-2" v-if="visualizarResumenDePago">
            <legend class="float-none w-auto">
                <h5>Resumen</h5>
            </legend>
            <DetallePago :detallePago="obtenerDetalleDePago" />

            <div class="text-center">
                <button class="btn btn-primary" @click="GoFormularioPago">
                    Pagar
                </button>
            </div>
        </fieldset>

        <!-- Modal -->
        <div
            v-if="persona != null"
            class="modal fade"
            id="staticBackdropAgregarCuotas"
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
                            Agregar o quitar cuotas
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <i class="fa fa-close"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <fieldset class="border p-2 m-2">
                            <legend class="float-none w-auto">
                                <h5>Cuota</h5>
                            </legend>
                            <SelectorModificaCuotas
                                :listaDeuda="listaDeuda.cuota"
                                :codConcepto="CONCEPTO_CUOTA"
                                @AgregarCuota="AgregarCuota"
                                @QuitarCuota="QuitarCuota"
                            />
                        </fieldset>
                        <fieldset class="border p-2 m-2">
                            <legend class="float-none w-auto">
                                <h5>FOMAF</h5>
                            </legend>
                            <SelectorModificaCuotas
                                :listaDeuda="listaDeuda.fomaf"
                                :codConcepto="CONCEPTO_FOMAF"
                                @AgregarCuota="AgregarCuota"
                                @QuitarCuota="QuitarCuota"
                            />
                        </fieldset>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div
            class="modal fade"
            id="staticBackdropFormularioPago"
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
                            Resultado de la búsqueda
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <i class="fa fa-close"></i>
                        </button>
                    </div>
                    <div class="modal-body container" v-if="persona != null">
                        <FormularioPago
                            :persona="persona"
                            :comprobanteDetalle="comprobanteDetalle"
                        />
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BusquedaColegiado from "../../../components/Panel/Tesoreria/Varios/BusquedaColegiado.vue";
import SelectorCuotas from "../../../components/Panel/Tesoreria/Varios/SelectorCuotas.vue";
import SelectorModificaCuotas from "../../../components/Panel/Tesoreria/Varios/SelectorModificaCuotas.vue";
import FormularioPago from "../../../components/Panel/Tesoreria/Pago/FormularioPago.vue";
import DetallePago from "../../../components/Panel/Tesoreria/Pago/DetallePago.vue";
import global from "../../../global";
export default {
    components: {
        BusquedaColegiado,
        SelectorCuotas,
        FormularioPago,
        DetallePago,
        SelectorModificaCuotas,
    },
    data() {
        return {
            CONCEPTO_CUOTA: global.CONCEPTO_CUOTA,
            CONCEPTO_FOMAF: global.CONCEPTO_FOMAF,
            persona: null,
            listaDeuda: {},
            comprobanteDetalle: [],
            cuotaActual: 9999999,
        };
    },
    computed: {
        ...mapState({
            PARAMETRO_CUOTA_ADELANTADA_CONCEPTO: (state) =>
                state._parametro.PARAMETRO_CUOTA_ADELANTADA_CONCEPTO,
            PARAMETRO_CUOTA_ADELANTADA_MESES: (state) =>
                state._parametro.PARAMETRO_CUOTA_ADELANTADA_MESES,
            PARAMETRO_CUOTA_ADELANTADA_PORCENTAJE_DESCUENTO: (state) =>
                state._parametro
                    .PARAMETRO_CUOTA_ADELANTADA_PORCENTAJE_DESCUENTO,
        }),
        visualizarResumenDePago() {
            var cantidad = 0;
            cantidad +=
                this.listaDeuda?.cuota?.filter((x) => x.seleccionado).length ??
                0;
            cantidad +=
                this.listaDeuda?.fomaf?.filter((x) => x.seleccionado).length ??
                0;
            cantidad +=
                this.listaDeuda?.multas?.filter((x) => x.seleccionado).length ??
                0;
            return cantidad != 0;
        },
        obtenerDetalleDePago() {
            let resumenPago = [];

            const obtenerDetalle = (lista) => {
                var descripcion = "";
                var listaPagar = lista.filter((x) => x.seleccionado);
                if (listaPagar.length == 0) return null;
                descripcion = listaPagar[0].nombre;
                if (listaPagar.length > 1)
                    descripcion +=
                        " - " + listaPagar[listaPagar.length - 1].nombre;
                return {
                    cod_concepto: listaPagar[0].cod_concepto,
                    descripcion: descripcion,
                    cantidad: listaPagar.length,
                    precio:
                        listaPagar
                            .map((x) => parseFloat(x.monto))
                            .reduce((x, y) => x + y, 0) / listaPagar.length,
                    lista_deuda: listaPagar,
                };
            };

            var detalleCuota = obtenerDetalle(this.listaDeuda?.cuota);
            if (detalleCuota != null) resumenPago.push(detalleCuota);
            var detalleFomaf = obtenerDetalle(this.listaDeuda?.fomaf);
            if (detalleFomaf != null) resumenPago.push(detalleFomaf);

            this.listaDeuda?.multas
                ?.filter((x) => x.seleccionado)
                .forEach((x, y) => {
                    resumenPago.push({
                        cod_concepto: x.cod_concepto,
                        descripcion: x.desc_concepto + " " + x.nombre,
                        cantidad: 1,
                        flagCantidadModificable: false,
                        precio: x.monto,
                        flagPrecioModificable: false,
                        lista_deuda: [x],
                    });
                });

            //regla: si se pagan 12 meses adelantado, se aplica descuento de x%
            var cuotas_adelantadas = this.listaDeuda.cuota.filter(
                (x) => x.cod_cuota > this.cuotaActual && x.seleccionado == true
            );
                console.log(cuotas_adelantadas)
            if (
                cuotas_adelantadas.length >=
                this.PARAMETRO_CUOTA_ADELANTADA_MESES
            ) {
                console.log("descuento");
                var monto_descuento =
                    cuotas_adelantadas
                        .map((x) => parseFloat(x.monto))
                        .reduce((x, y) => x + y, 0);
                monto_descuento = monto_descuento * this.PARAMETRO_CUOTA_ADELANTADA_PORCENTAJE_DESCUENTO
                resumenPago.push({
                    cod_concepto: this.PARAMETRO_CUOTA_ADELANTADA_CONCEPTO,
                    descripcion: "DESCUENTO",
                    cantidad: 1,
                    flagCantidadModificable: false,
                    precio: -1 * monto_descuento,
                    flagPrecioModificable: false,
                });
            }

            resumenPago.forEach((x, y) => {
                x.valorventa = x.cantidad * x.precio;
                x.valorventa = x.valorventa.toFixed(2);
                x.importe = x.valorventa;
                x.afecto = 0;
            });

            return resumenPago;
        },
    },
    methods: {
        ...mapActions({
            ObtenerDeuda: "_tesoreria/ObtenerDeuda",
            AgregarDeuda: "_tesoreria/AgregarDeuda",
            QuitarDeuda: "_tesoreria/QuitarDeuda",
            ObtenerCuotaActual: "_cuotasmeses/ObtenerCuotaActual",
        }),
        PersonaSeleccionada: async function (persona) {
            this.persona = persona;
            if (persona == null) return;
            var cqfll = this.persona.cqfll;
            if (cqfll == undefined || cqfll == null || cqfll == 0) {
                global._mensaje_error(
                    "La persona seleccionada no tiene código CQFLL registrado"
                );
                this.persona = null;
                return;
            }
            this.listaDeuda = await this.ObtenerDeuda(this.persona.cqfll);
        },
        GoFormularioPago: function () {
            this.comprobanteDetalle = this.obtenerDetalleDePago;
            this.AbrirModalFormularioPago();
        },
        GoModalAgregarCuotas: function () {
            this.AbrirModalAgregarCuotas();
        },
        AgregarCuota: async function (cuota) {
            var res = await this.AgregarDeuda({
                cod_ficha: this.persona.cqfll,
                cod_concepto: cuota.codConcepto,
                cantidad: cuota.cantidad,
            });
            if (res != null) this.listaDeuda = res;
        },
        QuitarCuota: async function (cuota) {
            var res = await this.QuitarDeuda({
                cod_ficha: this.persona.cqfll,
                cod_concepto: cuota.codConcepto,
                cantidad: cuota.cantidad,
            });
            if (res != null) this.listaDeuda = res;
        },
        AbrirModalFormularioPago: function () {
            new bootstrap.Modal($("#staticBackdropFormularioPago")).show();
        },
        AbrirModalAgregarCuotas: function () {
            new bootstrap.Modal($("#staticBackdropAgregarCuotas")).show();
        },
        CerrarModal: function () {
            var modal = bootstrap.Modal.getInstance(
                document.getElementById("staticBackdropFormularioPago")
            );
            modal.hide();
        },
    },
    async mounted() {
        this.cuotaActual = await this.ObtenerCuotaActual();
        console.log(this.cuotaActual);
    },
};
</script>
