<template>
  <div class="card-header">
    <h3 class="card-title">Lista de Agremiados</h3>
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
              >LISTA DE AGREMIADOS</a
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
            <div class="col-md-5 mb-3">
              <label>Estado</label>
              <SearchMultiselect
                v-model="seleccionarEstado"
                :value="seleccionarEstado"
                :options="estado"
                mode="tags"
                :close-on-select="false"
                :create-option="true"
                placeholder="Estado"
                :clear="limpiarEstado()"
              />
            </div>
            <div class="col-md-5 mb-3">
              <label>Modalidad</label>
              <SearchMultiselect
                v-model="seleccionarModalidad"
                value="seleccionarModalidad"
                :options="modalidad"
                mode="tags"
                :close-on-select="false"
                :create-option="true"
                placeholder="Modalidad"
                :clear="limpiarModalidad()"
              />
            </div>

            <div class="col-md-2 mb-3" style="text-align: left">
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
                      <th>CQFLL</th>
                      <th>APELLIDOS</th>
                      <th>NOMBRES</th>
                      <th>DNI</th>
                      <th>FECHA NACIMIENTO</th>
                      <th>DIRECCIÓN</th>
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
                      <td>{{ item.cqfll }}</td>
                      <td>
                        {{ item.apellidoPaterno }} {{ item.apellidoMaterno }}
                      </td>
                      <td>
                        {{ item.nombres }}
                      </td>
                      <td>{{ item.dni }}</td>
                      <td>{{ item.fechaNacimiento }}</td>
                      <td>
                        <p
                          style="
                            width: 75px;
                            white-space: nowrap;
                            overflow: hidden;
                          "
                          class="overflow-ellipsis"
                          data-bs-placement="top"
                          data-bs-toggle="tooltip"
                          :title="item.direccion"
                        >
                          {{ item.direccion }}
                        </p>
                      </td>
                      <td>{{ item.correo }}</td>
                      <td>{{ item.estadoColegiado }}</td>
                    </tr>
                    <tr v-else>
                      <td colspan="9" class="text-center">
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
      seleccionarModalidad: null,
      seleccionarEstado: null,
      modalidad: [
        {
          value: 1,
          label: "Ingreso por primera vez ",
        },
        { value: 2, label: "Traslado" },
        { value: 3, label: "Honorario" },
        { value: 4, label: "Fallecido" },
        { value: 5, label: "Reingreso" },
        { value: 6, label: "Viaje al extranjero" },
        { value: 7, label: "Ingreso por traslado" },
        { value: 8, label: "Salud" },
        { value: 9, label: "Otra profesión" },
        { value: 10, label: "Reingreso anulado" },
        { value: 11, label: "Traslado anulado" },
        { value: 13, label: "Suspención" },
      ],
      estado: [
        { value: 1, label: "Habilitado" },
        { value: 2, label: "Inhabilitado" },
        { value: 3, label: "Exonerado" },
        { value: 4, label: "Postulante" },
      ],
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 15, 25, 50],
        total: 0,
      },
      filtros: {},
      filtrosBase: {
        page_index: 1,
        page_size: 10,
        idModalidad1: 0,
        idModalidad2: 0,
        idModalidad3: 0,
        idModalidad4: 0,
        idModalidad5: 0,
        idModalidad6: 0,
        idModalidad7: 0,
        idModalidad8: 0,
        idModalidad9: 0,
        idModalidad10: 0,
        idModalidad11: 0,
        idEstadoColegiado1: 0,
        idEstadoColegiado2: 0,
        idEstadoColegiado3: 0,
        idEstadoColegiado4: 0,
        idEstadoColegiado5: 0,
      },
    };
  },
  methods: {
    ...mapActions({
      ListarAgremiados: "_reporte_colegiado/ListarAgremiados",
    }),
    limpiarEstado() {
      if (this.seleccionarEstado != null) {
        if (this.seleccionarEstado.length == 0) {
          this.seleccionarEstado = null;
        }
      }
    },
    limpiarModalidad() {
      if (this.seleccionarModalidad != null) {
        if (this.seleccionarModalidad.length == 0) {
          this.seleccionarModalidad = null;
        }
      }
    },
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
      if (this.seleccionarModalidad != null && this.seleccionarEstado != null) {
        this.filtros = { ...this.filtrosBase };
        this.filtros.page_size = 999999;
        this.cargarSeleccionModalidad();
        this.cargarSeleccionEstado();

        this.cargando = true;

        var res = await this.ListarAgremiados(this.filtros);

        if (res != null) {
          let export_excel = [];

          export_excel = res.datos.map((el, index) => ({
            index: index + 1,
            cqfll: el.cqfll,
            apellidos: el.apellidoPaterno + " " + el.apellidoMaterno,
            nombres: el.nombres,
            dni: el.dni,
            fechaNacimiento: dayjs(el.fechaNacimiento).format("DD-MM-YYYY"),
            direccion: el.direccion,
            correo: el.correo,
            estadoColegiado: el.estadoColegiado,
          }));

          let data = XLSX.utils.json_to_sheet(export_excel, {
            header: [
              "index",
              "cqfll",
              "apellidos",
              "nombres",
              "dni",
              "fechaNacimiento",
              "direccion",
              "correo",
              "estadoColegiado",
            ],
          });
          data["A1"].v = "#";
          data["B1"].v = "CQFLL";
          data["C1"].v = "APELLIDOS";
          data["D1"].v = "NOMBRES";
          data["E1"].v = "DNI";
          data["F1"].v = "FECHA NACIMIENTO";
          data["G1"].v = "DIRECCIÓN";
          data["H1"].v = "EMAIL";
          data["I1"].v = "ESTADO";

          const workbook = XLSX.utils.book_new();
          const filename = "listaagremiados";
          XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
          XLSX.writeFile(workbook, `${filename}.xlsx`);
        } else {
          global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
        }
        this.cargando = false;
      } else if (this.seleccionarModalidad == null) {
        global._mensaje_advertencia("Seleccione una modalidad, gracias.");
        return;
      } else if (this.seleccionarEstado == null) {
        global._mensaje_advertencia("Seleccione un estado, gracias.");
        return;
      }
    },
    cargarSeleccionModalidad() {
      if (this.seleccionarModalidad != null) {
        this.seleccionarModalidad.forEach((item) => {
          if (item == 1) {
            this.filtros.idModalidad1 = item;
          } else if (item == 2) {
            this.filtros.idModalidad2 = item;
          } else if (item == 3) {
            this.filtros.idModalidad3 = item;
          } else if (item == 4) {
            this.filtros.idModalidad4 = item;
          } else if (item == 5) {
            this.filtros.idModalidad5 = item;
          } else if (item == 6) {
            this.filtros.idModalidad6 = item;
          } else if (item == 7) {
            this.filtros.idModalidad7 = item;
          } else if (item == 8) {
            this.filtros.idModalidad8 = item;
          } else if (item == 9) {
            this.filtros.idModalidad9 = item;
          } else if (item == 10) {
            this.filtros.idModalidad10 = item;
          } else if (item == 11) {
            this.filtros.idModalidad11 = item;
          } else if (item == 13) {
            this.filtros.idModalidad13 = item;
          }
        });
      }
    },
    cargarSeleccionEstado() {
      if (this.seleccionarEstado != null) {
        this.seleccionarEstado.forEach((item) => {
          if (item == 1) {
            this.filtros.idEstadoColegiado1 = item;
          } else if (item == 2) {
            this.filtros.idEstadoColegiado2 = item;
          } else if (item == 3) {
            this.filtros.idEstadoColegiado3 = item;
          } else if (item == 4) {
            this.filtros.idEstadoColegiado4 = item;
          }
        });
      }
    },
    cargarRegistros: async function (pagina = 1) {
      if (this.seleccionarModalidad != null && this.seleccionarEstado != null) {
        this.filtros = { ...this.filtrosBase };
        this.cargarSeleccionModalidad();
        this.cargarSeleccionEstado();
        this.filtros.page_index = pagina;

        console.log(this.filtros);
        this.cargando = true;

        let res = await this.ListarAgremiados(this.filtros);

        if (res != null) {
          this.listadoRegistro = res.datos.map((el) => ({
            ...el,
            fechaNacimiento: dayjs(el.fechaNacimiento).format("DD-MM-YYYY"),
          }));
        }

        this.pagination.total = res.totalRegistros;
        this.pagination.perPage = res.registrosPorPagina;
        this.pagination.currentPage = res.paginaActual;
        this.page_index = res.paginaActual;
        this.initialPage = res.paginaActual;
        this.totalPaginas = res.totalPaginas;
        this.cargando = false;
      } else if (this.seleccionarModalidad == null) {
        global._mensaje_advertencia("Seleccione una modalidad, gracias.");
        return;
      } else if (this.seleccionarEstado == null) {
        global._mensaje_advertencia("Seleccione un estado, gracias.");
        return;
      }
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
<style lang="css" scoped>
.overflow-ellipsis {
  text-overflow: ellipsis;
}
</style>
