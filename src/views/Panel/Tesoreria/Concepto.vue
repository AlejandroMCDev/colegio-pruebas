<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Concepto</h3>
  </div>
  <div class="card-body pb-2">
    <div
      class="tab-menu-heading tab-menu-heading-boxed"
      style="border-bottom: 0 !important"
    >
      <div class="tabs-menu-boxed" style="float: right; width: 100%">
        <!-- Tabs -->
        <ul class="nav panel-tabs" style="float: right">
          <li>
            <a
              href="#listadoTab"
              class="active"
              data-bs-toggle="tab"
              id="tabListadoConcepto"
              >LISTADO</a
            >
          </li>
          <li>
            <a
              href="#registrarTab"
              data-bs-toggle="tab"
              id="tabRegistrarConcepto"
              >REGISTRAR</a
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- DATOS GENERALES -->
    <div class="panel-body tabs-menu-body">
      <div class="tab-content">
        <div class="tab-pane active" id="listadoTab">
          <div class="mb-5 p-4 br-5">
            <div class="form-label mt-0 p-0">LISTA</div>
            <div class="row">
              <div class="col-md-6 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ingrese el concepto"
                  v-model="desc_concepto"
                />
              </div>

              <div class="col-md-3 mb-3" style="text-align: left">
                <button
                  type="button"
                  class="btn btn-primary"
                  style="margin: 2px"
                  @click="cargarRegistros()"
                >
                  <i class="fe fe-search me-2"></i>Buscar
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="nuevoRegistro()"
                >
                  <i class="fe fe-file me-2"></i>Nuevo
                </button>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive">
                  <table
                    class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Codigo</th>
                        <th>Descripción</th>
                        <th>Linea</th>
                        <th>Monto</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in listadoRegistro"
                        :key="'item-' + index"
                        v-if="listadoRegistro.length != 0"
                      >
                        <th scope="row">{{ indexMethod(index) }}</th>
                        <td>{{ item.cod_concepto }}</td>
                        <td>{{ item.desc_concepto }}</td>
                        <td>{{ item.cod_linea_val }}</td>
                        <td>{{ parseFloat(item.precio).toFixed(2) }}</td>
                        <td class="text-center">
                          <i
                            class="fa fa-pencil mx-1 text-yellow"
                            role="button"
                            @click="cargarVer(item, index)"
                          ></i>
                          <i
                            class="fa fa-trash mx-1 text-danger"
                            role="button"
                            @click="cargarEliminar(item, index)"
                          ></i>
                        </td>
                      </tr>
                      <tr v-else>
                        <td colspan="6" class="text-center">
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
                      <button
                        @click="cambiarPagina(1)"
                        class="page-link btn btn-outline-info"
                      >
                        Primero
                      </button>
                      <li
                        class="page-item"
                        v-for="(item, index) in totalPaginas"
                        style="list-style: none"
                        :key="index"
                      >
                        <button
                          href="#"
                          @click="cambiarPagina(index + 1)"
                          :class="
                            buscador.page_index == index + 1
                              ? 'page-link btn'
                              : 'page-link btn btn-outline-info'
                          "
                          :style="
                            buscador.page_index == index + 1
                              ? 'color: white; background-color: #36b9cc;'
                              : ''
                          "
                        >
                          {{ index + 1 }}
                        </button>
                      </li>
                      <button
                        @click="cambiarPagina(totalPaginas)"
                        class="page-link btn btn-outline-info"
                      >
                        Último
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="registrarTab">
          <div class="form-label mt-0 p-0">
            <button
              type="button"
              class="btn btn-primary"
              @click="loadRegistro()"
            >
              <i class="fe fe-file me-2"></i>Nuevo
            </button>
          </div>
          <div class="row">
            <div class="col-md-12 row">
              <div class="mb-5 p-4 br-5">
                <div class="form-label mt-0 p-0">DATOS GENERALES</div>
                <br />
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Codigo</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Codigo"
                        disabled
                        v-model="concepto.cod_concepto"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Descripción</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Descripción"
                        ref="desc_concepto"
                        :style="
                          showAdvertise && concepto.desc_concepto == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                        v-model="concepto.desc_concepto"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Linea</label>
                      <SearchMultiselect
                        :value="concepto.cod_linea"
                        v-model="concepto.cod_linea"
                        :options="lineaDesplegable"
                        placeholder="Linea"
                        ref="cod_linea"
                        :searchable="true"
                        :style="
                          (showAdvertise && concepto.cod_linea == 0) ||
                          concepto.cod_linea == null
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Monto</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Monto"
                        ref="precio"
                        :style="
                          showAdvertise && concepto.precio == 0
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                        v-model="concepto.precio"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Cuenta Contable</label>
                      <SearchMultiselect
                        :value="concepto.plan_codigo"
                        v-model="concepto.plan_codigo"
                        :options="plancuentaDesplegable"
                        placeholder="Cuenta Contable"
                        ref="plan_codigo"
                        :searchable="true"
                        :style="
                          (showAdvertise && concepto.plan_codigo == 0) ||
                          concepto.plan_codigo == null
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                      <!-- <div class="input-group">
                                                <input type="text" class="form-control" placeholder="Cuenta Contable"
                                                    aria-label="Example text with button addon"
                                                    aria-describedby="button-addon1" v-model="concepto.plan_codigo">
                                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                                    data-bs-target="#modaBuscarPlanCuenta"><i
                                                        class="fe fe-search me-2"></i></button>
                                            </div> -->
                    </div>
                  </div>
                  <!-- <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Descripción Cuenta</label>
                                            <input type="text" class="form-control" placeholder="Descripción Cuenta"
                                                v-model="plan_dsc" disabled>
                                        </div>
                                    </div> -->
                  <div class="row">
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            v-model="concepto.es_colegiatura"
                            name="example-checkbox1"
                          />
                          <span class="custom-control-label"
                            >Es Colegiatura</span
                          >
                        </label>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            v-model="concepto.es_traslado"
                            name="example-checkbox1"
                          />
                          <span class="custom-control-label">Es Traslado</span>
                        </label>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            v-model="concepto.modificable"
                            name="example-checkbox1"
                          />
                          <span class="custom-control-label">Modificable</span>
                        </label>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            v-model="concepto.con_afectoigv"
                            name="example-checkbox1"
                          />
                          <span class="custom-control-label">Afecto Igv</span>
                        </label>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            v-model="concepto.activo"
                            name="example-checkbox1"
                            disabled
                          />
                          <span class="custom-control-label">Activo</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Fecha Registro</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Fecha Registro"
                        disabled
                        v-model="fechaRegistro"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Usuario Registro</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Usuario Registro"
                        disabled
                        v-model="usuarioRegistro"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 text-center">
              <button class="btn btn-primary m-2" type="button">
                Cancelar
              </button>
              <button
                class="btn btn-primary"
                type="button"
                @click="guardarCambios"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <buscar-plan-cuenta id="modaBuscarPlanCuenta" /> -->
</template>

<script>
import { mapActions } from "vuex";
import global from "../../../global";
import SearchMultiselect from "../../../components/SearchMultiselect/SearchMultiselect.vue";
// import BuscarPlanCuenta from "../../../components/plancuenta/BuscarPlanCuenta.vue";
//Library
import dayjs from "dayjs";
export default {
  name: "Concepto",
  components: { SearchMultiselect },
  data() {
    return {
      plan_dsc: "",
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      listadoRegistro: [],
      showAdvertise: false,
      indiceModificando: -1,
      usuarioRegistro: "",
      fechaRegistro: "",
      concepto: {},
      conceptoBase: {
        cod_concepto: 0,
        desc_concepto: "",
        cod_linea: 0,
        cod_sublinea: null,
        precio: 0,
        cod_subcuenta: null,
        plan_codigo: 0,
        con_afectoigv: 0,
        modificable: 0,
        com_concepto: 0,
        es_colegiatura: 0,
        es_traslado: 0,
      },
      buscador: {
        page_index: 1,
        page_size: 10,
        desc_concepto: "",
      },
      desc_concepto: "",
      totalPaginas: 0,
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 15, 25, 50],
        total: 0,
      },
      lineaDesplegable: [],
      plancuentaDesplegable: [],
    };
  },
  methods: {
    ...mapActions({
      AgregarConcepto: "_concepto/AgregarConcepto",
      ModificarConcepto: "_concepto/ModificarConcepto",
      EliminarConcepto: "_concepto/EliminarConcepto",
      ListarRegistros: "_concepto/ListarRegistros",
      LineaDesplegable: "_concepto/LineaDesplegable",
      PlanCuentaDesplegable: "_plancuenta/PlanCuentaDesplegable",
    }),
    comboLinea: async function () {
      var res = await this.LineaDesplegable();
      this.lineaDesplegable = res.map((item) => {
        return { label: item.desc_linea, value: item.cod_linea };
      });
    },
    comboPlanCuenta: async function () {
      var res = await this.PlanCuentaDesplegable();
      this.plancuentaDesplegable = res.map((item) => {
        return { label: item.plan_dsc, value: item.plan_codigo };
      });
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cargarVer: function (item, index) {
      this.concepto.cod_concepto = item.cod_concepto;
      this.concepto.desc_concepto = item.desc_concepto;
      this.concepto.cod_linea = item.cod_linea;
      this.concepto.cod_sublinea = item.cod_sublinea;
      this.concepto.precio = parseFloat(item.precio).toFixed(2);
      this.concepto.cod_subcuenta = item.cod_subcuenta;
      this.concepto.plan_codigo = item.plan_codigo;
      this.concepto.con_afectoigv = item.con_afectoigv == 0 ? false : true;
      this.concepto.modificable = item.modificable == 0 ? false : true;
      this.concepto.activo = item.activo == 0 ? false : true;
      this.concepto.es_colegiatura = item.es_colegiatura == 0 ? false : true;
      this.concepto.es_traslado = item.es_traslado == 0 ? false : true;

      this.indiceModificando = index;
      this.cambiarTabRegistro();
    },
    cargarEliminar: async function (item, index) {
      this.concepto = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarConcepto(this.concepto);
          if (res?.exito) {
            this.cargarRegistros();
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    cambiarTabListar() {
      document.getElementById("tabRegistrarConcepto").className = "";
      document.getElementById("registrarTab").className = "tab-pane";
      document.getElementById("tabListadoConcepto").className = "active";
      document.getElementById("listadoTab").className = "tab-pane active";
    },
    cambiarTabRegistro() {
      document.getElementById("tabRegistrarConcepto").className = "active";
      document.getElementById("registrarTab").className = "tab-pane active";
      document.getElementById("tabListadoConcepto").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
    validarRegistro() {
      let valida = false;

      if (this.concepto.desc_concepto == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.desc_concepto.focus();
        });
      } else if (
        this.concepto.cod_linea == 0 ||
        this.concepto.cod_linea == null
      ) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.cod_linea.$el.focus();
        });
      } else if (this.concepto.precio == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.precio.focus();
        });
      } else if (
        this.concepto.plan_codigo == 0 ||
        this.concepto.plan_codigo == null
      ) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.plan_codigo.$el.focus();
        });
      }
      return valida;
    },
    guardarCambios: async function () {
      var res = null;
      let valor = this.validarRegistro();
      if (!valor) {
        if (this.indiceModificando == -1) {
          res = await this.AgregarConcepto(this.concepto);
        } else {
          res = await this.ModificarConcepto(this.concepto);
        }
      }
      if (res?.exito) {
        this.showAdvertise = false;
        this.nuevoRegistro();
        this.cargarRegistros();
        global._mensaje_exito("Los cambios se han guardado correctamente");
        this.cambiarTabListar();
      }
    },
    loadRegistro: function () {
      this.concepto = { ...this.conceptoBase };
      this.fechaRegistro = this.currentDate;
      this.usuarioRegistro = "";
      this.indiceModificando = -1;
    },
    nuevoRegistro() {
      this.loadRegistro();
      this.cambiarTabRegistro();
    },
    cargarRegistros: async function (pagina = 1) {
      this.buscador.page_index = pagina;
      this.buscador.desc_concepto = this.desc_concepto;

      var res = await this.ListarRegistros(this.buscador);

      this.listadoRegistro = res.datos;
      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;
      this.buscador.page_index = res.paginaActual;
      this.totalPaginas = res.totalPaginas;
    },
  },
  mounted() {
    this.loadRegistro();
    this.comboPlanCuenta();
    this.comboLinea();
    this.cargarRegistros();
    this.fechaRegistro = this.currentDate;
  },
};
</script>
