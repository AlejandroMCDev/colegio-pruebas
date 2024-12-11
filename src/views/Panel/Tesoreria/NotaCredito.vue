<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Nota de Crédito</h3>
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
              id="tabListadoNotaCredito"
              >LISTADO</a
            >
          </li>
          <li>
            <a
              href="#registrarTab"
              data-bs-toggle="tab"
              id="tabRegistrarNotaCredito"
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
              <!-- <div class="col-md-4 mb-3" style="text-align: center">
                <select
                  class="form-control form-select"
                  data-bs-placeholder="Todos"
                >
                  <option value="">Modo</option>
                  <option value="FECHA">FECHA</option>
                </select>
              </div> -->
              <div class="col-md-3 mb-3" style="text-align: center">
                <input
                  class="form-control"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                  placeholder="Fecha Inicio"
                  v-model="fecha_inicio"
                />
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <input
                  class="form-control"
                  onfocus="(this.type='date')"
                  onblur="(this.type='text')"
                  placeholder="Fecha Fin"
                  v-model="fecha_fin"
                />
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <select
                  class="form-control form-select"
                  data-bs-placeholder="Todos"
                  v-model="cod_ventanilla"
                >
                  <option value="">Ventanilla</option>
                  <option value="1">01- Caja</option>
                  <option value="2">02- Caja</option>
                </select>
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
                <div class="text-center">
                  <loading :mostrar="cargando" />
                </div>
                <div class="table-responsive">
                  <table
                    class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Operación</th>
                        <th>Tipo</th>
                        <th>Serie</th>
                        <th>Número</th>
                        <th>Dni</th>
                        <th>Beneficiado</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Usuario</th>
                        <th>Estado</th>
                        <th class="text-center">#</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(item, index) in listadoRegistro"
                        :key="'item-' + index"
                        v-if="listadoRegistro.length != 0"
                      >
                        <th scope="row">{{ indexMethod(index) }}</th>
                        <td>{{ item.cod_comprobante }}</td>
                        <td>{{ item.desc_tipodoc }}</td>
                        <td>{{ item.nro_serie }}</td>
                        <td>{{ item.nro_documento }}</td>
                        <td>{{ item.dni }}</td>
                        <td>{{ item.nombres }}</td>
                        <td>{{ item.fecha_comprobante2 }}</td>
                        <td>{{ item.total }}</td>
                        <td>{{ item.usuario_reg }}</td>
                        <td>{{ item.estado }}</td>
                        <td class="text-center">
                          <i
                            class="fa fa-pencil mx-1 text-yellow"
                            role="button"
                            @click="cargarVer(item)"
                          ></i>
                          <i
                            class="fa fa-trash mx-1 text-danger"
                            role="button"
                            @click="cargarEliminar(item)"
                          ></i>
                        </td>
                      </tr>
                      <tr v-else>
                        <td colspan="12" class="text-center">
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
              @click="nuevoRegistro()"
            >
              <i class="fe fe-file me-2"></i>Nuevo
            </button>
          </div>
          <div class="row">
            <div class="col-md-12 row">
              <div class="mb-5 p-4 br-5">
                <div class="row">
                  <div class="form-label mt-0 p-0">
                    DATOS DE LA NOTA DE CREDITO
                  </div>
                  <div class="col-md-12 row">
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">
                        Datos del Comprobante
                      </div>
                      <div class="row">
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Operación</label>
                            <input
                              type="number"
                              v-model="cod_recibo"
                              @keypress.enter="obtenerComprobante()"
                              class="form-control"
                              placeholder="Operación"
                              min="0"
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Tipo Documento</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Tipo Documento"
                              v-model="comprobante.tipcom_dsc"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Serie</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Serie"
                              v-model="comprobante.nro_serie"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Número</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="comprobante.nro_documento"
                              placeholder="Número"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Fecha Emisión</label>
                            <input
                              type="date"
                              class="form-control"
                              v-model="comprobante.fecha_comprobante"
                              placeholder="Fecha Emisión"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>RUC</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="notacredito.ruc"
                              placeholder="RUC"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Razón Social</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="notacredito.razonsocial"
                              placeholder="Razón Social / Nombre"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Tipo</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="comprobante.tipodoc_nombre"
                              placeholder="Tipo"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Colegiatura</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Colegiatura"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Nombres</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="notacredito.nombres"
                              placeholder="Nombres"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Ventanilla</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="comprobante.cod_ventanilla"
                              placeholder="Ventanilla"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Fecha Registro</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Fecha Registro"
                              v-model="comprobante.fechareg_recibo"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Usuario Registro</label>
                            <input
                              type="text"
                              class="form-control"
                              v-model="comprobante.usuarioreg_recibo"
                              placeholder="Usuario Registro"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Estado Rec.</label>
                            <input
                              v-model="comprobante.estado_recibo"
                              type="text"
                              class="form-control"
                              placeholder="Operación"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 row">
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">DETALLE</div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="table-responsive">
                            <table
                              class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                            >
                              <thead>
                                <tr>
                                  <th>COD</th>
                                  <th>CONCEPTO</th>
                                  <th>DESCRIPCION</th>
                                  <th>CANTIDAD</th>
                                  <th>PRECIO</th>
                                  <th>IMPORTE</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(
                                    item, index
                                  ) in listaDetalleComprobante"
                                  :key="'item-' + index"
                                  v-if="listaDetalleComprobante.length != 0"
                                >
                                  <td>{{ item.cod_concepto }}</td>
                                  <td>{{ item.desc_concepto }}</td>
                                  <td>{{ item.descripcion }}</td>
                                  <td>{{ item.cantidad }}</td>
                                  <td>{{ item.precio }}</td>
                                  <td>{{ item.importe }}</td>
                                  <td class="text-center">
                                    <!-- <i
                                      class="fa fa-pencil mx-1 text-yellow"
                                      role="button"
                                    ></i> -->
                                    <i
                                      class="fa fa-trash mx-1 text-danger"
                                      role="button"
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
                            <table
                              class="table table-bordered table-hover mb-0 text-nowrap"
                            >
                              <tbody>
                                <!-- <tr>
                                                                <td class="text-right">SubTotal
                                                                </td>
                                                                <td>$12,038</td>
                                                                <td class="text-right">IGV
                                                                </td>
                                                                <td>$12,038</td>
                                                                <td class="text-right">Total
                                                                </td>
                                                                <td>$12,038</td>
                                                            </tr> -->
                                <tr>
                                  <td class="fw-bold text-uppercase text-end">
                                    Sub Total
                                  </td>
                                  <td class="fw-bold text-end h4">
                                    {{ valorventa }}
                                  </td>
                                  <td class="fw-bold text-uppercase text-end">
                                    Igv
                                  </td>
                                  <td class="fw-bold text-end h4">
                                    {{ igv }}
                                  </td>
                                  <td class="fw-bold text-uppercase text-end">
                                    Total
                                  </td>
                                  <td class="fw-bold text-end h4">
                                    {{ total }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 row">
                    <div class="border mb-5 p-4 br-5">
                      <div class="form-label mt-0 p-0">
                        DATOS DE LA NOTA DE CREDITO
                      </div>
                      <div class="row">
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Ventanilla</label>
                            <select
                              class="form-control form-select"
                              data-bs-placeholder="Ventanilla"
                              v-model="notacredito.cod_ventanilla"
                              ref="cod_ventanilla"
                              :style="
                                showAdvertise &&
                                notacredito.cod_ventanilla == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                            >
                              <option value="">Ventanilla</option>
                              <option value="01">01-Caja</option>
                              <option value="02">02-Caja</option>
                              <option value="03">03-Caja</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Tipo Doc</label>
                            <SearchMultiselect
                              :value="notacredito.tipo_comprobante"
                              v-model="notacredito.tipo_comprobante"
                              :options="tipoDocumentos"
                              placeholder="Tipo de Comprobante"
                              :searchable="true"
                              @select="seleccionarTipoComprobante()"
                              :canClear="false"
                              ref="tipo_comprobante"
                              :style="
                                (showAdvertise &&
                                  notacredito.tipo_comprobante == 0) ||
                                notacredito.tipo_comprobante == null
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Serie</label>
                            <input
                              v-model="notacredito.nro_serie"
                              type="text"
                              class="form-control"
                              placeholder="Serie"
                              ref="nro_serie"
                              :style="
                                showAdvertise && notacredito.nro_serie == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Número</label>
                            <input
                              v-model="notacredito.nro_documento"
                              type="number"
                              class="form-control"
                              placeholder="Número"
                              ref="nro_documento"
                              :style="
                                showAdvertise && notacredito.nro_documento == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Fecha Emisión</label>
                            <input
                              v-model="notacredito.fecha_comprobante"
                              type="date"
                              class="form-control"
                              placeholder="Fecha Emisión"
                              ref="fecha_comprobante"
                              :style="
                                showAdvertise &&
                                notacredito.fecha_comprobante == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Registrado</label>
                            <input
                              type="date"
                              v-model="fecha_registro"
                              class="form-control"
                              placeholder="Registrado"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Usuario</label>
                            <input
                              type="text"
                              v-model="notacredito.usuario_usu"
                              class="form-control"
                              placeholder="Usuario"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="form-group">
                            <label>Estado</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Estado"
                              v-model="estado_notacredito"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Comentario</label>
                            <input
                              v-model="notacredito.motivo"
                              type="text"
                              class="form-control"
                              placeholder="Comentario"
                              ref="motivo"
                              :style="
                                showAdvertise && notacredito.motivo == ''
                                  ? 'border-color: #e23e3d;'
                                  : ''
                              "
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
</template>
<script>
import { mapActions } from "vuex";
import global from "../../../global";

import Loading from "../../../components/varios/Loading.vue";
import Paginate from "../../../components/varios/Paginate.vue";
import SearchMultiselect from "../../../components/SearchMultiselect/SearchMultiselect.vue";
//Library
import dayjs from "dayjs";
export default {
  name: "NotaCredito",
  components: {
    Paginate,
    Loading,
    SearchMultiselect,
  },
  data() {
    return {
      showAdvertise: "",
      indiceModificando: -1,
      cargando: false,
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      listadoRegistro: [],
      listaDetalleComprobante: [],
      usuarioRegistro: "",
      fecha_registro: "",
      fecha_inicio: "",
      cod_ventanilla: "",
      fecha_fin: "",
      buscador: {
        page_index: 1,
        page_size: 10,
        fecha_inicio: "",
        fecha_fin: "",
        cod_ventanilla: "",
      },
      totalPaginas: 0,
      initialPage: 1,
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 15, 25, 50],
        total: 0,
      },
      cod_recibo: 0,
      estado_notacredito: "",
      notacredito: {},
      notacreditoBase: {
        tipo_comprobante: 0,
        nro_serie: "",
        nro_documento: "",
        fecha_comprobante: "",
        cod_ventanilla: "",
        motivo: "",
        total: "",
        subtotal: "",
        ip: 0,
        cod_comprobante: 0,
        usuario_usu: "srodriguez",
        cod_persona: 0,
        ruc: "",
        razonsocial: "",
        tipo_persona: "",
        nro_doc: "",
        nombres: "",
        tipo_operacion: "",
        direccion: "",
        convenio: "",
        modo_pago: "",
        notacreditodetalle: [],
      },
      comprobante: {
        cod_ventanilla: "",
        estado_recibo: "",
        usuarioreg_recibo: "",
        fechareg_recibo: "",
        tipodoc_nombre: "",
        tipcom_dsc: "",
        nro_serie: "",
        nro_documento: "",
        fecha_comprobante: "",
      },
      tipoDocumentos: [],
    };
  },
  methods: {
    ...mapActions({
      ListarRegistros: "_notacredito/ListarRegistros",
      ObtenerComprobante: "_notacredito/ObtenerComprobante",
      ObtenerComprobanteDetalle: "_notacredito/ObtenerComprobanteDetalle",
      AgregarNotaCredito: "_notacredito/AgregarNotaCredito",
      EliminarNotaCredito: "_notacredito/EliminarNotaCredito",
      TipoDocumentoDesplegable: "_comprobantepago/TipoDocumentoDesplegable",
      NumeracionNotaCreditoGet: "_notacredito/NumeracionNotaCreditoGet",
    }),
    cargarEliminar: async function (item) {
      if (item.estado != "Anulado") {
        let notacredito = {
          cod_comprobante: item.cod_comprobante,
          fecha_comprobante: item.fecha_comprobante,
          cod_ventanilla: item.cod_ventanilla,
          usuario: "srodriguez",
          modo_pago: item.modo_pago,
        };
        global._swal_pregunta(
          "¿Está seguro que desea eliminar el registro?",
          async () => {
            var res = await this.EliminarNotaCredito(notacredito);
            if (res?.exito) {
              this.cargarRegistros();
              global._mensaje_exito("Se ha eliminado correctamente");
            }
          },
          "Anular"
        );
      } else {
        global._mensaje_advertencia("El comprobante se encuentra eliminado.");
      }
    },
    seleccionarTipoComprobante() {
      if (this.notacredito.tipo_comprobante == 15) {
        this.notacredito.nro_serie = "EB01";
        this.numeracionNotaCreditoGet();
      } else if (this.notacredito.tipo_comprobante == 16) {
        this.notacredito.nro_serie = "E001";
        this.numeracionNotaCreditoGet();
      } else if (this.notacredito.tipo_comprobante == 18) {
        this.notacredito.nro_serie = "0001";
        this.numeracionNotaCreditoGet();
      }
    },
    comboTipoDocumentoComprobante: async function () {
      var res = await this.TipoDocumentoDesplegable();

      this.tipoDocumentos = res
        .filter((opt) => opt.devolucion_tipodoc == 1)
        .map((item) => {
          return { label: item.desc_tipodoc, value: item.cod_tipodoc };
        });
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    cargarVer: async function (item) {
      let comprobante = {
        cod_recibo: item.cod_notacredito,
      };
      let res = await this.ObtenerComprobante(comprobante);

      if (res != null) {
        this.cambiarTabRegistro();
        this.cod_recibo = item.cod_notacredito;
        this.comprobante.tipcom_dsc = res.tipcom_dsc;
        this.comprobante.nro_documento = res.nro_documento;
        this.comprobante.nro_serie = res.nro_serie;
        this.comprobante.fecha_comprobante = dayjs(
          res.fecha_comprobante
        ).format("YYYY-MM-DD");
        this.comprobante.cod_ventanilla = res.cod_ventanilla;
        this.comprobante.tipodoc_nombre = res.Tipodoc_nombre;
        this.comprobante.fechareg_recibo = dayjs(res.fechareg_recibo).format(
          "YYYY-MM-DD"
        );
        this.comprobante.usuarioreg_recibo = res.usuarioreg_recibo;
        this.comprobante.estado_recibo = res.estado_recibo;

        let res_detalle = await this.ObtenerComprobanteDetalle(comprobante);
        this.listaDetalleComprobante = res_detalle.map((el) => ({
          ...el,
          importe: parseFloat(el.importe).toFixed(2),
          valorventa: parseFloat(el.valorventa).toFixed(2),
          precio: parseFloat(el.precio).toFixed(2),
        }));

        let notacredito = {
          cod_recibo: item.cod_comprobante,
        };
        let res_notacredito = await this.ObtenerComprobante(notacredito);

        this.notacredito.cod_persona = res_notacredito.cod_persona;
        this.notacredito.cod_comprobante = res_notacredito.cod_comprobante;
        this.notacredito.razonsocial = res_notacredito.razon_social;
        this.notacredito.ruc = res_notacredito.ruc;
        this.notacredito.nombres = res_notacredito.nombres;
        this.notacredito.nro_doc = res_notacredito.nro_doc;
        this.notacredito.tipo_persona = res_notacredito.tipo_persona;
        this.notacredito.tipo_operacion = res_notacredito.tipo_operacion;
        this.notacredito.direccion = res_notacredito.direccion;
        this.notacredito.convenio = res_notacredito.convenio;
        this.notacredito.modo_pago = res_notacredito.modo_pago;
        this.notacredito.tipo_comprobante = res_notacredito.tipocomprobante;
        this.notacredito.cod_ventanilla = res_notacredito.cod_ventanilla;
        this.notacredito.nro_serie = res_notacredito.nro_serie;
        this.notacredito.nro_documento = res_notacredito.nro_documento;
        this.notacredito.fecha_comprobante = dayjs(
          res_notacredito.fecha_comprobante
        ).format("YYYY-MM-DD");
        this.notacredito.usuario_usu = res_notacredito.usuarioreg_recibo;
        this.notacredito.motivo = res_notacredito.comentario;
        this.fecha_registro = dayjs(res_notacredito.fechareg_recibo).format(
          "YYYY-MM-DD"
        );
        this.estado_notacredito = res_notacredito.estado_recibo;
      }
    },
    validarRegistro() {
      let valida = false;

      if (this.notacredito.tipo_comprobante == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.tipo_comprobante.$el.focus();
        });
      } else if (this.notacredito.nro_serie == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.nro_serie.focus();
        });
      } else if (this.notacredito.nro_documento == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.nro_documento.focus();
        });
      } else if (this.notacredito.fecha_comprobante == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.fecha_comprobante.focus();
        });
      } else if (this.notacredito.cod_ventanilla == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.cod_ventanilla.focus();
        });
      } else if (this.notacredito.motivo == "") {
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
      let valor = this.validarRegistro();
      if (!valor) {
        global._swal_pregunta(
          "¿Está seguro que desea guardar la Nota de Credito?",
          async () => {
            this.notacredito.notacreditodetalle = this.listaDetalleComprobante;
            if (this.notacredito.cod_comprobante == 0) {
              global._mensaje_advertencia(
                "Debe ingresar los datos del comprobante, para aplicar la Nota de Credito."
              );
            } else if (this.listaDetalleComprobante.length == 0) {
              global._mensaje_advertencia(
                "Detalle del Comprobante vacio, verifique los datos."
              );
            } else {
              if (this.indiceModificando == -1) {
                res = await this.AgregarNotaCredito(this.notacredito);
              } else {
                /*res = await this.ModificarComprobantePago(this.comprobantepago);*/
              }

              if (res?.exito) {
                this.showAdvertise = false;
                this.loadRegistro();
                this.cambiarTabListar();
                this.cargarRegistros();
                global._mensaje_exito(
                  "Los cambios se han guardado correctamente"
                );
              }
            }
          },
          "Advertencia"
        );
      }
    },
    numeracionNotaCreditoGet: async function () {
      let numeracion = {
        cod_tipodoc: this.notacredito.tipo_comprobante,
      };
      let res = await this.NumeracionNotaCreditoGet(numeracion);

      if (res != null) {
        this.notacredito.nro_documento = res.n_numero;
      }
    },
    obtenerComprobante: async function () {
      if (this.cod_recibo != 0) {
        let comprobante = {
          cod_recibo: this.cod_recibo,
        };
        let res = await this.ObtenerComprobante(comprobante);

        if (res != null) {
          this.comprobante.tipcom_dsc = res.tipcom_dsc;
          this.comprobante.nro_documento = res.nro_documento;
          this.comprobante.nro_serie = res.nro_serie;
          this.comprobante.fecha_comprobante = dayjs(
            res.fecha_comprobante
          ).format("YYYY-MM-DD");
          this.comprobante.cod_ventanilla = res.cod_ventanilla;
          this.comprobante.tipodoc_nombre = res.Tipodoc_nombre;
          this.comprobante.fechareg_recibo = dayjs(res.fechareg_recibo).format(
            "YYYY-MM-DD"
          );
          this.comprobante.usuarioreg_recibo = res.usuarioreg_recibo;
          this.comprobante.estado_recibo = res.estado_recibo;

          this.notacredito.cod_persona = res.cod_persona;
          this.notacredito.cod_comprobante = res.cod_comprobante;
          this.notacredito.razonsocial = res.razon_social;
          this.notacredito.ruc = res.ruc;
          this.notacredito.nombres =
            res.nombres == "" ? res.razon_social : res.nombres;
          this.notacredito.nro_doc = res.nro_doc == "" ? res.ruc : res.nro_doc;
          this.notacredito.tipo_persona = res.tipo_persona;
          this.notacredito.tipo_operacion = res.tipo_operacion;
          this.notacredito.direccion = res.direccion;
          this.notacredito.convenio = res.convenio;
          this.notacredito.modo_pago = res.modo_pago;

          let res_detalle = await this.ObtenerComprobanteDetalle(comprobante);

          this.listaDetalleComprobante = res_detalle.map((el) => ({
            ...el,
            importe: parseFloat(el.importe * -1).toFixed(2),
            valorventa: parseFloat(el.valorventa * -1).toFixed(2),
            precio: parseFloat(el.precio * -1).toFixed(2),
          }));
        } else {
          global._mensaje_advertencia("Lo sentimos, comprobante no existe.");
        }
      }
    },
    nuevoRegistro() {
      this.loadRegistro();
      this.cambiarTabRegistro();
    },
    cambiarTabListar() {
      document.getElementById("tabRegistrarNotaCredito").className = "";
      document.getElementById("registrarTab").className = "tab-pane";
      document.getElementById("tabListadoNotaCredito").className = "active";
      document.getElementById("listadoTab").className = "tab-pane active";
    },
    cambiarTabRegistro() {
      document.getElementById("tabRegistrarNotaCredito").className = "active";
      document.getElementById("registrarTab").className = "tab-pane active";
      document.getElementById("tabListadoNotaCredito").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
    loadRegistro: function () {
      this.notacredito = { ...this.notacreditoBase };
      this.comprobante = {};
      this.cod_recibo = "";
      this.listaDetalleComprobante = [];
      this.notacredito.notacreditodetalle = [];
      this.indiceModificando = -1;
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cargarRegistros: async function (pagina = 1) {
      this.buscador.page_index = pagina;
      this.buscador.fecha_inicio = this.fecha_inicio;
      this.buscador.fecha_fin = this.fecha_fin;
      this.buscador.cod_ventanilla = this.cod_ventanilla;

      this.cargando = true;

      var res = await this.ListarRegistros(this.buscador);

      this.listadoRegistro = res.datos.map((el) => ({
        ...el,
        fecha_comprobante2: dayjs(el.fecha_comprobante).format("DD-MM-YYYY"),
      }));

      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;
      this.initialPage = res.paginaActual;
      this.buscador.page_index = res.paginaActual;
      this.totalPaginas = res.totalPaginas;

      this.cargando = false;
    },
  },
  computed: {
    valorventa: function () {
      let sum = 0;
      let valorventa = this.total / 1.18;
      sum = parseFloat(valorventa).toFixed(2);
      this.notacredito.subtotal = sum;
      return sum;
    },
    igv: function () {
      let sum = 0;
      let valorIGV = 0.18;
      let igv = 0;

      igv = this.valorventa * valorIGV;
      sum = parseFloat(igv).toFixed(2);
      return sum;
    },
    total: function () {
      let sum = 0;
      this.listaDetalleComprobante.forEach(
        (item) => (sum += parseFloat(item.importe))
      );
      sum = parseFloat(sum).toFixed(2);
      this.notacredito.total = sum;
      return sum;
    },
  },
  mounted() {
    this.comboTipoDocumentoComprobante();
    this.cargarRegistros();
    this.fecha_registro = this.currentDate;
  },
};
</script>
