<template>
  <div class="card-header">
    <h3 class="card-title">Comprobante de Pago por Plan de Cuenta</h3>
  </div>
  <div class="card-body pb-2">
    <div class="tab-menu-heading tab-menu-heading-boxed" style="border-bottom: 0 !important">
      <div class="tabs-menu-boxed" style="float: right; width: 100%">
        <!-- Tabs -->
        <ul class="nav panel-tabs" style="float: right">
          <!-- <li><a href="#listadoTab" class="active" data-bs-toggle="tab" id="tabGeneralListado">LISTADO</a>
                    </li> -->
          <li>
            <a href="#registrarTab" class="active" data-bs-toggle="tab" id="tabGeneralRegistrar">COMPROBANTE DE PAGO</a>
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
                <button class="btn btn-primary" type="button" @click="download_excel()">
                  <i class="fe fe-share me-2"></i>Exportar
                </button>
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-md-4 mb-3">
              <div class="input-group">
                <label>Plan de Cuenta</label>
                <SearchMultiselect v-model="plan_codigo" :options="cbo_plan_cuenta" placeholder="Cuenta Contable"
                  :searchable="true" />
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label>Fecha Inicio</label>
              <input type="date" class="form-control" placeholder="Fecha Inicio" v-model="fecha_inicio" />
            </div>
            <div class="col-md-3 mb-3">
              <label>Fecha Fin</label>
              <input type="date" class="form-control" placeholder="Fecha Inicio" v-model="fecha_fin" />
            </div>
            <div class="col-md-2 mb-3" style="text-align: left">
              <button type="button" class="btn btn-primary" @click="cargarRegistros()" style="margin-top: 29px">
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
                <table class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0">
                  <thead>
                    <tr>
                      <th>TIPO</th>
                      <th>SERIE</th>
                      <th>NÚMERO</th>
                      <th>RUC</th>
                      <th>RAZÓN SOCIAL</th>
                      <th>FECHA EMSIÓN</th>
                      <th>CUENTA</th>
                      <th>ITEM</th>
                      <th>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in listadoRegistro" :key="'item-' + index"
                      v-if="listadoRegistro.length != 0">
                      <td>{{ item.desc_tipodoc }}</td>
                      <td>{{ item.com_serie }}</td>
                      <td>{{ item.com_numero }}</td>
                      <td>{{ item.ruc }}</td>
                      <td>
                        <p style="width: 200px" class="overflow-ellipsis" data-bs-placement="top"
                          data-bs-toggle="tooltip" :title="item.razonsocial">
                          {{ item.razonsocial }}
                        </p>
                      </td>
                      <td>{{ item.com_fechaemi }}</td>
                      <td>
                        <p style="width: 170px" class="overflow-ellipsis" data-bs-placement="top"
                          data-bs-toggle="tooltip" :title="item.plan_dsc">
                          {{ item.plan_dsc }}
                        </p>
                      </td>
                      <td>
                        <p style="width: 180px" class="overflow-ellipsis" data-bs-placement="top"
                          data-bs-toggle="tooltip" :title="item.comdet_item">
                          {{ item.comdet_item }}
                        </p>
                      </td>
                      <td>{{ parseFloat(item.tot).toFixed(2) }}</td>
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
                    <div class="dataTables_info" id="responsive-datatable_info" role="status" aria-live="polite">
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
                    <paginate :page-count="totalPaginas" :click-handler="cambiarPagina" v-model="initialPage" />
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
  name: "ComprobantePagoPlanCuenta",
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
      cbo_plan_cuenta: [],
      fecha_inicio: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_fin: dayjs(this.date).format("YYYY-MM-DD"),
      plan_codigo: "",
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
      PlanCuentaDesplegable: "_plancuenta/PlanCuentaDesplegable",
      ListarComprobantePagoPlanCuenta: "_auditoria/ListarComprobantePagoPlanCuenta",
    }),
    download_excel: async function () {
      let comprobantepago = {
        page_index: 1,
        page_size: 999999,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        plan_codigo: this.plan_codigo == null ? "" : this.plan_codigo,
      };

      this.cargando = true;

      var res = await this.ListarComprobantePagoPlanCuenta(comprobantepago);

      if (res != null) {
        let export_excel = [];
        export_excel = res.datos.map((el, index) => ({
          index: index + 1,
          desc_tipodoc: el.desc_tipodoc,
          com_serie: el.com_serie,
          com_numero: el.com_numero,
          ruc: el.ruc,
          razonsocial: el.razonsocial,
          com_fechaemi: dayjs(el.com_fechaemi).format("DD-MM-YYYY"),
          plan_dsc: el.plan_dsc,
          comdet_item: el.comdet_item,
          tot: parseFloat(el.tot),
        }));

        let data = XLSX.utils.json_to_sheet(export_excel, {
          header: [
            "index",
            "desc_tipodoc",
            "com_serie",
            "com_numero",
            "ruc",
            "razonsocial",
            "com_fechaemi",
            "plan_dsc",
            "comdet_item",
            "tot"
          ],
        });
        data["A1"].v = "ITEM";
        data["B1"].v = "TIPO";
        data["C1"].v = "SERIE";
        data["D1"].v = "NÚMERO";
        data["E1"].v = "RUC";
        data["F1"].v = "RAZÓN SOCIAL";
        data["G1"].v = "FECHA EMISIÓN";
        data["H1"].v = "CUENTA";
        data["I1"].v = "ITEM";
        data["J1"].v = "TOTAL";

        const workbook = XLSX.utils.book_new();
        const filename = "comprobantePagoPlanCuenta";
        XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
      this.cargando = false;
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cargarRegistros: async function (pagina = 1) {
      this.cargando = true;

      let comprobantepago = {
        page_index: pagina,
        page_size: 10,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        plan_codigo: this.plan_codigo == null ? "" : this.plan_codigo,
      };

      let res = await this.ListarComprobantePagoPlanCuenta(comprobantepago);

      if (res != null) {
        this.listadoRegistro = res.datos.map((el) => ({
          ...el,
          com_fechaemi: dayjs(el.com_fechaemi).format("DD-MM-YYYY"),
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
    comboPlanCuenta: async function () {
      var res = await this.PlanCuentaDesplegable();
      this.cbo_plan_cuenta = res.map((item) => {
        return { label: item.plan_dsc, value: item.plan_codigo };
      });
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
  mounted() {
    this.comboPlanCuenta();
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
