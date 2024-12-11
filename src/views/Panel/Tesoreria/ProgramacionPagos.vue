<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Programación de Pagos</h3>
  </div>
  <div class="card-body pb-2">
    <!-- DATOS GENERALES -->
    <div class="panel-body tabs-menu-body">
      <div class="tab-content">
        <div class="tab-pane active">
          <br />
          <div class="panel-body tabs-menu-body">
            <div class="tab-content">
              <div class="tab-menu-heading">
                <div class="tabs-menu">
                  <!-- Tabs -->
                  <ul class="nav panel-tabs panel-info" id="tabs">
                    <li>
                      <a
                        href="#programacionPendientesTab"
                        class="active"
                        data-bs-toggle="tab"
                        @click="cargarRegistrosPendientes()"
                        >Pendientes</a
                      >
                    </li>
                    <li>
                      <a
                        href="#programacionProgramadasTab"
                        data-bs-toggle="tab"
                        id="ListadoProgramadas"
                        >Programadas</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="panel-body tabs-menu-body">
                <div class="tab-content">
                  <!-- LISTADO TAB -->
                  <div class="tab-pane active" id="programacionPendientesTab">
                    <div class="col-md-12">
                      <div class="text-center">
                        <loading :mostrar="cargandoPendiente" />
                      </div>
                      <div class="table-responsive">
                        <table
                          class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                        >
                          <thead>
                            <tr>
                              <th>Tipo</th>
                              <th>Serie</th>
                              <th>Numero</th>
                              <th>Ruc</th>
                              <th>RazonSocial</th>
                              <th>Fecha Emi</th>
                              <th>Vence</th>
                              <th>OBS</th>
                              <th>Importe</th>
                              <th>Opc.</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(item, index) in listadoRegistroPendientes"
                              :key="'item-' + index"
                              v-if="listadoRegistroPendientes.length != 0"
                            >
                              <td>{{ item.tipcom_dsc }}</td>
                              <td>{{ item.com_serie }}</td>
                              <td>{{ item.com_numero }}</td>
                              <td>{{ item.ruc }}</td>
                              <td>
                                <p
                                  style="width: 250px"
                                  class="overflow-ellipsis"
                                  data-bs-placement="top"
                                  data-bs-toggle="tooltip"
                                  :title="item.razonsocial"
                                >
                                  {{ item.razonsocial }}
                                </p>
                              </td>
                              <td>{{ item.com_fechaemi }}</td>
                              <td>{{ item.com_fechaven }}</td>
                              <td>
                                <p
                                  style="width: 75px"
                                  class="overflow-ellipsis"
                                  data-bs-placement="top"
                                  data-bs-toggle="tooltip"
                                  :title="item.com_obs"
                                >
                                  {{ item.com_obs }}
                                </p>
                              </td>
                              <td>{{ item.com_precioventa }}</td>
                              <td>
                                <div class="btn-list">
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-primary"
                                    title="Programar"
                                    @click="
                                      cargarDatosProgramarComprobante(item)
                                    "
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdropProgramar"
                                  >
                                    <span class="fe fe-sliders"> </span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr v-else>
                              <td colspan="9" class="text-center">
                                Detalle Vacío
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td
                                colspan="8"
                                class="fw-bold text-uppercase text-end"
                              >
                                Total:
                              </td>
                              <td>{{ totalPendientes }}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                  <!-- REGISTRO TAB-->
                  <div class="tab-pane" id="programacionProgramadasTab">
                    <div class="row">
                      <div class="col-md-3 mb-3" style="text-align: center">
                        <input
                          class="form-control"
                          onfocus="(this.type='date')"
                          onblur="(this.type='text')"
                          placeholder="Fecha Inicio"
                          v-model="fecha_inicio"
                        />
                      </div>
                      <div class="col-md-3 mb-3" style="text-align: center">
                        <input
                          class="form-control"
                          onfocus="(this.type='date')"
                          onblur="(this.type='text')"
                          v-model="fecha_fin"
                          placeholder="Fecha Fin"
                        />
                      </div>
                      <div class="col-md-3 mb-3" style="text-align: center">
                        <select
                          class="form-control form-select select2"
                          data-bs-placeholder="Modo de Pago"
                          v-model="com_modopago"
                        >
                          <option value="">Modo de Pago</option>
                          <option value="EFE">Efectivo</option>
                          <option value="BAN">Banco</option>
                        </select>
                      </div>

                      <div class="col-md-3 mb-3" style="text-align: left">
                        <button
                          type="button"
                          class="btn btn-primary"
                          @click="cargarRegistrosProgramadas()"
                        >
                          <i class="fe fe-search me-2"></i>Buscar
                        </button>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="text-center">
                        <loading :mostrar="cargandoProgramados" />
                      </div>
                      <div class="table-responsive">
                        <table
                          class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                        >
                          <thead>
                            <tr>
                              <th>Tipo</th>
                              <th>Serie</th>
                              <th>Numero</th>
                              <th>Ruc</th>
                              <th>RazonSocial</th>
                              <th>Fecha Emi</th>
                              <th>Vence</th>
                              <!-- <th>OBS</th> -->
                              <th>Importe</th>
                              <th>Opciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(
                                item, index
                              ) in listadoRegistroProgramadas"
                              :key="'item-' + index"
                              v-if="listadoRegistroProgramadas.length != 0"
                            >
                              <td>{{ item.tipcom_dsc }}</td>
                              <td>{{ item.com_serie }}</td>
                              <td>{{ item.com_numero }}</td>
                              <td>{{ item.ruc }}</td>
                              <td>{{ item.razonsocial }}</td>
                              <td>{{ item.com_fechaemi }}</td>
                              <td>{{ item.com_fechaven }}</td>
                              <!-- <td>{{ item.observacion }}</td> -->
                              <td>{{ item.progdet_importe }}</td>
                              <td>
                                <div class="btn-list">
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-danger"
                                    title="Anular"
                                    @click="
                                      eliminarProgramacionComprobantePago(item)
                                    "
                                  >
                                    <span class="fe fe-trash-2"> </span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr v-else>
                              <td colspan="10" class="text-center">
                                Detalle Vacío
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td
                                colspan="8"
                                class="fw-bold text-uppercase text-end"
                              >
                                Total:
                              </td>
                              <td>{{ totalProgramadas }}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdropProgramar"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Programando</h5>
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
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label>Pagar El</label>
                <input type="date" v-model="fecha_pagar" class="form-control" />
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>A Pagar</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="monto_pagar"
                  readonly
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            Cerrar
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="programarComprobante()"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import global from "../../../global";
import Loading from "../../../components/varios/Loading.vue";

//Library
import dayjs from "dayjs";
export default {
  name: "ProgramacionPagos",
  components: {
    Loading,
  },
  data() {
    return {
      cargandoPendiente: false,
      cargandoProgramados: false,
      filtros: "",
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_pagar: dayjs(this.date).format("YYYY-MM-DD"),
      listadoRegistroPendientes: [],
      listadoRegistroProgramadas: [],
      usuarioRegistro: "",
      fechaRegistro: "",
      monto_pagar: 0,
      programarcomprobantepago: {},
      programarcomprobantepagoBase: {
        com_codigo: 0,
        usuario: "",
        progdet_fecha: "",
        progdet_importe: 0,
        com_modopago: "",
      },
      fecha_inicio: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_fin: dayjs(this.date).format("YYYY-MM-DD"),
      com_modopago: "",
    };
  },
  methods: {
    ...mapActions({
      ListarProgramacionPagoPendientes:
        "_comprobantepago/ListarProgramacionPagoPendientes",
      ProgramarComprobantePago: "_comprobantepago/ProgramarComprobantePago",
      ListarProgramacionPagoProgramadas:
        "_comprobantepago/ListarProgramacionPagoProgramadas",
      EliminarProgramacionComprobantePago:
        "_comprobantepago/EliminarProgramacionComprobantePago",
    }),
    cargarDatosProgramarComprobante: async function (item) {
      this.loadProgramarComprobantePago();
      this.programarcomprobantepago.com_codigo = item.com_codigo;
      this.programarcomprobantepago.usuario = item.com_solicita;
      //this.programarcomprobantepago.progdet_fecha = this.fecha_pagar;
      this.programarcomprobantepago.progdet_importe = item.com_precioventa;
      this.programarcomprobantepago.com_modopago = item.com_modopago;
      this.monto_pagar = item.com_precioventa;
    },
    programarComprobante: async function () {
      var res = null;
      global._swal_pregunta(
        "¿Está seguro que desea programar el comprobante?",
        async () => {
          this.programarcomprobantepago.progdet_fecha = this.fecha_pagar;
          res = await this.ProgramarComprobantePago(
            this.programarcomprobantepago
          );
          if (res?.exito) {
            this.cargarRegistrosPendientes();
            global._mensaje_exito("Los cambios se han guardado correctamente");
            this.closeModalProgramar();
          }
          this.loadProgramarComprobantePago();
        },
        "Advertencia"
      );
    },
    eliminarProgramacionComprobantePago: async function (item) {
      global._swal_pregunta(
        "¿Está seguro que desea anular la programacíon?",
        async () => {
          var res = null;
          let programacionpago = {
            prog_codigo: item.prog_codigo,
          };
          res = await this.EliminarProgramacionComprobantePago(
            programacionpago
          );
          if (res?.exito) {
            this.cargarRegistrosProgramadas();
            global._mensaje_exito("Los cambios se han guardado correctamente");
          }
          this.loadProgramarComprobantePago();
        }
      );
    },
    closeModalProgramar: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("staticBackdropProgramar")
      );
      modal.hide();
    },
    loadProgramarComprobantePago() {
      this.programarcomprobantepago = {
        ...this.programarcomprobantepagoBase,
      };
    },
    cargarRegistrosPendientes: async function () {
      this.cargandoPendiente = true;
      let res = await this.ListarProgramacionPagoPendientes();
      if (res != null) {
        this.listadoRegistroPendientes = res.map((el) => ({
          ...el,
          com_fechaemi: dayjs(el.com_fechaemi).format("DD-MM-YYYY"),
          com_fechaven: dayjs(el.com_fechaven).format("DD-MM-YYYY"),
        }));
      }
      this.cargandoPendiente = false;
    },
    cargarRegistrosProgramadas: async function () {
      let programadas = {
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        com_modopago: this.com_modopago,
      };
      this.cargandoProgramados = true;
      let res = await this.ListarProgramacionPagoProgramadas(programadas);
      if (res != null) {
        this.listadoRegistroProgramadas = res.map((el) => ({
          ...el,
          com_fechaemi: dayjs(el.com_fechaemi).format("DD-MM-YYYY"),
          com_fechaven: dayjs(el.com_fechaven).format("DD-MM-YYYY"),
        }));
      }
      this.cargandoProgramados = false;
      console.log(res);
    },
  },
  mounted() {
    this.cargarRegistrosPendientes();
    this.fechaRegistro = this.currentDate;
  },
  computed: {
    totalPendientes: function () {
      let sum = 0;
      this.listadoRegistroPendientes.forEach(
        (item) => (sum += parseFloat(item.com_precioventa))
      );
      sum = parseFloat(sum).toFixed(2);

      return sum;
    },
    totalProgramadas: function () {
      let sum = 0;
      this.listadoRegistroProgramadas.forEach(
        (item) => (sum += parseFloat(item.progdet_importe))
      );
      sum = parseFloat(sum).toFixed(2);

      return sum;
    },
  },
};
</script>
<style lang="css" scoped>
p {
  white-space: nowrap;
  overflow: hidden;
}

.overflow-ellipsis {
  text-overflow: ellipsis;
}
</style>
