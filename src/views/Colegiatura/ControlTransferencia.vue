<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Control Transferencia</h3>
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
              @click="loadTransferencia()"
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
                          ref="cqfp"
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
                      <label>Agremiado</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Agremiado"
                        disabled
                        v-model="agremiado"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Estado Habilidad</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Estado Habilidad"
                        disabled
                        v-model="estado"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Ultimo Mes</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Ultimo Mes"
                        disabled
                        v-model="ultimo_mes_pagada"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Tipo Transferencia(Salida / Entrante)</label>
                      <select
                        class="form-control form-select"
                        data-bs-placeholder="Tipo Transferencia"
                        v-model="transferencia.tipoTranferencia"
                        ref="tipoTranferencia"
                        :style="
                          showAdvertise &&
                          transferencia.tipoTranferencia == null
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      >
                        <option value="null">
                          Tipo Transferencia(Salida / Entrante)
                        </option>
                        <option value="1">Ingreso</option>
                        <option value="2">Salida</option>
                        <option value="3">Reingreso</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Fecha Transferencia</label>
                      <input
                        type="date"
                        class="form-control"
                        placeholder="Fecha Transferencia"
                        v-model="transferencia.fechaTranferencia"
                        ref="fechaTranferencia"
                        :style="
                          showAdvertise && transferencia.fechaTranferencia == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Colegio al que se traslada</label>
                      <select
                        class="form-control form-select"
                        data-bs-placeholder="Colegio al que se traslada"
                        v-model="transferencia.idColegioCQF"
                        ref="idColegioCQF"
                        :style="
                          showAdvertise && transferencia.idColegioCQF == null
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      >
                        <option value="null">Colegio al que se traslada</option>
                        <option
                          v-for="item in colegioCQFDesplegable"
                          :key="item.id"
                          :label="item.nombre"
                          :value="item.id"
                        ></option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>FOMAF</label>
                      <select
                        class="form-control form-select"
                        data-bs-placeholder="FOMAF"
                        ref="fomaf"
                        :style="
                          showAdvertise && transferencia.fomaf == null
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                        v-model="transferencia.fomaf"
                      >
                        <option value="null">FOMAF</option>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Observacíon</label>
                      <textarea
                        class="form-control"
                        placeholder="Observacíon"
                        ref="observacion"
                        :style="
                          showAdvertise && transferencia.observacion == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                        v-model="transferencia.observacion"
                        rows=" 4"
                      ></textarea>
                      <!-- <input type="text" class="form-control" placeholder="Observacíon"
                                                v-model="transferencia.observacion" ref="observacion"
                                                :style="showAdvertise && transferencia.observacion == '' ? 'border-color: #e23e3d;' : ''"> -->
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
              <button
                class="btn btn-primary m-2"
                type="button"
                @click="loadTransferencia()"
              >
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
                  @click="listarTrasferencia()"
                  style="margin: 2px"
                >
                  <i class="fe fe-search me-2"></i>Buscar
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="nuevaTransferencia()"
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
                        <th>Tipo</th>
                        <th>Traslado</th>
                        <th>FOMAF</th>
                        <th>Fecha</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in listadoTransferencia"
                        :key="'item-' + index"
                        v-if="listadoTransferencia.length != 0"
                      >
                        <td scope="row">{{ indexMethod(index) }}</td>
                        <td>{{ item.persona_cqf }}</td>
                        <td>{{ item.persona }}</td>
                        <td>{{ item.tipoTranferencia_nombre }}</td>
                        <td>{{ item.colegioCQF }}</td>
                        <td>{{ item.FOMAF }}</td>
                        <td>{{ item.fechaTranferencia }}</td>
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
                        <td colspan="9" class="text-center">
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
  name: "ControlTransferencia",
  components: { modalAddColegiado },
  data() {
    return {
      ultimo_mes_pagada: "",
      iprutaFiles: global.ruta_api,
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      indiceModificando: -1,
      showAdvertise: false,
      filtros: {
        cqfp: "",
        fechaInicio: "",
        fechaFin: "",
      },
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
      listadoTransferencia: [],
      transferencia: {},
      transferenciaBase: {
        idPersona: 0,
        idColegioCQF: null,
        tipoTranferencia: null,
        fechaTranferencia: "",
        fomaf: null,
        observacion: "",
      },
      agremiado: "",
      fechaRegistro: "",
      usuarioRegistro: "",
      estado: "",
      cqfp: "",
      dni: "",
      colegioCQFDesplegable: [],
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
      this.transferencia.idPersona = item.id;
      this.agremiado =
        item.nombres + " " + item.apellidoPaterno + " " + item.apellidoMaterno;
      this.estado = item.estadoColegiado;
      this.ultimo_mes_pagada = item.ultimo_mes_pagada;
      this.closeModalColegiado();
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
          this.transferencia.idPersona = res.id;
          this.agremiado =
            res.nombres + " " + res.apellidoPaterno + " " + res.apellidoMaterno;
          this.estado = res.estadoColegiado;
          this.ultimo_mes_pagada = res.ultimo_mes_pagada;
        } else {
          this.transferencia.idPersona = 0;
          this.agremiado = "";
          this.estado = "";
          this.ultimo_mes_pagada = "";
          global._mensaje_advertencia("Datos Ingresados no existen, gracias.");
        }
      }
    },
    nuevaTransferencia() {
      this.loadTransferencia();
      this.cambiarTab();
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    openurlArchivo(url) {
      window.open(this.iprutaFiles + "" + url, "_blank");
    },
    ...mapActions({
      AgregarTrasferencia: "_trasferencia/AgregarTrasferencia",
      ModificarTrasferencia: "_trasferencia/ModificarTrasferencia",
      ListarTrasferencia: "_trasferencia/ListarTrasferencia",
      EliminarTrasferencia: "_trasferencia/EliminarTrasferencia",
      ObtenerTrasferencia: "_trasferencia/ObtenerTrasferencia",
      ColegioCQFDesplegable: "_colegiado/ColegioCQFDesplegable",
      ObtenerColegiado: "_colegiado/ObtenerColegiado",
    }),
    cambiarPagina: function (paginaDestino) {
      this.listarTrasferencia(paginaDestino);
    },
    listarTrasferencia: async function (pagina = 1) {
      this.buscador.page_index = pagina;
      this.buscador.fechaInicio = this.filtros.fechaInicio;
      this.buscador.fechaFin = this.filtros.fechaFin;
      this.buscador.cqfll = this.filtros.cqfp;

      var res = await this.ListarTrasferencia(this.buscador);
      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;

      this.listadoTransferencia = res.datos.map((el) => ({
        ...el,
        FOMAF: el.FOMAF == 1 ? "SI" : "NO",
        fechaTranferencia: dayjs(el.fechaTranferencia).format("DD-MM-YYYY"),
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
    validarTransferencia() {
      let valida = false;

      if (this.transferencia.idColegioCQF == null) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.idColegioCQF.focus();
        });
      } else if (this.transferencia.tipoTranferencia == null) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.tipoTranferencia.focus();
        });
      } else if (this.transferencia.fomaf == null) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fomaf.focus();
        });
      } else if (this.transferencia.observacion == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.observacion.focus();
        });
      } else if (this.transferencia.fechaTranferencia == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fechaTranferencia.focus();
        });
      }
      return valida;
    },
    guardarCambios: async function () {
      var res = null;
      let valor = this.validarTransferencia();

      if (!valor) {
        if (this.transferencia.idPersona != 0) {
          if (this.indiceModificando == -1) {
            res = await this.AgregarTrasferencia(this.transferencia);
          } else {
            res = await this.ModificarTrasferencia(this.transferencia);
          }
        } else {
          this.$refs.cqfp.focus();
          global._mensaje_advertencia("Debe buscar un Agremiado, gracias.");
        }
      }
      if (res?.exito) {
        this.loadTransferencia();
        this.listarTrasferencia();
        document.getElementById("tabGeneralRegistrar").className = "";
        document.getElementById("registrarTab").className = "tab-pane";
        document.getElementById("tabGeneralListado").className = "active";
        document.getElementById("listadoTab").className = "tab-pane active";
        global._mensaje_exito("Los cambios se han guardado correctamente");
        // this.indiceModificando = -1;
      }
    },
    comboColegioCQF: async function () {
      var res = await this.ColegioCQFDesplegable();
      this.colegioCQFDesplegable = res;
    },
    loadTransferencia: function () {
      this.transferencia = { ...this.transferenciaBase };
      this.agremiado = "";
      this.fechaRegistro = this.currentDate;
      this.usuarioRegistro = "";
      this.estado = "";
      this.cqfp = "";
      this.dni = "";
      this.ultimo_mes_pagada = "";

      this.indiceModificando = -1;
    },
    cargarVer: async function (item, index) {
      let transferencia = {
        id: item.id,
      };
      let res = await this.ObtenerTrasferencia(transferencia);

      this.transferencia.id = res.id;
      this.transferencia.idPersona = res.idPersona;
      this.transferencia.idColegioCQF = res.idColegioCQF;
      this.transferencia.fechaTranferencia = res.fechaTranferencia;
      this.transferencia.tipoTranferencia = res.tipoTranferencia;
      this.transferencia.observacion = res.observacion;
      this.transferencia.fomaf = res.FOMAF;

      this.agremiado = res.persona;
      this.fechaRegistro = res.fechaRegistro;
      this.usuarioRegistro = res.usuarioRegistro;
      this.cqfp = res.persona_cqf;
      this.estado = res.estadoColegiado;
      this.ultimo_mes_pagada = res.ultimo_mes;

      this.indiceModificando = index;
      this.cambiarTab();
    },
    cargarEliminar: async function (item, index) {
      this.transferencia = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarTrasferencia(this.transferencia);
          if (res?.exito) {
            this.listarTrasferencia();
            this.transferencia = { ...this.transferenciaBase };
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
  },
  mounted() {
    this.fechaRegistro = this.currentDate;
    this.loadTransferencia();
    this.listarTrasferencia();
    this.comboColegioCQF();
  },
};
</script>
