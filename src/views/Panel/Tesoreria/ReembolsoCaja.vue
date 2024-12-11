<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Reembolso de Caja</h3>
  </div>
  <div class="card-body pb-2">
    <div class="tab-menu-heading tab-menu-heading-boxed" style="border-bottom: 0 !important">
      <div class="tabs-menu-boxed" style="float: right; width: 100%">
        <!-- Tabs -->
        <ul class="nav panel-tabs" style="float: right">
          <!-- <li><a href="#listadoTab" class="active" data-bs-toggle="tab" id="tabGeneralListado">LISTADO</a>
                    </li> -->
          <li>
            <a href="#registrarTab" class="active" data-bs-toggle="tab" id="tabGeneralRegistrar">REEMBOLSO</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- DATOS GENERALES -->
    <div class="panel-body tabs-menu-body">
      <div class="tab-content">
        <div class="tab-pane active" id="registrarTab">
          <div class="form-label mt-0 p-0">
            <!-- <button type="button" class="btn btn-primary"><i
                                class="fe fe-file me-2"></i>Nuevo</button> -->
            <div class="row">
              <div class="col-md-12">
                <!-- <button class="btn btn-primary" type="button">
                  <i class="fe fe-external-link me-2"></i>Agregar
                </button>
                <button class="btn btn-primary m-5" type="button">
                  <i class="fe fe-x-circle me-2"></i>Quitar
                </button> -->
                <button class="btn btn-primary" type="button" @click="abrirPendientes()">
                  <i class="fe fe-eye me-2"></i>Visualizar Pendiente
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 row">
              <div class="mb-5 p-4 br-5">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <div class="row mb-4">
                      <label for="inputName" class="col-md-4 form-label">FECHA REEMBOLSO</label>
                      <div class="col-md-8">
                        <input type="date" class="form-control" placeholder="Fecha Reembolso"
                          v-model="fechareembolso" />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-3 mb-3">
                    <button type="button" class="btn btn-primary" style="margin: 2px" @click="cargarRegistros()">
                      <i class="fe fe-search me-2"></i>Buscar
                    </button>
                    <button type="button" class="btn btn-primary" @click="procesarListaGastosAll()">
                      <i class="fe fe-trash me-2"></i>Quitar
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-label mt-0 p-0">
                      RELACIÓN DE GASTOS VARIOS
                    </div>
                    <div class="table-responsive">
                      <div class="text-center">
                        <loading :mostrar="cargandoGastos" />
                      </div>
                      <table class="table border text-nowrap text-md-nowrap table-sm mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Tipo</th>
                            <th>Serie</th>
                            <th>Numero</th>
                            <th>Comentario</th>
                            <th>Ruc</th>
                            <th>Razón Social</th>
                            <th>Fecha Emi</th>
                            <th>Fecha Ven</th>
                            <th>Cuota</th>
                            <th>Pagar El</th>
                            <th>Imp.</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in listadoRegistroGastos" :key="'item-' + index"
                            v-if="listadoRegistroGastos.length != 0">
                            <td>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox" checked="false" v-model="item.select"
                                  @change="checkItemGastos(item, index)" />
                              </div>
                            </td>
                            <td>{{ item.tipcom_dsc }}</td>
                            <td>{{ item.com_serie }}</td>
                            <td>{{ item.com_numero }}</td>
                            <td>
                              <span data-bs-placement="top" data-bs-toggle="tooltip" :title="item.com_obs">
                                <p class="overflow-ellipsis">
                                  {{ item.com_obs }}
                                </p>
                              </span>
                            </td>

                            <td>{{ item.ruc }}</td>
                            <td>
                              <span data-bs-placement="top" data-bs-toggle="tooltip2" :title="item.razonsocial">
                                <p class="overflow-ellipsis">
                                  {{ item.razonsocial }}
                                </p>
                              </span>
                            </td>
                            <td>{{ item.com_fechaemi }}</td>
                            <td>{{ item.com_fechaven }}</td>
                            <td>{{ item.cuota }}</td>
                            <td>{{ item.progdet_fecha }}</td>
                            <td>{{ item.tot }}</td>
                            <!-- <td class="text-center">
                              <i
                                class="fa fa-trash mx-1 text-danger"
                                role="button"
                                title="Quitar"
                                @click="cargarEliminar(item, index)"
                              ></i>
                            </td> -->
                          </tr>
                          <tr v-else>
                            <td colspan="12" class="text-center">
                              Ningun registro encontrado
                            </td>
                          </tr>
                          <tr>
                            <td colspan="11" class="fw-bold text-uppercase text-end">
                              Total
                            </td>
                            <td>
                              {{ parseFloat(totalGastosVarios).toFixed(2) }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <button class="btn btn-primary" type="button" @click="openurlArchivo('G')">
                      <i class="fe fe-eye me-2"></i>Vista Previa
                    </button>
                    <button class="btn btn-primary m-5" type="button" @click="download_excel_gastos_varios()">
                      <i class="fe fe-share me-2"></i>Exportar
                    </button>
                  </div>
                </div>
                <br />
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-label mt-0 p-0">
                      RELACIÓN DE ADELANTOS Y PRESTAMOS
                    </div>
                    <div class="table-responsive">
                      <div class="text-center">
                        <loading :mostrar="cargandoAdelantos" />
                      </div>
                      <table class="table border text-nowrap text-md-nowrap table-sm mb-0">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Tipo</th>
                            <th>Serie</th>
                            <th>Numero</th>
                            <th>Comentario</th>
                            <th>Ruc</th>
                            <th>Razón Social</th>
                            <th>Fecha Ven</th>
                            <th>Cuota</th>
                            <th>Pagar El</th>
                            <th>Imp.</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(
                              item, index
                            ) in listadoRegistroAdelantosPrestamos" :key="'item-' + index"
                            v-if="listadoRegistroAdelantosPrestamos.length != 0">
                            <td>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox" checked="false" v-model="item.select"
                                  @change="checkItemGastos(item, index)" />
                              </div>
                            </td>
                            <td>{{ item.tipcom_dsc }}</td>
                            <td>{{ item.com_serie }}</td>
                            <td>{{ item.com_numero }}</td>
                            <td>{{ item.com_obs }}</td>
                            <td>{{ item.ruc }}</td>
                            <td>{{ item.razonsocial }}</td>
                            <td>{{ item.com_fechaven }}</td>
                            <td>{{ item.cuota }}</td>
                            <td>{{ item.progdet_fecha }}</td>
                            <td>{{ item.tot }}</td>
                            <!-- <td class="text-center">
                              <i
                                class="fa fa-trash mx-1 text-danger"
                                role="button"
                                @click="cargarEliminar(item)"
                              ></i>
                            </td> -->
                          </tr>
                          <tr v-else>
                            <td colspan="12" class="text-center">
                              Ningun registro encontrado
                            </td>
                          </tr>
                          <tr>
                            <td colspan="10" class="fw-bold text-uppercase text-end">
                              Total
                            </td>
                            <td>
                              {{
                                parseFloat(totalAdelantosPrestamos).toFixed(2)
                              }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <button class="btn btn-primary" type="button" @click="openurlArchivo('A')">
                      <i class="fe fe-eye me-2"></i>Vista Previa
                    </button>
                    <button class="btn btn-primary m-5" type="button" @click="download_excel_adelantos_prestamos()">
                      <i class="fe fe-share me-2"></i>Exportar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="row">
                        <div class="col-md-12 text-center">
                            <button class="btn btn-primary" type="button">Cancelar</button>
                            <button class="btn btn-primary m-5" type="button">
                                Asignar </button>
                            <button class="btn btn-primary" type="button">Generar
                            </button>
                        </div>
                    </div> -->
        </div>
      </div>
    </div>
  </div>
  <buscar-pendientes id="modalVisualizarPendientes" :fechareembolso="fechareembolso" :reloadData="reloadDataPendientes"
    @cargarRegistros="cargarRegistros" @closeModalPendientes="closeModalPendientes" />
</template>

<script>
import { mapActions } from "vuex";
//Library
import * as XLSX from "xlsx";
import dayjs from "dayjs";
//components
import BuscarPendientes from "../../../components/reembolsocaja/BuscarPendientes.vue";
import Loading from "../../../components/varios/Loading.vue";
import global from "../../../global";
export default {
  name: "ReembolsoCaja",
  components: { BuscarPendientes, Loading },
  data() {
    return {
      reloadDataPendientes: false,
      cargandoGastos: false,
      cargandoAdelantos: false,
      listadoAllGastos: [],
      iprutaFiles: global.ruta_api,
      filtros: "",
      fechareembolso: "",
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      listadoRegistroGastos: [],
      listadoRegistroAdelantosPrestamos: [],
      usuarioRegistro: "",
      reembolso_caja_detalle: {},
      reembolso_caja_detalleBase: {
        prog_codigo: 0,
        progdet_cuota: 0,
        recade_gastosplanilla: "",
      },
    };
  },
  methods: {
    ...mapActions({
      ListarPagados: "_comprobantepago/ListarPagados",
      Eliminar: "_reembolsocajadetalle/Eliminar",
    }),
    closeModalPendientes() {
      this.reloadDataPendientes = false;
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalVisualizarPendientes")
      );
      modal.hide();
    },
    abrirPendientes() {
      this.reloadDataPendientes = true;
      new bootstrap.Modal($("#modalVisualizarPendientes")).show(); // Abrir modal
    },
    procesarListaGastosAll: async function () {
      if (this.listadoAllGastos.length > 0) {
        global._swal_pregunta(
          "¿Está seguro que desea agregar los registros, seleccionados?",
          async () => {
            this.listadoAllGastos.forEach((item) => {
              this.cargarEliminar(item);
            });
            this.cargarRegistros();
            this.loadRegistro();
            global._mensaje_exito("Se ha quitado correctamente");
          },
          "Advertencia"
        );
      } else {
        global._mensaje_advertencia(
          "Debe seleccionar los registros a procesar, gracias."
        );
      }
    },
    openurlArchivo(tipo) {
      if (
        this.listadoRegistroGastos.length > 0 ||
        this.listadoRegistroAdelantosPrestamos.length > 0
      ) {
        let url = `${this.iprutaFiles}comprobantedepago/listarpagados/crearPDF?tipo=${tipo}&fecha=${this.fechareembolso}`;
        window.open(url, "_blank");
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
    },
    download_excel_gastos_varios: async function () {
      if (this.listadoRegistroGastos.length > 0) {
        let export_excel = [];

        export_excel = this.listadoRegistroGastos.map((el) => ({
          tipcom_dsc: el.tipcom_dsc,
          com_serie: el.com_serie,
          com_numero: el.com_numero,
          com_obs: el.com_obs,
          ruc: el.ruc,
          razonsocial: el.razonsocial,
          com_fechaven: el.com_fechaven,
          cuota: el.cuota,
          progdet_fecha: el.progdet_fecha,
          tot: parseFloat(el.tot),
          progdet_cuota: el.progdet_cuota,
        }));
        let data = XLSX.utils.json_to_sheet(export_excel, {
          header: [
            "tipcom_dsc",
            "com_serie",
            "com_numero",
            "com_obs",
            "ruc",
            "razonsocial",
            "com_fechaven",
            "cuota",
            "progdet_fecha",
            "tot",
            "progdet_cuota",
          ],
        });
        data["A1"].v = "TIPO";
        data["B1"].v = "SERIE";
        data["C1"].v = "NÚMERO";
        data["D1"].v = "COMENTARIO";
        data["E1"].v = "RUC";
        data["F1"].v = "RAZÓN SOCIAL";
        data["G1"].v = "FECHA VEN";
        data["H1"].v = "CUOTA";
        data["I1"].v = "PAGAR EL";
        data["J1"].v = "IMPORTE";
        data["K1"].v = "NRO CUOTA";

        const workbook = XLSX.utils.book_new();
        const filename = "reembolso-caja";
        XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
    },
    download_excel_adelantos_prestamos: async function () {
      if (this.listadoRegistroAdelantosPrestamos.length > 0) {
        let export_excel = [];

        export_excel = this.listadoRegistroAdelantosPrestamos.map((el) => ({
          tipcom_dsc: el.tipcom_dsc,
          com_serie: el.com_serie,
          com_numero: el.com_numero,
          com_obs: el.com_obs,
          ruc: el.ruc,
          razonsocial: el.razonsocial,
          com_fechaven: el.com_fechaven,
          cuota: el.cuota,
          progdet_fecha: el.progdet_fecha,
          tot: el.tot,
          progdet_cuota: el.progdet_cuota,
        }));
        let data = XLSX.utils.json_to_sheet(export_excel, {
          header: [
            "tipcom_dsc",
            "com_serie",
            "com_numero",
            "com_obs",
            "ruc",
            "razonsocial",
            "com_fechaven",
            "cuota",
            "progdet_fecha",
            "tot",
            "progdet_cuota",
          ],
        });
        data["A1"].v = "TIPO";
        data["B1"].v = "SERIE";
        data["C1"].v = "NÚMERO";
        data["D1"].v = "COMENTARIO";
        data["E1"].v = "RUC";
        data["F1"].v = "RAZÓN SOCIAL";
        data["G1"].v = "FECHA VEN";
        data["H1"].v = "CUOTA";
        data["I1"].v = "PAGAR EL";
        data["J1"].v = "IMPORTE";
        data["K1"].v = "NRO CUOTA";

        const workbook = XLSX.utils.book_new();
        const filename = "reembolso-caja";
        XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
    },
    loadRegistro: function () {
      this.reembolso_caja_detalle = { ...this.reembolso_caja_detalleBase };
    },
    cargarEliminar: async function (item) {
      this.reembolso_caja_detalle.prog_codigo = item.prog_codigo;
      this.reembolso_caja_detalle.progdet_cuota = item.progdet_cuota;
      this.reembolso_caja_detalle.recade_gastosplanilla = item.GastosPlanilla;
      await this.Eliminar(this.reembolso_caja_detalle);
    },
    cargarRegistros: function () {
      this.cargarRegistrosGastos("G", this.fechareembolso);
      this.cargarRegistrosAdelantoPrestamos("A", this.fechareembolso);
      console.log("cargarRegistros");
    },
    checkItemGastos(item, index) {
      if (item.select == false) {
        this.listadoAllGastos.splice(index, 1);
      } else {
        this.listadoAllGastos.push(item);
      }
    },
    cargarRegistrosGastos: async function (tipo, fecha) {
      let buscador = {
        tipo: tipo,
        fecha: fecha,
      };
      this.cargandoGastos = true;
      var res = await this.ListarPagados(buscador);

      this.listadoRegistroGastos = res.map((el) => ({
        ...el,
        select: false,
        com_fechaven: dayjs(el.com_fechaven).format("DD-MM-YYYY"),
        com_fechaemi: dayjs(el.com_fechaemi).format("DD-MM-YYYY"),
        progdet_fecha: dayjs(el.progdet_fecha).format("DD-MM-YYYY"),
      }));
      this.cargandoGastos = false;
      console.log(res);
    },
    cargarRegistrosAdelantoPrestamos: async function (tipo, fecha) {
      let buscador = {
        tipo: tipo,
        fecha: fecha,
      };
      this.cargandoAdelantos = true;
      var res = await this.ListarPagados(buscador);

      this.listadoRegistroAdelantosPrestamos = res.map((el) => ({
        ...el,
        select: false,
        com_fechaven: dayjs(el.com_fechaven).format("DD-MM-YYYY"),
        progdet_fecha: dayjs(el.progdet_fecha).format("DD-MM-YYYY"),
      }));
      this.cargandoAdelantos = false;
      console.log(res);
    },
  },
  computed: {
    totalGastosVarios: function () {
      let sum = 0;
      this.listadoRegistroGastos.forEach(
        (item) => (sum += parseFloat(item.tot))
      );
      return sum;
    },
    totalAdelantosPrestamos: function () {
      let sum = 0;
      this.listadoRegistroAdelantosPrestamos.forEach(
        (item) => (sum += parseFloat(item.tot))
      );
      return sum;
    },
  },
  mounted() {
    this.fechareembolso = this.currentDate;
    this.loadRegistro();
    this.cargarRegistros();

    // global._cargar_tooltip("tooltip");
    // global._cargar_tooltip("tooltip2");
  },
};
</script>
<style lang="css" scoped>
p {
  width: 160px;
  white-space: nowrap;
  overflow: hidden;
}

.overflow-ellipsis {
  text-overflow: ellipsis;
}
</style>
<style>
.tooltip {
  z-index: 100000000;
}

.tooltip2 {
  z-index: 100000000;
}
</style>
