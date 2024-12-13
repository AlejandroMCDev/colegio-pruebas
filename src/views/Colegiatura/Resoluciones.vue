<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Resoluciones</h3>
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
              @click="loadResolucion()"
            >
              <i class="fe fe-file me-2"></i>Nuevo
            </button>
          </div>
          <div class="row">
            <div class="col-md-12 row">
              <div class="mb-5 p-4 br-5">
                <div class="form-label mt-0 p-0">DATOS GENERALES</div>
                <div class="row">
                  <div class="border mb-5 p-4 br-5">
                    <div class="form-label mt-0 p-0">Lista Agremiados</div>
                    <div class="row">
                      <div class="col-md-4 mb-3" style="text-align: center">
                        <div class="form-group">
                          <div class="input-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="CQFP"
                              @keypress.enter="verificarCQF"
                              v-model="cqfp"
                              ref="cqfp"
                              aria-label="Example text with button addon"
                              aria-describedby="button-addon1"
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
                      <div class="col-md-8 mb-3" style="text-align: center">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Agremiado"
                          v-model="agremiado"
                          disabled
                        />
                      </div>
                      <div class="col-md-4 mb-3" style="text-align: center">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="DNI"
                          v-model="dni"
                          disabled
                          style="display: none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-7">
                    <div class="form-group">
                      <div class="row">
                        <div class="col">
                          <label>Tipo Resolución</label>
                        </div>
                        <div class="col" style="text-align: right">
                          <a
                            href="javascript:void(0)"
                            data-bs-toggle="modal"
                            data-bs-target="#modalAddTipoResolucion"
                            >+ Agregar</a
                          >
                        </div>
                      </div>
                      <SearchMultiselect
                        :value="resolucion.idTipoResolucion"
                        v-model="resolucion.idTipoResolucion"
                        :options="tipoResolucionDesplegable"
                        placeholder="Tipo Resolución"
                        :searchable="true"
                        :canClear="false"
                        ref="idTipoResolucion"
                        :style="
                          showAdvertise && resolucion.idTipoResolucion == null
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                      <!-- <select class="form-control form-select"
                                                data-bs-placeholder="Tipo Resolución"
                                                v-model="resolucion.idTipoResolucion" ref="idTipoResolucion"
                                                :style="showAdvertise && resolucion.idTipoResolucion == null ? 'border-color: #e23e3d;' : ''">
                                                <option value="null">Tipo Resolución
                                                </option>
                                                <option v-for="item in tipoResolucionDesplegable" :key="item.id"
                                                    :label="item.nombre" :value="item.id">
                                                </option>
                                            </select> -->
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Fecha Emisión Resolución</label>
                      <input
                        type="date"
                        class="form-control"
                        placeholder="Fecha Emisión Resolución"
                        v-model="resolucion.fechaEmision"
                        ref="fechaEmision"
                        :style="
                          showAdvertise && resolucion.fechaEmision == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group">
                      <label>Nº Resolución</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nº Resolución"
                        v-model="nroResolucion"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Nº Expediente</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Nº Expediente"
                        v-model="resolucion.nroExpediente"
                        ref="nroExpediente"
                        :style="
                          showAdvertise && resolucion.nroExpediente == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Motivo</label>
                      <textarea
                        class="form-control"
                        placeholder="Motivo"
                        ref="motivo"
                        :style="
                          showAdvertise && resolucion.motivo == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                        v-model="resolucion.motivo"
                        rows=" 4"
                      ></textarea>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Fecha Registro</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Fecha Registro"
                        v-model="fechaRegistro"
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
                @click="loadResolucion()"
              >
                Cancelar
              </button>
              <button
                class="btn btn-primary"
                type="button"
                @click="guardarCambios()"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="listadoTab">
          <div class="mb-5 p-4 br-5">
            <div class="form-label mt-0 p-0">FILTROS</div>
            <div class="row align-items-start">
              <div class="col-md-2 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                  placeholder="Fecha Inicio"
                  v-model="filtros.fechaInicio"
                />
              </div>
              <div class="col-md-2 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                  placeholder="Fecha Fin"
                  v-model="filtros.fechaFin"
                />
              </div>
              <div class="col-md-2 mb-3" style="text-align: center">
                <select
                  class="form-control form-select select2"
                  data-bs-placeholder="Filtros"
                  v-model="filtros.tipoFiltro"
                >
                  <option value="">Filtros</option>
                  <option value="dni">DNI</option>
                  <option value="cqf">CQFP</option>
                  <option value="nombreApellido">Apellidos y Nombres</option>
                </select>
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Text input with dropdown button"
                  v-model="filtros.searchFiltro"
                  placeholder="Buscar"
                />
              </div>

              <div class="col-md-3 mb-3 gap-3" style="text-align: left">
                <button
                  type="button"
                  class="btn btn-primary me-1"
                  data-bs-toggle="modal"
                  data-bs-target="#modalSearchListado"
                >
                  <i class="fe fe-search me-2"></i>Buscar
                </button>
                <button
                  type="button"
                  class="btn btn-primary me-1"
                  @click="nuevaResolucion()"
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
                <div class="table-responsive">
                  <table
                    class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Tipo Resolución</th>
                        <th>CQFP</th>
                        <th>Colegiado</th>
                        <th>Nº Res.</th>
                        <th>F. Emisión</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in listadoResolucion"
                        :key="'item-' + index"
                        v-if="listadoResolucion.length != 0"
                      >
                        <td scope="row">{{ indexMethod(index) }}</td>
                        <td>{{ item.tipoResolucion }}</td>
                        <td>{{ item.persona_cqf }}</td>
                        <td>{{ item.persona }}</td>
                        <td>{{ item.nroResolucion }}</td>
                        <td>{{ item.fechaEmision }}</td>
                        <td class="text-center">
                          <i
                            class="fa fa-eye mx-1 text-primary"
                            role="button"
                            @click="openurlArchivo(item.url)"
                            v-show="item.url != null"
                            title="Ver"
                          ></i>
                          <i
                            class="fa fa-pencil mx-1 text-yellow"
                            role="button"
                            @click="cargarVer(item, index)"
                            title="Editar"
                          ></i>
                          <i
                            class="fe fe-dollar-sign mx-1 text-black"
                            role="button"
                            @click="abrirModalDescuento(item)"
                            title="Aplicar Descuento"
                          ></i>
                          <i
                            class="fa fa-trash mx-1 text-danger"
                            role="button"
                            @click="cargarEliminar(item, index)"
                            title="Eliminar"
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
  <modal-add-tipo-resolucion
    id="modalAddTipoResolucion"
    @addTipoResolucion="addTipoResolucion"
  />
  <modal-add-colegiado
    id="modalAddColegiado"
    :filtros="modalFiltros"
    @selectColegiado="selectColegiado"
    @closeModalColegiado="closeModalColegiado"
  />

  <modal-search-listado-resoluciones
    id="modalSearchListado"
    :filtros="modalFiltros"
    @selectColegiadoListado="selectColegiadoListado"
    @closeModalColegiadoListado="closeModalColegiadoListado"
  />

  <modal-add-descuento
    id="modalAddDescuento"
    :cod_colegiado="cod_colegiado"
    :aprobado="aprobado"
    :id_resolucion="id_resolucion"
    :tramitado="tramitado"
  />
</template>

<script>
import { mapActions } from "vuex";
import global from "../../global";
import SearchMultiselect from "../../components/SearchMultiselect/SearchMultiselect.vue";
import modalAddTipoResolucion from "../../components/resoluciones/NewTipoResolucion/modalAddTipoResolucion.vue";
import ModalSearchListadoResoluciones from "../../components/resoluciones/listado/modalSearchListadoResoluciones.vue";
import modalAddColegiado from "../../components/colegiado/modalAddColegiado.vue";
import modalAddDescuento from "../../components/resoluciones/aplicarDescuentos/modalAddDescuento.vue";
//Librayr
import * as XLSX from "xlsx";
import dayjs from "dayjs";
export default {
  name: "Resoluciones",
  components: {
    SearchMultiselect,
    modalAddTipoResolucion,
    modalAddColegiado,
    ModalSearchListadoResoluciones,
    modalAddDescuento,
  },
  data() {
    return {
      iprutaFiles: global.ruta_api,
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      modalAddTipoResolucion: false,
      tipoResolucionDesplegable: [],
      listadoResolucion: [],
      indiceModificando: -1,
      showAdvertise: false,
      filtros: {
        tipoFiltro: "",
        searchFiltro: "",
        fechaInicio: "",
        fechaFin: "",
      },
      buscador: {
        page_index: 1,
        fechaInicio: "",
        fechaFin: "",
        cqfll: "",
      },
      resolucion: {},
      resolucionBase: {
        idTipoResolucion: null,
        fechaEmision: "",
        nroExpediente: "",
        motivo: "",
        resolucion_persona: [
          {
            id: null,
            idPersona: 0,
            estado: 0,
          },
        ],
      },
      pagination: {
        perPage: 10,
        currentPage: 1,
        total: 0,
      },
      totalPaginas: 0,
      cqfp: "",
      agremiado: "",
      dni: "",
      fechaRegistro: "",
      usuarioRegistro: "",
      nroResolucion: "",
      cod_colegiado: 0,
      aprobado: "",
      tramitado: "",
      id_resolucion: 0,
    };
  },
  computed: {
    modalFiltros() {
      return {
        filtrosColegiado: this.filtros.tipoFiltro,
        searchFiltro: this.filtros.searchFiltro,
      };
    },
  },
  methods: {
    ...mapActions({
      ListarResolucion: "_resoluciones/Listar",
      AgregarResolucion: "_resoluciones/Agregar",
      ModificarResolucion: "_resoluciones/Modificar",
      EliminarResolucion: "_resoluciones/Eliminar",
      ObtenerResolucion: "_resoluciones/Obtener",
      ObtenerColegiado: "_colegiado/ObtenerColegiado",
      TipoResolucionDesplegable: "_tipoResolucion/TipoResolucionDesplegable",
      ObtenerCorrelativo: "_correlativo/ObtenerCorrelativo",
    }),
    download_excel: async function () {
      let resolucion = {
        page_index: 1,
        page_size: 999999,
        fechaInicio: this.filtros.fechaInicio,
        fechaFin: this.filtros.fechaFin,
        cqfll: this.filtros.cqfp,
      };

      this.cargando = true;
      var res = await this.ListarResolucion(resolucion);

      if (res != null) {
        let export_excel = [];
        export_excel = res.datos.map((el, index) => ({
          index: index + 1,
          tipoResolucion: el.tipoResolucion,
          persona_cqf: el.persona_cqf,
          persona: el.persona,
          nroResolucion: el.nroResolucion,
          fechaEmision: dayjs(el.fechaEmision).format("DD/MM/YYYY"),
          nroExpediente: el.nroExpediente,
          motivo: el.motivo,
        }));

        let data = XLSX.utils.json_to_sheet(export_excel, {
          header: [
            "index",
            "tipoResolucion",
            "persona_cqf",
            "persona",
            "nroResolucion",
            "fechaEmision",
            "nroExpediente",
            "motivo",
          ],
        });
        data["A1"].v = "#";
        data["B1"].v = "TIPO RESOLUCIÓN";
        data["C1"].v = "CQFLL";
        data["D1"].v = "COLEGIADO";
        data["E1"].v = "Nº RESOLUCIÓN.";
        data["F1"].v = "F. EMISIÓN";
        data["G1"].v = "N° DE EXPEDIENTE";
        data["H1"].v = "MOTIVO";
        const workbook = XLSX.utils.book_new();
        const filename = "resouciones";
        XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
      this.cargando = false;
    },
    abrirModalDescuento(item) {
      console.log(item);
      this.id_resolucion = item.id;
      this.cod_colegiado = parseInt(item.idpersona);
      this.aprobado = item.aprobado;
      this.tramitado = item.tramitado;
      new bootstrap.Modal($("#modalAddDescuento")).show(); // Abrir modal
    },
    closeModalDescuento: function () {
      this.cod_colegiado = 0;
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalAddDescuento")
      );
      modal.hide();
    },
    closeModalColegiado: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalAddColegiado")
      );
      modal.hide();
    },
    closeModalColegiadoListado: function () {
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalSearchListado")
      );
      modal.hide();
    },
    selectColegiado(item) {
      this.cqfp = item.cqfll;
      this.resolucion.resolucion_persona = [
        {
          id: null,
          idPersona: item.id,
          estado: 1,
        },
      ];
      this.dni = item.dni;
      this.agremiado =
        item.nombres + " " + item.apellidoPaterno + " " + item.apellidoMaterno;
      this.closeModalColegiado();
    },
    selectColegiadoListado: async function (cqfll = '') {
      this.buscador.cqfll = cqfll;
      this.closeModalColegiadoListado();
      await this.listarResolucion()

    },
    addTipoResolucion: async function (idTipoResolucion) {
      this.comboTipoResolucion();
      this.resolucion.idTipoResolucion = idTipoResolucion;
      this.cerrarModalTipoResolucion();
    },
    cerrarModalTipoResolucion: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalAddTipoResolucion")
      );
      modal.hide();
    },
    nuevaResolucion() {
      this.loadResolucion();
      this.cambiarTab();
    },
    openurlArchivo(url) {
      window.open(this.iprutaFiles + "" + url, "_blank");
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    cambiarPagina: function (paginaDestino) {
      this.listarResolucion(paginaDestino);
    },
    comboTipoResolucion: async function () {
      var res = await this.TipoResolucionDesplegable();
      this.tipoResolucionDesplegable = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
      //this.tipoResolucionDesplegable = res;
    },
    cargarVer: async function (item, index) {
      let resolucion = {
        id: item.id,
      };
      let res = await this.ObtenerResolucion(resolucion);

      this.resolucion.id = res.id;

      this.resolucion.resolucion_persona = [
        {
          id: res.resolucion_persona[0].id,
          idPersona: res.resolucion_persona[0].idPersona,
          estado: 1,
        },
      ];

      this.resolucion.idTipoResolucion = res.idTipoResolucion;
      this.resolucion.nroExpediente = res.nroExpediente;
      this.resolucion.fechaEmision = res.fechaEmision;
      this.resolucion.motivo = res.motivo;

      this.agremiado = res.resolucion_persona[0].persona;
      this.fechaRegistro = res.fechaRegistro;
      this.usuarioRegistro = res.usuarioRegistro;
      this.nroResolucion = res.nroResolucion;

      this.dni = res.resolucion_persona[0].cqf;
      this.cqfp = res.resolucion_persona[0].cqf;

      this.indiceModificando = index;
      this.cambiarTab();
    },
    cargarEliminar: async function (item, index) {
      this.resolucion = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarResolucion(this.resolucion);
          if (res?.exito) {
            this.listarResolucion();
            this.resolucion = { ...this.resolucionBase };
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
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
          this.resolucion.resolucion_persona = [
            {
              id: null,
              idPersona: res.id,
              estado: 1,
            },
          ];
          this.dni = res.dni;
          this.agremiado =
            res.nombres + " " + res.apellidoPaterno + " " + res.apellidoMaterno;
        } else {
          this.dni = "";
          this.agremiado = "";
          global._mensaje_advertencia("Datos Ingresados no existen, gracias.");
        }
      }
    },
    validarResolucion() {
      let valida = false;

      if (this.resolucion.idTipoResolucion == null) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.idTipoResolucion.$el.focus();
        });
      } else if (this.resolucion.fechaEmision == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fechaEmision.focus();
        });
      } else if (this.resolucion.nroExpediente == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.nroExpediente.focus();
        });
      } else if (this.resolucion.motivo == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.motivo.focus();
        });
      }
      return valida;
    },
    guardarCambios: async function () {
      var res = null;
      let valor = this.validarResolucion();
      if (!valor) {
        if (this.dni != "") {
          if (this.indiceModificando == -1) {
            res = await this.AgregarResolucion(this.resolucion);
          } else {
            res = await this.ModificarResolucion(this.resolucion);
          }
        } else {
          this.$refs.cqfp.focus();
          global._mensaje_advertencia("Debe buscar un Agremiado, gracias.");
        }
      }
      if (res?.exito) {
        this.loadResolucion();
        this.listarResolucion();
        global._mensaje_exito("Los cambios se han guardado correctamente");

        document.getElementById("tabGeneralRegistrar").className = "";
        document.getElementById("registrarTab").className = "tab-pane";
        document.getElementById("tabGeneralListado").className = "active";
        document.getElementById("listadoTab").className = "tab-pane active";
      }
    },
    listarResolucion: async function (pagina = 1) {
      this.buscador.page_index = pagina;
      this.buscador.fechaInicio = this.filtros.fechaInicio;
      this.buscador.fechaFin = this.filtros.fechaFin;

      var res = await this.ListarResolucion(this.buscador);
      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;

      this.listadoResolucion = res.datos.map((el) => ({
        ...el,
        fechaEmision: dayjs(el.fechaEmision).format("DD-MM-YYYY"),
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
    loadResolucion: function () {
      this.resolucion = { ...this.resolucionBase };
      this.resolucion.fechaEmision = dayjs(this.date).format("YYYY-MM-DD");
      this.agremiado = "";
      this.cqfp = "";
      this.dni = "";
      this.fechaRegistro = this.currentDate;
      this.usuarioRegistro = "";
      this.nroResolucion = "";
      this.indiceModificando = -1;

      this.cargarCorrelativo();
    },
    cargarCorrelativo: async function () {
      var res = await this.ObtenerCorrelativo();
      this.nroResolucion = res.resolucion;
    },
  },
  mounted() {
    this.fechaRegistro = this.currentDate;
    this.loadResolucion();
    this.comboTipoResolucion();
    this.listarResolucion();
    this.cargarCorrelativo();
  },
};
</script>
