<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Asignar Cobranza</h3>
  </div>
  <div class="card-body pb-2">
    <div
      class="tab-menu-heading tab-menu-heading-boxed"
      style="border-bottom: 0 !important"
    >
      <div class="tabs-menu-boxed" style="float: right; width: 100%">
        <!-- Tabs -->
        <ul class="nav panel-tabs" style="float: right">
          <!-- <li>
            <a
              href="#listadoTab"
              class="active"
              data-bs-toggle="tab"
              id="tabListadoAsignarDiversos"
              >LISTADO</a
            >
          </li> -->
          <li>
            <a
              href="#registrarTab"
              class="active"
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
        <!-- <div class="tab-pane active" id="listadoTab">
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
        </div> -->
        <div class="tab-pane active" id="registrarTab">
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
                          v-model="cqfp"
                        />
                        <button
                          type="button"
                          class="btn btn-primary"
                          title="Buscar Pendientes"
                          @click="abrirModalColegiado()"
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
                      <label>Operación</label>
                      <select
                        class="form-control form-select"
                        data-bs-placeholder="Operación"
                        v-model="asignarcobranza.permov_ope"
                        ref="permov_ope"
                        :style="
                          showAdvertise && asignarcobranza.permov_ope == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      >
                        <option value="">Seleccione</option>
                        <option value="I1">INGRESO POR PRIMERA VEZ</option>
                        <option value="IT">INGRESO POR TRASLADO</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Fecha Operación</label>
                      <input
                        type="date"
                        class="form-control"
                        placeholder="Fecha Operación"
                        v-model="asignarcobranza.permov_fechamov"
                        ref="permov_fechamov"
                        :style="
                          showAdvertise && asignarcobranza.permov_fechamov == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Comentario</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Comentario"
                        v-model="asignarcobranza.permov_comentario"
                        ref="permov_comentario"
                        :style="
                          showAdvertise &&
                          asignarcobranza.permov_comentario == 0
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
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
  <modal-add-postulante
    id="modalAddColegiado"
    @selectColegiado="selectColegiado"
    :reloadModalPostulante="reloadModalPostulante"
    @closeModalColegiado="closeModalColegiado"
  />
</template>

<script>
import global from "../../global";
import Paginate from "../../components/varios/Paginate.vue";
import Loading from "../../components/varios/Loading.vue";
import modalAddPostulante from "../../components/colegiado/modalAddPostulante.vue";

//Library
import { mapActions } from "vuex";
import dayjs from "dayjs";
export default {
  name: "AsignarCobranza",
  components: { Loading, Paginate, modalAddPostulante },
  data() {
    return {
      reloadModalPostulante: false,
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

      asignarcobranza: {},
      asignarcobranzaBase: {
        cod_persona: 0,
        permov_ope: "",
        permov_fechamov: "",
        permov_comentario: "",
        anio: 0,
        id_mes: 0,
        usuario: "1",
      },
      conceptoDesplegable: [],
    };
  },
  methods: {
    ...mapActions({
      Agregar: "_asignarcobranza/Agregar",
      ListarRegistros: "_asignardiversos/ListarRegistros",
    }),
    abrirModalColegiado() {
      this.reloadModalPostulante = true;
      new bootstrap.Modal($("#modalAddColegiado")).show(); // Abrir modal
    },
    closeModalColegiado: function () {
      this.reloadModalPostulante = false;
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalAddColegiado")
      );
      modal.hide();
    },
    selectColegiado(item) {
      this.cqfp = item.cqfll;
      this.asignarcobranza.cod_persona = item.codigo;
      this.dni = item.dni;
      this.colegiado_nombre = item.nombres;
      this.asignarcobranza.anio = this.currentYear;
      this.asignarcobranza.id_mes = this.currentMonth;
      this.closeModalColegiado();
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },

    validarRegistro() {
      let valida = false;

      if (this.asignarcobranza.permov_ope == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.permov_ope.focus();
        });
      } else if (this.asignarcobranza.permov_fechamov == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.permov_fechamov.focus();
        });
      } else if (this.asignarcobranza.permov_comentario == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.permov_comentario.focus();
        });
      }
      return valida;
    },
    guardarCambios: async function () {
      var res = null;
      let valor = this.validarRegistro();
      if (!valor) {
        global._swal_pregunta(
          "¿Está seguro que desea guardar los cambios?",
          async () => {
            if (this.indiceModificando == -1) {
              if (this.asignarcobranza.cod_persona != 0) {
                res = await this.Agregar(this.asignarcobranza);
              } else {
                global._mensaje_advertencia(
                  "Los datos de la persona esta vacio"
                );
              }
            } else {
              //res = await this.Modificar(this.diversos);
            }

            if (res?.exito) {
              this.showAdvertise = false;
              this.nuevoRegistro();
              /// this.cargarRegistros();
              global._mensaje_exito(
                "Los cambios se han guardado correctamente"
              );
              //this.cambiarTabListar();
            }
          },
          "Advertencia"
        );
      }
    },
    loadRegistro: function () {
      this.asignarcobranza = { ...this.asignarcobranzaBase };
      this.asignarcobranza.permov_fechamov = this.currentDate;
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
      //this.cambiarTabRegistro();
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
    this.fechaRegistro = this.currentDate;
    this.loadRegistro();
    //this.cargarRegistros();
  },
};
</script>
