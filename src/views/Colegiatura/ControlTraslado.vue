<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Control de Traslado</h3>
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
              @click="loadTraslado()"
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
                      <label>Tipo</label>
                      <select
                        class="form-control form-select"
                        data-bs-placeholder="Tipo Transferencia"
                        v-model="traslado.tipo"
                        ref="tipo"
                        @change="cargarOperacion()"
                        :style="
                          showAdvertise && traslado.tipo == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      >
                        <option value="">Seleccione</option>
                        <option value="I">Ingreso</option>
                        <option value="S">Salida</option>
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
                        v-model="traslado.fecha"
                        ref="fechaTranferencia"
                        :style="
                          showAdvertise && traslado.fecha == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Operación</label>
                      <select
                        class="form-control form-select"
                        data-bs-placeholder="Operación"
                        ref="modalidad"
                        :style="
                          showAdvertise && traslado.modalidad == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                        v-model="traslado.modalidad"
                      >
                        <option value="">Selecciona</option>
                        <option
                          v-for="item in listaOperacion"
                          :key="item.id"
                          :label="item.nombre"
                          :value="item.id"
                        ></option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Mes Pagado en su Colegio de Origen</label>
                      <SearchMultiselect
                        :value="traslado.mes_corlad"
                        v-model="traslado.mes_corlad"
                        :options="listaCuotas"
                        placeholder="Seleccione"
                        ref="mes_corlad"
                        :searchable="true"
                        :canClear="false"
                        :style="
                          showAdvertise && traslado.mes_corlad == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                      <!-- <select
                        class="form-control form-select"
                        data-bs-placeholder="Colegio al que se traslada"
                        v-model="traslado.mes_corlad"
                        ref="mes_corlad"
                        :style="
                          showAdvertise && traslado.mes_corlad == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      >
                        <option value="">Seleccione</option>
                        <option
                          v-for="item in listaCuotas"
                          :key="item.id"
                          :label="item.nombre"
                          :value="item.id"
                        ></option>
                      </select> -->
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Colegio de origen</label>
                      <SearchMultiselect
                        :value="traslado.colegio_origen"
                        v-model="traslado.colegio_origen"
                        :options="colegioCQFDesplegable"
                        placeholder="Seleccione"
                        ref="colegio_origen"
                        :searchable="true"
                        :canClear="false"
                        :style="
                          showAdvertise && traslado.colegio_origen == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Colegio al que se traslada</label>
                      <SearchMultiselect
                        :value="traslado.colegio"
                        v-model="traslado.colegio"
                        :options="colegioCQFDesplegable"
                        placeholder="Seleccione"
                        ref="colegio"
                        :searchable="true"
                        :canClear="false"
                        :style="
                          showAdvertise && traslado.colegio == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>FOMAF</label>
                      <select
                        class="form-control form-select"
                        data-bs-placeholder="FOMAF"
                        v-model="traslado.fomafAfiliado"
                        ref="fomafAfiliado"
                        :style="
                          showAdvertise && traslado.fomafAfiliado == null
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      >
                        <option value="null">FOMAF</option>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                      </select>
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
                        v-model="traslado.usuario"
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
                @click="loadTraslado()"
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
              <div class="col-md-2 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                  placeholder="Fecha Inicio"
                  v-model="filtros.fecha_inicio"
                />
              </div>
              <div class="col-md-2 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                  placeholder="Fecha Fin"
                  v-model="filtros.fecha_fin"
                />
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  placeholder="AGREMIADO"
                  v-model="filtros.agremiado"
                />
              </div>

              <div class="col-md-5 mb-3" style="text-align: left">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="cargarRegistros()"
                  style="margin: 2px"
                >
                  <i class="fe fe-search me-2"></i>Buscar
                </button>
                <button
                  type="button"
                  class="btn btn-primary m-1"
                  @click="nuevaTransferencia()"
                >
                  <i class="fe fe-file me-2"></i>Nuevo
                </button>
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="download_excel()"
                >
                  <i class="fe fe-share me-2"></i>Exportar
                </button>
              </div>
            </div>
            <br />
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
                        <th>#</th>
                        <th>NÙMERO</th>
                        <th>FECHA</th>
                        <th>TIPO</th>
                        <th>AGREMIADO</th>
                        <th>COLEGIO ORIGEN</th>
                        <th>COLEGIO DESTINO</th>
                        <th>USUARIO</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in listadoTraslado"
                        :key="'item-' + index"
                        v-if="listadoTraslado.length != 0"
                      >
                        <td scope="row">{{ indexMethod(index) }}</td>
                        <td>{{ item.nro }}</td>
                        <td>{{ item.fechaFormato }}</td>
                        <td>{{ item.tipoDescripcion }}</td>
                        <td>
                          {{ item.apellidoPaterno }} {{ item.apellidoMaterno }}
                          {{ item.nombres }}
                        </td>
                        <td>
                          <p
                            style="
                              width: 200px;
                              white-space: nowrap;
                              overflow: hidden;
                            "
                            class="overflow-ellipsis"
                            data-bs-placement="top"
                            data-bs-toggle="tooltip"
                            :title="item.colegio_origen"
                          >
                            {{ item.colegio_origen }}
                          </p>
                        </td>
                        <td>
                          <p
                            style="
                              width: 170px;
                              white-space: nowrap;
                              overflow: hidden;
                            "
                            class="overflow-ellipsis"
                            data-bs-placement="top"
                            data-bs-toggle="tooltip"
                            :title="item.colegio"
                          >
                            {{ item.colegio }}
                          </p>
                        </td>
                        <td>{{ item.tra_usuarioreg }}</td>
                        <td class="text-center">
                          <i
                            class="fa fa-eye mx-1 text-primary"
                            role="button"
                            @click="generarUrlTraslado(item.ID)"
                            v-show="item.tipoDescripcion != 'Ingreso'"
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
import Loading from "../../components/varios/Loading.vue";
import modalAddColegiado from "../../components/colegiado/modalAddColegiado.vue";
import Paginate from "../../components/varios/Paginate.vue";
import SearchMultiselect from "../../components/SearchMultiselect/SearchMultiselect.vue";

//Library
import * as XLSX from "xlsx";
import dayjs from "dayjs";
export default {
  name: "ControlTraslado",
  components: { modalAddColegiado, Loading, Paginate, SearchMultiselect },
  data() {
    return {
      listaCuotas: [],
      cargando: false,
      ultimo_mes_pagada: "",
      iprutaFiles: global.ruta_api,
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      indiceModificando: -1,
      showAdvertise: false,
      filtros: {
        agremiado: "",
        fecha_inicio: "",
        fecha_fin: "",
      },
      pagination: {
        perPage: 10,
        currentPage: 1,
        total: 0,
      },
      initialPage: 1,
      totalPaginas: 0,
      buscador: {
        page_index: 1,
        page_size: 10,
        fecha_inicio: "",
        fecha_fin: "",
        agremiado: "",
      },
      listaIngreso: [
        {
          id: "AT",
          nombre: "Anulacion Traslado",
        },
        {
          id: "RE",
          nombre: "Reingreso",
        },
        {
          id: "IP",
          nombre: "Ingreso Por Primera Vez",
        },
      ],
      listaOperacion: [],
      listaSalida: [
        {
          id: "TR",
          nombre: "Traslado",
        },
      ],
      listadoTraslado: [],
      traslado: {},
      trasladoBase: {
        /*id: 0,*/
        cod_colegiado: 0,
        tipo: "",
        modalidad: "",
        fecha: "",
        mes_corlad: "",
        colegio: "",
        colegio_origen: "",
        fomafAfiliado: null,
        usuario: "eescudero",
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
    ...mapActions({
      AgregarTraslado: "_traslado/AgregarTraslado",
      ModificarTraslado: "_traslado/ModificarTraslado",
      ListarTraslado: "_traslado/ListarTraslado",
      EliminarTrasferencia: "_trasferencia/EliminarTrasferencia",
      ColegioCQFDesplegable: "_colegiado/ColegioCQFDesplegable",
      ObtenerColegiado: "_colegiado/ObtenerColegiado",
      ListarCuotasAll: "_traslado/ListarCuotasAll",
      GenerarUrlTraslado: "_traslado/GenerarUrlTraslado",
    }),
    closeModalColegiado: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalAddColegiado")
      );
      modal.hide();
    },
    selectColegiado(item) {
      this.cqfp = item.cqfll;
      this.traslado.cod_colegiado = item.id;
      this.traslado.colegio_origen = item.idColegioCQF;
      this.traslado.fomafAfiliado = item.fomafAfiliado;
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
          this.traslado.cod_colegiado = res.id;
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
      this.loadTraslado();
      this.cambiarTab();
    },
    cargarOperacion() {
      this.traslado.modalidad = "";

      if (this.traslado.tipo == "I") {
        this.listaOperacion = this.listaIngreso;
      } else {
        this.listaOperacion = this.listaSalida;
      }
    },
    download_excel: async function () {
      let traslado = {
        page_index: 1,
        page_size: 999999,
        fecha_inicio: this.filtros.fecha_inicio,
        fecha_fin: this.filtros.fecha_fin,
        agremiado: this.filtros.agremiado,
      };

      this.cargando = true;

      var res = await this.ListarTraslado(traslado);

      if (res != null) {
        let export_excel = [];
        export_excel = res.datos.map((el, index) => ({
          index: index + 1,
          nro: el.nro,
          fecha: dayjs(el.fecha).format("DD/MM/YYYY"),
          tipoDescripcion: el.tipoDescripcion,
          persona:
            el.apellidoPaterno + " " + el.apellidoMaterno + " " + el.nombres,
          colegio_origen: el.colegio_origen,
          colegio: el.colegio,
        }));

        let data = XLSX.utils.json_to_sheet(export_excel, {
          header: [
            "index",
            "nro",
            "fecha",
            "tipoDescripcion",
            "persona",
            "colegio_origen",
            "colegio",
          ],
        });
        data["A1"].v = "#";
        data["B1"].v = "NÙMERO";
        data["C1"].v = "FECHA";
        data["D1"].v = "TIPO";
        data["E1"].v = "AGREMIADO";
        data["F1"].v = "COLEGIO ORIGEN";
        data["G1"].v = "COLEGIO DESTINO";

        const workbook = XLSX.utils.book_new();
        const filename = "traslados";
        XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
      this.cargando = false;
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    generarUrlTraslado: async function (ID) {
      let traslado = {
        id: ID,
      };
      var res = null;
      res = await this.GenerarUrlTraslado(traslado);
      if (res?.exito) {
        this.openurlArchivo(res.datos.url);
      }
    },
    openurlArchivo(url) {
      window.open(this.iprutaFiles + "" + url, "_blank");
    },

    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cargarRegistros: async function (pagina = 1) {
      this.buscador.page_index = pagina;
      this.buscador.fecha_inicio = this.filtros.fecha_inicio;
      this.buscador.fecha_fin = this.filtros.fecha_fin;
      this.buscador.agremiado = this.filtros.agremiado;

      this.cargando = true;

      var res = await this.ListarTraslado(this.buscador);
      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;

      this.listadoTraslado = res.datos.map((el) => ({
        ...el,
        fechaFormato: dayjs(el.fecha).format("DD-MM-YYYY"),
        fecha: dayjs(el.fecha).format("YYYY-MM-DD"),
      }));

      this.buscador.page_index = res.paginaActual;
      this.initialPage = res.paginaActual;
      this.totalPaginas = res.totalPaginas;

      this.cargando = false;
    },
    cambiarTab() {
      document.getElementById("tabGeneralRegistrar").className = "active";
      document.getElementById("registrarTab").className = "tab-pane active";
      document.getElementById("tabGeneralListado").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
    validarTraslado() {
      let valida = false;

      if (this.traslado.colegio == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.colegio.$el.focus();
        });
      } else if (this.traslado.colegio_origen == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.colegio_origen.$el.focus();
        });
      } else if (this.traslado.mes_corlad == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.mes_corlad.$el.focus();
        });
      } else if (this.traslado.fomafAfiliado == null) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fomafAfiliado.focus();
        });
      } else if (this.traslado.modalidad == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.modalidad.focus();
        });
      } else if (this.traslado.tipo == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.tipo.focus();
        });
      } else if (this.traslado.fecha == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fecha.focus();
        });
      }
      return valida;
    },
    guardarCambios: async function () {
      var res = null;
      let valor = this.validarTraslado();
      if (!valor) {
        global._swal_pregunta(
          "¿Está seguro que desea realizar el proceso de traslado?",
          async () => {
            if (this.traslado.cod_colegiado != 0) {
              if (this.indiceModificando == -1) {
                res = await this.AgregarTraslado(this.traslado);
              } else {
                res = await this.ModificarTraslado(this.traslado);
              }
            } else {
              this.$refs.cqfp.focus();
              global._mensaje_advertencia("Debe buscar un Agremiado, gracias.");
            }

            if (res?.exito) {
              this.generarUrlTraslado(res.datos.id);
              this.showAdvertise = false;
              this.loadTraslado();
              this.cargarRegistros();
              document.getElementById("tabGeneralRegistrar").className = "";
              document.getElementById("registrarTab").className = "tab-pane";
              document.getElementById("tabGeneralListado").className = "active";
              document.getElementById("listadoTab").className =
                "tab-pane active";
              global._mensaje_exito(
                "Los cambios se han guardado correctamente"
              );
            }
          },
          "Advertencia"
        );
      }
    },
    comboCuotas: async function () {
      var res = await this.ListarCuotasAll();

      this.listaCuotas = res.map((item) => {
        return {
          label:
            this.cargarMesesDescripcion(item.mes_cuota) + "-" + item.anio_cuota,
          value: item.cod_cuota,
        };
      });

      /*this.listaCuotas = res;*/
    },
    cargarMesesDescripcion(mes_cuota) {
      var descripcionMes = "";

      switch (mes_cuota) {
        case 1:
          descripcionMes = "ENERO";
          break;
        case 2:
          descripcionMes = "FEBRERO";
          break;
        case 3:
          descripcionMes = "MARZO";
          break;
        case 4:
          descripcionMes = "ABRIL";
          break;
        case 5:
          descripcionMes = "MAYO";
          break;
        case 6:
          descripcionMes = "JUNIO";
          break;
        case 7:
          descripcionMes = "JULIO";
          break;
        case 8:
          descripcionMes = "AGOSTO";
          break;
        case 9:
          descripcionMes = "SEPTIEMBRE";
          break;
        case 10:
          descripcionMes = "OCTUBRE";
          break;
        case 11:
          descripcionMes = "NOVIEMBRE";
          break;
        case 12:
          descripcionMes = "DICIEMBRE";
          break;
        default:
          console.log(`Sorry, we are out of ${mes_cuota}.`);
      }
      return descripcionMes;
    },
    comboColegioCQF: async function () {
      var res = await this.ColegioCQFDesplegable();

      this.colegioCQFDesplegable = res.map((item) => {
        return {
          label: item.nombre,
          value: item.id,
        };
      });
    },
    loadTraslado: function () {
      this.traslado = { ...this.trasladoBase };
      this.traslado.fecha = dayjs(this.date).format("YYYY-MM-DD");
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
      this.traslado.id = item.ID;
      this.traslado.cod_colegiado = item.COLEGIADO;
      this.traslado.tipo = item.tipo;
      this.cargarOperacion();
      this.traslado.modalidad = item.modalidad;
      this.traslado.fecha = item.fecha;
      this.traslado.mes_corlad = item.mes_corlad;
      this.traslado.colegio = item.ENTIDAD;
      this.traslado.colegio_origen = item.ENTIDAD_ORIGEN;
      this.traslado.fomafAfiliado = item.fomafAfiliado;

      this.agremiado =
        item.apellidoPaterno + " " + item.apellidoMaterno + " " + item.nombres;
      this.fechaRegistro = item.tra_fechareg;
      this.usuarioRegistro = item.tra_usuarioreg;
      this.cqfp = item.cqfll;
      this.estado = item.estadoColegiado;
      this.ultimo_mes_pagada = item.ultimo_mes_pagada;

      this.indiceModificando = index;
      this.cambiarTab();
    },
    cargarEliminar: async function (item, index) {
      /*this.transferencia = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarTrasferencia(this.transferencia);
          if (res?.exito) {
            this.cargarRegistros();
            this.transferencia = { ...this.transferenciaBase };
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );*/
    },
  },
  mounted() {
    this.fechaRegistro = this.currentDate;
    this.loadTraslado();
    this.cargarRegistros();
    this.comboColegioCQF();
    this.comboCuotas();
  },
};
</script>
<style lang="css" scoped>
.overflow-ellipsis {
  text-overflow: ellipsis;
}
</style>
