<template>
  <div class="card-header">
    <h3 class="card-title">Agremiados Deuda</h3>
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
              >AGREMIADOS DEUDA</a
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
              <div class="input-group">
                <label>Departamento</label>
                <SearchMultiselect
                  :value="idDepartamentoDomicilio"
                  v-model="idDepartamentoDomicilio"
                  :options="cbo_departamento"
                  placeholder="Departamento"
                  :searchable="true"
                  @select="cargarProvinciaDomicilio"
                  :canClear="false"
                />
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label>Provincia</label>
              <SearchMultiselect
                :value="idProvinciaDomicilio"
                v-model="idProvinciaDomicilio"
                :options="cbo_provincia"
                placeholder="Provincia"
                :searchable="true"
                @select="cargarDistritoDomicilio"
                :canClear="false"
                :disabled="disabledIdProvinciaDomicilio"
              />
            </div>
            <div class="col-md-2 mb-3">
              <label>Distrito</label>
              <SearchMultiselect
                :value="idDistritoDomicilio"
                v-model="idDistritoDomicilio"
                :options="cbo_distrito"
                placeholder="Distrito"
                :searchable="true"
                @select="cargarZonaDomicilio"
                :canClear="false"
                :disabled="disabledIdDistritoDomicilio"
              />
            </div>
            <div class="col-md-2 mb-3">
              <label>Zona</label>
              <SearchMultiselect
                :value="idZona"
                v-model="idZona"
                :options="cbo_zona"
                placeholder="Zona"
                :searchable="true"
                :canClear="true"
                :disabled="disabledIdZonaDomicilio"
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
                  class="
                    table
                    border
                    text-nowrap text-md-nowrap
                    table-striped table-sm
                    mb-0
                  "
                >
                  <thead>
                    <tr>
                      <th>CQFP</th>
                      <th>DNI</th>
                      <th>NOMBRES</th>
                      <th>CORREOS</th>
                      <th>TELEFONO</th>
                      <th>CELULAR</th>
                      <th>DIRECCIÓN</th>
                      <th>DISTRITO</th>
                      <th>MONTO</th>
                      <th>ESTADO</th>
                      <th>MODALIDAD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in listadoRegistro"
                      :key="'item-' + index"
                      v-if="listadoRegistro.length != 0"
                    >
                      <td>{{ item.cqfll }}</td>
                      <td>{{ item.dni }}</td>
                      <td>
                        <p
                          style="width: 100px"
                          class="overflow-ellipsis"
                          data-bs-placement="top"
                          data-bs-toggle="tooltip"
                          :title="item.nombres"
                        >
                          {{ item.nombres }}
                        </p>
                      </td>
                      <td>{{ item.correo }}</td>
                      <td>{{ item.telefono }}</td>
                      <td>{{ item.celular }}</td>
                      <td>
                        <p
                          style="width: 80px"
                          class="overflow-ellipsis"
                          data-bs-placement="top"
                          data-bs-toggle="tooltip"
                          :title="item.direccion"
                        >
                          {{ item.direccion }}
                        </p>
                      </td>
                      <td>{{ item.distrito }}</td>
                      <td>{{ parseFloat(item.total).toFixed(2) }}</td>
                      <td>{{ item.estadoColegiado }}</td>
                      <td>{{ item.modalidad }}</td>
                    </tr>
                    <tr v-else>
                      <td colspan="11" class="text-center">
                        Ningun registro encontrado
                      </td>
                    </tr>
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
      cbo_departamento: [],
      cbo_distrito: [],
      cbo_provincia: [],
      cbo_zona: [],
      disabledIdProvinciaDomicilio: true,
      disabledIdDistritoDomicilio: true,
      disabledIdZonaDomicilio: true,
      idDepartamentoDomicilio: 0,
      idProvinciaDomicilio: 0,
      idDistritoDomicilio: 0,
      idZona: 0,
      fecha_inicio: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_fin: dayjs(this.date).format("YYYY-MM-DD"),
      cod_concepto: "",
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
      ListarAgremiadosDeuda: "_auditoria/ListarAgremiadosDeuda",
      DepartamentoDesplegable: "_colegiado/DepartamentoDesplegable",
      ProvinciaDesplegable: "_colegiado/ProvinciaDesplegable",
      DistritoDesplegable: "_colegiado/DistritoDesplegable",
      ZonaDesplegable: "_colegiado/ZonaDesplegable",
    }),
    cargarProvinciaDomicilio() {
      this.idProvinciaDomicilio = 0;
      this.disabledIdProvinciaDomicilio = false;
      this.disabledIdDistritoDomicilio = true;
      this.disabledIdZonaDomicilio = true;
      this.idDistritoDomicilio = 0;
      this.idZona = 0;
      this.comboProvinciaDomicilio(this.idDepartamentoDomicilio);
    },
    cargarDistritoDomicilio() {
      if (this.disabledIdProvinciaDomicilio == false) {
        this.disabledIdDistritoDomicilio = false;
      }
      this.disabledIdZonaDomicilio = true;
      this.idDistritoDomicilio = 0;
      this.comboDistritoDomicilio(this.idProvinciaDomicilio);
    },
    cargarZonaDomicilio() {
      this.idZona = 0;
      this.disabledIdZonaDomicilio = false;
      this.comboZona(this.idDistritoDomicilio);
    },
    comboDepartamento: async function () {
      var res = await this.DepartamentoDesplegable();
      this.cbo_departamento = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
    },
    comboDistritoDomicilio: async function (idProvincia) {
      let buscador = {
        idProvincia: idProvincia,
      };
      var res = await this.DistritoDesplegable(buscador);
      this.cbo_distrito = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
    },
    comboProvinciaDomicilio: async function (idDepartamento) {
      let buscador = {
        idDepartamento: idDepartamento,
      };
      var res = await this.ProvinciaDesplegable(buscador);
      this.cbo_provincia = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
    },
    comboZona: async function (idDistrito) {
      let buscador = {
        idDistrito: idDistrito,
      };
      var res = await this.ZonaDesplegable(buscador);
      this.cbo_zona = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
    },
    download_excel: async function () {
      let deuda = {
        page_index: 1,
        page_size: 999999,
        idDistrito:
          this.idDistritoDomicilio == 0 ? "" : this.idDistritoDomicilio,
        idZona: this.idZona == 0 || this.idZona == null ? "" : this.idZona,
      };

      this.cargando = true;

      var res = await this.ListarAgremiadosDeuda(deuda);

      if (res != null) {
        let export_excel = [];
        export_excel = res.datos.map((el, index) => ({
          index: index + 1,
          cqfll: el.cqfll,
          dni: el.dni,
          nombres: el.nombres,
          correo: el.correo,
          telefono: el.telefono,
          celular: el.celular,
          direccion: el.direccion,
          distrito: el.distrito,
          total: parseFloat(el.total),
          estadoColegiado: el.estadoColegiado,
          modalidad: el.modalidad,
        }));

        let data = XLSX.utils.json_to_sheet(export_excel, {
          header: [
            "index",
            "cqfll",
            "dni",
            "nombres",
            "correo",
            "telefono",
            "celular",
            "direccion",
            "distrito",
            "total",
            "estadoColegiado",
            "modalidad",
          ],
        });
        data["A1"].v = "ITEM";
        data["B1"].v = "CQFP";
        data["C1"].v = "DNI";
        data["D1"].v = "NOMBRES";
        data["E1"].v = "CORREOS";
        data["F1"].v = "TELÉFONO";
        data["G1"].v = "CELULAR";
        data["H1"].v = "DIRECCIÓN";
        data["I1"].v = "DISTRITO";
        data["J1"].v = "MONTO";
        data["K1"].v = "ESTADO COLEGIADO";
        data["L1"].v = "MODALIDAD";

        const workbook = XLSX.utils.book_new();
        const filename = "agremiadosDeuda";
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

      let deuda = {
        page_index: pagina,
        page_size: 10,
        idDistrito:
          this.idDistritoDomicilio == 0 ? "" : this.idDistritoDomicilio,
        idZona: this.idZona == 0 || this.idZona == null ? "" : this.idZona,
      };

      let res = await this.ListarAgremiadosDeuda(deuda);

      if (res != null) {
        this.listadoRegistro = res.datos;
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

  mounted() {
    this.comboDepartamento();
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
