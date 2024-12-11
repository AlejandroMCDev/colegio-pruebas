<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Movimiento Colegiado</h3>
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
              href="#registrarTab"
              class="active"
              data-bs-toggle="tab"
              id="tabGeneralRegistrar"
              >REGISTRAR</a
            >
          </li>
          <li>
            <a href="#listadoTab" data-bs-toggle="tab" id="tabGeneralListado"
              >LISTADO</a
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
            <button
              type="button"
              class="btn btn-primary"
              @click="loadMovimiento()"
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
                          ref="CQFP"
                          aria-describedby="button-addon1"
                          @keypress.enter="verificarCQF"
                          v-model="cqfp"
                        />
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#modalAddColegiado"
                        >
                          <i class="fe fe-search me-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>DNI</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="DNI"
                        disabled
                        v-model="dni"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Agremiado</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Agremiado"
                        v-model="agremiado"
                        disabled
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
                        disabled
                        v-model="estado"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Operación</label>
                      <select
                        class="form-control form-select"
                        v-model="movimiento.idOperacion"
                        ref="idOperacion"
                        :style="
                          showAdvertise && movimiento.idOperacion == null
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      >
                        <option value="null">Operación</option>
                        <option
                          v-for="item in operacionDesplegable"
                          :key="item.id"
                          :label="item.nombre"
                          :value="item.id"
                        ></option>
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
                        v-model="movimiento.fechaOperacion"
                        ref="fechaOperacion"
                        :style="
                          showAdvertise && movimiento.fechaOperacion == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Comentario</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Comentario"
                        v-model="movimiento.comentario"
                        ref="comentario"
                        :style="
                          showAdvertise && movimiento.comentario == ''
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
              <button class="btn btn-primary m-2" type="button" @click="loadMovimiento()">
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
        <div class="tab-pane" id="listadoTab">
          <div class="mb-5 p-4 br-5">
            <div class="form-label mt-0 p-0">FILTROS</div>
            <div class="row">
              <div class="col-md-3 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                  placeholder="Fecha Inicio"
                  v-model="filtros.fechaInicio"
                />
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                  placeholder="Fecha Fin"
                  v-model="filtros.fechaFin"
                />
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  placeholder="CQFP"
                  v-model="filtros.cqfp"
                />
              </div>

              <div class="col-md-3 mb-3" style="text-align: left">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="listarMovimiento()"
                  style="margin: 2px"
                >
                  <i class="fe fe-search me-2"></i>Buscar
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="nuevoMovimiento()"
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
                        <th>CQFP</th>
                        <th>Agremiado</th>
                        <th>Operación</th>
                        <th>Fecha</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in listadoMovimiento"
                        :key="'item-' + index"
                        v-if="listadoMovimiento.length != 0"
                      >
                        <td scope="row">{{ indexMethod(index) }}</td>
                        <td>{{ item.persona_cqf }}</td>
                        <td>{{ item.persona }}</td>
                        <td>{{ item.operacion }}</td>
                        <td>{{ item.fechaOperacion }}</td>
                        <td class="text-center">
                          <i
                            class="fa fa-eye mx-1 text-primary"
                            role="button"
                            @click="openurlArchivo(item.url)"
                            v-show="item.url != null"
                          ></i>
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
                        <td colspan="5" class="text-center">
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
      </div>
    </div>
  </div>
  <modal-add-colegiado
    id="modalAddColegiado"
    @selectColegiado="selectColegiado"
    @closeModalColegiado="closeModalColegiado"
  />
</template>

<script>
import { mapActions } from "vuex";
import global from "../../global";

import modalAddColegiado from "../../components/colegiado/modalAddColegiado.vue";

//Library
import dayjs from "dayjs";
export default {
  name: "MovimientoColegiado",
  components: { modalAddColegiado },
  data() {
    return {
      iprutaFiles: global.ruta_api,
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      showAdvertise: false,
      indiceModificando: -1,
      operacionDesplegable: [],
      listadoMovimiento: [],
      filtros: {
        cqfp: "",
        fechaInicio: "",
        fechaFin: "",
      },
      movimiento: {},
      movimientoBase: {
        idPersona: 0,
        idOperacion: null,
        fechaOperacion: "",
        comentario: "",
      },
      agremiado: "",
      fechaRegistro: "",
      usuarioRegistro: "",
      estado: "",
      cqfp: "",
      dni: "",
      pagination: {
        perPage: 10,
        currentPage: 1,
        total: 0,
      },
      totalPaginas: 0,
      buscador: {
        page_index: 1,
        fechaInicio: "",
        fechaFin: "",
        cqfll: "",
      },
    };
  },
  methods: {
    closeModalColegiado: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalAddColegiado")
      );
      modal.hide();
    },
    selectColegiado(item) {    
      this.cqfp = item.cqfll;
      this.movimiento.idPersona = item.id;
      this.dni = item.dni;
      this.agremiado =
        item.nombres + " " + item.apellidoPaterno + " " + item.apellidoMaterno;
      this.estado = item.estadoColegiado;
      this.closeModalColegiado();
    },
    nuevoMovimiento() {
      this.loadMovimiento();
      this.cambiarTab();
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    openurlArchivo(url) {
      window.open(this.iprutaFiles + "" + url, "_blank");
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
          this.movimiento.idPersona = res.id;
          this.dni = res.dni;
          this.agremiado =
            res.nombres + " " + res.apellidoPaterno + " " + res.apellidoMaterno;
          this.estado = res.estadoColegiado;
        } else {
          this.movimiento.idPersona = 0;
          this.dni = "";
          this.agremiado = "";
          this.estado = "";
          global._mensaje_advertencia("Datos Ingresados no existen, gracias.");
        }
      }
    },
    cambiarPagina: function (paginaDestino) {
      this.listarMovimiento(paginaDestino);
    },
    ...mapActions({
      OperacionDesplegable: "_movimiento/OperacionDesplegable",
      AgregarMovimiento: "_movimiento/AgregarMovimiento",
      ModificarMovimiento: "_movimiento/ModificarMovimiento",
      ListarMovimiento: "_movimiento/ListarMovimiento",
      EliminarMovimiento: "_movimiento/EliminarMovimiento",
      ObtenerColegiado: "_colegiado/ObtenerColegiado",
      ObtenerMovimiento: "_movimiento/ObtenerMovimiento",
    }),
    cargarVer: async function (item, index) {
      let movimiento = {
        id: item.id,
      };
      let res = await this.ObtenerMovimiento(movimiento);

      this.movimiento.id = res.id;
      this.movimiento.idPersona = res.idPersona;
      this.movimiento.idOperacion = res.idOperacion;
      this.movimiento.fechaOperacion = res.fechaOperacion;
      this.movimiento.comentario = res.comentario;

      this.agremiado = res.persona;
      this.fechaRegistro = res.fechaRegistro;
      this.usuarioRegistro = res.usuarioRegistro;
      this.estado = res.estadoColegiado;
      this.dni = res.persona_dni;
      this.cqfp = res.persona_cqf;

      this.indiceModificando = index;
      this.cambiarTab();
    },
    cargarEliminar: async function (item, index) {
      this.movimiento = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarMovimiento(this.movimiento);
          if (res?.exito) {
            this.listarMovimiento();
            this.movimiento = { ...this.movimientoBase };
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    comboOperacion: async function () {
      var res = await this.OperacionDesplegable();
      this.operacionDesplegable = res;
    },
    listarMovimiento: async function (pagina = 1) {
      this.buscador.page_index = pagina;
      this.buscador.fechaInicio = this.filtros.fechaInicio;
      this.buscador.fechaFin = this.filtros.fechaFin;
      this.buscador.cqfll = this.filtros.cqfp;

      var res = await this.ListarMovimiento(this.buscador);
      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;
      this.listadoMovimiento = res.datos.map((el) => ({
        ...el,
        fechaOperacion: dayjs(el.fechaOperacion).format("DD-MM-YYYY"),
      }));

      this.buscador.page_index = res.paginaActual;
      this.totalPaginas = res.totalPaginas;
    },
    cambiarTab() {
      document.getElementById("tabGeneralRegistrar").className = "active";
      document.getElementById("registrarTab").className = "tab-pane active";
      document.getElementById("tabGeneralListado").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
    validarMovimiento() {
      let valida = false;

      if (this.movimiento.idOperacion == null) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.idOperacion.focus();
        });
      } else if (this.movimiento.fechaOperacion == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fechaOperacion.focus();
        });
      } else if (this.movimiento.comentario == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.comentario.focus();
        });
      }
      return valida;
    },
    guardarCambios: async function () {
      var res = null;
      let valor = this.validarMovimiento();
      if (!valor) {
        if (this.movimiento.idPersona != 0) {
          if (this.indiceModificando == -1) {
            res = await this.AgregarMovimiento(this.movimiento);
          } else {
            res = await this.ModificarMovimiento(this.movimiento);
          }
        } else {
          this.$refs.CQFP.focus();
          global._mensaje_advertencia("Debe buscar un Agremiado, gracias.");
          // this.indiceModificando = -1;
        }
      }
      if (res?.exito) {
        this.loadMovimiento();
        this.listarMovimiento();
        global._mensaje_exito("Los cambios se han guardado correctamente");

        document.getElementById("tabGeneralRegistrar").className = "";
        document.getElementById("registrarTab").className = "tab-pane";
        document.getElementById("tabGeneralListado").className = "active";
        document.getElementById("listadoTab").className = "tab-pane active";
      }
    },
    loadMovimiento: function () {
      this.movimiento = { ...this.movimientoBase };
      this.agremiado = "";
      this.fechaRegistro = this.currentDate;
      this.usuarioRegistro = "";
      this.estado = "";
      this.cqfp = "";
      this.dni = "";
      this.indiceModificando = -1;
    },
  },
  mounted() {
    this.fechaRegistro = this.currentDate;
    this.loadMovimiento();
    this.comboOperacion();
    this.listarMovimiento();
  },
};
</script>
