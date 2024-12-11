<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Nota de Ingreso</h3>
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
              id="tabListadoNotaIngreso"
              >LISTADO</a
            >
          </li>
          <li>
            <a
              href="#registrarTab"
              data-bs-toggle="tab"
              id="tabRegistrarNotaIngreso"
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
                  class="form-control"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                  placeholder="Fecha Inicio"
                  v-model="fecha_inicio"
                />
              </div>
              <div class="col-md-4 mb-3" style="text-align: center">
                <input
                  class="form-control"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                  v-model="fecha_fin"
                  placeholder="Fecha Fin"
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
                  <table
                    class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>DNI/RUC</th>
                        <th>Razón Social/Nombre</th>
                        <th>Serie</th>
                        <th>Número</th>
                        <th>Fecha</th>
                        <th>Usuario</th>
                        <th>Importe</th>
                        <th>Estado</th>
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
                        <td>{{ item.ruc }}</td>
                        <td>{{ item.razonsocial }}</td>
                        <td>{{ item.nc_serie }}</td>
                        <td>{{ item.nc_numero }}</td>
                        <td>{{ item.nc_fechareg }}</td>
                        <td>{{ item.nc_usuarioreg }}</td>
                        <td>{{ item.nc_importe }}</td>
                        <td>
                          {{ item.nc_estado == "x" ? "ANULADO" : "ACTIVO" }}
                        </td>
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
                        <td colspan="10" class="text-center">
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
                <div class="row">
                  <div class="form-label mt-0 p-0">DATOS NOTA INGRESO</div>
                  <div class="col-md-8 row">
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">Comprobante</div>
                      <div class="row">
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Serie</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Serie"
                              ref="nc_serie"
                              :style="
                                showAdvertise && nota_ingreso.nc_serie == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                              v-model="nota_ingreso.nc_serie"
                              @keypress="onlyNumber"
                              maxlength="4"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Número</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Número"
                              ref="nc_numero"
                              disabled
                              :style="
                                showAdvertise && nota_ingreso.nc_numero == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                              v-model="nota_ingreso.nc_numero"
                              @keypress="onlyNumber"
                              maxlength="8"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="form-group">
                            <label>RUC/ DNI</label>
                            <div class="input-group">
                              <input
                                type="text"
                                class="form-control"
                                placeholder="RUC/DNI"
                                aria-label="Example text with button addon"
                                aria-describedby="button-addon1"
                                ref="ruc"
                                :style="
                                  showAdvertise && nota_ingreso.ruc == ''
                                    ? 'border-color: #e23e3d;'
                                    : ''
                                "
                                v-model="nota_ingreso.ruc"
                                readonly
                              />
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#modalBuscarAuxiliar"
                              >
                                <i class="fe fe-search me-2"></i>
                              </button>
                            </div>
                            <!-- <input type="number" class="form-control" placeholder="RUC/ DNI"
                                                            ref="ruc"
                                                            :style="showAdvertise && nota_ingreso.ruc == '' ? 'border-color: #e23e3d;' : ''"
                                                            v-model="nota_ingreso.ruc"> -->
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Razón Social / Nombre</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Razón Social / Nombre"
                              ref="razonsocial"
                              :style="
                                showAdvertise && nota_ingreso.razonsocial == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                              v-model="nota_ingreso.razonsocial"
                              readonly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">General</div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Fecha</label>
                            <input
                              type="date"
                              class="form-control"
                              placeholder="Fecha"
                              ref="nc_fechaope"
                              :style="
                                showAdvertise && nota_ingreso.nc_fechaope == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                              v-model="nota_ingreso.nc_fechaope"
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Estado</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Estado"
                              v-model="nota_ingreso.nc_estado"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 row">
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">
                        Detalle de la Cuenta
                      </div>
                      <div class="row">
                        <div class="col-md-8">
                          <div class="form-group">
                            <label>Código Cuenta</label>
                            <!-- <input type="text" class="form-control"
                                                            placeholder="Código Cuenta" ref="plan_codigo"
                                                            :style="showAdvertise && nota_ingreso.plan_codigo == '' ? 'border-color: #e23e3d;' : ''"
                                                            v-model="nota_ingreso.plan_codigo"> -->

                            <SearchMultiselect
                              :value="nota_ingreso.plan_codigo"
                              v-model="nota_ingreso.plan_codigo"
                              :options="plancuentaDesplegable"
                              placeholder="Cuenta Contable"
                              ref="plan_codigo"
                              :searchable="true"
                              :style="
                                (showAdvertise &&
                                  nota_ingreso.plan_codigo == '') ||
                                nota_ingreso.plan_codigo == null
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                            />
                          </div>
                        </div>
                        <!-- <div class="col-md-8">
                                                    <div class="form-group">
                                                        <label>Descripción Cuenta</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Descripción Cuenta" disabled>
                                                    </div>
                                                </div> -->

                        <div class="col-md-4">
                          <div class="form-group">
                            <label>Importe</label>
                            <input
                              type="number"
                              class="form-control"
                              placeholder="Importe"
                              min="0"
                              ref="nc_importe"
                              :style="
                                showAdvertise && nota_ingreso.nc_importe == 0
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                              v-model="nota_ingreso.nc_importe"
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Comentario</label>
                            <textarea
                              class="form-control"
                              placeholder="Comentario"
                              v-model="nota_ingreso.nc_obs"
                              rows="2"
                            ></textarea>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Fecha Registro</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="fechaRegistro"
                              placeholder="Fecha Registro"
                              disabled
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

  <modal-buscar-auxiliar
    id="modalBuscarAuxiliar"
    @selectAuxiliar="selectAuxiliar"
    @closeModal="closeModal"
  />
</template>

<script>
import { mapActions } from "vuex";
import modalBuscarAuxiliar from "../../../components/auxiliar/modalBuscarAuxiliar.vue";
import SearchMultiselect from "../../../components/SearchMultiselect/SearchMultiselect.vue";
import global from "../../../global";
//Library
import dayjs from "dayjs";
export default {
  name: "NotaIngreso",
  components: { modalBuscarAuxiliar, SearchMultiselect },
  data() {
    return {
      plancuentaDesplegable: [],
      modalBuscarAuxiliar: false,
      showAdvertise: false,
      indiceModificando: -1,
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      listadoRegistro: [],
      usuarioRegistro: "",
      fechaRegistro: "",
      fecha_inicio: "",
      fecha_fin: "",
      buscador: {
        page_index: 1,
        page_size: 10,
        fecha_inicio: "",
        fecha_fin: "",
      },
      totalPaginas: 0,
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 15, 25, 50],
        total: 0,
      },
      nota_ingreso: {},
      nota_ingresoBase: {
        cod_ventanilla: "01",
        ruc: "",
        razonsocial: "",
        nc_serie: "1",
        nc_numero: "",
        nc_fechaope: "",
        nc_obs: "",
        nc_estado: "A",
        nc_fechareg: this.fechaRegistro,
        nc_usuarioreg: "",
        plan_codigo: "",
        nc_importe: 0,
        nc_fecha_anulado: null,
      },
    };
  },
  methods: {
    ...mapActions({
      Agregar: "_notaingreso/Agregar",
      Modificar: "_notaingreso/Modificar",
      ListarRegistros: "_notaingreso/ListarRegistros",
      ObtenerNotaIngresoNumero: "_notaingreso/ObtenerNotaIngresoNumero",
      Anular: "_notaingreso/Anular",
      PlanCuentaDesplegable: "_plancuenta/PlanCuentaDesplegable",
    }),
    obtenerUltimoNumeroNotaIngreso: async function () {
      let res = await this.ObtenerNotaIngresoNumero();

      if (res != null) {
        this.nota_ingreso.nc_numero = res.nc_numero;
      }
    },
    selectAuxiliar(item) {
      this.nota_ingreso.ruc = item.tipoPersona == "N" ? item.dni : item.ruc;
      this.nota_ingreso.razonsocial =
        item.tipoPersona == "N"
          ? item.nombres +
            " " +
            item.apellidoPaterno +
            " " +
            item.apellidoMaterno
          : item.nombres +
            " " +
            item.apellidoPaterno +
            " " +
            item.apellidoMaterno;
    },
    closeModal: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalBuscarAuxiliar")
      );
      modal.hide();
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    comboPlanCuenta: async function () {
      var res = await this.PlanCuentaDesplegable();
      this.plancuentaDesplegable = res.map((item) => {
        return { label: item.plan_dsc, value: item.plan_codigo };
      });
    },
    cargarVer: function (item, index) {
      this.nota_ingreso.nc_codigo = item.nc_codigo;
      this.nota_ingreso.cod_ventanilla = item.cod_ventanilla;
      this.nota_ingreso.ruc = item.ruc;
      this.nota_ingreso.razonsocial = item.razonsocial;
      this.nota_ingreso.nc_serie = item.nc_serie;
      this.nota_ingreso.nc_numero = item.nc_numero;
      this.nota_ingreso.nc_fechaope = dayjs(item.nc_fechaope).format(
        "YYYY-MM-DD"
      );
      this.nota_ingreso.nc_obs = item.nc_obs;
      this.nota_ingreso.nc_estado = item.nc_estado;
      this.nota_ingreso.nc_fechareg = dayjs(item.nc_fechareg).format(
        "YYYY-MM-DD  HH:mm:ss"
      );
      this.nota_ingreso.nc_usuarioreg = item.nc_usuarioreg;
      this.nota_ingreso.nc_obs = item.nc_obs;
      this.nota_ingreso.plan_codigo = item.plan_codigo;
      this.nota_ingreso.nc_importe = item.nc_importe;
      this.nota_ingreso.nc_fecha_anulado = item.nc_fecha_anulado;

      this.indiceModificando = index;
      this.cambiarTabRegistro();
    },
    cargarEliminar: async function (item) {
      let nota_ingreso = {
        nc_codigo: item.nc_codigo,
        nc_obs: item.nc_obs,
      };
      global._swal_pregunta(
        "¿Está seguro que desea anular el registro?",
        async () => {
          var res = await this.Anular(nota_ingreso);
          if (res?.exito) {
            this.cargarRegistros();
            global._mensaje_exito("Se ha eliminado");
          }
        },
        "Anular"
      );
    },
    validarRegistro() {
      let valida = false;

      if (this.nota_ingreso.ruc == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.ruc.focus();
        });
      } else if (this.nota_ingreso.razonsocial == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.razonsocial.focus();
        });
      } else if (this.nota_ingreso.nc_serie == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.nc_serie.focus();
        });
      } else if (this.nota_ingreso.nc_numero == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.nc_numero.focus();
        });
      } else if (this.nota_ingreso.nc_fechaope == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.nc_fechaope.focus();
        });
      } else if (
        this.nota_ingreso.plan_codigo == "" ||
        this.nota_ingreso.plan_codigo == null
      ) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.plan_codigo.$el.focus();
        });
      } else if (this.nota_ingreso.nc_importe == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.nc_importe.focus();
        });
      }
      return valida;
    },
    guardarCambios: async function () {
      var res = null;
      let valor = this.validarRegistro();
      //console.log(valor);
      if (!valor) {
        if (this.indiceModificando == -1) {
          res = await this.Agregar(this.nota_ingreso);
        } else {
          res = await this.Modificar(this.nota_ingreso);
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
      this.nota_ingreso = { ...this.nota_ingresoBase };
      this.nota_ingreso.nc_fechaope = this.currentDate;
      this.fechaRegistro = this.currentDate;
      this.usuarioRegistro = "";
      this.indiceModificando = -1;
      this.obtenerUltimoNumeroNotaIngreso();
    },
    cambiarTabListar() {
      document.getElementById("tabRegistrarNotaIngreso").className = "";
      document.getElementById("registrarTab").className = "tab-pane";
      document.getElementById("tabListadoNotaIngreso").className = "active";
      document.getElementById("listadoTab").className = "tab-pane active";
    },
    cambiarTabRegistro() {
      document.getElementById("tabRegistrarNotaIngreso").className = "active";
      document.getElementById("registrarTab").className = "tab-pane active";
      document.getElementById("tabListadoNotaIngreso").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
    nuevoRegistro() {
      this.loadRegistro();
      this.cambiarTabRegistro();
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cargarRegistros: async function (pagina = 1) {
      this.buscador.page_index = pagina;
      this.buscador.fecha_inicio = this.fecha_inicio;
      this.buscador.fecha_fin = this.fecha_fin;

      var res = await this.ListarRegistros(this.buscador);

      //console.log(res);

      this.listadoRegistro = res.datos;
      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;
      this.buscador.page_index = res.paginaActual;
      this.totalPaginas = res.totalPaginas;
    },
  },
  mounted() {
    this.fecha_inicio = this.currentDate;
    this.fecha_fin = this.currentDate;
    this.fechaRegistro = this.currentDate;
    this.loadRegistro();
    this.cargarRegistros();
    this.comboPlanCuenta();
  },
};
</script>
