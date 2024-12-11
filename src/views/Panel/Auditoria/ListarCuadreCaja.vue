<template>
  <div class="card-header">
    <h3 class="card-title">Listar Cuadre de Caja</h3>
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
              >CUADRE DE CAJA</a
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
            <div class="col-md-3 mb-3">
              <label>Ventanilla</label>
              <select
                class="form-control form-select"
                data-bs-placeholder="Ventanilla"
                v-model="cod_ventanilla"
              >
                <option value="0">Ventanilla</option>
                <option value="01">Caja 01</option>
                <option value="02">Caja 02</option>
                <option value="03">Caja 03</option>
              </select>
            </div>
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
            <div class="col-md-3 mb-3" style="text-align: left">
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
                      <th>VENT</th>
                      <th>FECHA</th>
                      <th>FONDO FIJO</th>
                      <th>NOTA DE INGRESO</th>
                      <th>INGRESOS</th>
                      <th>EGRESOS</th>
                      <th>DEPOSITO</th>
                      <th>EFECTIVO</th>
                      <th>REGULARIZAR</th>
                      <th>SALDO</th>
                      <th>ESTADO</th>
                      <th>REGISTRADO</th>
                      <th>USUARIO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in listadoRegistro"
                      :key="'item-' + index"
                      v-if="listadoRegistro.length != 0"
                    >
                      <td>{{ item.cod_ventanilla }}</td>
                      <td>{{ item.fechacuadre }}</td>
                      <td>{{ parseFloat(item.cua_fondofijo).toFixed(2) }}</td>
                      <td>
                        {{ parseFloat(item.cua_notaingresos).toFixed(2) }}
                      </td>
                      <td>{{ parseFloat(item.cua_ingresos).toFixed(2) }}</td>
                      <td>
                        {{ parseFloat(item.cua_egresos).toFixed(2) }}
                      </td>
                      <td>{{ parseFloat(item.cua_depositos).toFixed(2) }}</td>
                      <td>
                        {{ parseFloat(item.cua_efectivo).toFixed(2) }}
                      </td>
                      <td>
                        {{ parseFloat(item.cua_xregularizar).toFixed(2) }}
                      </td>
                      <td>
                        {{ parseFloat(item.cua_saldo).toFixed(2) }}
                      </td>
                      <td>{{ item.cua_estado }}</td>
                      <td>{{ item.cua_fechareg }}</td>
                      <td>{{ item.cua_usuarioreg }}</td>
                    </tr>
                    <tr v-else>
                      <td colspan="13" class="text-center">
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
import global from "../../../global";
import Paginate from "../../../components/varios/Paginate.vue";
import Loading from "../../../components/varios/Loading.vue";
import modalAddColegiado from "../../../components/colegiado/modalAddColegiado.vue";
import SearchMultiselect from "../../../components/SearchMultiselect/SearchMultiselect.vue";
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
      ListarCuadres: "_auditoria/ListarCuadres",
    }),
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    download_excel: async function () {
      let cuadrecaja = {
        page_index: 1,
        page_size: 999999,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        cod_ventanilla: this.cod_ventanilla,
      };

      this.cargando = true;

      var res = await this.ListarCuadres(cuadrecaja);

      if (res != null) {
        let export_excel = [];
        export_excel = res.datos.map((el, index) => ({
          ...el,
          index: index + 1,
          cua_fechareg: dayjs(el.cua_fechareg).format("DD-MM-YYYY"),
          fechacuadre: dayjs(el.fechacuadre).format("DD-MM-YYYY"),
        }));

        let data = XLSX.utils.json_to_sheet(export_excel, {
          header: [
            "index",
            "cod_ventanilla",
            "fechacuadre",
            "cua_fondofijo",
            "cua_notaingresos",
            "cua_ingresos",
            "cua_egresos",
            "cua_depositos",
            "cua_efectivo",
            "cua_xregularizar",
            "cua_saldo",
            "cua_estado",
            "cua_fechareg",
            "cua_usuarioreg",
          ],
        });
        data["A1"].v = "ITEM";
        data["B1"].v = "VENT";
        data["C1"].v = "FECHA";
        data["D1"].v = "FONDO FIJO";
        data["E1"].v = "NOTA DE INGRESO";
        data["F1"].v = "INGRESOS";
        data["G1"].v = "EGRESOS";
        data["H1"].v = "DEPOSITO";
        data["I1"].v = "EFECTIVO";
        data["J1"].v = "REGULARIZAR";
        data["K1"].v = "SALDO";
        data["L1"].v = "ESTADO";
        data["M1"].v = "REGISTRADO";
        data["N1"].v = "USUARIO";

        const workbook = XLSX.utils.book_new();
        const filename = "listarcuadre";
        XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
      this.cargando = false;
    },
    cargarRegistros: async function (pagina = 1) {
      this.cargando = true;

      let cuadrecaja = {
        page_index: pagina,
        page_size: 10,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        cod_ventanilla: this.cod_ventanilla,
      };

      let res = await this.ListarCuadres(cuadrecaja);

      if (res != null) {
        this.listadoRegistro = res.datos.map((el) => ({
          ...el,
          cua_fechareg: dayjs(el.cua_fechareg).format("DD-MM-YYYY"),
          fechacuadre: dayjs(el.fechacuadre).format("DD-MM-YYYY"),
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
