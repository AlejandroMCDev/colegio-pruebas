<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Comprobante de Pago</h3>
  </div>
  <div class="card-body pb-2">
    <div class="tab-menu-heading tab-menu-heading-boxed" style="border-bottom: 0 !important">
      <div class="tabs-menu-boxed" style="float: right; width: 100%">
        <!-- Tabs -->
        <ul class="nav panel-tabs" style="float: right">
          <li>
            <a href="#listadoTab" class="active" data-bs-toggle="tab" id="tabComprobantePagoListado">LISTADO</a>
          </li>
          <li>
            <a href="#registrarTab" data-bs-toggle="tab" id="tabComprobanteRegistrar">COMPROBANTE DE PAGO</a>
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
              <div class="col-md-3 mb-3" style="text-align: center">
                <input type="text" class="form-control" aria-label="Text input with dropdown button"
                  v-model="com_numero" placeholder="N° Comprobante" />
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <input type="text" class="form-control" aria-label="Text input with dropdown button" v-model="ruc"
                  placeholder="Ruc" />
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <input type="text" class="form-control" aria-label="Text input with dropdown button"
                  v-model="razonsocial" placeholder="Razón Social" />
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <input class="form-control" onfocus="(this.type='date')" onblur="(this.type='text')"
                  placeholder="Fecha Inicio" v-model="fecha_inicio" />
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <input class="form-control" onfocus="(this.type='date')" onblur="(this.type='text')" v-model="fecha_fin"
                  placeholder="Fecha Fin" />
              </div>
              <div class="col-md-6 mb-3" style="text-align: left">
                <button type="button" class="btn btn-primary m-1" style="margin: 2px" @click="cargarRegistros()">
                  <i class="fe fe-search me-2"></i>Buscar
                </button>
                <button type="button" class="btn btn-primary" @click="nuevoRegistro()">
                  <i class="fe fe-file me-2"></i>Nuevo
                </button>
                <button class="btn btn-primary m-1" type="button" @click="openurlArchivo()">
                  <i class="fe fe-printer me-2"></i>Imprimir
                </button>
                <button class="btn btn-primary" type="button" @click="download_excel()">
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
                  <table class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>TIPO</th>
                        <th>Serie</th>
                        <th>Número</th>
                        <th>RUC</th>
                        <th>Razón Social</th>
                        <th>Fecha Emisión</th>
                        <th>Fecha Registro</th>
                        <th>Importe</th>
                        <th>Obs</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in listadoRegistro" :key="'item-' + index"
                        v-if="listadoRegistro.length != 0">
                        <th scope="row">{{ indexMethod(index) }}</th>
                        <td>{{ item.desc_tipodoc }}</td>
                        <td>{{ item.com_serie }}</td>
                        <td>{{ item.com_numero }}</td>
                        <td>{{ item.ruc }}</td>
                        <td>
                          <p style="width: 200px" class="overflow-ellipsis" data-bs-placement="top"
                            data-bs-toggle="tooltip" :title="item.razonsocial">
                            {{ item.razonsocial }}
                          </p>
                        </td>
                        <td>{{ item.com_fechaemi }}</td>
                        <td>{{ item.com_fechareg }}</td>
                        <td>
                          {{ item.com_precioventa }}
                        </td>
                        <td>
                          <p style="width: 75px" class="overflow-ellipsis" data-bs-placement="top"
                            data-bs-toggle="tooltip" :title="item.com_obs">
                            {{ item.com_obs }}
                          </p>
                        </td>
                        <td class="text-center">
                          <i class="fa fa-pencil mx-1 text-yellow" role="button" @click="cargarVer(item, index)"
                            title="Ver"></i>
                          <i class="fe fe-sliders mx-1 text-blue" role="button"
                            @click="cargarDatosProgramarComprobante(item)" data-bs-toggle="modal"
                            data-bs-target="#staticBackdropProgramar" title="Programar"></i>
                          <i class="fa fa-trash mx-1 text-danger" role="button" @click="cargarEliminar(item)"
                            title="Eliminar"></i>
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
                      <div class="dataTables_info" id="responsive-datatable_info" role="status" aria-live="polite">
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
                      <paginate :page-count="totalPaginas" :click-handler="cambiarPagina" v-model="initialPage" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="registrarTab">
          <div class="form-label mt-0 p-0">
            <div class="row">
              <div class="col-md-9">
                <button type="button" class="btn btn-primary" @click="loadRegistro()">
                  <i class="fe fe-file me-2"></i>Nuevo
                </button>
              </div>
            </div>
          </div>
          <br />
          <div class="col-md-12 row">
            <div class="border mb-5 p-4 br-5">
              <div class="text-center">
                <loading :mostrar="cargandoFormulario" />
              </div>
              <div class="form-label mt-0 p-0">DATOS DEL COMPROBANTE</div>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Tipo de Comprobante</label>
                    <SearchMultiselect :value="comprobantepago.tipcom_cod" v-model="comprobantepago.tipcom_cod"
                      @select="seleccionarTipoComprobante()" :options="tipoDocumentos" placeholder="Tipo de Comprobante"
                      :searchable="true" ref="tipcom_cod" :style="
                        (showAdvertise && comprobantepago.tipcom_cod == 0) ||
                          comprobantepago.tipcom_cod == null
                          ? 'border-color: #e23e3d;'
                          : ''
                      " />
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-group">
                    <label>Serie</label>
                    <input type="text" v-model="comprobantepago.com_serie" maxlength="4" class="form-control"
                      placeholder="Serie" ref="com_serie" :style="
                        showAdvertise && comprobantepago.com_serie == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      " />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Número</label>
                    <input type="text" v-model="comprobantepago.com_numero" maxlength="10" @keypress="onlyNumber"
                      class="form-control" placeholder="Número" ref="com_numero" :style="
                        showAdvertise && comprobantepago.com_numero == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      " />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Estado</label>
                    <input type="text" v-model="estado_comprobante" class="form-control" placeholder="Estado"
                      disabled />
                  </div>
                </div>
              </div>
              <div class="form-label mt-0 p-0">
                DATOS DEL PROVEEDOR/BENEFICIARIO
              </div>
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <label>RUC/DNI</label>
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="RUC/DNI" v-model="comprobantepago.ruc"
                        maxlength="11" minlength="8" @keypress="onlyNumber"
                        @keypress.enter="verificarNroDocumentoProveedor" aria-label="Example text with button addon"
                        aria-describedby="button-addon1" ref="ruc" :style="
                          showAdvertise && comprobantepago.ruc == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        " />
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#modalBuscarAuxiliar">
                        <i class="fe fe-search me-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-9">
                  <div class="form-group">
                    <label>Razon Social</label>
                    <input v-model="comprobantepago.razonsocial" type="text" class="form-control"
                      placeholder="Razon Social" disabled ref="razonsocial" :style="
                        showAdvertise && comprobantepago.razonsocial == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      " />
                  </div>
                </div>
              </div>
              <div class="form-label mt-0 p-0">OTROS DATOS</div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Tramitado</label>
                    <SearchMultiselect :value="comprobantepago.com_solicita" v-model="comprobantepago.com_solicita"
                      :options="usuarios" placeholder="Tramitado" :searchable="true" ref="com_solicita" :style="
                        showAdvertise && comprobantepago.com_solicita == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      " />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Autoriza</label>
                    <select class="form-control form-select" data-bs-placeholder="Autoriza"
                      v-model="comprobantepago.com_autoriza" ref="com_autoriza" :style="
                        showAdvertise && comprobantepago.com_autoriza == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      ">
                      <option value="">Autoriza</option>
                      <option value="jflores">BALLENA FLORES JAIME</option>
                      <option value="jgonzalez">GONZALES MORENO JUDITH</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Fecha Emisión</label>
                    <input v-model="comprobantepago.com_fechaemi" type="date" class="form-control"
                      placeholder="Fecha Emisión" ref="com_fechaemi" :style="
                        showAdvertise && comprobantepago.com_fechaemi == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      " />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Fecha Vencimiento</label>
                    <input v-model="comprobantepago.com_fechaven" type="date" class="form-control"
                      placeholder="Fecha Vencimiento" ref="com_fechaven" :style="
                        showAdvertise && comprobantepago.com_fechaven == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      " />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Modo Pago</label>
                    <select class="form-control form-select" data-bs-placeholder="Modo Pago"
                      v-model="comprobantepago.com_modopago" ref="com_modopago" :style="
                        showAdvertise && comprobantepago.com_modopago == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      ">
                      <option value="">Modo Pago</option>
                      <option value="EFE">EFECTIVO</option>
                      <option value="BAN">BANCO</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Moneda</label>
                    <select class="form-control form-select" data-bs-placeholder="Moneda"
                      v-model="comprobantepago.com_moneda" ref="com_moneda" :style="
                        showAdvertise && comprobantepago.com_moneda == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      ">
                      <option value="">Moneda</option>
                      <option value="S">SOLES</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-9">
                  <div class="form-group">
                    <label>Observación</label>
                    <input type="text" @change="mostrarTextoItem()" class="form-control" placeholder="Observación"
                      v-model="comprobantepago.com_obs" ref="com_obs" :style="
                        showAdvertise && comprobantepago.com_obs == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      " />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Libro</label>
                    <input type="number" v-model="comprobantepago.libro_codigo" class="form-control" placeholder="Libro"
                      disabled />
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group">
                    <label>Gravado</label>
                    <select class="form-control form-select" data-bs-placeholder="Gravado"
                      v-model="comprobantepago.com_grabado" ref="com_grabado" :style="
                        showAdvertise && comprobantepago.com_grabado == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      ">
                      <option value="">Gravado</option>
                      <option value="GRA">ADQUISION GRAVADA</option>
                      <option value="GRN">
                        ADQUISION GRAVADA CON OPERACION NO GRAVADA
                      </option>
                      <option value="NGR">ADQUISION NO GRAVADA</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="form-group">
                    <label>Sección</label>
                    <select class="form-control form-select" data-bs-placeholder="Sección"
                      v-model="comprobantepago.com_seccion" ref="com_seccion" :style="
                        showAdvertise && comprobantepago.com_seccion == ''
                          ? 'border-color: #e23e3d;'
                          : ''
                      ">
                      <option value="">Sección</option>
                      <option value="R">A Rendir</option>
                      <option value="C">Compra</option>
                      <option value="G">Gastos</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-group">
                    <label>Registro</label>
                    <input type="text" v-model="com_correlativo" class="form-control" placeholder="Registro" disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="panel-body tabs-menu-body">
              <div class="tab-content">
                <div class="tab-menu-heading">
                  <div class="tabs-menu">
                    <!-- Tabs -->
                    <ul class="nav panel-tabs panel-info" id="tabs">
                      <li>
                        <a href="#detallecomprobanteTab" class="active" data-bs-toggle="tab"
                          id="DetalleComprobante">Detalle Comprobante</a>
                      </li>
                      <!-- <li>
                        <a
                          href="#asientoTab"
                          data-bs-toggle="tab"
                          id="DetalleAsiento"
                          >Asiento</a
                        >
                      </li> -->
                    </ul>
                  </div>
                </div>
                <div class="panel-body tabs-menu-body">
                  <div class="tab-content">
                    <!-- LISTADO TAB -->
                    <div class="tab-pane active" id="detallecomprobanteTab">
                      <div class="border mb-5 p-4 br-5">
                        <div class="form-label mt-0 p-0">
                          DETALLE DEL COMPROBANTE
                        </div>
                        <div class="row">
                          <div class="col-md-3">
                            <div class="form-group">
                              <label>Plan</label>
                              <div class="input-group">
                                <input type="text" class="form-control" placeholder="Plan" v-model="plan_codigo"
                                  readonly aria-label="Example text with button addon"
                                  aria-describedby="button-addon1" />
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                  data-bs-target="#modaBuscarPlanCuenta">
                                  <i class="fe fe-search me-2"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-5">
                            <div class="form-group">
                              <label>Descripción</label>
                              <input type="text" v-model="plan_dsc" class="form-control" placeholder="Descripción"
                                readonly />
                            </div>
                          </div>
                          <div class="col-md-4">
                            <div class="form-group">
                              <label>Item</label>
                              <input type="text" class="form-control" placeholder="Item" v-model="itemDescripcion" />
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="form-group">
                              <label>Importe</label>
                              <input type="number" class="form-control" placeholder="Importe" v-model="importe"
                                min="0" />
                            </div>
                          </div>
                          <div class="col-md-5">
                            <div class="form-group">
                              <label>Destino</label>
                              <select class="form-control form-select" data-bs-placeholder="Destino" v-model="destino">
                                <option value="">Destino</option>
                                <option value="ADM">Administración</option>
                                <option value="COL">Colegio Profesional</option>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-2">
                            <div class="form-group">
                              <label>IGV</label>
                              <input type="number" class="form-control" placeholder="IGV" v-model="com_impuesto"
                                min="0" />
                            </div>
                          </div>
                          <div class="col-md-2 mb-3">
                            <button type="button" class="btn btn-primary" style="margin-top: 29px"
                              @click="agregarPlanCuenta()">
                              <i class="fe fe-plus me-2"></i>Agregar
                            </button>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="table-responsive">
                              <table class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0">
                                <thead>
                                  <tr>
                                    <th>CodPlan</th>
                                    <th>Plan</th>
                                    <th>Item</th>
                                    <th>Destino</th>
                                    <th>Importe</th>
                                    <th>Afecto</th>
                                    <th>#</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="(item, index) in listaDetalle" :key="'item-' + index"
                                    v-if="listaDetalle.length != 0">
                                    <td>{{ item.plan_codigo }}</td>
                                    <td>{{ item.plan_dsc }}</td>
                                    <td>{{ item.comdet_item }}</td>
                                    <td>{{ item.comdet_destino }}</td>
                                    <td>
                                      <input type="number" class="form-control" v-model="item.comdet_precioventa"
                                        min="1" />
                                    </td>
                                    <td>
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" :checked="
                                          item.comdet_afecto == 0
                                            ? false
                                            : true
                                        " v-model="item.comdet_afectockeck" @change="cambiarAfecto(item, index)" />
                                      </div>
                                      <!-- <input
                                        type="checkbox"
                                        checked
                                        v-model="item.comdet_afectockeck"
                                        @change="cambiarAfecto(item, index)"
                                      /> -->
                                    </td>
                                    <td>
                                      <i class="fe fe-trash-2 mx-1 text-red" role="button"
                                        @click="quitarItem(item, index)"></i>
                                    </td>
                                  </tr>
                                  <tr v-else>
                                    <td colspan="5" class="text-center">
                                      Detalle Vacío
                                    </td>
                                  </tr>
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <th scope="row">Redondeo: 0</th>
                                    <td colspan="1" class="table-active">
                                      Valor Venta: {{ valorventa }}
                                    </td>
                                    <td colspan="1" class="table-active">
                                      Percepción: 0.00
                                    </td>
                                    <td colspan="1" class="table-active">
                                      IGV({{ com_impuesto }} %): {{ igv }}
                                    </td>
                                    <td colspan="1" class="table-active">
                                      Total: {{ total }}
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- REGISTRO TAB-->
                    <div class="tab-pane" id="asientoTab"></div>
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
              <button class="btn btn-primary" type="button" @click="guardarCambios()">
                Guardar
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label>Pagada</label>
                <input type="text" class="form-control" v-model="comprobante_pagada" readonly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <modal-buscar-auxiliar id="modalBuscarAuxiliar" @selectAuxiliar="selectAuxiliar" @closeModal="closeModal" />

  <buscar-plan-cuenta id="modaBuscarPlanCuenta" @selectPlanContable="selectPlanContable"
    @closeModalPlanCuenta="closeModalPlanCuenta" />
  <!-- Modal -->
  <div class="modal fade" id="staticBackdropProgramar" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Programando</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            <i class="fa fa-close"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label>Pagar El</label>
                <input type="date" v-model="fecha_pagar" class="form-control" />
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label>A Pagar</label>
                <input type="number" class="form-control" v-model="monto_pagar" readonly />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            Cerrar
          </button>
          <button type="button" class="btn btn-success" @click="programarComprobante()">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import global from "../../../global";

//Components
import modalBuscarAuxiliar from "../../../components/auxiliar/modalBuscarAuxiliar.vue";
import SearchMultiselect from "../../../components/SearchMultiselect/SearchMultiselect.vue";
import BuscarPlanCuenta from "../../../components/plancuenta/BuscarPlanCuenta.vue";
import Loading from "../../../components/varios/Loading.vue";
import Paginate from "../../../components/varios/Paginate.vue";
//Library
import * as XLSX from "xlsx";

import dayjs from "dayjs";
export default {
  name: "ComprobantePago",
  components: {
    SearchMultiselect,
    modalBuscarAuxiliar,
    BuscarPlanCuenta,
    Paginate,
    Loading,
  },
  data() {
    return {
      filtros_comprobante: "",
      searchFiltro: "",
      iprutaFiles: global.ruta_api,
      monto_pagar: 0,
      comprobante_pagada: "",
      usuarios: [],
      com_correlativo: "",
      cargando: false,
      cargandoFormulario: false,
      indiceModificando: -1,
      listaDetalle: [],
      plan_codigo: 0,
      plan_dsc: "",
      modalBuscarAuxiliar: false,
      showAdvertise: false,
      filtros: "",
      date: new Date(),
      currentMonth: dayjs(this.date).format("MM"),
      currentYear: dayjs(this.date).format("YYYY"),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      fecha_pagar: dayjs(this.date).format("YYYY-MM-DD"),
      listadoRegistro: [],
      tipoDocumentos: [],
      usuarioRegistro: "",
      fechaRegistro: "",
      desc_tipodoc: "",
      cod_tipodoc: "",
      estado_comprobante: "PAGADO",
      importe: 0,
      destino: "",
      itemDescripcion: "",
      com_impuesto: 18,
      comprobantepago: {},
      comprobantepagoBase: {
        com_codigo: 0,
        tipcom_cod: 0,
        com_serie: "",
        com_numero: "",
        ruc: "",
        razonsocial: "",
        com_fechaemi: "",
        com_fechaven: "",
        com_modopago: "",
        com_moneda: "",
        com_impuesto: 18,
        com_valorventa: 0,
        com_tipoingreso: 1,
        com_redondeo: 0,
        com_retencion: 0,
        com_percepcion: 0,
        com_precioventa: 0,
        com_tipocambio: 1,
        com_montoafecto: 0,
        com_montoinafecto: 0,
        com_solicita: "",
        com_autoriza: "",
        com_obs: "",
        libro_codigo: 0,
        com_grabado: "",
        com_seccion: "",
        comprobantepago_detalle: [],
      },
      fecha_inicio: "",
      fecha_fin: "",
      ruc: "",
      razonsocial: "",
      com_numero: "",
      buscador: {
        page_index: 1,
        page_size: 10,
        fecha_inicio: "",
        fecha_fin: "",
        com_numero: "",
        ruc: "",
        razonsocial: ""
      },
      totalPaginas: 0,
      initialPage: 1,
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 15, 25, 50],
        total: 0,
      },
      programarcomprobantepago: {},
      programarcomprobantepagoBase: {
        com_codigo: 0,
        usuario: "",
        progdet_fecha: "",
        progdet_importe: 0,
        com_modopago: "",
      },
    };
  },
  methods: {
    ...mapActions({
      TipoDocumentoDesplegable: "_comprobantepago/TipoDocumentoDesplegable",
      AgregarComprobantePago: "_comprobantepago/AgregarComprobantePago",
      ModificarComprobantePago: "_comprobantepago/ModificarComprobantePago",
      ListarComprobantesDePago: "_comprobantepago/ListarComprobantesDePago",
      ListarComprobantesDePagoAll:
        "_comprobantepago/ListarComprobantesDePagoAll",
      AnularComprobantePago: "_comprobantepago/AnularComprobantePago",
      ListarDetalleComprobantesDePago:
        "_comprobantepago/ListarDetalleComprobantesDePago",
      ObtenerComprobantesDePago: "_comprobantepago/ObtenerComprobantesDePago",
      ObtenerEstadoPagadoComprobantesDePago:
        "_comprobantepago/ObtenerEstadoPagadoComprobantesDePago",
      UsuariosDesplegable: "_usuarios/UsuariosDesplegable",
      ProgramarComprobantePago: "_comprobantepago/ProgramarComprobantePago",
      ObtenerAuxiliar: "_auxiliar/ListarRegistros",
      EliminarComprobantePagoDetalle: "_comprobantepago/EliminarComprobantePagoDetalle"
    }),
    seleccionarTipoComprobante() {
      if (
        this.comprobantepago.tipcom_cod == 2 ||
        this.comprobantepago.tipcom_cod == 3 ||
        this.comprobantepago.tipcom_cod == 17 ||
        this.comprobantepago.tipcom_cod == 19
      ) {
        this.com_impuesto = 18;
        this.comprobantepago.com_impuesto = 18;
      } else {
        this.com_impuesto = 0;
        this.comprobantepago.com_impuesto = 0;
      }
    },
    mostrarTextoItem() {
      this.itemDescripcion = this.comprobantepago.com_obs;
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cargarEliminar: async function (item) {
      let comprobantepago = {
        com_codigo: item.com_codigo,
      };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.AnularComprobantePago(comprobantepago);
          if (res?.exito) {
            this.cargarRegistros();
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    cargarVer: async function (item, index) {
      let comprobantepago = {
        com_codigo: item.com_codigo,
      };
      this.cambiarTabRegistro();
      this.cargandoFormulario = true;
      let res = await this.ObtenerComprobantesDePago(comprobantepago);

      if (res != null) {
        this.comprobantepago.com_codigo = res.com_codigo;
        this.comprobantepago.tipcom_cod = res.tipcom_cod;
        this.comprobantepago.com_serie = res.com_serie;
        this.comprobantepago.com_numero = res.com_numero;
        this.comprobantepago.ruc = res.ruc;
        this.comprobantepago.razonsocial = res.razonsocial;
        this.comprobantepago.com_fechaemi = dayjs(res.com_fechaemi).format(
          "YYYY-MM-DD"
        );
        this.comprobantepago.com_fechaven = dayjs(res.com_fechaemi).format(
          "YYYY-MM-DD"
        );
        this.comprobantepago.com_modopago = res.com_modopago;
        this.comprobantepago.com_moneda = res.com_moneda;
        this.comprobantepago.com_obs = res.com_obs;
        this.comprobantepago.com_grabado = res.com_grabado;
        this.comprobantepago.libro_codigo = res.libro_codigo;
        this.comprobantepago.com_seccion = res.com_seccion;
        this.comprobantepago.com_autoriza = res.com_autoriza;
        this.comprobantepago.com_solicita = res.com_solicita;
        this.comprobantepago.com_impuesto = res.com_impuesto;
        this.com_impuesto = res.com_impuesto;

        this.com_correlativo = res.com_correlativo;
        this.estado_comprobante = res.estado_comprobante;

        let res_pagado = await this.ObtenerEstadoPagadoComprobantesDePago(
          comprobantepago
        );

        if (res_pagado) {
          this.comprobante_pagada = res_pagado.mensaje;
        } else {
          this.comprobante_pagada = "";
        }

        this.listaDetalle = await this.ListarDetalleComprobantesDePago(
          comprobantepago
        );
        this.cargandoFormulario = false;
        this.indiceModificando = index;
      }
    },
    nuevoRegistro() {
      this.loadRegistro();
      this.cambiarTabRegistro();
    },
    cambiarTabListar() {
      document.getElementById("tabComprobanteRegistrar").className = "";
      document.getElementById("registrarTab").className = "tab-pane";
      document.getElementById("tabComprobantePagoListado").className = "active";
      document.getElementById("listadoTab").className = "tab-pane active";
    },
    cambiarTabRegistro() {
      document.getElementById("tabComprobanteRegistrar").className = "active";
      document.getElementById("registrarTab").className = "tab-pane active";
      document.getElementById("tabComprobantePagoListado").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    openurlArchivo() {
      if (this.listadoRegistro.length > 0) {
        let url = `${this.iprutaFiles}comprobantedepago/listar/crearPDF?fecha_inicio=${this.fecha_inicio}&fecha_fin=${this.fecha_fin}&com_numero=${this.com_numero}&ruc=${this.ruc}&razonsocial=${this.razonsocial}`;
        window.open(url, "_blank");
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
    },
    download_excel: async function () {
      let comprobantepago = {
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        com_numero: this.com_numero,
        ruc: this.ruc,
        razonsocial: this.razonsocial
      };
      this.cargando = true;
      let res = await this.ListarComprobantesDePagoAll(comprobantepago);
      if (res != null) {
        let export_excel = [];
        export_excel = res.map((el, index) => ({
          index: index + 1,
          desc_tipodoc: el.desc_tipodoc,
          com_serie: el.com_serie,
          com_numero: el.com_numero,
          ruc: el.ruc,
          razonsocial: el.razonsocial,
          com_fechaemi: dayjs(el.com_fechaemi).format("DD/MM/YYYY"),
          com_fechaven: dayjs(el.com_fechaven).format("DD/MM/YYYY"),
          com_fechareg: dayjs(el.com_fechareg).format("DD-MM-YYYY HH:mm"),
          com_precioventa: parseFloat(el.com_precioventa),
          com_obs: el.com_obs,
        }));

        let data = XLSX.utils.json_to_sheet(export_excel, {
          header: [
            "index",
            "desc_tipodoc",
            "com_serie",
            "com_numero",
            "ruc",
            "razonsocial",
            "com_fechaemi",
            "com_fechaven",
            "com_fechareg",
            "com_precioventa",
            "com_obs",
          ],
        });
        data["A1"].v = "ITEM";
        data["B1"].v = "TIPO";
        data["C1"].v = "SERIE";
        data["D1"].v = "NÚMERO";
        data["E1"].v = "RUC";
        data["F1"].v = "RAZÓN SOCIAL";
        data["G1"].v = "FECHA DE EMISIÓN";
        data["H1"].v = "FECHA DE VENCIMIENTO";
        data["I1"].v = "FECHA DE REGISTRO";
        data["J1"].v = "IMPORTE";
        data["K1"].v = "OBSERVACIÓN";

        const workbook = XLSX.utils.book_new();
        const filename = "comprobante-pago";
        XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
      this.cargando = false;
    },
    verificarNroDocumentoProveedor: async function () {
      let auxiliar = {};
      if (this.comprobantepago.ruc.length >= 11) {
        auxiliar = {
          dni: "",
          ruc: this.comprobantepago.ruc,
          nombreApellido: "",
          razonSocial: "",
        };
      } else if (this.comprobantepago.ruc.length >= 8) {
        auxiliar = {
          dni: this.comprobantepago.ruc,
          ruc: "",
          nombreApellido: "",
          razonSocial: "",
        };
      } else {
        this.comprobantepago.ruc = "";
        this.comprobantepago.razonsocial = "";
        global._mensaje_advertencia(
          "El número de documente debe contener de 8 a 11 dígitos, gracias."
        );
        return;
      }
      let res = await this.ObtenerAuxiliar(auxiliar);

      if (res.totalRegistros > 0) {
        /*this.comprobantepago.razonSocial = res.datos[0].nombres;*/
        this.comprobantepago.ruc =
          res.datos[0].idTipoPersona == 5 ? res.datos[0].dni : res.datos[0].ruc;
        this.comprobantepago.razonsocial =
          res.datos[0].idTipoPersona == 5
            ? res.datos[0].apellidoPaterno +
            " " +
            res.datos[0].apellidoMaterno +
            " " +
            res.datos[0].nombres
            : res.datos[0].nombres +
            " " +
            res.datos[0].apellidoPaterno +
            " " +
            res.datos[0].apellidoMaterno;
      } else {
        this.comprobantepago.ruc = "";
        this.comprobantepago.razonsocial = "";
        global._mensaje_advertencia("Datos Ingresados no existen, gracias.");
      }
    },
    cargarRegistros: async function (pagina = 1) {
      this.buscador.page_index = pagina;
      this.buscador.fecha_inicio = this.fecha_inicio;
      this.buscador.fecha_fin = this.fecha_fin;
      this.buscador.com_numero = this.com_numero;
      this.buscador.ruc = this.ruc;
      this.buscador.razonsocial = this.razonsocial;

      this.cargando = true;

      var res = await this.ListarComprobantesDePago(this.buscador);

      this.listadoRegistro = res.datos.map((el) => ({
        ...el,
        com_fechaemi: dayjs(el.com_fechaemi).format("DD-MM-YYYY"),
        com_fechareg: dayjs(el.com_fechareg).format("DD-MM-YYYY HH:mm"),
      }));

      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;
      this.initialPage = res.paginaActual;
      this.buscador.page_index = res.paginaActual;
      this.totalPaginas = res.totalPaginas;

      this.cargando = false;
    },
    cambiarAfecto(item, index) {
      if (item.comdet_afectockeck == true) {
        this.listaDetalle[index].comdet_afecto = 1;
        this.comprobantepago.com_impuesto = this.com_impuesto;
      } else {
        this.listaDetalle[index].comdet_afecto = 0;
        this.comprobantepago.com_impuesto = 0;
      }
    },
    guardarCambios: async function () {
      var res = null;

      let valor = this.validarRegistro();
      if (!valor) {
        if (this.listaDetalle.length > 0) {
          global._swal_pregunta(
            "¿Está seguro que desea procesar el Comprobante?",
            async () => {
              this.comprobantepago.comprobantepago_detalle = this.listaDetalle;
              if (this.indiceModificando == -1) {
                res = await this.AgregarComprobantePago(this.comprobantepago);
              } else {
                res = await this.ModificarComprobantePago(this.comprobantepago);
              }
              if (res?.exito) {
                this.showAdvertise = false;
                this.cambiarTabListar();
                this.cargarRegistros();

                if (this.indiceModificando == -1) {
                  global._mensaje_exito(
                    "Los cambios se han guardado correctamente, código de registro " +
                    this.comprobantepago.com_seccion +
                    " : " +
                    res.datos.id +
                    "-" +
                    this.currentMonth
                  );
                } else {
                  global._mensaje_exito(
                    "Los cambios se han guardado correctamente, código de registro "
                  );
                }

                this.loadRegistro();
              }
            },
            "Advertencia"
          );
        } else {
          global._mensaje_advertencia("El detalle se encuentra vacio");
        }
      }
    },
    cargarDatosProgramarComprobante: async function (item) {
      this.loadProgramarComprobantePago();
      this.programarcomprobantepago.com_codigo = item.com_codigo;
      this.programarcomprobantepago.usuario = item.com_solicita;
      //this.programarcomprobantepago.progdet_fecha = this.fecha_pagar;
      this.programarcomprobantepago.progdet_importe = item.com_precioventa;
      this.programarcomprobantepago.com_modopago = item.com_modopago;
      this.monto_pagar = item.com_precioventa;
    },
    closeModal: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalBuscarAuxiliar")
      );
      modal.hide();
    },
    programarComprobante: async function () {
      var res = null;
      global._swal_pregunta(
        "¿Está seguro que desea programar el comprobante?",
        async () => {
          this.programarcomprobantepago.progdet_fecha = this.fecha_pagar;
          res = await this.ProgramarComprobantePago(
            this.programarcomprobantepago
          );
          if (res?.exito) {
            global._mensaje_exito("Los cambios se han guardado correctamente");
            this.closeModalProgramar();
          }
          this.loadProgramarComprobantePago();
        },
        "Advertencia"
      );
    },
    loadProgramarComprobantePago() {
      this.programarcomprobantepago = {
        ...this.programarcomprobantepagoBase,
      };
    },
    validarRegistro() {
      let valida = false;

      if (this.comprobantepago.tipcom_cod == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.tipcom_cod.$el.focus();
        });
      } else if (this.comprobantepago.com_solicita == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.com_solicita.$el.focus();
        });
      } else if (this.comprobantepago.com_autoriza == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.com_autoriza.$el.focus();
        });
      } else if (this.comprobantepago.com_serie == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.com_serie.focus();
        });
      } else if (this.comprobantepago.com_numero == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.com_numero.focus();
        });
      } else if (this.comprobantepago.ruc == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.ruc.focus();
        });
      } else if (this.comprobantepago.razonsocial == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.razonsocial.focus();
        });
      } else if (this.comprobantepago.com_fechaemi == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.com_fechaemi.focus();
        });
      } else if (this.comprobantepago.com_fechaven == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.com_fechaven.focus();
        });
      } else if (this.comprobantepago.com_modopago == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.com_modopago.focus();
        });
      } else if (this.comprobantepago.com_moneda == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.com_moneda.focus();
        });
      } else if (this.comprobantepago.com_obs == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.com_obs.focus();
        });
      } else if (this.comprobantepago.com_obs == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.razonsocial.focus();
        });
      } else if (this.comprobantepago.com_grabado == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.com_grabado.focus();
        });
      } else if (this.comprobantepago.com_seccion == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.com_seccion.focus();
        });
      }
      return valida;
    },
    quitarItem(item, index) {

      let comprobantepago = {
        comdet_codigo: item.comdet_codigo,
        com_codigo: item.com_codigo,
        comdet_item: item.comdet_item,
        comdet_destino: item.comdet_destino,
        plan_codigo: item.plan_codigo,
        comdet_valorventa: item.comdet_valorventa,
        comdet_precioventa: item.comdet_precioventa,
        comdet_afecto: item.comdet_afecto
      };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el item?",
        async () => {
          if (this.comprobantepago.com_codigo == 0) {
            this.listaDetalle.splice(index, 1);
          } else {
            var res = await this.EliminarComprobantePagoDetalle(comprobantepago);
            if (res?.exito) {
              this.listaDetalle.splice(index, 1);
              global._mensaje_exito("Se ha eliminado correctamente");
            }
          }
        }
      );
    },
    agregarPlanCuenta() {

      this.comprobantepago.com_impuesto = this.com_impuesto;
      let com_impuesto = 1 + parseFloat(this.comprobantepago.com_impuesto / 100);

      let plancuenta = {
        comdet_codigo: 0,
        comdet_item: this.itemDescripcion,
        comdet_destino: this.destino,
        plan_codigo: this.plan_codigo,
        plan_dsc: this.plan_dsc,
        comdet_valorventa: parseFloat(this.importe / com_impuesto).toFixed(2),
        comdet_precioventa: this.importe,
        comdet_afecto: 1,
        comdet_afectockeck: true,
      };
      if (
        this.plan_codigo != "" &&
        this.itemDescripcion != "" &&
        this.destino != "" &&
        this.importe != 0
      ) {
        this.listaDetalle.push(plancuenta);

        this.plan_codigo = null;
        this.plan_dsc = null;
        this.itemDescripcion = null;
        //this.destino = null;
        this.importe = null;
      } else {
        global._mensaje_advertencia("Ingrese los datos correctos!");
      }
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    comboTipoDocumentoComprobante: async function () {
      var res = await this.TipoDocumentoDesplegable();
      this.tipoDocumentos = res.map((item) => {
        return { label: item.desc_tipodoc, value: item.cod_tipodoc };
      });
    },
    comboUsuarios: async function () {
      var res = await this.UsuariosDesplegable();
      this.usuarios = res.map((item) => {
        return {
          label:
            item.nombres_usu + " " + item.apepat_usu + " " + item.apemat_usu,
          value: item.usuario_usu,
        };
      });
    },
    selectAuxiliar(item) {
      this.comprobantepago.ruc = item.tipoPersona == "N" ? item.dni : item.ruc;
      this.comprobantepago.razonsocial =
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
    selectPlanContable(item) {
      this.plan_codigo = item.plan_codigo;
      this.plan_dsc = item.plan_dsc;
    },
    closeModalProgramar: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("staticBackdropProgramar")
      );
      modal.hide();
    },
    closeModalPlanCuenta: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modaBuscarPlanCuenta")
      );
      modal.hide();
    },
    loadRegistro: function () {
      this.comprobantepago = { ...this.comprobantepagoBase };
      this.com_impuesto = 18;
      this.comprobantepago.com_impuesto = this.com_impuesto;

      this.listaDetalle = [];
      this.estado_comprobante = "";
      this.comprobante_pagada = "";
      this.comprobantepago.comprobantepago_detalle = [];
      this.comprobantepago.libro_codigo =
        this.currentYear + "" + this.currentMonth;
      this.comprobantepago.com_solicita = "easmat";
      this.comprobantepago.com_autoriza = "jflores";
      this.comprobantepago.com_fechaemi = this.currentDate;
      this.comprobantepago.com_fechaven = this.currentDate;
      this.comprobantepago.com_modopago = "EFE";
      this.comprobantepago.com_moneda = "S";
      this.comprobantepago.com_grabado = "GRN";
      this.destino = "ADM";
      this.indiceModificando = -1;
    },
  },
  computed: {
    valorventa: function () {
      let sum = 0;
      let valorventa = 0;

      if (
        this.comprobantepago.tipcom_cod == 2 ||
        this.comprobantepago.tipcom_cod == 3 ||
        this.comprobantepago.tipcom_cod == 17 ||
        this.comprobantepago.tipcom_cod == 19
      ) {
        if (this.comprobantepago.com_impuesto == 18 || this.comprobantepago.com_impuesto == 10) {
          let com_impuesto = 1 + parseFloat(this.comprobantepago.com_impuesto / 100);
          valorventa = this.total / com_impuesto;
        } else {
          valorventa = this.total;
        }
      } else {
        valorventa = this.total;
      }

      sum = parseFloat(valorventa).toFixed(2);
      this.comprobantepago.com_valorventa = sum;
      return sum;
    },
    igv: function () {
      let com_impuesto = 0 + parseFloat(this.comprobantepago.com_impuesto / 100);

      let sum = 0;
      let valorIGV = com_impuesto;
      let igv = 0;

      if (
        this.comprobantepago.tipcom_cod == 2 ||
        this.comprobantepago.tipcom_cod == 3 ||
        this.comprobantepago.tipcom_cod == 17 ||
        this.comprobantepago.tipcom_cod == 19
      ) {
        if (this.comprobantepago.com_impuesto == 18 || this.comprobantepago.com_impuesto == 10) {
          igv = this.valorventa * valorIGV;
        } else {
          igv = 0;
        }
      } else {
        igv = 0;
      }

      sum = parseFloat(igv).toFixed(2);
      return sum;
    },
    total: function () {
      let sum = 0;
      this.listaDetalle.forEach(
        (item) => (sum += parseFloat(item.comdet_precioventa))
      );
      sum = parseFloat(sum).toFixed(2);
      this.comprobantepago.com_precioventa = sum;
      if (this.comprobantepago.com_impuesto == 18 || this.comprobantepago.com_impuesto == 10) {
        this.comprobantepago.com_montoafecto = sum;
        this.comprobantepago.com_montoinafecto = 0;
      } else {
        this.comprobantepago.com_montoafecto = 0;
        this.comprobantepago.com_montoinafecto = sum;
      }
      return sum;
    },
  },
  mounted() {
    var ultimoDia = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    let ini_dia = this.currentYear + "-" + this.currentMonth + "-" + "01";
    this.fecha_inicio = ini_dia;
    this.fecha_fin = dayjs(ultimoDia).format("YYYY-MM-DD");

    this.comboUsuarios();
    this.cargarRegistros();
    this.loadRegistro();
    this.comboTipoDocumentoComprobante();
    this.fechaRegistro = this.currentDate;
  },
};
</script>
<style lang="css" scoped>
p {
  white-space: nowrap;
  overflow: hidden;
}

.overflow-ellipsis {
  text-overflow: ellipsis;
}
</style>
