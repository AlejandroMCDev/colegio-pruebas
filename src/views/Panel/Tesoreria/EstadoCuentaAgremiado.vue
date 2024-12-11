<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Estado de Cuenta Agremiado</h3>
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
              >ESTADO DE CUENTA</a
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
            <!-- <button type="button" class="btn btn-primary"><i
                                class="fe fe-file me-2"></i>Nuevo</button> -->
            <div class="row">
              <div class="col-md-9">
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="openurlArchivo()"
                >
                  <i class="fe fe-printer me-2"></i>Imprimir
                </button>
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="text-center">
              <loading :mostrar="cargandoVerificarCQF" />
            </div>
            <div class="col-md-4 mb-3">
              <label>CQFLL</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="CQFP"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                  v-model="cqfp"
                  @keypress.enter="verificarCQF"
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
            <div class="col-md-4 mb-3">
              <label>Agremiado</label>
              <input
                type="text"
                class="form-control"
                placeholder="Agremiado"
                v-model="agremiado"
                disabled
              />
            </div>
            <div class="col-md-4 mb-3">
              <label>Última Cuota</label>
              <input
                type="text"
                class="form-control"
                placeholder="Última Cuota"
                v-model="ultimacuota"
                disabled
              />
            </div>
            <div class="col-md-4 mb-3">
              <label>Último FOMAF</label>
              <input
                type="text"
                class="form-control"
                placeholder="Última FOMAF"
                v-model="ultimafomaf"
                disabled
              />
            </div>
            <div class="col-md-4 mb-3">
              <label>Estado</label>
              <input
                type="text"
                class="form-control"
                placeholder="Estado"
                v-model="estadoagremiado"
                disabled
              />
            </div>
            <div class="col-md-4 mb-3" style="text-align: left">
              <button
                type="button"
                class="btn btn-primary"
                style="margin-top: 29px"
                @click="cargarRegistros()"
              >
                <i class="fe fe-search me-2"></i>Buscar
              </button>
            </div>
          </div>
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
                      <th>Cod</th>
                      <th>Cant</th>
                      <th>Concepto</th>
                      <th>Descripción</th>
                      <th>Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in listadoRegistro"
                      :key="'item-' + index"
                      v-if="listadoRegistro.length != 0"
                    >
                      <td>{{ item.cod_concepto }}</td>
                      <td>{{ item.cantidad }}</td>
                      <td>{{ item.concepto }}</td>
                      <td>{{ item.descripcion }}</td>
                      <td>{{ parseFloat(item.monto).toFixed(2) }}</td>
                    </tr>
                    <tr v-else>
                      <td colspan="6" class="text-center">
                        Ningun registro encontrado
                      </td>
                    </tr>
                    <tr>
                      <td colspan="4" class="fw-bold text-uppercase text-end">
                        Total:
                      </td>
                      <td>{{ totalCuenta }}</td>
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
  <modal-add-colegiado
    id="modalAddColegiado"
    @selectColegiado="selectColegiado"
    @closeModalColegiado="closeModalColegiado"
  />
</template>

<script>
import global from "../../../global";
import Loading from "../../../components/varios/Loading.vue";
import modalAddColegiado from "../../../components/colegiado/modalAddColegiado.vue";
//Library
import { mapActions } from "vuex";
import dayjs from "dayjs";
export default {
  name: "EstadoCuentaAgremiado",
  components: {
    Loading,
    modalAddColegiado,
  },
  data() {
    return {
      iprutaFiles: global.ruta_api,
      cargando: false,
      cargandoVerificarCQF: false,
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      listadoRegistro: [],
      cod_colegiado: 0,
      estadoagremiado: "",
      ultimafomaf: "",
      ultimacuota: "",
      agremiado: "",
      cqfp: "",
    };
  },
  methods: {
    ...mapActions({
      ObtenerColegiado: "_colegiado/ObtenerColegiado",
      MovimientoDetalleDeudaColegiado:
        "_movimiento/MovimientoDetalleDeudaColegiado",
    }),
    closeModalColegiado: function () {
      var modal = bootstrap.Modal.getInstance(
        document.getElementById("modalAddColegiado")
      );
      modal.hide();
    },
    selectColegiado(item) {
      this.cod_colegiado = item.id;
      this.cqfp = item.cqfll;
      this.agremiado =
        item.nombres + " " + item.apellidoPaterno + " " + item.apellidoMaterno;
      this.estadoagremiado = item.estadoColegiado;
      this.ultimacuota = item.ultimo_mes_pagada;
      this.ultimafomaf = item.ultimo_mes_pagada_fomaf;

      this.closeModalColegiado();
    },
    openurlArchivo() {
      if (this.cod_colegiado != 0) {
        let url = `${this.iprutaFiles}movimientodetalle/colegiado/estadocuenta/generarPDF?idPersona=${this.cod_colegiado}`;
        window.open(url, "_blank");
      } else {
        global._mensaje_advertencia("Debe seleccionar un Colegiado, gracias.");
      }
    },
    cargarRegistros: async function () {
      if (this.cod_colegiado != 0) {
        this.cargando = true;
        let deuda_colegiado = {
          cod_colegiado: this.cod_colegiado,
        };

        let res = await this.MovimientoDetalleDeudaColegiado(deuda_colegiado);

        if (res != null) {
          this.listadoRegistro = res.map((el) => ({
            ...el,
            com_fechaemi: dayjs(el.com_fechaemi).format("DD-MM-YYYY"),
          }));
        }
        this.cargando = false;
      } else {
        global._mensaje_advertencia("Debe seleccionar un Colegiado, gracias.");
      }
    },
    verificarCQF: async function () {
      if (this.cqfp.length > 0) {
        let persona = {
          id: 0,
          dni: null,
          cqf: this.cqfp,
        };
        this.cargandoVerificarCQF = true;
        let res = await this.ObtenerColegiado(persona);

        if (res != null) {
          this.cod_colegiado = res.id;
          this.agremiado =
            res.nombres + " " + res.apellidoPaterno + " " + res.apellidoMaterno;
          this.estadoagremiado = res.estadoColegiado;
          this.ultimacuota = res.ultimo_mes_pagada;
          this.ultimafomaf = res.ultimo_mes_pagada_fomaf;
        } else {
          this.cod_colegiado = 0;
          this.agremiado = "";
          this.estadoagremiado = "";
          this.ultimacuota = "";
          this.ultimafomaf = "";
          global._mensaje_advertencia("Datos Ingresados no existen, gracias.");
        }
        this.cargandoVerificarCQF = false;
      }
    },
  },
  computed: {
    totalCuenta: function () {
      let sum = 0;
      this.listadoRegistro.forEach((item) => (sum += parseFloat(item.monto)));
      sum = parseFloat(sum).toFixed(2);

      return sum;
    },
  },
  mounted() {
    this.fechaRegistro = this.currentDate;
  },
};
</script>
