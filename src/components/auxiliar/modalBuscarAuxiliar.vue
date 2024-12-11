<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">AUXILIAR</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal()"
          >
            <i class="fa fa-close"></i>
          </button>
        </div>
        <div class="modal-body">
          <div
            class="tab-menu-heading tab-menu-heading-boxed"
            style="border-bottom: 0 !important"
          >
            <div class="tabs-menu-boxed" style="float: right; width: 100%">
              <!-- Tabs -->
              <ul class="nav panel-tabs" style="float: right">
                <li>
                  <a
                    href="#listadoModalBuscarAuxiliarTab"
                    class="active"
                    data-bs-toggle="tab"
                    id="tabModalListadoAuxiliar"
                    >LISTADO</a
                  >
                </li>
                <li>
                  <a
                    href="#registrarModalBuscarAuxiliarTab"
                    data-bs-toggle="tab"
                    id="tabModalRegistrarAuxiliar"
                    >REGISTRAR</a
                  >
                </li>
              </ul>
            </div>
          </div>

          <div class="panel-body tabs-menu-body">
            <div class="tab-content">
              <div class="tab-pane active" id="listadoModalBuscarAuxiliarTab">
                <div>
                  <div class="form-label mt-0 p-0">LISTA</div>
                  <div class="row">
                    <div class="col-md-2 mb-3" style="text-align: center">
                      <select
                        class="form-control form-select select2"
                        data-bs-placeholder="Filtros"
                        v-model="filtros"
                      >
                        <option value="">Filtros</option>
                        <option value="razonsocial">Razón Social</option>
                        <option value="nombreApellido">
                          Nombre o Apellido
                        </option>
                        <option value="ruc">RUC</option>
                        <option value="dni">DNI</option>
                      </select>
                    </div>
                    <div class="col-md-4 mb-3" style="text-align: center">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search"
                        v-model="search"
                      />
                    </div>

                    <div class="col-md-6 mb-3" style="text-align: left">
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
                  <div class="row">
                    <div class="col-md-12">
                      <div class="table-responsive">
                        <div class="text-center">
                          <loading :mostrar="cargando" />
                        </div>
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
                              <th>#</th>
                              <th>Tipo</th>
                              <th>RUC</th>
                              <th>DNI</th>
                              <th>Razón Social/Apellidos</th>
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
                              <td>{{ item.tipoPersona }}</td>
                              <td>{{ item.ruc }}</td>
                              <td>{{ item.dni }}</td>
                              <td>
                                {{ item.nombres }} {{ item.apellidoPaterno }}
                                {{ item.apellidoMaterno }}
                              </td>

                              <td class="text-center">
                                <i
                                  class="fa fa-check mx-1 text-black"
                                  role="button"
                                  @click="selectAuxiliar(item)"
                                  title="Seleccionar"
                                ></i>
                                <i
                                  class="fa fa-pencil mx-1 text-yellow"
                                  role="button"
                                  @click="cargarVer(item, index)"
                                  title="Editar"
                                ></i>
                                <i
                                  class="fa fa-trash mx-1 text-danger"
                                  role="button"
                                  title="Eliminar"
                                  @click="cargarEliminar(item, index)"
                                ></i>
                              </td>
                            </tr>
                            <tr v-else>
                              <td colspan="7" class="text-center">
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
                                  : pagination.perPage *
                                      pagination.currentPage -
                                    4
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
              <div class="tab-pane" id="registrarModalBuscarAuxiliarTab">
                <!-- <div class="form-label mt-0 p-0">
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="loadRegistro()"
                  >
                    <i class="fe fe-file me-2"></i>Nuevo
                  </button>
                </div> -->
                <div class="row">
                  <div class="col-md-12 row">
                    <div>
                      <div class="form-label mt-0 p-0">DATOS GENERALES</div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Tipo</label>
                            <select
                              class="form-control form-select"
                              data-bs-placeholder="Tipo"
                              @change="cambiarTipoPersona()"
                              v-model="auxiliar.idTipoPersona"
                              ref="idTipoPersona"
                              :style="
                                showAdvertise && auxiliar.idTipoPersona == 0
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                            >
                              <option value="0">Tipo</option>
                              <option
                                v-for="item in tipoPersonaAuxiliar"
                                :key="item.id"
                                :label="item.nombre"
                                :value="item.id"
                              ></option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group" v-if="tipoPersona == 6">
                            <label>RUC</label>
                            <input
                              type="text"
                              ref="ruc"
                              class="form-control"
                              placeholder="RUC"
                              maxlength="11"
                              @keypress="onlyNumber"
                              :style="
                                showAdvertise && auxiliar.ruc.length < 11
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                              v-model="auxiliar.ruc"
                              @input="verificarAuxiliar()"
                              :disabled="disabledRUC"
                            />
                          </div>
                          <div class="form-group" v-else>
                            <label>DNI</label>
                            <input
                              type="text"
                              ref="dni"
                              class="form-control"
                              placeholder="DNI"
                              maxlength="8"
                              @keypress="onlyNumber"
                              :style="
                                showAdvertise && auxiliar.dni.length < 8
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                              v-model="auxiliar.dni"
                              @input="verificarAuxiliar()"
                              :disabled="disabledDNI"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>{{ labelTipoPersona }}</label>
                            <input
                              type="text"
                              class="form-control"
                              ref="nombres"
                              v-model="auxiliar.nombres"
                              :placeholder="placeholderTipoPersona"
                              :style="
                                showAdvertise && auxiliar.nombres == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                            />
                          </div>
                        </div>
                        <div class="col-md-6" v-if="tipoPersona == 5">
                          <div class="form-group">
                            <label>Apellido Paterno</label>
                            <input
                              type="text"
                              class="form-control"
                              ref="apellidoPaterno"
                              :style="
                                showAdvertise && auxiliar.apellidoPaterno == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                              v-model="auxiliar.apellidoPaterno"
                              placeholder="Apellido Paterno"
                            />
                          </div>
                        </div>
                        <div class="col-md-6" v-if="tipoPersona == 5">
                          <div class="form-group">
                            <label>Apellido Materno</label>
                            <input
                              type="text"
                              class="form-control"
                              ref="apellidoMaterno"
                              :style="
                                showAdvertise && auxiliar.apellidoMaterno == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                              v-model="auxiliar.apellidoMaterno"
                              placeholder="Apellido Materno"
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Telefono</label>
                            <input
                              type="number"
                              class="form-control"
                              placeholder="Telefono"
                              v-model="auxiliar.telefono"
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Celular</label>
                            <input
                              type="number"
                              class="form-control"
                              placeholder="Celular"
                              v-model="auxiliar.celular"
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Email</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Email"
                              v-model="auxiliar.correo"
                            />
                          </div>
                        </div>
                        <div class="col-md-9">
                          <label>Dirección</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Dirección"
                            v-model="auxiliar.direccion"
                          />
                        </div>
                      </div>
                      <br />
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Fecha Registro</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Fecha Registro"
                              disabled
                              v-model="auxiliar.fechaRegistro"
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
                              v-model="auxiliar.idUsuario"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 text-center">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="loadRegistro()"
                    >
                      <i class="fe fe-file me-2"></i>Nuevo
                    </button>
                    <button
                      class="btn btn-primary m-2"
                      type="button"
                      @click="loadRegistro()"
                    >
                      Cancelar
                    </button>
                    <button
                      class="btn btn-primary"
                      type="button"
                      @click="guardarCambios"
                      :disabled="disabledBtnGuardar"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div>
            
          </div> -->
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Paginate from "../../components/varios/Paginate.vue";
import Loading from "../../components/varios/Loading.vue";
import global from "../../global";
//Librayr
import dayjs from "dayjs";

export default {
  name: "modalBuscarAuxiliar",
  components: { Paginate, Loading },
  data() {
    return {
      cargando: false,
      disabledRUC: true,
      disabledDNI: true,
      disabledBtnGuardar: false,
      labelTipoPersona: "Razón Social",
      placeholderTipoPersona: "Razón Social",
      tipoPersona: 6,
      showAdvertise: false,
      indiceModificando: -1,
      tipoPersonaAuxiliar: [],
      filtros: "",
      search: "",
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      listadoRegistro: [],
      usuarioRegistro: "",
      fechaRegistro: "",
      buscador: {
        page_index: 1,
        page_size: 5,
        dni: "",
        ruc: "",
        nombreApellido: "",
        razonSocial: "",
      },
      auxiliar: {},
      auxiliarBase: {
        idTipoPersona: 0,
        id: 0,
        dni: "",
        ruc: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        nombres: "",
        direccion: "",
        correo: "",
        telefono: "",
        celular: "",
        fechaRegistro: dayjs(this.date).format("YYYY-MM-DD"),
        idUsuario: 1,
      },
      totalPaginas: 0,
      initialPage: 1,
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 15, 25, 50],
        total: 0,
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    ...mapActions({
      ListarRegistros: "_auxiliar/ListarRegistros",
      TipoPersonaDesplegable: "_auxiliar/TipoPersonaDesplegable",
      AgregarAuxiliar: "_auxiliar/AgregarAuxiliar",
      ModificarAuxiliar: "_auxiliar/ModificarAuxiliar",
      EliminarAuxiliar: "_auxiliar/EliminarAuxiliar",
      ValidaPersonaExiste: "_auxiliar/ValidaPersonaExiste",
    }),
    cambiarDatosTipoPersona() {
      this.tipoPersona = this.auxiliar.idTipoPersona;
      if (this.tipoPersona == 5) {
        this.auxiliar.ruc = "";
      } else {
        this.auxiliar.dni = "";
        this.auxiliar.apellidoMaterno = "";
        this.auxiliar.apellidoPaterno = "";
      }
    },
    cambiarTipoPersona() {
      this.tipoPersona = this.auxiliar.idTipoPersona;

      if (this.tipoPersona == 5) {
        this.labelTipoPersona = "Nombres";
        this.placeholderTipoPersona = "Nombres";
        this.disabledDNI = false;
        this.disabledRUC = true;
        this.auxiliar.dni = "";
      } else {
        this.labelTipoPersona = "Razón Social";
        this.placeholderTipoPersona = "Razón Social";
        this.disabledRUC = false;
        this.disabledDNI = true;
        this.auxiliar.ruc = "";
      }
    },
    selectAuxiliar(item) {
      this.$emit("selectAuxiliar", item);
      this.closeModal();
    },
    verificarAuxiliar: async function () {
      let dni = "";
      let ruc = "";

      if (this.auxiliar.idTipoPersona == 5 && this.auxiliar.dni.length == 8) {
        dni = this.auxiliar.dni;
        ruc = "";

        let buscador = {
          tipo_persona: this.auxiliar.idTipoPersona,
          nro_documento: dni,
        };

        let res = await this.ValidaPersonaExiste(buscador);

        if (res.length > 0) {
          global._mensaje_advertencia("Registro ingresado ya existe!");
          this.disabledBtnGuardar = true;
        } else {
          this.disabledBtnGuardar = false;
        }
      } else if (
        this.auxiliar.idTipoPersona == 6 &&
        this.auxiliar.ruc.length == 11
      ) {
        ruc = this.auxiliar.ruc;
        dni = "";

        let buscador = {
          tipo_persona: this.auxiliar.idTipoPersona,
          nro_documento: ruc,
        };

        let res = await this.ValidaPersonaExiste(buscador);

        if (res.length > 0) {
          global._mensaje_advertencia("Registro ingresado ya existe!");
          this.disabledBtnGuardar = true;
        } else {
          this.disabledBtnGuardar = false;
        }
      }
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 5 + (index + 1);
    },
    cargarEliminar: async function (item, index) {
      this.auxiliar = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarAuxiliar(this.auxiliar);
          if (res?.exito) {
            this.cargarRegistros();
            global._mensaje_exito("Se ha eliminado correctamente!");
          }
        }
      );
    },
    cargarVer: function (item, index) {
      this.auxiliar.idTipoPersona = item.idTipoPersona;
      this.auxiliar.id = item.id;
      this.auxiliar.dni = item.dni;
      this.auxiliar.ruc = item.ruc;
      this.auxiliar.apellidoPaterno = item.apellidoPaterno;
      this.auxiliar.apellidoMaterno = item.apellidoMaterno;
      this.auxiliar.nombres = item.nombres;
      this.auxiliar.direccion = item.direccion;
      this.auxiliar.correo = item.correo;
      this.auxiliar.telefono = item.telefono;
      this.auxiliar.celular = item.celular;
      this.auxiliar.fechaRegistro = item.fechaRegistro;
      this.auxiliar.idUsuario = item.idUsuario;

      this.cambiarTipoPersona();
      this.indiceModificando = index;
      this.cambiarTabRegistro();
    },
    validarRegistro() {
      let valida = false;

      if (this.auxiliar.idTipoPersona == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.idTipoPersona.focus();
        });
      } else if (
        this.auxiliar.dni.length < 8 &&
        this.auxiliar.idTipoPersona == 5
      ) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.dni.focus();
        });
      } else if (
        this.auxiliar.ruc.length < 11 &&
        this.auxiliar.idTipoPersona == 6
      ) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.ruc.focus();
        });
      } else if (
        this.auxiliar.apellidoPaterno == "" &&
        this.auxiliar.idTipoPersona == 5
      ) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.apellidoPaterno.focus();
        });
      } else if (
        this.auxiliar.apellidoMaterno == "" &&
        this.auxiliar.idTipoPersona == 5
      ) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.apellidoMaterno.focus();
        });
      } else if (this.auxiliar.nombres == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.nombres.focus();
        });
      }
      return valida;
    },
    guardarCambios: async function () {
      var res = null;
      let valor = this.validarRegistro();
      if (!valor) {
        this.cambiarDatosTipoPersona();
        if (this.indiceModificando == -1) {
          res = await this.AgregarAuxiliar(this.auxiliar);
        } else {
          res = await this.ModificarAuxiliar(this.auxiliar);
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
    nuevoRegistro() {
      this.loadRegistro();
      this.cambiarTabRegistro();
    },
    cambiarTabListar() {
      document.getElementById("tabModalRegistrarAuxiliar").className = "";
      document.getElementById("registrarModalBuscarAuxiliarTab").className =
        "tab-pane";
      document.getElementById("tabModalListadoAuxiliar").className = "active";
      document.getElementById("listadoModalBuscarAuxiliarTab").className =
        "tab-pane active";
    },
    cambiarTabRegistro() {
      document.getElementById("tabModalRegistrarAuxiliar").className = "active";
      document.getElementById("registrarModalBuscarAuxiliarTab").className =
        "tab-pane active";
      document.getElementById("tabModalListadoAuxiliar").className = "";
      document.getElementById("listadoModalBuscarAuxiliarTab").className =
        "tab-pane";
    },
    loadRegistro: function () {
      this.auxiliar = { ...this.auxiliarBase };
      this.fechaRegistro = this.currentDate;
      this.usuarioRegistro = "";
      this.indiceModificando = -1;

      this.disabledRUC = true;
      this.disabledDNI = true;
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cargarRegistros: async function (pagina = 1) {
      this.buscador.page_index = pagina;

      if (this.filtros == "razonsocial") {
        this.buscador.dni = "";
        this.buscador.ruc = "";
        this.buscador.nombreApellido = "";
        this.buscador.razonSocial = this.search;
      } else if (this.filtros == "nombreApellido") {
        this.buscador.dni = "";
        this.buscador.ruc = "";
        this.buscador.nombreApellido = this.search;
        this.buscador.razonSocial = "";
      } else if (this.filtros == "ruc") {
        this.buscador.dni = "";
        this.buscador.ruc = this.search;
        this.buscador.nombreApellido = "";
        this.buscador.razonSocial = "";
      } else if (this.filtros == "dni") {
        this.buscador.dni = this.search;
        this.buscador.ruc = "";
        this.buscador.nombreApellido = "";
        this.buscador.razonSocial = "";
      } else {
        this.buscador.dni = "";
        this.buscador.ruc = "";
        this.buscador.nombreApellido = "";
        this.buscador.razonSocial = "";
      }
      this.cargando = true;
      var res = await this.ListarRegistros(this.buscador);

      this.listadoRegistro = res.datos.map((el) => ({
        ...el,
        tipoPersona: el.idTipoPersona == 6 ? "J" : "N",
      }));

      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;

      this.initialPage = res.paginaActual;
      this.buscador.page_index = res.paginaActual;
      this.totalPaginas = res.totalPaginas;
      this.cargando = false;
    },
    closeModal() {
      this.$emit("closeModal");
    },
    comboTipoPersonaAuxiliar: async function () {
      var res = await this.TipoPersonaDesplegable();
      this.tipoPersonaAuxiliar = res;
    },
  },
  mounted() {
    this.comboTipoPersonaAuxiliar();
    this.loadRegistro();
    this.cargarRegistros();
    this.fechaRegistro = this.currentDate;
  },
};
</script>
