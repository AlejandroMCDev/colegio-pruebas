<template>
    <div class="card-header">
        <h3 class="card-title">Emision de certificado de habilidad</h3>
    </div>
    <div class="card-body pb-2">
        <h3 class="text-center">Emision de certificado de habilidad</h3>

        <BusquedaColegiado @PersonaSeleccionada="PersonaSeleccionada" />

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
import { mapActions } from "vuex";
import BusquedaColegiado from "../../../components/Panel/Tesoreria/Varios/BusquedaColegiado.vue";
import SelectorCuotas from "../../../components/Panel/Tesoreria/Varios/SelectorCuotas.vue";
import FormularioPago from "../../../components/Panel/Tesoreria/Pago/FormularioPago.vue";
import DetallePago from "../../../components/Panel/Tesoreria/Pago/DetallePago.vue";
import global from "../../../global";
export default {
    components: {
        BusquedaColegiado,
        SelectorCuotas,
        FormularioPago,
        DetallePago,
    },
    data() {
        return {
            persona: null,
            listaDeuda: {},
            comprobanteDetalle: [],
            ESTADO_INHABILITADO: global.ESTADO_INHABILITADO,
        };
    },
    computed: {
        visualizarResumenDePago() {
            return this.persona != null;
        },
        obtenerDetalleDePago() {
            let resumenPago = [];

            resumenPago.push({
                cod_concepto: global.CONCEPTO_CERTIFICADO,
                descripcion: global.CONCEPTO_CERTIFICADO_DESCRIPCION,
                cantidad: 1,
                flagCantidadModificable: false,
                precio: 10,
            });

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
            MovimientoDetalleDeudaColegiado:
                "_movimiento/MovimientoDetalleDeudaColegiado",
        }),
        PersonaSeleccionada: async function (persona) {
            this.persona = persona;
            if (persona == null) return;

            var cqfll = this.persona.cqfll;
            var per_persona_id = this.persona.id;
            var idModalidad = this.persona.idModalidad;

            if (cqfll == undefined || cqfll == null || cqfll == 0) {
                global._mensaje_error(
                    "La persona seleccionada no tiene código CQFLL registrado"
                );
                this.persona = null;
                return;
            }
            if (persona.estadoColegiado == this.ESTADO_INHABILITADO) {
                global._mensaje_error(
                    "El colegiado se encuentra INHABILITADO, por favor regularizar el estado de cuenta"
                );
                this.persona = null;
                return;
            }

            let res = await this.MovimientoDetalleDeudaColegiado({
                cod_colegiado: per_persona_id,
            });
            /*
            var cuotas_pagadoas_concepto_2 =  res.find(x => x.cod_concepto == global.CONCEPTO_CUOTA);
            if (cuotas_pagadoas_concepto_2 == null || cuotas_pagadoas_concepto_2 == undefined){
                var mensaje_error = 'El colegiado no registra ningun pago de cuotas previo, por favor regularizar';
                if (idModalidad == global.MODALIDAD_INGRESO_PRIMERA_VEZ){
                    mensaje_error = "El colegiado por ingreso nuevo debe generar su primer pago";
                }
                else if (idModalidad == global.MODALIDAD_TRASLADO){
                    mensaje_error = "El colegiado por traslado debe generar su primer pago en este consejo";
                }
                global._mensaje_error(mensaje_error);
                this.persona = null;
                return;
            }
            */
        },
        GoFormularioPago: function () {
            this.comprobanteDetalle = this.obtenerDetalleDePago;
            this.AbrirModal();
        },
        AbrirModal: function () {
            new bootstrap.Modal($("#staticBackdropFormularioPago")).show();
        },
        CerrarModal: function () {
            var modal = bootstrap.Modal.getInstance(
                document.getElementById("staticBackdropFormularioPago")
            );
            modal.hide();
        },
    },
};
</script>
