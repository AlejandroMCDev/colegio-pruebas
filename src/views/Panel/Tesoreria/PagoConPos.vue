<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Pago con POS</h3>
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
              id="tabListadoTransaccionPos"
              >LISTADO</a
            >
          </li>
          <li>
            <a
              href="#registrarTab"
              data-bs-toggle="tab"
              id="tabRegistrarTransaccionPos"
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
                <select
                  class="form-control form-select"
                  data-bs-placeholder="Ventanilla"
                  v-model="cod_ventalla"
                >
                  <option value="">Ventanilla</option>
                  <option value="01">01-Caja</option>
                  <option value="02">02-Caja</option>
                </select>
              </div>
              <div class="col-md-4 mb-3" style="text-align: center">
                <select
                  class="form-control form-select"
                  data-bs-placeholder="POS"
                  v-model="pos_id"
                >
                  <option value="">POS</option>
                  <option
                    v-for="item in lista_pos"
                    :key="item.cod_varios"
                    :label="item.dsc_varios"
                    :value="item.cod_varios"
                  ></option>
                </select>
              </div>
              <!-- <div class="col-md-4 mb-3" style="text-align: center">
                <select
                  class="form-control form-select"
                  data-bs-placeholder="Desde por"
                >
                  <option value="">Desde por</option>
                  <option value="1">Liquidación</option>
                  <option value="0">Otros</option>
                </select>
              </div> -->
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
                  placeholder="Fecha Fin"
                  v-model="fecha_fin"
                />
              </div>
              <div class="col-md-5 mb-3" style="text-align: left">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="cargarRegistros()"
                >
                  <i class="fe fe-search me-2"></i>Buscar
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  style="margin: 2px"
                  @click="download_excel()"
                >
                  <i class="fe fe-download me-2"></i>Descargar
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="openurlArchivo()"
                >
                  <i class="fe fe-eye me-2"></i>Vista Previa
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
                        <th>Ventanilla</th>
                        <th>POS</th>
                        <th>Fecha Real</th>
                        <th>Fecha Info</th>
                        <th>Abonado De</th>
                        <th>Importe</th>
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
                        <td>{{ item.cod_ventanilla }}</td>
                        <td>{{ item.pos }}</td>
                        <td>{{ item.trapos_fechatra2 }}</td>
                        <td>{{ item.trapos_fechainf2 }}</td>
                        <td>{{ item.nombres }}</td>
                        <td>{{ item.trapos_importe }}</td>
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
                        <td colspan="8" class="text-center">
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
              <div class="mb-5 p-4 br-5">
                <div class="form-label mt-0 p-0">DATOS DEL PAGO</div>
                <br />
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Ventanilla</label>
                      <select
                        class="form-control form-select"
                        data-bs-placeholder="Ventanilla"
                        v-model="transaccion_pos.cod_ventanilla"
                        ref="cod_ventanilla"
                        :style="
                          showAdvertise && transaccion_pos.cod_ventanilla === ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      >
                        <option value="">Ventanilla</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>POS</label>
                      <select
                        class="form-control form-select"
                        data-bs-placeholder="POS"
                        v-model="transaccion_pos.pos_id"
                        ref="pos_id"
                        :style="
                          showAdvertise && transaccion_pos.pos_id === ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      >
                        <option value="">POS</option>
                        <option
                          v-for="item in lista_pos"
                          :key="item.cod_varios"
                          :label="item.dsc_varios"
                          :value="item.cod_varios"
                        ></option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Fecha Depósito</label>
                      <input
                        type="date"
                        class="form-control"
                        placeholder="Fecha Depósito"
                        v-model="transaccion_pos.trapos_fechatra"
                        ref="trapos_fechatra"
                        :style="
                          showAdvertise && transaccion_pos.trapos_fechatra == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Fecha Liquidación</label>
                      <input
                        type="date"
                        class="form-control"
                        placeholder="Fecha Liquidación"
                        v-model="transaccion_pos.trapos_fechainf"
                        ref="trapos_fechainf"
                        :style="
                          showAdvertise && transaccion_pos.trapos_fechainf == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Recibo Caja</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Recibo Caja"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Titular</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Titular"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Importe</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Importe"
                        v-model="transaccion_pos.trapos_importe"
                        min="0"
                        ref="trapos_importe"
                        :style="
                          showAdvertise && transaccion_pos.trapos_importe === ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Exceso</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Exceso"
                        v-model="transaccion_pos.trapos_importeexceso"
                        min="0"
                        ref="trapos_importeexceso"
                        :style="
                          showAdvertise && transaccion_pos.trapos_importe === ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        "
                      />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Total Transacción</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Total Transacción"
                        v-model="totaltransaccion"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Fecha Registro</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Fecha Registro"
                        disabled
                        v-model="transaccion_pos.trapos_fechareg"
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
                        v-model="transaccion_pos.trapos_usuarioreg"
                      />
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
//Library
import * as XLSX from "xlsx";
import dayjs from "dayjs";
export default {
  name: "PagoConPos",
  components: {
    Loading,
    Paginate,
  },
  data() {
    return {
      iprutaFiles: global.ruta_api,
      cargando: false,
      showAdvertise: false,
      lista_pos: [],
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      listadoRegistro: [],
      usuarioRegistro: "",
      fechaRegistro: "",
      fecha_inicio: "",
      fecha_fin: "",
      cod_ventalla: "",
      pos_id: "",
      buscador: {
        page_index: 1,
        page_size: 10,
        fecha_inicio: "",
        fecha_fin: "",
        cod_ventalla: "",
        pos_id: "",
      },
      totalPaginas: 0,
      initialPage: 1,
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [10, 15, 25, 50],
        total: 0,
      },
      transaccion_pos: {},
      transaccion_posBase: {
        cod_ventanilla: "",
        pos_id: "",
        cod_comprobante: 0,
        trapos_importe: 0,
        trapos_importeexceso: 0,
        trapos_fechatra: "",
        trapos_fechainf: "",
        trapos_fechareg: "",
        trapos_usuarioreg: "1",
      },
    };
  },
  methods: {
    ...mapActions({
      Agregar: "_transaccionpos/AgregarTransaccionPos",
      Modificar: "_transaccionpos/ModificarTransaccionPos",
      Eliminar: "_transaccionpos/EliminarTransaccionPos",
      ListarRegistros: "_transaccionpos/ListarRegistros",
      TransaccionPosMaestros: "_transaccionpos/TransaccionPosMaestros",
    }),
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    openurlArchivo() {
      if (this.listadoRegistro.length > 0) {
        let url = `${this.iprutaFiles}transaccion-pos/listar/pdf?fecha_inicio=${this.fecha_inicio}&fecha_fin=${this.fecha_fin}&cod_ventalla${this.cod_ventalla}=&pos_id=${this.pos_id}`;
        window.open(url, "_blank");
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
    },
    download_excel: async function () {
      let export_excel = [];

      let buscar = {
        page_index: 1,
        page_size: 999999,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        cod_ventalla: this.cod_ventalla,
        pos_id: this.pos_id,
      };

      this.cargando = true;
      var res = await this.ListarRegistros(buscar);

      export_excel = res.datos.map((el) => ({
        cod_ventanilla: el.cod_ventanilla,
        pos: el.pos,
        trapos_fechatra2: dayjs(el.trapos_fechatra).format("DD-MM-YYYY"),
        trapos_fechainf2: dayjs(el.trapos_fechainf).format("DD-MM-YYYY"),
        nombres: el.nombres,
        trapos_importe: parseFloat(el.trapos_importe),
      }));

      let data = XLSX.utils.json_to_sheet(export_excel, {
        header: [
          "cod_ventanilla",
          "pos",
          "trapos_fechatra2",
          "trapos_fechainf2",
          "nombres",
          "trapos_importe",
        ],
      });
      data["A1"].v = "VENTANILLA";
      data["B1"].v = "POS";
      data["C1"].v = "FECHA REAL";
      data["D1"].v = "FECHA INFO";
      data["E1"].v = "ABONADO DE";
      data["F1"].v = "IMPORTE";

      const workbook = XLSX.utils.book_new();
      const filename = "pago-pos";
      XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
      XLSX.writeFile(workbook, `${filename}.xlsx`);

      this.cargando = false;
    },
    cargarVer: function (item, index) {
      console.log(item);

      this.transaccion_pos.trapos_id = item.trapos_id;
      this.transaccion_pos.cod_ventanilla = item.cod_ventanilla;
      this.transaccion_pos.pos_id = item.pos_id;
      this.transaccion_pos.cod_comprobante = item.cod_comprobante;
      this.transaccion_pos.trapos_importe = item.trapos_importe;
      this.transaccion_pos.trapos_importeexceso = item.trapos_importeexceso;
      this.transaccion_pos.trapos_fechatra = dayjs(item.trapos_fechatra).format(
        "YYYY-MM-DD"
      );
      this.transaccion_pos.trapos_fechainf = dayjs(item.trapos_fechainf).format(
        "YYYY-MM-DD"
      );
      this.transaccion_pos.trapos_fechareg = dayjs(item.trapos_fechareg).format(
        "YYYY-MM-DD  HH:mm:ss"
      );
      this.transaccion_pos.trapos_usuarioreg = item.trapos_usuarioreg;

      this.indiceModificando = index;
      this.cambiarTabRegistro();
    },
    cambiarTabListar() {
      document.getElementById("tabRegistrarTransaccionPos").className = "";
      document.getElementById("registrarTab").className = "tab-pane";
      document.getElementById("tabListadoTransaccionPos").className = "active";
      document.getElementById("listadoTab").className = "tab-pane active";
    },
    cambiarTabRegistro() {
      document.getElementById("tabRegistrarTransaccionPos").className =
        "active";
      document.getElementById("registrarTab").className = "tab-pane active";
      document.getElementById("tabListadoTransaccionPos").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
    validarRegistro() {
      let valida = false;

      if (this.transaccion_pos.cod_ventanilla == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.cod_ventanilla.focus();
        });
      } else if (this.transaccion_pos.pos_id == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.pos_id.focus();
        });
      } else if (this.transaccion_pos.trapos_importe === "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.trapos_importe.focus();
        });
      } else if (this.transaccion_pos.trapos_importeexceso === "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.trapos_importeexceso.focus();
        });
      } else if (this.transaccion_pos.trapos_fechatra == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.trapos_fechatra.focus();
        });
      } else if (this.transaccion_pos.trapos_fechainf == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.trapos_fechainf.focus();
        });
      }
      return valida;
    },
    guardarCambios: async function () {
      var res = null;
      let valor = this.validarRegistro();

      if (!valor) {
        if (this.indiceModificando == -1) {
          res = await this.Agregar(this.transaccion_pos);
        } else {
          res = await this.Modificar(this.transaccion_pos);
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
    loadRegistro: function () {
      this.transaccion_pos = { ...this.transaccion_posBase };
      this.fechaRegistro = dayjs(this.date).format("YYYY-MM-DD  HH:mm:ss");
      this.transaccion_pos.trapos_fechareg = this.fechaRegistro;
      this.indiceModificando = -1;
    },
    cargarEliminar: async function (item) {
      let transaccion_pos = {
        trapos_id: item.trapos_id,
      };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.Eliminar(transaccion_pos);
          if (res?.exito) {
            this.cargarRegistros();
            global._mensaje_exito("Se ha eliminado");
          }
        },
        "Anular"
      );
    },
    comboTransaccionMaestros: async function () {
      var res = await this.TransaccionPosMaestros();
      const { lista_pos_id } = res;
      this.lista_pos = lista_pos_id;
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cargarRegistros: async function (pagina = 1) {
      this.buscador.page_index = pagina;
      this.buscador.fecha_inicio = this.fecha_inicio;
      this.buscador.fecha_fin = this.fecha_fin;
      this.buscador.cod_ventalla = this.cod_ventalla;
      this.buscador.pos_id = this.pos_id;
      this.cargando = true;
      var res = await this.ListarRegistros(this.buscador);

      this.listadoRegistro = res.datos.map((el) => ({
        ...el,
        trapos_fechatra2: dayjs(el.trapos_fechatra).format("DD-MM-YYYY"),
        trapos_fechainf2: dayjs(el.trapos_fechainf).format("DD-MM-YYYY"),
        dsc_banco: el.dsc_banco + " " + el.nro_cuenta,
      }));
      this.pagination.total = res.totalRegistros;
      this.pagination.perPage = res.registrosPorPagina;
      this.pagination.currentPage = res.paginaActual;
      this.buscador.page_index = res.paginaActual;
      this.initialPage = res.paginaActual;
      this.totalPaginas = res.totalPaginas;
      this.cargando = false;
    },
  },
  computed: {
    totaltransaccion() {
      let total =
        parseFloat(this.transaccion_pos.trapos_importe) +
        parseFloat(this.transaccion_pos.trapos_importeexceso);

      return total;
    },
  },
  mounted() {
    this.loadRegistro();
    this.fecha_inicio = this.currentDate;
    this.fecha_fin = this.currentDate;
    this.comboTransaccionMaestros();
    this.cargarRegistros();
  },
};
</script>
