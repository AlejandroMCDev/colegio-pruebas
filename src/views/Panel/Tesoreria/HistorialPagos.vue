<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Historial de Pagos</h3>
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
              >HISTORIAL DE PAGO</a
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- DATOS GENERALES -->
    <div class="panel-body tabs-menu-body">
      <div class="tab-content">
        <div class="tab-pane active" id="registrarTab">
          <!-- <div class="form-label mt-0 p-0">
            <div class="row">
              <div class="col-md-9">
                <button class="btn btn-primary" type="button">
                  <i class="fe fe-airplay me-2"></i>Vista Previa
                </button>
              </div>
            </div>
          </div>
          <br /> -->
          <div class="row">
            <!-- <div class="col-md-4 mb-3" style="text-align: center">
              <select
                class="form-control form-select select2"
                data-bs-placeholder="Tipo"
              >
                <option value="">Tipo</option>
                <option value="">Colegiado</option>
                <option value="">OTRO</option>
              </select>
            </div>
            <div class="col-md-4 mb-3" style="text-align: center">
              <input type="text" class="form-control" placeholder="CQFP" />
            </div>
            <div class="col-md-4 mb-3" style="text-align: center">
              <input
                type="text"
                class="form-control"
                placeholder="Agremiado"
                disabled
              />
            </div>
            <div class="col-md-4 mb-3" style="text-align: center">
              <input
                type="text"
                class="form-control"
                placeholder="Estado"
                disabled
              />
            </div> -->
            <div class="col-md-3 mb-3">
              <label>Fecha Inicio</label>
              <input
                class="form-control"
                onfocus="(this.type='date')"
                onblur="(this.type='text')"
                placeholder="Fecha Inicio"
                v-model="fecha_inicio"
              />
            </div>
            <div class="col-md-3 mb-3">
              <label>Fecha Fin</label>
              <input
                class="form-control"
                onfocus="(this.type='date')"
                onblur="(this.type='text')"
                v-model="fecha_fin"
                placeholder="Fecha Fin"
              />
            </div>
            <div class="col-md-3 mb-3">
              <label>DNI</label>
              <input
                type="text"
                class="form-control"
                v-model="dni"
                placeholder="DNI"
              />
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label>CQFP</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="CQFP"
                  v-model="cqf"
                />
              </div>
            </div>
            <div class="col-md-3">
              <div class="form-group">
                <label>Apellidos y Nombres</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Apellidos y Nombres"
                  v-model="nombreApellido"
                />
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label>Ventanilla</label>
              <select
                class="form-control form-select"
                data-bs-placeholder="Ventanilla"
                v-model="cod_ventanilla"
              >
                <option value="">Seleccionar Ventanilla</option>
                <option value="01">Caja 01</option>
                <option value="02">Caja 02</option>
                <option value="03">Caja 03</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <button
                type="button"
                class="btn btn-primary"
                style="margin-top: 29px"
                @click="cargarRegistros()"
              >
                <i class="fe fe-search me-2"></i>Buscar
              </button>
              <button
                type="button"
                class="btn btn-primary mx-1"
                @click="openurlArchivoExportablePDF()"
                style="margin-top: 29px"
              >
                <i class="fe fe-eye me-2"></i>PDF
              </button>
              <button
                class="btn btn-primary"
                type="button"
                @click="download_excel()"
                style="margin-top: 29px"
              >
                <i class="fe fe-share me-2"></i>Excel
              </button>
            </div>
          </div>
          <div class="panel-body tabs-menu-body">
            <div class="tab-content">
              <div class="tab-menu-heading">
                <div class="tabs-menu">
                  <!-- Tabs -->
                  <ul class="nav panel-tabs panel-info" id="tabs">
                    <li>
                      <a
                        href="#ingresosTab"
                        class="active"
                        data-bs-toggle="tab"
                        id="ListadoIngresos"
                        >Ingresos</a
                      >
                    </li>
                    <!-- <li>
                      <a
                        href="#egresosTab"
                        data-bs-toggle="tab"
                        id="ListadoEgresos"
                        >Egresos</a
                      >
                    </li> -->
                  </ul>
                </div>
              </div>
              <div class="panel-body tabs-menu-body">
                <div class="tab-content">
                  <!-- LISTADO TAB -->
                  <div class="tab-pane active" id="ingresosTab">
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
                              <th>Fecha</th>
                              <th>Operación</th>
                              <th>Vent.</th>
                              <th>Tipo</th>
                              <th>Serie</th>
                              <th>Número</th>
                              <th>Nombres</th>
                              <th>Nº Doc</th>
                              <th>Monto</th>
                              <th>Pago</th>
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
                              <td>{{ item.fecha_comprobante }}</td>
                              <td>{{ item.cod_comprobante }}</td>
                              <td>{{ item.cod_ventanilla }}</td>
                              <td>{{ item.desc_tipodoc }}</td>
                              <td>{{ item.nro_serie }}</td>
                              <td>{{ item.nro_documento }}</td>
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
                                  :title="item.nombres"
                                >
                                  <span
                                    v-if="
                                      item.tipo_comprobante == CODIGO_FACTURA
                                    "
                                  >
                                    {{ item.razon_social }}
                                  </span>
                                  <span v-else>
                                    {{ item.nombres }}
                                  </span>
                                </p>
                              </td>
                              <td>
                                <span
                                  v-if="item.tipo_comprobante == CODIGO_FACTURA"
                                >
                                  {{ item.ruc }}
                                </span>
                                <span v-else>
                                  {{ item.nro_doc }}
                                </span>
                              </td>
                              <td>{{ parseFloat(item.total).toFixed(2) }}</td>
                              <td>
                                <p
                                  style="
                                    width: 75px;
                                    white-space: nowrap;
                                    overflow: hidden;
                                  "
                                  class="overflow-ellipsis"
                                  data-bs-placement="top"
                                  data-bs-toggle="tooltip"
                                  :title="item.modo_pago_txt"
                                >
                                  {{ item.modo_pago_txt }}
                                </p>
                              </td>
                              <td>
                                <span v-if="item.estado == 1">Activo</span>
                                <span v-else>Anulado</span>
                              </td>
                              <td class="text-center">
                                <div class="btn-list">
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-primary"
                                    @click="openurlArchivo(item)"
                                  >
                                    <span class="fe fe-eye"> </span>
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-danger"
                                    @click="goModalAnularComprobante(item)"
                                    v-if="item.estado == 1"
                                  >
                                    <span class="fa fa-times-circle"> </span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr v-else>
                              <td colspan="13" class="text-center">
                                Detalle Vacío
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
                                    9
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
                  <!-- REGISTRO TAB-->
                  <div class="tab-pane" id="egresosTab">
                    <div class="col-md-12">
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
                              <th>Fecha</th>
                              <th>Operación</th>
                              <th>Ventanilla</th>
                              <th>Tipo</th>
                              <th>Serie</th>
                              <th>Número</th>
                              <th>Concepto</th>
                              <th>Descripción</th>
                              <th>Monto</th>
                              <th>Pago</th>
                              <th>Opciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(item, index) in listadoRegistro"
                              :key="'item-' + index"
                              v-if="listadoRegistro.length != 0"
                            >
                              <td>{{ item.fecha }}</td>
                              <td>{{ item.operacion }}</td>
                              <td>{{ item.ventanilla }}</td>
                              <td>{{ item.tipo }}</td>
                              <td>{{ item.serie }}</td>
                              <td>{{ item.numero }}</td>
                              <td>{{ item.concepto }}</td>
                              <td>{{ item.descripcion }}</td>
                              <td>{{ item.monto }}</td>
                              <td>{{ item.pago }}</td>
                              <td>
                                <div class="btn-list">
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-primary"
                                  >
                                    <span class="fe fe-edit"> </span>
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-sm btn-danger"
                                  >
                                    <span class="fe fe-trash-2"> </span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr v-else>
                              <td colspan="11" class="text-center">
                                Detalle Vacío
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdropAnularComprobante"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            Anular Comprobante
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i class="fa fa-close"></i>
          </button>
        </div>
        <div class="modal-body container text-center">
          <div>
            <h3 class="text-center">Motivo de anulación</h3>
            <textarea
              class="form-control"
              v-model="motivo_anulacion"
              rows="4"
              placeholder="Ingrese motivo"
            ></textarea>
            <button class="btn btn-primary mt-2" @click="goAnularComprobante">
              Anular
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Library
import dayjs from "dayjs";
import * as XLSX from "xlsx";

import { mapActions } from "vuex";
import global from "../../../global";
import Loading from "../../../components/varios/Loading.vue";
import Paginate from "../../../components/varios/Paginate.vue";
export default {
  name: "HistorialPago",
  components: {
    Loading,
    Paginate,
  },
  data() {
    return {
      cargando: false,
      iprutaFiles: global.ruta_api,
      filtros: "",
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      listadoRegistro: [],
      fecha_inicio: "",
      fecha_fin: "",
      dni: "",
      cqf: "",
      nombreApellido: "",
      cod_ventanilla: "01",
      buscador: {
        page_index: 1,
        page_size: 10,
        fecha_inicio: "",
        fecha_fin: "",
        dni: "",
        cqf: "",
        nombreApellido: "",
        cod_ventanilla: "",
      },
      initialPage: 1,
      totalPaginas: 0,
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 15, 25, 50],
        total: 0,
      },

      comprobante_seleccionado: null,
      motivo_anulacion: "",

      CODIGO_FACTURA: global.CODIGO_FACTURA,
    };
  },
  methods: {
    ...mapActions({
      ListarRegistros: "_historialpagos/ListarRegistros",
      AnularComprobante: "_historialpagos/AnularComprobante",
    }),
    download_excel: async function () {
      let comprobante = {
        page_index: 1,
        page_size: 999999,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        dni: this.dni,
        cqf: this.cqf,
        nombreApellido: this.nombreApellido,
        cod_ventanilla: this.cod_ventanilla,
      };

      this.cargando = true;

      var res = await this.ListarRegistros(comprobante);

      if (res != null) {
        let export_excel = [];
        export_excel = res.datos.map((el) => ({
          fecha_comprobante: dayjs(el.fecha_comprobante).format("YYYY-MM-DD"),
          cod_comprobante: el.cod_comprobante,
          desc_tipodoc: el.desc_tipodoc,
          cod_ventanilla: el.cod_ventanilla,
          nro_serie:
            el.tipo_comprobante == 17
              ? "FFF1"
              : el.tipo_comprobante == 19
              ? "BBB1"
              : el.nro_serie,
          nro_documento: el.nro_documento,
          nombres:
            el.tipo_comprobante == this.CODIGO_FACTURA
              ? el.razon_social
              : el.nombres,
          nro_doc:
            el.tipo_comprobante == this.CODIGO_FACTURA ? el.ruc : el.nro_doc,
          total: parseFloat(el.total),
          modo_pago_txt: el.modo_pago_txt,
          estado: el.estado == 1 ? "Activo" : "Anulado",
        }));

        let data = XLSX.utils.json_to_sheet(export_excel, {
          header: [
            "fecha_comprobante",
            "cod_comprobante",
            "cod_ventanilla",
            "desc_tipodoc",
            "nro_serie",
            "nro_documento",
            "nombres",
            "nro_doc",
            "total",
            "modo_pago_txt",
            "estado",
          ],
        });
        data["A1"].v = "FECHA";
        data["B1"].v = "OPERACIÓN";
        data["C1"].v = "VENTANILLA";
        data["D1"].v = "TIPO";
        data["E1"].v = "SERIE";
        data["F1"].v = "NÚMERO";
        data["G1"].v = "NOMBRES";
        data["H1"].v = "Nº DOC";
        data["I1"].v = "MONTO";
        data["J1"].v = "PAGO";
        data["K1"].v = "ESTADO";

        const workbook = XLSX.utils.book_new();
        const filename = "comprobante";
        XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
      this.cargando = false;
    },
    openurlArchivo(item) {
      if (item.tipo_comprobante == 9) {
        let url = "comprobante/ver/";
        window.open(
          this.iprutaFiles + "" + url + item.cod_comprobante,
          "_blank"
        );
      } else if (item.tipo_comprobante == 17 || item.tipo_comprobante == 19) {
        window.open(item.nubefact_url, "_blank");
      }
    },
    goModalAnularComprobante: function (item) {
      this.comprobante_seleccionado = item;
      new bootstrap.Modal($("#staticBackdropAnularComprobante")).show();
    },
    goAnularComprobante: function () {
      global._swal_pregunta(
        "¿Está seguro que desea anular el comprobante?",
        async () => {
          var modal = bootstrap.Modal.getInstance(
            document.getElementById("staticBackdropAnularComprobante")
          );
          modal.hide();
          var respuesta = await this.AnularComprobante({
            tipo_comprobante: this.comprobante_seleccionado.tipo_comprobante,
            nro_serie: this.comprobante_seleccionado.nro_serie,
            nro_documento: this.comprobante_seleccionado.nro_documento,
            cod_comprobante: this.comprobante_seleccionado.cod_comprobante,
            com_usuariodel: "lgil",
            observacion: this.motivo_anulacion,
          });
          global._mensaje_exito("Se ha anulado correctamente");
          this.cargarRegistros();
        },
        "Anular Comprobante"
      );
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    cargarRegistros: async function (pagina = 1) {
      this.buscador.page_index = pagina;
      this.buscador.fecha_inicio = this.fecha_inicio;
      this.buscador.fecha_fin = this.fecha_fin;
      this.buscador.dni = this.dni;
      this.buscador.cqf = this.cqf;
      this.buscador.nombreApellido = this.nombreApellido;
      this.buscador.cod_ventanilla = this.cod_ventanilla;

      this.cargando = true;

      var res = await this.ListarRegistros(this.buscador);

      this.listadoRegistro = res.datos.map((el) => ({
        ...el,
        fecha_comprobante: dayjs(el.fecha_comprobante).format("DD-MM-YYYY"),
        nro_serie:
          el.tipo_comprobante == 17
            ? "FFF1"
            : el.tipo_comprobante == 19
            ? "BBB1"
            : el.nro_serie,
      }));

      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;
      this.buscador.page_index = res.paginaActual;
      this.initialPage = res.paginaActual;
      this.totalPaginas = res.totalPaginas;

      this.cargando = false;
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    openurlArchivoExportablePDF() {
      if (this.listadoRegistro.length > 0) {
        let url = `${this.iprutaFiles}comprobantes/pdf?fecha_inicio=${this.fecha_inicio}&fecha_fin=${this.fecha_fin}&dni=${this.dni}&cqf=${this.cqf}&nombreApellido=${this.nombreApellido}&cod_ventanilla=${this.cod_ventanilla}`;
        window.open(url, "_blank");
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
    },
  },
  mounted() {
    this.fecha_inicio = this.currentDate;
    this.fecha_fin = this.currentDate;

    this.cargarRegistros();
  },
};
</script>
<style lang="css" scoped>
.overflow-ellipsis {
  text-overflow: ellipsis;
}
</style>
