<template>
  <div class="card-header">
    <h3 class="card-title">Pagos diversos</h3>
  </div>
  <div class="card-body pb-2">
    <h3 class="text-center">Pagos diversos</h3>

    <BusquedaColegiado @PersonaSeleccionada="PersonaSeleccionada">
      <template v-slot:botonesAdicionales>
        <button
          class="btn btn-primary m-2"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#modalBuscarAuxiliar"
        >
          <i class="fe fe-user me-2"></i>Auxiliar
        </button>
        <button
          @click="SeleccionarPersonaVacio()"
          class="btn btn-outline-primary m-2"
        >
          Saltar y pagar con factura
        </button>
      </template>
    </BusquedaColegiado>

    <br />
    <fieldset class="border p-2" v-if="persona != null">
      <legend class="float-none w-auto mb-0">
        <h5>Seleccionar Concepto a pagar</h5>
      </legend>
      <div class="text-center">
        <button
          @click="MostrarPagosPendientes()"
          class="btn btn-outline-primary mb-2 mt-0"
          v-if="listaPagosPendientes.length > 0"
        >
          Listar pagos pendientes
        </button>
      </div>
      <div class="accordion" id="accordionExample mt-2">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCuotaOrdinaria"
              aria-expanded="true"
              aria-controls="collapseCuotaOrdinaria"
            >
              Lista de conceptos
            </button>
          </h2>
          <div
            id="collapseCuotaOrdinaria"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div class="row">
                <div class="col-md-12 border pb-0">
                  <div class="form-group">
                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nombres"
                        v-model="filtroConceptos"
                      />
                      <label>Filtrar</label>
                    </div>
                  </div>
                </div>
                <br />
                <div
                  class="col-md-6 border"
                  v-for="(item, index) in obtener_maestro_lista_conceptos"
                  :key="index"
                >
                  <button
                    class="btn btn-sm btn-danger p-1 m-1"
                    v-if="item.seleccionado"
                    @click="DeseleccionarConcepto(item, index)"
                  >
                    -
                  </button>
                  <button
                    class="btn btn-sm btn-primary p-1 m-1"
                    v-else
                    @click="SeleccionarConcepto(item, index)"
                  >
                    +
                  </button>
                  {{ item.cod_concepto }} - {{ item.desc_concepto }} (s/{{
                    parseFloat(item.precio).toFixed(2)
                  }})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </fieldset>

    <br />

    <fieldset class="border p-2" v-if="visualizarResumenDePago">
      <legend class="float-none w-auto">
        <h5>Resumen</h5>
      </legend>
      <DetallePago :detallePago="obtenerDetalleDePago">
        <template v-slot:tablaCabecera>
          <th>Eliminar</th>
        </template>
        <template v-slot:tablaContenido="data">
          <td>
            <button
              class="btn btn-sm btn-danger p-1 m-1"
              @click="DeseleccionarConcepto(data.item, data.index)"
            >
              -
            </button>
          </td>
        </template>
        <template v-slot:tablaParteFinal>
          <td></td>
        </template>
      </DetallePago>

      <div class="text-center">
        <button class="btn btn-primary" @click="GoFormularioPago">Pagar</button>
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
              :flagForzarPagoFactura="flagForzarPagoFactura"
              ref="formularioPago"
              @eliminar_detalle="EliminarDetalle"
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
  <modal-buscar-auxiliar id="modalBuscarAuxiliar" />
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import BusquedaColegiado from "../../../components/Panel/Tesoreria/Varios/BusquedaColegiado.vue";
import SelectorCuotas from "../../../components/Panel/Tesoreria/Varios/SelectorCuotas.vue";
import FormularioPago from "../../../components/Panel/Tesoreria/Pago/FormularioPago.vue";
import DetallePago from "../../../components/Panel/Tesoreria/Pago/DetallePago.vue";
import modalBuscarAuxiliar from "../../../components/auxiliar/modalBuscarAuxiliar.vue";
export default {
  components: {
    BusquedaColegiado,
    SelectorCuotas,
    FormularioPago,
    DetallePago,
    modalBuscarAuxiliar,
  },
  data() {
    return {
      modalBuscarAuxiliar: false,
      persona: null,
      listaDeuda: {},
      comprobanteDetalle: [],
      filtroConceptos: "",
      flagForzarPagoFactura: false,
      listaPagosPendientes: [],
    };
  },
  computed: {
    ...mapState({
      maestro_lista_conceptos: (state) =>
        state._tesoreria.maestros.lista_conceptos,
    }),
    visualizarResumenDePago() {
      return this.persona != null && this.comprobanteDetalle.length > 0;
    },
    obtenerDetalleDePago() {
      this.comprobanteDetalle.forEach((x, y) => {
        x.valorventa = x.cantidad * x.precio;
        x.valorventa = x.valorventa.toFixed(2);
        x.importe = x.valorventa;
        x.afecto = 0;
        x.flagPrecioModificable = x.flagPrecioModificable;
      });
      return this.comprobanteDetalle;
    },
    obtener_maestro_lista_conceptos: function () {
      return this.maestro_lista_conceptos
        .filter((x) => {
          return (
            x.desc_concepto
              .toUpperCase()
              .includes(this.filtroConceptos.toUpperCase()) ||
            String(x.cod_concepto)
              .toUpperCase()
              .includes(this.filtroConceptos.toUpperCase())
          );
        })
        .filter((_, index) => index < 10);
    },
  },
  methods: {
    ...mapMutations({
      CambiarEstado_lista_conceptos: "_tesoreria/CambiarEstado_lista_conceptos",
    }),
    ...mapActions({
      CargarMaestros: "_tesoreria/CargarMaestros",
      ConsultarPagosPendientesDiversos:
        "_asignardiversos/ConsultarPagosPendientesDiversos",
    }),
    SeleccionarPersonaVacio: function () {
      this.flagForzarPagoFactura = true;
      this.persona = {
        id: 0,
        nombres: "",
        dni: "",
      };
    },
    PersonaSeleccionada: async function (persona) {
      this.flagForzarPagoFactura = false;
      this.persona = persona;
      this.listaPagosPendientes = await this.ConsultarPagosPendientesDiversos({
        persona_id: persona.id,
      });
    },
    GoFormularioPago: function () {
      this.comprobanteDetalle = this.obtenerDetalleDePago;
      this.AbrirModal();
    },
    AbrirModal: function () {
      this.$refs.formularioPago.iniciar();
      new bootstrap.Modal($("#staticBackdropFormularioPago")).show();
    },
    CerrarModal: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("staticBackdropFormularioPago")
      );
      modal.hide();
    },
    DeseleccionarConcepto: function (item, index) {
      this.CambiarEstado_lista_conceptos({
        cod_concepto: item.cod_concepto,
        estado: false,
      });
      this.comprobanteDetalle = this.comprobanteDetalle.filter(
        (x, i) => i != index
      );
    },
    SeleccionarConcepto: function (item, index) {
      this.CambiarEstado_lista_conceptos({
        cod_concepto: item.cod_concepto,
        estado: true,
      });
      this.comprobanteDetalle.push({
        cod_concepto: item.cod_concepto,
        descripcion: item.desc_concepto,
        cantidad: 1,
        flagCantidadModificable: true,
        precio: item.precio,
        flagPrecioModificable: item.flagPrecioModificable,
      });
    },
    MostrarPagosPendientes: function () {
      this.listaPagosPendientes.forEach((item) => {
        this.comprobanteDetalle.push({
          cod_concepto: item.concepto_id,
          descripcion: item.concepto_desc + " (" + item.descripcion + ")",
          cantidad: 1,
          flagCantidadModificable: false,
          precio: parseFloat(item.monto),
          flagPrecioModificable: false,
          es_pago_pendiente: item.es_pago_pendiente,
          id_detalle: item.id_detalle,
        });
      });
    },
    EliminarDetalle: function (index) {
      this.comprobanteDetalle = this.comprobanteDetalle.filter(
        (_, i) => i != index
      );
    },
  },
  mounted() {
    this.CargarMaestros();
  },
};
</script>
