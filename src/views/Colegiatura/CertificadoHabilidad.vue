<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Certificado Habilidad</h3>
  </div>
  <div class="card-body pb-2">
    <div class="tab-menu-heading tab-menu-heading-boxed" style="border-bottom: 0 !important">
      <div class="tabs-menu-boxed" style="float: right; width: 100%">
        <!-- Tabs -->
        <ul class="nav panel-tabs" style="float: right">
          <li>
            <a href="#listadoTab" class="active" data-bs-toggle="tab" id="tabGeneralListado">LISTADO</a>
          </li>
          <li>
            <a href="#generarTab" data-bs-toggle="tab" id="tabGeneralGenerar">GENERAR</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- DATOS GENERALES -->
    <div class="panel-body tabs-menu-body">
      <div class="tab-content">
        <div class="tab-pane" id="generarTab">
          <div class="row">
            <div class="form-label mt-0 p-0">DATOS CERTIFICADO</div>
            <div class="col-md-8 row">
              <div class="border mb-5 p-4 br-5">
                <div class="form-label mt-0 p-0">Comprobante</div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Tipo (ticket,etc)</label>
                      <input type="text" class="form-control" placeholder="Tipo (ticket,etc)" v-model="tipo" disabled />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Número</label>
                      <input type="text" class="form-control" placeholder="Número" disabled v-model="numero" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>CQFP</label>
                      <input type="text" class="form-control" placeholder="CQFP" disabled v-model="cqfp" />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Agremiado</label>
                      <input type="text" class="form-control" placeholder="Agremiado" v-model="agremiado" disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="border mb-5 p-4 br-5">
                <div class="form-label mt-0 p-0">Certificado</div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Nº Folio</label>
                      <input type="text" class="form-control" placeholder="Nº Folio" disabled v-model="numFolio" />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Nº Constancia</label>
                      <input type="text" class="form-control" placeholder="Nº Constancia" v-model="numConstancia"
                        disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="border mb-5 p-4 br-5">
                <div class="form-label mt-0 p-0">Registro Institución</div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Decano</label>
                      <input type="text" class="form-control" placeholder="Decano" disabled v-model="decano" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <div class="row">
                        <div class="col">
                          <label>Cargo</label>
                        </div>
                        <div class="col" style="text-align: right">
                          <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#modalCargo">+ Agregar</a>
                        </div>
                      </div>
                      <SearchMultiselect :value="certificado.idCargo" v-model="certificado.idCargo"
                        :options="cargoDesplegable" placeholder="Cargo" ref="idCargo" :searchable="true"
                        :canClear="false" :style="
                          showAdvertise && certificado.idCargo == null
                            ? 'border-color: #e23e3d;'
                            : ''
                        " />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Sector</label>
                      <SearchMultiselect :value="certificado.idSector" v-model="certificado.idSector"
                        :options="sectorLaboralDesplegable" placeholder="Sector" ref="idSector" :searchable="true"
                        :canClear="false" :style="
                          showAdvertise && certificado.idSector == null
                            ? 'border-color: #e23e3d;'
                            : ''
                        " />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <div class="row">
                        <div class="col">
                          <label>Establecimiento</label>
                        </div>
                        <div class="col" style="text-align: right">
                          <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#modalEstablecimiento">+
                            Agregar</a>
                        </div>
                      </div>
                      <!-- :style="
                          showAdvertise && certificado.idEstablecimiento == null
                            ? 'border-color: #e23e3d;'
                            : ''
                        " -->
                      <SearchMultiselect :value="certificado.idEstablecimiento" v-model="certificado.idEstablecimiento"
                        ref="idEstablecimiento" :options="establecimientoDesplegable" placeholder="Establecimiento"
                        :searchable="true" @select="cargarEstablecimientoDetalle" :canClear="true" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <div class="row">
                        <div class="col">
                          <label>Dirección</label>
                        </div>
                        <div class="col" style="text-align: right">
                          <a href="javascript:void(0)" :data-bs-toggle="dataBsToggle" @click="agregarDirecciones()"
                            :data-bs-target="dataBsTarget">+ Agregar</a>
                        </div>
                      </div>
                      <!-- :style="
                          showAdvertise &&
                          certificado.idEstablecimiento_detalle == null
                            ? 'border-color: #e23e3d;'
                            : ''
                        " -->
                      <SearchMultiselect :value="certificado.idEstablecimiento_detalle"
                        v-model="certificado.idEstablecimiento_detalle" ref="idEstablecimiento_detalle"
                        :options="establecimientoDetalleDesplegable" placeholder="Dirección" :searchable="true"
                        :canClear="true" :disabled="disabledidEstablecimiento_detalle" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Tramite</label>
                      <input type="text" class="form-control" placeholder="Tramite"
                        v-model="certificado.tramiteAdministrativo" ref="tramiteAdministrativo" :style="
                          showAdvertise &&
                            certificado.tramiteAdministrativo == null
                            ? 'border-color: #e23e3d;'
                            : ''
                        " />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Vigencia Desde</label>
                      <input type="date" class="form-control" placeholder="Vigencia Desde"
                        v-model="certificado.vigenciaDesde" ref="vigenciaDesde" disabled :style="
                          showAdvertise && certificado.vigenciaDesde == null
                            ? 'border-color: #e23e3d;'
                            : ''
                        " />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Vigencia Hasta</label>
                      <input type="date" class="form-control" placeholder="Vigencia Hasta"
                        v-model="certificado.vigenciaHasta" ref="vigenciaHasta" disabled :style="
                          showAdvertise && certificado.vigenciaHasta == null
                            ? 'border-color: #e23e3d;'
                            : ''
                        " />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Fecha Registro</label>
                      <input type="text" class="form-control" placeholder="Fecha Registro" v-model="fechaRegistro"
                        disabled />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Observacíon</label>
                      <input type="text" class="form-control" placeholder="Observacíon"
                        v-model="certificado.observacion" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 text-center">
              <button class="btn btn-primary m-2" type="submit" @click="cargarCancelar()">
                Cancelar
              </button>
              <button class="btn btn-primary" type="submit" @click="guardarCertificadoHabilidad">
                Generar
              </button>
            </div>
          </div>
        </div>
        <div class="tab-pane active" id="listadoTab">
          <div class="mb-5 p-4 br-5">
            <div class="form-label mt-0 p-0">FILTROS</div>
            <div class="row">
              <div class="col-md-3 mb-3" style="text-align: center">
                <select class="form-control form-select" data-bs-placeholder="Todos" v-model="filtros.emitidos">
                  <option value="">Todos</option>
                  <option value="1">Emitidos</option>
                  <option value="0">No Emitidos</option>
                </select>
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <input type="text" class="form-control" placeholder="Nº Certificado" v-model="filtros.numCertificado" />
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <input type="text" class="form-control" placeholder="CQFP" v-model="filtros.cqfp" />
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <input type="text" class="form-control" placeholder="DNI" v-model="filtros.dni" maxlength="8"/>
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <input type="text" class="form-control" placeholder="APELLIDOS Y NOMBRES"
                  v-model="filtros.nombreApellido" />
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <input type="text" class="form-control" onfocus="(this.type='date')" onblur="(this.type='text')"
                  placeholder="Fecha Inicio" v-model="filtros.fechaInicio" />
              </div>
              <div class="col-md-3 mb-3" style="text-align: center">
                <input type="text" class="form-control" onfocus="(this.type='date')" onblur="(this.type='text')"
                  placeholder="Fecha Fin" v-model="filtros.fechaFin" />
              </div>
              <div class="col-md-3 mb-3" style="text-align: left">
                <button type="button" class="btn btn-primary m-1" @click="listarCertificadoHabilidad()">
                  <i class="fe fe-search me-2"></i>Buscar
                </button>
                <button class="btn btn-primary" type="button" @click="download_excel()">
                  <i class="fe fe-share me-2"></i>Excel
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
                  <table class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Folio</th>
                        <th>CQFP</th>
                        <th>Colegiado</th>
                        <th>Desde</th>
                        <th>Caduca</th>
                        <th>Comprobante</th>
                        <th>Importe</th>
                        <th>Generado Por</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in listadoCertificadoHabilidad" :key="'item-' + index"
                        v-if="listadoCertificadoHabilidad.length != 0">
                        <th scope="row">{{ indexMethod(index) }}</th>
                        <td>{{ item.certificado_fechaRegistro }}</td>
                        <td>{{ item.certificado_nroFolio }}</td>
                        <td>{{ item.persona_cqfll }}</td>
                        <td>{{ item.persona_apellidoNombre }}</td>
                        <td>{{ item.vigenciaDesde }}</td>
                        <td>{{ item.vigenciaHasta }}</td>
                        <td>{{ item.comprobante_nro }}</td>
                        <td>
                          {{ parseFloat(item.comprobante_importe).toFixed(2) }}
                        </td>
                        <td>{{ item.usuarioRegistro }}</td>
                        <td class="text-center">
                          <i class="fa fa-eye mx-1 text-primary" role="button"
                            @click="generarUrlCertificado(item.certificado_id)" v-show="item.emitido == 1"></i>
                          <i class="fa fa-pencil mx-1 text-yellow" role="button" @click="
                            obtenerCertificadoHabilidad(item.certificado_id)
                          "></i>
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
  <modal-add-establecimiento id="modalEstablecimiento" @addEstablecimiento="addEstablecimiento" />
  <modal-add-cargo id="modalCargo" @addCargo="addCargo" />
  <modal-add-direccion id="modalDireccion" @addDireccion="addDireccion" :idEstablecimiento="idEstablecimiento" />
</template>

<script>
import { mapActions } from "vuex";
import global from "../../global";
import SearchMultiselect from "../../components/SearchMultiselect/SearchMultiselect.vue";
import modalAddEstablecimiento from "../../components/establecimiento/modalAddEstablecimiento.vue";
import modalAddDireccion from "../../components/establecimiento/modalAddDireccion.vue";
import modalAddCargo from "../../components/cargo/modalAddCargo.vue";
import Loading from "../../components/varios/Loading.vue";
import Paginate from "../../components/varios/Paginate.vue";
//Library
import * as XLSX from "xlsx";
import dayjs from "dayjs";
export default {
  name: "CertificadoHabilidad",
  components: {
    SearchMultiselect,
    modalAddEstablecimiento,
    modalAddDireccion,
    modalAddCargo,
    Loading,
    Paginate,
  },
  data() {
    return {
      cargando: false,
      dataBsToggle: "",
      dataBsTarget: "",
      idEstablecimiento: 0,
      modalCargo: false,
      modalEstablecimiento: false,
      modalDireccion: false,
      disabledidEstablecimiento_detalle: true,
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      showAdvertise: false,
      iprutaFiles: global.ruta_api,
      tipo: "",
      numero: "",
      cqfp: "",
      numFolio: "",
      agremiado: "",
      numConstancia: "",
      decano: "",
      fechaRegistro: "",
      totalPaginas: 0,
      initialPage: 1,
      indiceModificando: 0,
      cargoDesplegable: [],
      sectorLaboralDesplegable: [],
      filtros: {
        emitidos: "",
        numCertificado: "",
        cqfp: "",
        fechaInicio: "",
        fechaFin: "",
        dni: "",
        nombreApellido: "",
      },
      buscador: {
        page_index: 1,
        emitido: "",
        nroCertificado: "",
        fechaInicio: "",
        fechaFin: "",
        cqfll: "",
        dni: "",
        nombreApellido: "",
      },
      certificado: {},
      certificadoBase: {
        idCertificado: 0,
        idDecano: 0,
        idCargo: 0,
        idSector: 0,
        idEstablecimiento: null,
        establecimiento: "",
        idEstablecimiento_detalle: null,
        direccion: "",
        tramiteAdministrativo: "",
        vigenciaDesde: "",
        vigenciaHasta: "",
        observacion: "",
        idUsuario: 1,
      },
      listadoCertificadoHabilidad: [],
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 15, 25, 50],
        total: 0,
      },
      establecimientoDesplegable: [],
      establecimientoDetalleDesplegable: [],
    };
  },
  methods: {
    ...mapActions({
      ListarCertificadoHabilidad:
        "_certificadoHabilidad/ListarCertificadoHabilidad",
      AgregarCertificadoHabilidad:
        "_certificadoHabilidad/AgregarCertificadoHabilidad",
      ModificarCertificadoHabilidad:
        "_certificadoHabilidad/ModificarCertificadoHabilidad",
      ObtenerCertificadoHabilidad:
        "_certificadoHabilidad/ObtenerCertificadoHabilidad",
      GenerarUrlCertificado: "_certificadoHabilidad/GenerarUrlCertificado",
      CargoDesplegable: "_cargo/CargoDesplegable",
      SectorLaboralDesplegable: "_colegiado/SectorLaboralDesplegable",
      EstablecimientoDesplegable: "_establecimiento/EstablecimientoDesplegable",
      EstablecimientoDetalleDesplegable:
        "_establecimiento/EstablecimientoDetalleDesplegable",
    }),
    download_excel: async function () {
      let certificado = {
        page_index: 1,
        page_size: 999999,
        emitido: this.filtros.emitidos,
        nroCertificado: this.filtros.numCertificado,
        fechaInicio: this.filtros.fechaInicio,
        fechaFin: this.filtros.fechaFin,
        cqfll: this.filtros.cqfp,
        dni: this.filtros.dni,
        nombreApellido: this.filtros.nombreApellido
      };

      this.cargando = true;
      let res = await this.ListarCertificadoHabilidad(certificado);
      if (res != null) {
        let export_excel = [];
        export_excel = res.datos.map((el, index) => ({
          index: index + 1,
          certificado_fechaRegistro: dayjs(el.certificado_fechaRegistro).format(
            "DD/MM/YYYY"
          ),
          certificado_nroFolio: el.certificado_nroFolio,
          persona_cqfll: el.persona_cqfll,
          persona_apellidoNombre: el.persona_apellidoNombre,
          vigenciaDesde: dayjs(el.vigenciaDesde).format("DD/MM/YYYY"),
          vigenciaHasta: dayjs(el.vigenciaHasta).format("DD/MM/YYYY"),
          comprobante_nro: el.comprobante_nro,
          comprobante_importe: parseFloat(el.comprobante_importe),
        }));

        let data = XLSX.utils.json_to_sheet(export_excel, {
          header: [
            "index",
            "certificado_fechaRegistro",
            "certificado_nroFolio",
            "persona_cqfll",
            "persona_apellidoNombre",
            "vigenciaDesde",
            "vigenciaHasta",
            "comprobante_nro",
            "comprobante_importe",
          ],
        });
        data["A1"].v = "#";
        data["B1"].v = "FECHA";
        data["C1"].v = "FOLIO";
        data["D1"].v = "CQF";
        data["E1"].v = "COLEGIADO";
        data["F1"].v = "DESDE";
        data["G1"].v = "CADUCA";
        data["H1"].v = "COMPROBANTE";
        data["I1"].v = "IMPORTE";

        const workbook = XLSX.utils.book_new();
        const filename = "certificado-habilidad";
        XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
      this.cargando = false;
    },
    agregarDirecciones() {
      if (this.certificado.idEstablecimiento != null) {
        this.idEstablecimiento = this.certificado.idEstablecimiento;
      } else {
        this.idEstablecimiento = 0;
        global._mensaje_advertencia(
          "Seleccione un establecimiento de la lista, gracias."
        );
      }
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    cargarCancelar() {
      this.showAdvertise = false;
      this.tipo = "";
      this.numero = "";
      this.cqfp = "";
      this.numFolio = "";
      this.agremiado = "";
      this.numConstancia = "";
      this.decano = "";
      this.fechaRegistro = "";
      this.loadCertificadoHabilidad();
      this.cambiarTabListar();
    },
    cambiarTabListar() {
      document.getElementById("tabGeneralGenerar").className = "";
      document.getElementById("generarTab").className = "tab-pane";
      document.getElementById("tabGeneralListado").className = "active";
      document.getElementById("listadoTab").className = "tab-pane active";
    },
    addEstablecimiento: async function (idEstablecimiento) {
      this.comboEstablecimiento();
      this.certificado.idEstablecimiento = idEstablecimiento;
      this.cargarEstablecimientoDetalle(idEstablecimiento);
      this.cerrarModalEstablecimiento();
    },
    addCargo: async function (idCargo) {
      this.comboCargo();
      this.certificado.idCargo = idCargo;
      this.cerrarModalCargo();
    },
    addDireccion: async function (idEstablecimiento_detalle) {
      this.cargarEstablecimientoDetalle(this.certificado.idEstablecimiento);
      this.certificado.idEstablecimiento_detalle = idEstablecimiento_detalle;
      this.cerrarModalDireccion();
    },
    cerrarModalEstablecimiento: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalEstablecimiento")
      );
      modal.hide();
    },
    cerrarModalCargo: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalCargo")
      );
      modal.hide();
    },
    cerrarModalDireccion: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalDireccion")
      );
      modal.hide();
    },
    comboEstablecimiento: async function () {
      var res = await this.EstablecimientoDesplegable();
      this.establecimientoDesplegable = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
    },
    comboEstablecimientoDetalle: async function (idEstablecimiento) {
      let buscador = {
        idEstablecimiento: idEstablecimiento,
      };
      var res = await this.EstablecimientoDetalleDesplegable(buscador);
      this.establecimientoDetalleDesplegable = res.map((item) => {
        return { label: item.direccion, value: item.id };
      });
    },
    cargarEstablecimientoDetalle() {
      this.certificado.idEstablecimiento_detalle = null;
      this.disabledidEstablecimiento_detalle = false;
      this.comboEstablecimientoDetalle(this.certificado.idEstablecimiento);

      this.dataBsToggle = "modal";
      this.dataBsTarget = "#modalDireccion";
    },

    validarCertificadoHabilidad() {
      let valida = false;

      if (this.certificado.idCargo == null) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.idCargo.$el.focus();
        });
      } else if (this.certificado.idSector == null) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.idSector.$el.focus();
        });
      }
      //  else if (this.certificado.idEstablecimiento == null) {
      //   this.showAdvertise = true;
      //   valida = true;
      //   setTimeout(() => {
      //     this.$refs.idEstablecimiento.$el.focus();
      //   });
      // } else if (this.certificado.idEstablecimiento_detalle == null) {
      //   this.showAdvertise = true;
      //   valida = true;
      //   setTimeout(() => {
      //     this.$refs.idEstablecimiento_detalle.$el.focus();
      //   });
      // }
      else if (this.certificado.tramiteAdministrativo == null) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.tramiteAdministrativo.focus();
        });
      } else if (this.certificado.vigenciaDesde == null) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.vigenciaDesde.focus();
        });
      } else if (this.certificado.vigenciaHasta == null) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.vigenciaHasta.focus();
        });
      }

      return valida;
    },
    guardarCertificadoHabilidad: async function () {
      var res = null;
      let valor = this.validarCertificadoHabilidad();

      if (this.certificado.idCertificado != 0) {
        if (!valor) {
          if (this.indiceModificando == 0) {
            res = await this.AgregarCertificadoHabilidad(this.certificado);
          } else {
            res = await this.ModificarCertificadoHabilidad(this.certificado);
          }
        }
      } else {
        global._mensaje_advertencia(
          "Seleccione un registro de la lista, gracias."
        );
      }

      if (res?.exito) {
        this.generarUrlCertificado(res.datos.id);
        this.loadCertificadoHabilidad();
        this.listarCertificadoHabilidad();

        this.cambiarTabListar();

        this.tipo = "";
        this.numero = "";
        this.cqfp = "";
        this.numFolio = "";
        this.agremiado = "";
        this.numConstancia = "";
        this.decano = "";
        this.fechaRegistro = "";

        this.indiceModificando = res.emitido;

        global._mensaje_exito("Los cambios se han guardado correctamente");
      }
    },
    generarUrlCertificado: async function (idCertificado) {
      let certificado = {
        idCertificado: idCertificado,
      };
      var res = null;
      res = await this.GenerarUrlCertificado(certificado);
      if (res?.exito) {
        this.openurlArchivo(res.datos.url);
      }
    },

    openurlArchivo(url) {
      window.open(this.iprutaFiles + "" + url, "_blank");
    },
    obtenerCertificadoHabilidad: async function (idCertificado) {
      let certificado = {
        id: idCertificado,
      };
      let res = await this.ObtenerCertificadoHabilidad(certificado);
      this.certificado.idCertificado = res.certificado_id;
      this.certificado.idDecano = res.decano_id;
      this.certificado.idCargo = res.cargo_id;
      this.certificado.idSector = res.sector_id;
      // this.certificado.establecimiento = res.establecimiento;
      // this.certificado.direccion = res.direccion;
      this.certificado.idEstablecimiento = res.idEstablecimiento;
      if (res.idEstablecimiento != null) {
        this.cargarEstablecimientoDetalle(res.idEstablecimiento);
      }

      this.certificado.idEstablecimiento_detalle =
        res.idEstablecimiento_detalle;

      this.certificado.tramiteAdministrativo = res.tramiteAdministrativo;
      this.certificado.vigenciaDesde = res.vigenciaDesde;
      this.certificado.vigenciaHasta = res.vigenciaHasta;
      this.certificado.observacion = res.observacion;

      this.tipo = res.comprobante_tipo;
      this.numero = res.comprobante_nro;
      this.cqfp = res.persona_cqfll;
      this.numFolio = res.certificado_nroFolio;
      this.agremiado = res.persona_apellidoNombre;
      this.numConstancia = res.certificado_nroConstancia;
      this.decano = res.decano_nombre;
      this.fechaRegistro = res.certificado_fechaRegistro;

      this.indiceModificando = res.emitido;

      this.cambiarTab();
    },
    loadCertificadoHabilidad: function () {
      this.certificado = { ...this.certificadoBase };
    },
    listarCertificadoHabilidad: async function (pagina = 1) {
      this.buscador.page_index = pagina;
      this.buscador.emitido = this.filtros.emitidos;
      this.buscador.nroCertificado = this.filtros.numCertificado;
      this.buscador.fechaInicio = this.filtros.fechaInicio;
      this.buscador.fechaFin = this.filtros.fechaFin;
      this.buscador.cqfll = this.filtros.cqfp;
      this.buscador.dni = this.filtros.dni;
      this.buscador.nombreApellido = this.filtros.nombreApellido;

      this.cargando = true;
      var res = await this.ListarCertificadoHabilidad(this.buscador);
      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;
      this.listadoCertificadoHabilidad = res.datos.map((el) => ({
        ...el,
        vigenciaDesde:
          el.vigenciaDesde != "0000-00-00"
            ? dayjs(el.vigenciaDesde).format("DD-MM-YYYY")
            : el.vigenciaDesde,
        vigenciaHasta:
          el.vigenciaHasta != "0000-00-00"
            ? dayjs(el.vigenciaHasta).format("DD-MM-YYYY")
            : el.vigenciaHasta,
        certificado_fechaRegistro: dayjs(el.certificado_fechaRegistro).format(
          "DD-MM-YYYY"
        ),
      }));

      this.initialPage = res.paginaActual;
      this.buscador.page_index = res.paginaActual;
      this.totalPaginas = res.totalPaginas;
      this.cargando = false;
    },
    cambiarPagina: function (paginaDestino) {
      this.listarCertificadoHabilidad(paginaDestino);
    },
    comboCargo: async function () {
      var res = await this.CargoDesplegable();
      this.cargoDesplegable = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
      ///this.cargoDesplegable = res;
    },
    comboSectorLaboral: async function () {
      var res = await this.SectorLaboralDesplegable();
      this.sectorLaboralDesplegable = res.map((item) => {
        return { label: item.nombre, value: item.id };
      });
      ////this.sectorLaboralDesplegable = res;
    },
    cambiarTab() {
      document.getElementById("tabGeneralGenerar").className = "active";
      document.getElementById("generarTab").className = "tab-pane active";
      document.getElementById("tabGeneralListado").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
  },
  mounted() {
    this.fechaRegistro = this.currentDate;
    this.loadCertificadoHabilidad();
    this.listarCertificadoHabilidad();
    this.comboCargo();
    this.comboSectorLaboral();
    this.comboEstablecimiento();
  },
};
</script>
