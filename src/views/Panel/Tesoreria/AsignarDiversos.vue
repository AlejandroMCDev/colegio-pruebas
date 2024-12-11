<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Asignar Diversos</h3>
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
              id="tabListadoAsignarDiversos"
              >LISTADO</a
            >
          </li>
          <li>
            <a
              href="#registrarTab"
              data-bs-toggle="tab"
              id="tabRegistrarAsignarDiversos"
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
              <div class="col-md-4 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  placeholder="CQFP"
                  v-model="cqf"
                />
              </div>
              <div class="col-md-4 mb-3" style="text-align: center">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Mes"
                  v-model="cuota_mes"
                />
              </div>
              <div class="col-md-4 mb-3" style="text-align: center">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Año"
                  v-model="cuota_anio"
                />
              </div>
              <div class="col-md-4 mb-3" style="text-align: center">
                <SearchMultiselect
                  v-model="cod_concepto"
                  :options="conceptoDesplegable"
                  placeholder="Concepto"
                  :searchable="true"
                />
              </div>
              <!-- <div class="col-md-4 mb-3" style="text-align: center;">
                                <select class="form-control form-select" data-bs-placeholder="Todos">
                                    <option value="">Todos
                                    </option>
                                    <option value="1">ANULADOS
                                    </option>
                                    <option value="0">CANCELADOS
                                    </option>

                                </select>
                            </div> -->
              <div class="col-md-4 mb-3" style="text-align: left">
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
                  <div class="text-center">
                    <loading :mostrar="cargando" />
                  </div>
                  <table
                    class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>cqfll</th>
                        <th>concepto</th>
                        <th>nombres</th>
                        <th>fecha</th>
                        <th>estado</th>
                        <th>importe</th>
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
                        <td>{{ item.colegiado_cqf }}</td>
                        <td>{{ item.desc_concepto }}</td>
                        <td>{{ item.colegiado_nombre }}</td>
                        <td>{{ item.fecha_generacion }}</td>
                        <td>{{ item.estado }}</td>
                        <td>{{ parseFloat(item.monto_r).toFixed(2) }}</td>
                        <td class="text-center">
                          <i
                            class="fa fa-pencil mx-1 text-yellow"
                            role="button"
                            @click="cargarVer(item, index)"
                          ></i>
                          <i
                            class="fa fa-trash mx-1 text-danger"
                            role="button"
                            @click="cargarEliminar(item)"
                          ></i>
                        </td>
                      </tr>
                      <tr v-else>
                        <td colspan="8" class="text-center">
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
        <div class="tab-pane" id="registrarTab">
          <div class="form-label mt-0 p-0">
            <button
              type="button"
              class="btn btn-primary"
              @click="nuevoRegistro"
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
                      <label>CQFP</label>
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="CQFP"
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                          @keypress.enter="verificarCQF"
                          v-model="cqfp"
                        />
                        <button
                          type="button"
                          class="btn btn-primary"
                          @click="verificarCQF()"
                        >
                          <i class="fe fe-search me-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Nombres</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nombres"
                        v-model="colegiado_nombre"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Concepto</label>
                      <SearchMultiselect
                        :value="diversos.cod_concepto"
                        v-model="diversos.cod_concepto"
                        :options="conceptoDesplegable"
                        placeholder="Concepto"
                        ref="cod_concepto"
                        :searchable="true"
                        :style="
                          showAdvertise && diversos.cod_concepto == 0
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
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
                        ref="descripcion"
                        :style="
                          showAdvertise && diversos.descripcion == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                        v-model="diversos.descripcion"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Fecha Operación</label>
                      <input
                        type="date"
                        class="form-control"
                        placeholder="Fecha Operación"
                        ref="fecha_generacion"
                        :style="
                          showAdvertise && diversos.fecha_generacion == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                        v-model="diversos.fecha_generacion"
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
                        min="0"
                        ref="monto"
                        :style="
                          showAdvertise && diversos.monto == 0
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                        v-model="diversos.monto"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Estado</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Estado"
                        v-model="estado_diversos"
                        disabled
                      />
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
</template>

<script>
import SearchMultiselect from "../../../components/SearchMultiselect/SearchMultiselect.vue";
import global from "../../../global";
import Paginate from "../../../components/varios/Paginate.vue";
import Loading from "../../../components/varios/Loading.vue";

//Library
import { mapActions } from "vuex";
import dayjs from "dayjs";
export default {
  name: "AsignarDiversos",
  components: { SearchMultiselect, Loading, Paginate },
  data() {
    return {
      cargando: false,
      showAdvertise: false,
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      currentMonth: dayjs(this.date).format("MM"),
      currentYear: dayjs(this.date).format("YYYY"),
      listadoRegistro: [],
      usuarioRegistro: "",
      fechaRegistro: "",
      cqfp: "",
      colegiado_nombre: "",
      estado_diversos: "",
      cqf: "",
      cuota_anio: "",
      cuota_mes: "",
      cod_concepto: "",
      buscador: {
        page_index: 1,
        page_size: 10,
        cqf: "",
        cuota_anio: "",
        cuota_mes: "",
        cod_concepto: "",
      },
      initialPage: 1,
      totalPaginas: 0,
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 15, 25, 50],
        total: 0,
      },
      diversos: {},
      diversosBase: {
        id_detalle: null,
        cod_concepto: 0,
        monto: 0,
        descripcion: "",
        fecha_generacion: "",
        cod_persona: 0,
      },
      conceptoDesplegable: [],
    };
  },
  methods: {
    ...mapActions({
      Agregar: "_asignardiversos/Agregar",
      Modificar: "_asignardiversos/Modificar",
      ListarRegistros: "_asignardiversos/ListarRegistros",
      Eliminar: "_asignardiversos/Eliminar",
      ConceptoDesplegable: "_concepto/ConceptoDesplegable",
      ObtenerRegistros: "_asignardiversos/ObtenerRegistros",
      ObtenerColegiado: "_colegiado/ObtenerColegiado",
    }),
    comboConcepto: async function () {
      var res = await this.ConceptoDesplegable();
      //console.log(res);
      this.conceptoDesplegable = res.map((item) => {
        return { label: item.desc_concepto, value: item.cod_concepto };
      });
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    verificarCQF: async function () {
      if (this.cqfp.length > 0) {
        let persona = {
          id: 0,
          dni: null,
          cqf: this.cqfp,
        };
        let res = await this.ObtenerColegiado(persona);

        if (res != null) {
          this.colegiado_nombre =
            res.nombres + " " + res.apellidoPaterno + " " + res.apellidoMaterno;
          this.diversos.cod_persona = res.id;
        } else {
          this.colegiado_nombre = "";
          this.diversos.cod_persona = "";

          global._mensaje_advertencia("Datos Ingresados no existen, gracias.");
        }
      }
    },
    cargarVer: async function (item, index) {
      //console.log(item);
      let obtenerdiversos = {
        id_detalle: item.id_detalle,
      };
      let res = await this.ObtenerRegistros(obtenerdiversos);
      //console.log(item);

      this.diversos.id_detalle = res.id_detalle;
      this.diversos.cod_concepto = res.concepto_id;
      this.diversos.monto = parseFloat(res.monto).toFixed(2);
      this.diversos.descripcion = res.descripcion;
      this.diversos.fecha_generacion = dayjs(res.fecha_generacion).format(
        "YYYY-MM-DD"
      );
      this.diversos.cod_persona = res.colegiado_id;

      this.cqfp = res.cqfll;
      this.colegiado_nombre = res.colegiado_nombre;
      this.estado_diversos = res.estado;
      this.indiceModificando = index;
      this.cambiarTabRegistro();
    },
    cargarEliminar: async function (item) {
      //console.log(item);
      let diversos = {
        id_detalle: item.id_detalle,
      };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.Eliminar(diversos);
          if (res?.exito) {
            this.cargarRegistros();
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    validarRegistro() {
      let valida = false;

      if (this.diversos.cod_concepto == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.cod_concepto.$el.focus();
        });
      } else if (this.diversos.monto == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.monto.focus();
        });
      } else if (this.diversos.descripcion == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.descripcion.focus();
        });
      } else if (this.diversos.fecha_generacion == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fecha_generacion.focus();
        });
      }
      return valida;
    },
    guardarCambios: async function () {
      var res = null;
      let valor = this.validarRegistro();

      if (!valor) {
        if (this.indiceModificando == -1) {
          if (this.diversos.cod_persona != 0) {
            res = await this.Agregar(this.diversos);
          } else {
            global._mensaje_advertencia("Los datos de la persona esta vacio");
          }
        } else {
          res = await this.Modificar(this.diversos);
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
      this.diversos = { ...this.diversosBase };
      this.fechaRegistro = this.currentDate;
      this.usuarioRegistro = "";
      this.indiceModificando = -1;
    },
    cambiarTabListar() {
      document.getElementById("tabRegistrarAsignarDiversos").className = "";
      document.getElementById("registrarTab").className = "tab-pane";
      document.getElementById("tabListadoAsignarDiversos").className = "active";
      document.getElementById("listadoTab").className = "tab-pane active";
    },
    cambiarTabRegistro() {
      document.getElementById("tabRegistrarAsignarDiversos").className =
        "active";
      document.getElementById("registrarTab").className = "tab-pane active";
      document.getElementById("tabListadoAsignarDiversos").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
    nuevoRegistro() {
      this.cqfp = "";
      this.colegiado_nombre = "";
      this.estado_diversos = "";
      this.loadRegistro();
      this.cambiarTabRegistro();
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cargarRegistros: async function (pagina = 1) {
      this.buscador.page_index = pagina;
      this.buscador.cqf = this.cqf;
      this.buscador.cuota_anio = this.cuota_anio;
      this.buscador.cuota_mes = this.cuota_mes;
      this.buscador.cod_concepto =
        this.cod_concepto == null ? "" : this.cod_concepto;

      this.cargando = true;

      var res = await this.ListarRegistros(this.buscador);

      this.listadoRegistro = res.datos.map((el) => ({
        ...el,
        fecha_generacion: dayjs(el.fecha_generacion).format("DD-MM-YYYY"),
      }));

      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;
      this.buscador.page_index = res.paginaActual;
      this.initialPage = res.paginaActual;
      this.totalPaginas = res.totalPaginas;

      this.cargando = false;
    },
  },
  mounted() {
    this.comboConcepto();
    this.fechaRegistro = this.currentDate;
    this.loadRegistro();
    this.cargarRegistros();
  },
};
</script>
