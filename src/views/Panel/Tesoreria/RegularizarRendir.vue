<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Regularizar a Rendir</h3>
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
              >REGULARIZAR</a
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
            <div class="row">
              <div class="col-md-12">
                <button class="btn btn-primary" type="button" @click="openurlArchivo()">
                  <i class="fe fe-eye me-2"></i>Vista Previa
                </button>
                <!-- <button class="btn btn-primary m-5" type="button">
                  <i class="fe fe-eye me-2"></i>Vista Previa
                </button> -->
                <button
                  class="btn btn-primary m-5"
                  type="button"
                  @click="download_excel"
                >
                  <i class="fe fe-share me-2"></i>Exportar
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 row">
              <div class="mb-5 p-4 br-5">
                <div class="row">
                  <div class="col-md-1 mb-3">
                    <div class="row mb-4">
                      <div class="form-label"></div>
                      <label class="custom-control custom-radio">
                        <input
                          type="radio"
                          class="custom-control-input"
                          name="example-radios"
                          value="option1"
                          checked
                          @click="cambiarTipoBusqueda('T')"
                          v-model="tipo_actual"
                        />
                        <span class="custom-control-label">Actual</span>
                      </label>
                    </div>
                  </div>
                  <div class="col-md-2 mb-3">
                    <div class="row mb-4">
                      <div class="form-label"></div>
                      <label class="custom-control custom-radio">
                        <input
                          type="radio"
                          class="custom-control-input"
                          name="example-radios"
                          value="option1"
                          v-model="tipo_por_fecha"
                          @click="cambiarTipoBusqueda('F')"
                        />
                        <span class="custom-control-label">Por Fecha</span>
                      </label>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div class="row mb-4">
                      <input
                        type="date"
                        class="form-control"
                        v-model="fecha_busqueda"
                      />
                    </div>
                  </div>

                  <div class="col-md-5 mb-3">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="cargarRegistros()"
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
                            <th>Tipo</th>
                            <th>Serie</th>
                            <th>Numero</th>
                            <th>Comentario</th>
                            <th>Ruc</th>
                            <th>Razón Social</th>
                            <th>Fecha Emi</th>
                            <th>Imp.</th>
                            <th>Devuelto</th>
                            <th>Días</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in listadoRegistro"
                            :key="'item-' + index"
                            v-if="listadoRegistro.length != 0"
                          >
                            <td>{{ item.tipcom_dsc }}</td>
                            <td>{{ item.com_serie }}</td>
                            <td>{{ item.com_numero }}</td>
                            <td>
                              <p
                                class="overflow-ellipsis"
                                data-bs-placement="top"
                                data-bs-toggle="tooltip"
                                :title="item.com_obs"
                              >
                                {{ item.com_obs }}
                              </p>
                            </td>
                            <td>{{ item.ruc }}</td>
                            <td>{{ item.razonsocial }}</td>
                            <td>{{ item.com_fechaemi }}</td>
                            <td>{{ item.progdet_importe }}</td>
                            <td>{{ item.recade_fechadevuelto }}</td>
                            <td>{{ item.dias }}</td>
                            <td class="text-center">
                              <i
                                class="fa fa-trash mx-1 text-danger"
                                role="button"
                                @click="cargarEliminar(item)"
                              ></i>
                            </td>
                          </tr>
                          <tr v-else>
                            <td colspan="10" class="text-center">
                              Ningun registro encontrado
                            </td>
                          </tr>
                          <tr>
                            <td
                              colspan="7"
                              class="fw-bold text-uppercase text-end"
                            >
                              Total
                            </td>
                            <td>{{ totalRendir }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
</template>

<script>
import { mapActions } from "vuex";
import Loading from "../../../components/varios/Loading.vue";

import global from "../../../global";

//Library
import * as XLSX from "xlsx";
import dayjs from "dayjs";
export default {
  name: "RegularizarRendir",
  components: {
    Loading,
  },
  data() {
    return {
      iprutaFiles: global.ruta_api,
      cargando: false,
      date: new Date(),
      currentMonth: dayjs(this.date).format("MM"),
      currentAnio: dayjs(this.date).format("YYYY"),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_busqueda: dayjs(this.date).format("YYYY-MM-DD"),
      tipo_por_fecha: "",
      tipo_actual: "",
      tipo_busqueda: "T",
      listadoRegistro: [],
    };
  },
  methods: {
    ...mapActions({
      ListarComprobantePagoARendir:
        "_comprobantepago/ListarComprobantePagoARendir",
      QuitarListaRendir: "_comprobantepago/QuitarListaRendir",
    }),
    openurlArchivo() {
      let url = `${this.iprutaFiles}comprobantedepago/quitar/listarendir/generarPDF?tipo=${this.tipo_busqueda}&fecha=${this.fecha_busqueda}`;
      window.open(url, "_blank");
    },
    cargarEliminar: async function (item) {
      let libro_codigo = this.currentAnio + "" + this.currentMonth;

      let regularizar = {
        recade_codigo: item.recade_codigo,
        libro_codigo: libro_codigo,
      };

      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.QuitarListaRendir(regularizar);
          if (res?.exito) {
            this.cargarRegistros();
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    download_excel: async function () {
      let export_excel = [];
      export_excel = this.listadoRegistro.map((el, index) => ({
        tipcom_dsc: el.tipcom_dsc,
        com_serie: el.com_serie,
        com_numero: el.com_numero,
        com_obs: el.com_obs,
        ruc: el.ruc,
        razonsocial: el.razonsocial,
        com_fechaemi: dayjs(el.com_fechaemi).format("DD-MM-YYYY"),
        progdet_importe: parseFloat(el.progdet_importe),
        recade_fechadevuelto: el.recade_fechadevuelto,
        dias: el.dias,
      }));
      let data = XLSX.utils.json_to_sheet(export_excel, {
        header: [
          "tipcom_dsc",
          "com_serie",
          "com_numero",
          "com_obs",
          "ruc",
          "razonsocial",
          "com_fechaemi",
          "progdet_importe",
          "recade_fechadevuelto",
          "dias",
        ],
      });
      data["A1"].v = "TIPO";
      data["B1"].v = "SERIE";
      data["C1"].v = "NUMERO";
      data["D1"].v = "COMENTARIO";
      data["E1"].v = "RUC";
      data["F1"].v = "RAZÓN SOCIAL";
      data["G1"].v = "FECHA EMI";
      data["H1"].v = "IMP.";
      data["I1"].v = "DEVUELTO";
      data["J1"].v = "DÍAS";

      const workbook = XLSX.utils.book_new();
      const filename = "regularizarrendir";
      XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    cambiarTipoBusqueda(tipo) {
      this.tipo_busqueda = tipo;
    },
    cargarRegistros: async function () {
      this.cargando = true;

      let comprobantepago = {
        tipo: this.tipo_busqueda,
        fecha: this.fecha_busqueda,
      };
      console.log(this.tipo_actual, this.tipo_por_fecha);
      let res = await this.ListarComprobantePagoARendir(comprobantepago);
      if (res != null) {
        this.listadoRegistro = res.map((el) => ({
          ...el,
          com_fechaemi: dayjs(el.com_fechaemi).format("DD-MM-YYYY"),
        }));
      }
      this.cargando = false;
    },
  },
  computed: {
    totalRendir: function () {
      let sum = 0;
      this.listadoRegistro.forEach(
        (item) => (sum += parseFloat(item.progdet_importe))
      );
      sum = parseFloat(sum).toFixed(2);

      return sum;
    },
  },
  mounted() {
    this.cargarRegistros();
  },
};
</script>
<style lang="css" scoped>
p {
  width: 75px;
  white-space: nowrap;
  overflow: hidden;
}

.overflow-ellipsis {
  text-overflow: ellipsis;
}
</style>
