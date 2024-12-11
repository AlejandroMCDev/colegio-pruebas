<template>
  <div class="card-header">
    <h3 class="card-title">Relacion de Colegiados</h3>
  </div>
  <div class="card-body pb-2">
    <div
      class="tab-menu-heading tab-menu-heading-boxed"
      style="border-bottom: 0 !important"
    >
      <div class="tabs-menu-boxed" style="float: right; width: 100%">
        <!-- Tabs -->
        <ul class="nav panel-tabs" style="float: right">
          <!-- <li><a href="#listadoTab" class="active" data-bs-toggle="tab" id="tabGeneralListado">LISTADO</a>
                    </li> -->
          <li>
            <a
              href="#registrarTab"
              class="active"
              data-bs-toggle="tab"
              id="tabGeneralRegistrar"
              >RELACION DE COLEGIADOS</a
            >
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
              <div class="col-md-9">
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="download_excel()"
                >
                  <i class="fe fe-share me-2"></i>Exportar
                </button>
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <!-- <div class="col-md-3 mb-3">
              <label>Concepto</label>
              <select
                class="form-control form-select"
                data-bs-placeholder="Ventanilla"
                v-model="cod_ventanilla"
              >
                <option value="0">Ventanilla</option>
                <option value="01">Caja 01</option>
                <option value="02">Caja 02</option>
                <option value="0.">Caja 03</option>
              </select>
            </div> -->
            <div class="col-md-3 mb-3">
              <label>Fecha Inicio</label>
              <input
                type="date"
                class="form-control"
                placeholder="Fecha Inicio"
                v-model="fecha_inicio"
              />
            </div>
            <div class="col-md-3 mb-3">
              <label>Fecha Fin</label>
              <input
                type="date"
                class="form-control"
                placeholder="Fecha Inicio"
                v-model="fecha_fin"
              />
            </div>
            <div class="col-md-2 mb-3" style="text-align: left">
              <label
                class="custom-control custom-checkbox"
                style="margin-top: 29px"
              >
                <input
                  type="checkbox"
                  class="custom-control-input"
                  name="example-checkbox1"
                  value="option1"
                  @click="chkIncluyeTraslado()"
                />
                <span class="custom-control-label">Incluye Traslado</span>
              </label>
            </div>
            <div class="col-md-4 mb-3" style="text-align: left">
              <button
                type="button"
                class="btn btn-primary"
                @click="cargarRegistros()"
                style="margin-top: 29px"
              >
                <i class="fe fe-search me-2"></i>Buscar
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="text-center">
                <loading :mostrar="cargando" />
              </div>
              <div class="table-responsive">
                <table
                  class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>FECHA COLEGIADO</th>
                      <th>CQF</th>
                      <th>AGREMIADO</th>
                      <th>CELULAR</th>
                      <th>EMAIL</th>
                      <th>ESTADO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in listadoRegistro"
                      :key="'item-' + index"
                      v-if="listadoRegistro.length != 0"
                    >
                      <th scope="row">{{ indexMethod(index) }}</th>
                      <td>{{ item.fechaColegiatura }}</td>
                      <td>{{ item.cqfll }}</td>
                      <td>
                        {{ item.apellidoPaterno }} {{ item.apellidoMaterno }}
                        {{ item.nombres }}
                      </td>
                      <td>{{ item.celular }}</td>
                      <td>{{ item.correo }}</td>
                      <td>
                        {{ item.estadoColegiado }} - {{ item.nombreModalidad }}
                      </td>
                    </tr>
                    <tr v-else>
                      <td colspan="6" class="text-center">
                        Ningun registro encontrado
                      </td>
                    </tr>
                    <!-- <tr>
                      <td colspan="4" class="fw-bold text-uppercase text-end">
                        Total:
                      </td>
                      <td>{{ totalCuenta }}</td>
                    </tr> -->
                  </tbody>
                </table>
                <div class="row">
                  <div class="pagination justify-content-center mt-3">
                    <div
                      class="dataTables_info"
                      id="responsive-datatable_info"
                      role="status"
                      aria-live="polite"
                    >
                      Showing
                      {{
                        pagination.currentPage == 1
                          ? pagination.currentPage
                          : pagination.perPage * pagination.currentPage - 9
                      }}
                      to
                      {{
                        pagination.perPage * pagination.currentPage >
                        pagination.total
                          ? pagination.total
                          : pagination.perPage * pagination.currentPage
                      }}
                      of {{ pagination.total }} entries
                    </div>
                  </div>
                  <div class="pagination justify-content-center mt-3">
                    <paginate
                      :page-count="totalPaginas"
                      :click-handler="cambiarPagina"
                      v-model="initialPage"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import global from "../../global";
import Paginate from "../../components/varios/Paginate.vue";
import Loading from "../../components/varios/Loading.vue";
import modalAddColegiado from "../../components/colegiado/modalAddColegiado.vue";
import SearchMultiselect from "../../components/SearchMultiselect/SearchMultiselect.vue";
//Library
import * as XLSX from "xlsx";
import { mapActions } from "vuex";
import dayjs from "dayjs";
export default {
  name: "HistorialPagoConceptos",
  components: {
    Loading,
    modalAddColegiado,
    SearchMultiselect,
    Paginate,
  },
  data() {
    return {
      cargando: false,
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      listadoRegistro: [],
      cbo_desplegable: [],
      fecha_inicio: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_fin: dayjs(this.date).format("YYYY-MM-DD"),
      cod_ventanilla: "0",
      initialPage: 1,
      totalPaginas: 0,
      page_index: 1,
      incluyetraslado: 0,
      buscador: {
        page_index: 1,
      },
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 15, 25, 50],
        total: 0,
      },
    };
  },
  methods: {
    ...mapActions({
      RelacionColegiadosPorFechas:
        "_reporte_colegiado/RelacionColegiadosPorFechas",
    }),
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 5 + (index + 1);
    },
    chkIncluyeTraslado() {
      if (this.incluyetraslado == 1) {
        this.incluyetraslado = 0;
      } else {
        this.incluyetraslado = 1;
      }
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    download_excel: async function () {
      let colegiado = {
        page_index: 1,
        page_size: 999999,
        fechaInicio: this.fecha_inicio,
        fechaFin: this.fecha_fin,
        tipo: this.incluyetraslado,
      };

      this.cargando = true;

      var res = await this.RelacionColegiadosPorFechas(colegiado);

      if (res != null) {
        let export_excel = [];
        export_excel = res.datos.map((el, index) => ({
          index: index + 1,
          fechaColegiatura: dayjs(el.fechaColegiatura).format("DD-MM-YYYY"),
          cqfll: el.cqfll,
          agremiado:
            el.apellidoPaterno + " " + el.apellidoMaterno + " " + el.nombres,
          celular: el.celular,
          correo: el.correo,
          estado: el.estadoColegiado + "-" + el.nombreModalidad,
        }));

        let data = XLSX.utils.json_to_sheet(export_excel, {
          header: [
            "index",
            "fechaColegiatura",
            "cqfll",
            "agremiado",
            "celular",
            "correo",
            "estado",
          ],
        });
        data["A1"].v = "N";
        data["B1"].v = "FECHA COLEGIATURA";
        data["C1"].v = "CQF";
        data["D1"].v = "AGREMIADO";
        data["E1"].v = "CELULAR";
        data["F1"].v = "EMAIL";
        data["G1"].v = "ESTADO";

        const workbook = XLSX.utils.book_new();
        const filename = "relacioncolegiados";
        XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
      this.cargando = false;
    },
    cargarRegistros: async function (pagina = 1) {
      this.cargando = true;

      let colegiado = {
        page_index: pagina,
        page_size: 10,
        fechaInicio: this.fecha_inicio,
        fechaFin: this.fecha_fin,
        tipo: this.incluyetraslado,
      };

      let res = await this.RelacionColegiadosPorFechas(colegiado);

      if (res != null) {
        this.listadoRegistro = res.datos.map((el) => ({
          ...el,
          fechaColegiatura: dayjs(el.fechaColegiatura).format("DD-MM-YYYY"),
        }));
      }

      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;
      this.page_index = res.paginaActual;
      this.initialPage = res.paginaActual;
      this.totalPaginas = res.totalPaginas;
      this.cargando = false;
    },
  },
  computed: {
    totalCuenta: function () {
      let sum = 0;
      this.listadoRegistro.forEach((item) => (sum += parseFloat(item.importe)));
      sum = parseFloat(sum).toFixed(2);

      return sum;
    },
  },
  mounted() {},
};
</script>
