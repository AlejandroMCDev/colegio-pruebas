<template>
  <div class="card-header">
    <h3 class="card-title">Ingresos Mensuales</h3>
  </div>
  <div class="card-body pb-2">
    <div class="tab-menu-heading tab-menu-heading-boxed" style="border-bottom: 0 !important">
      <div class="tabs-menu-boxed" style="float: right; width: 100%">
        <!-- Tabs -->
        <ul class="nav panel-tabs" style="float: right">
          <!-- <li><a href="#listadoTab" class="active" data-bs-toggle="tab" id="tabGeneralListado">LISTADO</a>
                    </li> -->
          <li>
            <a href="#registrarTab" class="active" data-bs-toggle="tab" id="tabGeneralRegistrar">Ingresos Mensuales</a>
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
            <div class="col-md-3 mb-3">
              <label>Desde</label>
              <input type="date" class="form-control" placeholder="Fecha Inicio" v-model="fecha_inicio" />
            </div>
            <div class="col-md-3 mb-3">
              <label>Hasta</label>
              <input type="date" class="form-control" placeholder="Fecha Inicio" v-model="fecha_fin" />
            </div>
            <div class="col-md-3 mb-3" style="text-align: left">
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
                      <th>Concepto</th>
                      <th>Enero</th>
                      <th>Febrero</th>
                      <th>Marzo</th>
                      <th>Abril</th>
                      <th>Mayo</th>
                      <th>Junio</th>
                      <th>Julio</th>
                      <th>Agosto</th>
                      <th>Septiembre</th>
                      <th>Octubre</th>
                      <th>Noviembre</th>
                      <th>Diciembre</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in listadoRegistro" :key="'item-' + index"
                      v-if="listadoRegistro.length != 0">
                      <td>
                        <p style="width: 220px" class="overflow-ellipsis" data-bs-placement="top"
                          data-bs-toggle="tooltip" :title="item.concepto">
                          {{ item.concepto }}
                        </p>
                      </td>
                      <td>{{ item.enero }}</td>
                      <td>{{ item.febrero }}</td>
                      <td>{{ item.marzo }}</td>
                      <td>{{ item.abril }}</td>
                      <td>{{ item.mayo }}</td>
                      <td>{{ item.junio }}</td>
                      <td>{{ item.julio }}</td>
                      <td>{{ item.agosto }}</td>
                      <td>{{ item.setiembre }}</td>
                      <td>{{ item.octubre }}</td>
                      <td>{{ item.noviembre }}</td>
                      <td>{{ item.diciembre }}</td>

                    </tr>
                    <tr v-else>
                      <td colspan="13" class="text-center">
                        Ningun registro encontrado
                      </td>
                    </tr>
                  </tbody>
                </table>

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
  name: "IngresosMensuales",
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
      IngresosMensuales: "_reporte_ingresos_mensuales/IngresosMensuales",
    }),
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    download_excel: async function () {
      let ingresos_mensuales = {
        fechaini: this.fecha_inicio,
        fechafin: this.fecha_fin,
      };

      this.cargando = true;

      var res = await this.IngresosMensuales(ingresos_mensuales);

      if (res != null) {
        let export_excel = [];
        export_excel = res.map((el, index) => ({
          index: index + 1,
          concepto: el.concepto,
          enero: el.enero != null ? parseFloat(el.enero) : el.enero,
          febrero: el.febrero != null ? parseFloat(el.febrero) : el.febrero,
          marzo: el.marzo != null ? parseFloat(el.marzo) : el.marzo,
          abril: el.abril != null ? parseFloat(el.abril) : el.abril,
          mayo: el.mayo != null ? parseFloat(el.mayo) : el.mayo,
          junio: el.junio != null ? parseFloat(el.junio) : el.junio,
          julio: el.julio != null ? parseFloat(el.julio) : el.julio,
          agosto: el.agosto != null ? parseFloat(el.agosto) : el.agosto,
          setiembre: el.setiembre != null ? parseFloat(el.setiembre) : el.setiembre,
          octubre: el.octubre != null ? parseFloat(el.octubre) : el.octubre,
          noviembre: el.noviembre != null ? parseFloat(el.noviembre) : el.noviembre,
          diciembre: el.diciembre != null ? parseFloat(el.diciembre) : el.diciembre
        }));

        let data = XLSX.utils.json_to_sheet(export_excel, {
          header: [
            "index",
            "concepto",
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "setiembre",
            "octubre",
            "noviembre",
            "diciembre"
          ],
        });
        data["A1"].v = "ITEM";
        data["B1"].v = "CONCEPTO";
        data["C1"].v = "ENERO";
        data["D1"].v = "FEBRERO";
        data["E1"].v = "MARZO";
        data["F1"].v = "ABRIL";
        data["G1"].v = "MAYO";
        data["H1"].v = "JUNIO";
        data["I1"].v = "JULIO";
        data["J1"].v = "AGOSTO";
        data["K1"].v = "SETIEMBRE";
        data["L1"].v = "OCTUBRE";
        data["M1"].v = "NOVIEMBRE";
        data["N1"].v = "DICIEMBRE";

        const workbook = XLSX.utils.book_new();
        const filename = "ingresosmensuales";
        XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
      this.cargando = false;
    },
    cargarRegistros: async function (pagina = 1) {
      this.cargando = true;

      let ingresos_mensuales = {
        fechaini: this.fecha_inicio,
        fechafin: this.fecha_fin
      };

      let res = await this.IngresosMensuales(ingresos_mensuales);
      console.log(res);
      if (res != null) {
        this.listadoRegistro = res;
      }


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
  mounted() { },
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
