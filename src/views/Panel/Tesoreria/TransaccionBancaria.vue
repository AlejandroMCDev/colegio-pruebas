<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Transacción Bancaria</h3>
  </div>
  <div class="card-body pb-2">
    <div class="tab-menu-heading tab-menu-heading-boxed" style="border-bottom: 0 !important">
      <div class="tabs-menu-boxed" style="float: right; width: 100%">
        <!-- Tabs -->
        <ul class="nav panel-tabs" style="float: right">
          <li>
            <a href="#listadoTab" class="active" data-bs-toggle="tab" id="tabListadoTransaccionBancaria">LISTADO</a>
          </li>
          <li>
            <a href="#registrarTab" data-bs-toggle="tab" id="tabRegistrarTransaccionBancaria">REGISTRAR</a>
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
                <select class="form-control form-select" data-bs-placeholder="Ventanilla" v-model="cod_ventanilla">
                  <option value="">Ventanilla</option>
                  <option value="01">01-Caja</option>
                  <option value="02">02-Caja</option>
                </select>
              </div>
              <div class="col-md-4 mb-3" style="text-align: center">
                <select class="form-control form-select" data-bs-placeholder="Cuenta" v-model="cta_codigo">
                  <option value="">TODOS</option>
                  <option v-for="item in banco" :key="item.value" :label="item.label" :value="item.value"></option>
                </select>
              </div>
              <div class="col-md-4 mb-3" style="text-align: center">
                <input class="form-control" onfocus="(this.type='date')" onblur="(this.type='text')"
                  v-model="fecha_inicio" placeholder="Fecha Inicio" />
              </div>
              <div class="col-md-4 mb-3" style="text-align: center">
                <input class="form-control" onfocus="(this.type='date')" onblur="(this.type='text')" v-model="fecha_fin"
                  placeholder="Fecha Fin" />
              </div>
              <div class="col-md-5 mb-3" style="text-align: left">
                <button type="button" class="btn btn-primary" @click="cargarRegistros()">
                  <i class="fe fe-search me-2"></i>Buscar
                </button>
                <button type="button" class="btn btn-primary" style="margin: 2px" @click="download_excel()">
                  <i class="fe fe-download me-2"></i>Descargar
                </button>
                <button type="button" class="btn btn-primary" @click="openurlArchivo()">
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
                  <table class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Vent.</th>
                        <th>Cuenta</th>
                        <th>Operación</th>
                        <th>Num.Ope</th>
                        <th>Ingreso</th>
                        <th>Egreso</th>
                        <th>Fecha Real</th>
                        <th>Fecha Info</th>
                        <th>Abonado</th>
                        <th>Opciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in listadoRegistro" :key="'item-' + index"
                        v-if="listadoRegistro.length != 0">
                        <th scope="row">{{ indexMethod(index) }}</th>
                        <td>{{ item.cod_ventanilla }}</td>
                        <td>
                          <p class="overflow-ellipsis" data-bs-placement="top" data-bs-toggle="tooltip"
                            :title="item.dsc_banco">
                            {{ item.dsc_banco }}
                          </p>
                        </td>
                        <td>{{ item.opeban_nombre }}</td>
                        <td>{{ item.tra_numoper }}</td>
                        <td>{{ item.tra_importe }}</td>
                        <td>{{ item.tra_importeexceso }}</td>
                        <td>{{ item.tra_fechatra2 }}</td>
                        <td>{{ item.tra_fechainf2 }}</td>
                        <td>{{ item.beneficiado }}</td>
                        <td class="text-center">
                          <i class="fa fa-pencil mx-1 text-yellow" role="button" @click="cargarVer(item, index)"></i>
                          <i class="fa fa-trash mx-1 text-danger" role="button" @click="cargarEliminar(item)"></i>
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
                <div class="form-label mt-0 p-0">DATOS GENERALES</div>
                <br />
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Ventanilla</label>
                      <select class="form-control form-select" data-bs-placeholder="Ventanilla"
                        v-model="transaccion_bancaria.cod_ventanilla" ref="cod_ventanilla" :style="
                          showAdvertise &&
                            transaccion_bancaria.cod_ventanilla == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        ">
                        <option value="">Ventanilla</option>
                        <option value="01">01-Caja</option>
                        <option value="02">02-Caja</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Operación</label>
                      <select class="form-control form-select" data-bs-placeholder="Operación"
                        v-model="transaccion_bancaria.opeban_codigo" ref="opeban_codigo" :style="
                          showAdvertise &&
                            transaccion_bancaria.opeban_codigo == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        ">
                        <option value="">Operación</option>
                        <option v-for="item in operacion_bancaria" :key="item.opeban_codigo" :label="item.opeban_nombre"
                          :value="item.opeban_codigo"></option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Cuenta</label>
                      <select class="form-control form-select" data-bs-placeholder="Cuenta"
                        v-model="transaccion_bancaria.cta_codigo" ref="cta_codigo" :style="
                          showAdvertise && transaccion_bancaria.cta_codigo == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        ">
                        <option value="">Cuenta</option>
                        <option v-for="item in banco" :key="item.value" :label="item.label" :value="item.value">
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Fecha Depósito</label>
                      <input type="date" class="form-control" placeholder="Fecha Depósito"
                        v-model="transaccion_bancaria.tra_fechatra" ref="tra_fechatra" :style="
                          showAdvertise &&
                            transaccion_bancaria.tra_fechatra == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        " />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Fecha Liquidación</label>
                      <input type="date" class="form-control" placeholder="Fecha Liquidación"
                        v-model="transaccion_bancaria.tra_fechainf" ref="tra_fechainf" :style="
                          showAdvertise &&
                            transaccion_bancaria.tra_fechainf == ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        " />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Codigo Operación</label>
                      <input type="number" class="form-control" placeholder="Codigo Operación"
                        v-model="transaccion_bancaria.tra_numoper" ref="tra_numoper" :style="
                          showAdvertise &&
                            transaccion_bancaria.tra_numoper === ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        " />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Titular</label>
                      <input type="text" class="form-control" placeholder="Titular" disabled />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Importe</label>
                      <input type="number" class="form-control" placeholder="Importe"
                        v-model="transaccion_bancaria.tra_importe" ref="tra_importe" min="0" :style="
                          showAdvertise && transaccion_bancaria.tra_importe == 0
                            ? 'border-color: #e23e3d;'
                            : ''
                        " />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Exceso</label>
                      <input type="number" class="form-control" placeholder="Exceso"
                        v-model="transaccion_bancaria.tra_importeexceso" ref="tra_importeexceso" min="0" :style="
                          showAdvertise &&
                            transaccion_bancaria.tra_importeexceso === ''
                            ? 'border-color: #e23e3d;'
                            : ''
                        " />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Total Transacción</label>
                      <input type="number" class="form-control" placeholder="Total Transacción"
                        v-model="totaltransaccion" disabled />
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Operación Bancaria</label>
                      <input type="number" class="form-control" placeholder="Operación Bancaria" />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Fecha Registro</label>
                      <input type="text" class="form-control" placeholder="Fecha Registro" disabled
                        v-model="transaccion_bancaria.tra_fechareg" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Usuario Registro</label>
                      <input type="text" class="form-control" placeholder="Usuario Registro" disabled
                        v-model="transaccion_bancaria.tra_usuarioreg" />
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
              <button class="btn btn-primary" type="button" @click="guardarCambios">
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
  name: "TransaccionBancaria",
  components: {
    Loading,
    Paginate,
  },
  data() {
    return {
      iprutaFiles: global.ruta_api,
      cargando: false,
      showAdvertise: false,
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      listadoRegistro: [],
      transaccionmaestros: [],
      banco: [],
      bancocuenta: [],
      operacion_bancaria: [],
      usuarioRegistro: "1",
      fechaRegistro: "",
      fecha_inicio: "",
      fecha_fin: "",
      cta_codigo: "",
      cod_ventanilla: "",
      buscador: {
        page_index: 1,
        page_size: 10,
        fecha_inicio: "",
        fecha_fin: "",
        cta_codigo: "",
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
      transaccion_bancaria: {},
      transaccion_bancariaBase: {
        cod_ventanilla: "",
        opeban_codigo: "",
        cta_codigo: "",
        tra_numoper: "",
        tra_importe: 0,
        tra_importeexceso: 0,
        tra_fechatra: "",
        tra_fechainf: "",
        tra_fechareg: "",
        tra_usuarioreg: "1",
        cod_comprobante: 0,
      },
    };
  },
  methods: {
    ...mapActions({
      Agregar: "_transaccionbancaria/AgregarTransaccionBancaria",
      Modificar: "_transaccionbancaria/ModificarTransaccionBancaria",
      Eliminar: "_transaccionbancaria/EliminarTransaccionBancaria",
      ListarRegistros: "_transaccionbancaria/ListarRegistros",
      TransaccionBancariaMaestros:
        "_transaccionbancaria/TransaccionBancariaMaestros",
    }),
    download_excel: async function () {

      let transaccionbancaria = {
        page_index: 1,
        page_size: 999999,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        cta_codigo: this.cta_codigo,
        cod_ventanilla: this.cod_ventanilla,
      };

      this.cargando = true;
      var res = await this.ListarRegistros(transaccionbancaria);
      if (res != null) {
        let export_excel = [];

        export_excel = res.datos.map((el, index) => ({
          index: index + 1,
          cod_ventanilla: el.cod_ventanilla,
          cuenta: el.dsc_banco + " " + el.nro_cuenta,
          opeban_nombre: el.opeban_nombre,
          tra_numoper: el.tra_numoper,
          tra_importe: parseFloat(el.tra_importe),
          tra_importeexceso: el.tra_importeexceso,
          tra_fechatra: el.tra_fechatra,
          tra_fechainf: el.tra_fechainf,
          nombres: el.nombres,
        }));
        let data = XLSX.utils.json_to_sheet(export_excel, {
          header: [
            "index",
            "cod_ventanilla",
            "cuenta",
            "opeban_nombre",
            "tra_numoper",
            "tra_importe",
            "tra_importeexceso",
            "tra_fechatra",
            "tra_fechainf",
            "nombres",
          ],
        });
        data["A1"].v = "#";
        data["B1"].v = "Ventanilla";
        data["C1"].v = "Cuenta";
        data["D1"].v = "Operación";
        data["E1"].v = "Núm.ope.";
        data["F1"].v = "Ingreso";
        data["G1"].v = "Egreso";
        data["H1"].v = "Fecha Real";
        data["I1"].v = "Fecha Inf";
        data["J1"].v = "Abonado de";

        const workbook = XLSX.utils.book_new();
        const filename = "transaccion-bancaria";
        XLSX.utils.book_append_sheet(workbook, data, this.currentDate);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
        
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
      this.cargando = false;
    },
    openurlArchivo() {
      if (this.listadoRegistro.length > 0) {
        let url = `${this.iprutaFiles}transaccion-bancaria/listar/pdf?fecha_inicio=${this.fecha_inicio}&fecha_fin=${this.fecha_fin}&cta_codigo=${this.cta_codigo}&cod_ventanilla=${this.cod_ventanilla}`;
        window.open(url, "_blank");
      } else {
        global._mensaje_advertencia("Debe realizar una busqueda, gracias.");
      }
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },
    cargarVer: function (item, index) {
      this.transaccion_bancaria.tra_codigo = item.tra_codigo;
      this.transaccion_bancaria.cod_ventanilla = item.cod_ventanilla;
      this.transaccion_bancaria.opeban_codigo = item.opeban_codigo;
      this.transaccion_bancaria.cta_codigo = item.cta_codigo;
      this.transaccion_bancaria.tra_numoper = item.tra_numoper;
      this.transaccion_bancaria.tra_importe = item.tra_importe;
      this.transaccion_bancaria.tra_importeexceso = item.tra_importeexceso;
      this.transaccion_bancaria.tra_fechatra = dayjs(item.tra_fechatra).format(
        "YYYY-MM-DD"
      );
      this.transaccion_bancaria.tra_fechainf = dayjs(item.tra_fechainf).format(
        "YYYY-MM-DD"
      );
      this.transaccion_bancaria.tra_fechareg = dayjs(item.tra_fechareg).format(
        "YYYY-MM-DD  HH:mm:ss"
      );
      this.transaccion_bancaria.tra_usuarioreg = item.tra_usuarioreg;
      this.transaccion_bancaria.cod_comprobante = item.cod_comprobante;

      this.indiceModificando = index;
      this.cambiarTabRegistro();
    },
    cargarEliminar: async function (item) {
      let transaccion_bancaria = {
        tra_codigo: item.tra_codigo,
      };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.Eliminar(transaccion_bancaria);
          if (res?.exito) {
            this.cargarRegistros();
            global._mensaje_exito("Se ha eliminado");
          }
        },
        "Anular"
      );
    },
    nuevoRegistro() {
      this.loadRegistro();
      this.cambiarTabRegistro();
    },
    validarRegistro() {
      let valida = false;

      if (this.transaccion_bancaria.cod_ventanilla == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.cod_ventanilla.focus();
        });
      } else if (this.transaccion_bancaria.opeban_codigo == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.opeban_codigo.focus();
        });
      } else if (this.transaccion_bancaria.cta_codigo == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.cta_codigo.focus();
        });
      } else if (this.transaccion_bancaria.tra_numoper === "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.tra_numoper.focus();
        });
      } else if (this.transaccion_bancaria.tra_importe == 0) {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.tra_importe.focus();
        });
      } else if (this.transaccion_bancaria.tra_importeexceso === "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.tra_importeexceso.focus();
        });
      } else if (this.transaccion_bancaria.tra_fechatra == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.tra_fechatra.focus();
        });
      } else if (this.transaccion_bancaria.tra_fechainf == "") {
        this.showAdvertise = true;
        valida = true;
        setTimeout(() => {
          this.$refs.tra_fechainf.focus();
        });
      }
      return valida;
    },
    guardarCambios: async function () {
      var res = null;
      let valor = this.validarRegistro();

      if (!valor) {
        if (this.indiceModificando == -1) {
          res = await this.Agregar(this.transaccion_bancaria);
        } else {
          res = await this.Modificar(this.transaccion_bancaria);
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
      this.transaccion_bancaria = { ...this.transaccion_bancariaBase };
      this.fechaRegistro = dayjs(this.date).format("YYYY-MM-DD  HH:mm:ss");
      this.transaccion_bancaria.tra_fechareg = this.fechaRegistro;
      this.indiceModificando = -1;
    },
    cambiarTabListar() {
      document.getElementById("tabRegistrarTransaccionBancaria").className = "";
      document.getElementById("registrarTab").className = "tab-pane";
      document.getElementById("tabListadoTransaccionBancaria").className =
        "active";
      document.getElementById("listadoTab").className = "tab-pane active";
    },
    cambiarTabRegistro() {
      document.getElementById("tabRegistrarTransaccionBancaria").className =
        "active";
      document.getElementById("registrarTab").className = "tab-pane active";
      document.getElementById("tabListadoTransaccionBancaria").className = "";
      document.getElementById("listadoTab").className = "tab-pane";
    },
    comboTransaccionMaestros: async function () {
      var res = await this.TransaccionBancariaMaestros();
      const { banco, bancocuenta, operacion_bancaria } = res;

      this.operacion_bancaria = operacion_bancaria;
      let bancoxcuenta = [];
      bancocuenta.forEach((item) => {
        banco.forEach((item2) => {
          if (item.cod_banco == item2.cod_banco) {
            let datosnuevos = {
              value: item.cod_cuenta,
              label: item2.dsc_banco + " " + item.nro_cuenta,
            };
            bancoxcuenta.push(datosnuevos);
          }
        });
      });
      this.banco = bancoxcuenta;
    },
    cambiarPagina: function (paginaDestino) {
      this.cargarRegistros(paginaDestino);
    },
    cargarRegistros: async function (pagina = 1) {
      this.buscador.page_index = pagina;
      this.buscador.fecha_inicio = this.fecha_inicio;
      this.buscador.fecha_fin = this.fecha_fin;
      this.buscador.cta_codigo = this.cta_codigo;
      this.buscador.cod_ventanilla = this.cod_ventanilla;

      this.cargando = true;
      var res = await this.ListarRegistros(this.buscador);

      this.listadoRegistro = res.datos.map((el) => ({
        ...el,
        tra_fechatra2: dayjs(el.tra_fechatra).format("DD-MM-YYYY"),
        tra_fechainf2: dayjs(el.tra_fechainf).format("DD-MM-YYYY"),
        dsc_banco: el.dsc_banco + " " + el.nro_cuenta,
        beneficiado: el.nombres == "" ? el.razon_social : el.nombres,
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
        parseFloat(this.transaccion_bancaria.tra_importe) +
        parseFloat(this.transaccion_bancaria.tra_importeexceso);

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
<style lang="css" scoped>
p {
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
}

.overflow-ellipsis {
  text-overflow: ellipsis;
}
</style>
