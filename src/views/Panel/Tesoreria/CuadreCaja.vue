<template>
  <div class="card-header">
    <h3 class="card-title">Modulo Cuadre de Caja</h3>
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
              >CUADRE DE CAJA</a
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
                                class="fe fe-file me-2"></i>Nuevo</button> fa fa-unlock-->
            <div class="row">
              <div class="col-md-9">
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="cierre_caja()"
                >
                  <i
                    :class="
                      estado_cuadre_caja == 'PENDIENTE' ||
                      estado_cuadre_caja == 'ABIERTO'
                        ? 'fa fa-unlock me-2'
                        : 'fa fa-unlock-alt me-2'
                    "
                  ></i>
                  {{
                    estado_cuadre_caja == "PENDIENTE" ||
                    estado_cuadre_caja == "ABIERTO"
                      ? "Cerrar"
                      : "Abrir"
                  }}
                </button>
                <button
                  class="btn btn-primary m-5"
                  type="button"
                  @click="openurlArchivo()"
                >
                  <i class="fe fe-eye me-2"></i>Vista Previa
                </button>
              </div>
              <div class="col-md-3">
                <input
                  type="text"
                  class="form-control m-5"
                  placeholder="Estado"
                  v-model="estado_cuadre_caja"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 row">
              <div class="mb-5 p-4 br-5">
                <div class="row">
                  <div class="col-md-5 mb-3">
                    <div class="row mb-4">
                      <label for="inputName" class="col-md-4 form-label"
                        >VENTANILLA</label
                      >
                      <div class="col-md-8">
                        <select
                          class="form-control form-select"
                          data-bs-placeholder="Ventanilla"
                          v-model="cod_ventanilla"
                        >
                          <option value="">Ventanilla</option>
                          <option value="01">Caja 01</option>
                          <option value="02">Caja 02</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-5 mb-3">
                    <div class="row mb-4">
                      <label for="inputName" class="col-md-4 form-label"
                        >FECHA</label
                      >
                      <div class="col-md-8">
                        <input
                          type="date"
                          class="form-control"
                          id="inputName"
                          v-model="fecha"
                          placeholder="Fecha Reembolso"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-2 mb-3">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="cargarRegistros()"
                    >
                      <i class="fe fe-search me-2"></i>Buscar
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-label mt-0 p-0">CUADRE DE CAJA</div>
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
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in listadoRegistro"
                            :key="'item-' + index"
                            v-if="listadoRegistro.length != 0"
                          >
                            <td
                              :style="
                                item.titulo == 1
                                  ? 'color: #fff; background-color: blue'
                                  : ''
                              "
                            >
                              {{ item.codigo }}
                            </td>
                            <td
                              :style="
                                item.titulo == 1
                                  ? 'color: #fff; background-color: blue'
                                  : ''
                              "
                            >
                              {{ item.descripcion }}
                            </td>
                            <td
                              :style="
                                item.titulo == 1
                                  ? 'color: #fff; background-color: blue'
                                  : ''
                              "
                            >
                              {{
                                item.monto2 != 0
                                  ? parseFloat(item.monto2)
                                      .toFixed(2)
                                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                                  : ""
                              }}
                            </td>
                            <td
                              :style="
                                item.titulo == 1
                                  ? 'color: #fff; background-color: blue'
                                  : ''
                              "
                            >
                              {{
                                item.monto != 0
                                  ? parseFloat(item.monto)
                                      .toFixed(2)
                                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                                  : ""
                              }}
                            </td>
                          </tr>
                          <tr v-else>
                            <td colspan="4" class="text-center">
                              Ningun registro encontrado
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
</template>

<script>
import global from "../../../global";
import { mapActions } from "vuex";
import Loading from "../../../components/varios/Loading.vue";
//Library
import dayjs from "dayjs";
export default {
  name: "CuadreCaja",
  components: {
    Loading,
  },
  data() {
    return {
      usuario: {},
      iprutaFiles: global.ruta_api,
      estado_cuadre_caja: "",
      cargando: false,
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      listadoRegistro: [],
      cod_ventanilla: "",
      fecha: dayjs(this.date).format("YYYY-MM-DD"),
      cuadrecaja: {},
      cuadrecajaBase: {
        cod_ventanilla: "",
        fechaliq: "",
        cua_notaingresos: "",
        cua_ingresos: "",
        cua_egresos: "",
        cua_depositos: "",
        cua_efectivo: "",
        cua_xregularizar: "",
        cua_saldo: "",
        usuario: 2362,
        usuarioreg: "srodriguez",
      },
    };
  },
  methods: {
    ...mapActions({
      InformeCuadreCaja: "_caja/InformeCuadreCaja",
      CerrarCaja: "_caja/CerrarCaja",
      AbrirCaja: "_caja/AbrirCaja",
    }),
    cierre_caja() {
      if (
        this.estado_cuadre_caja == "ABIERTO" ||
        this.estado_cuadre_caja == "PENDIENTE"
      ) {
        this.cuadreCajaCerrar();
      } else {
        if (this.usuario.rol_usu == "us_admin") {
          this.cuadreCajaAbrir();
        } else {
          global._mensaje_advertencia(
            "El usuario no cuenta con permisos, comuniquese con el Administrador."
          );
        }
      }
    },
    loadRegistro: function () {
      this.cuadrecaja = { ...this.cuadrecajaBase };
    },
    openurlArchivo() {
      if (this.cod_ventanilla != "" && this.fecha != "") {
        let url = `${this.iprutaFiles}caja/cuadrecaja/generarPDFinforme?cod_ventanilla=${this.cod_ventanilla}&fecha=${this.fecha}`;
        window.open(url, "_blank");
      } else {
        global._mensaje_advertencia("Debe seleccionar una caja, gracias.");
      }
    },
    cuadreCajaCerrar() {
      global._swal_pregunta(
        "¿Está seguro que desea realizar el cierre?",
        async () => {
          this.listadoRegistro.forEach((item) => {
            this.cuadrecaja.cod_ventanilla = this.cod_ventanilla;
            this.cuadrecaja.fechaliq = this.fecha;

            if (item.descripcion == "POR DEPOSITO") {
              this.cuadrecaja.cua_saldo = item.monto;
            }

            if (item.descripcion == "NOTA DE INGRESO") {
              this.cuadrecaja.cua_notaingresos = item.monto2;
            }

            if (item.descripcion == "TOTAL INGRESOS") {
              this.cuadrecaja.cua_ingresos = item.monto2;
            }

            if (item.descripcion == "TOTAL EGRESOS") {
              this.cuadrecaja.cua_egresos = item.monto2;
            }

            if (item.descripcion == "TOTAL BANCO") {
              this.cuadrecaja.cua_depositos = item.monto2;
            }

            if (item.descripcion == "POR REGULARIZAR") {
              this.cuadrecaja.cua_xregularizar = item.monto2;
            }

            if (item.descripcion == "EFECTIVO") {
              this.cuadrecaja.cua_efectivo = item.monto2;
            }
          });

          var res = await this.CerrarCaja(this.cuadrecaja);
          if (res?.exito) {
            this.loadRegistro();
            this.cargarRegistros();
            global._mensaje_exito("Se ha guardado correctamente");
          }
        },
        "Cerrar Caja"
      );
    },
    cuadreCajaAbrir() {
      var res = null;
      global._swal_pregunta(
        "¿Está seguro que desea abrir la caja?",
        async () => {
          let cuadrecaja = {
            cod_ventanilla: this.cod_ventanilla,
            fechaliq: this.fecha,
          };
          res = await this.AbrirCaja(cuadrecaja);
          if (res?.exito) {
            this.loadRegistro();
            this.cargarRegistros();
            global._mensaje_exito("La caja se abrio correctamente");
          }
        },
        "Abrir Caja"
      );
    },

    cargarRegistros: async function () {
      if (this.cod_ventanilla != "" && this.fecha != "") {
        this.cargando = true;

        let informecuadre = {
          cod_ventanilla: this.cod_ventanilla,
          fecha: this.fecha,
        };

        let res = await this.InformeCuadreCaja(informecuadre);

        if (res != null) {
          res.forEach((item) => {
            if (item.codigo == "CAJA") {
              this.estado_cuadre_caja = item.descripcion;
            }
          });
          this.listadoRegistro = res.filter((item) => item.codigo != "CAJA");
        }
        this.cargando = false;
      } else {
        global._mensaje_advertencia("Seleccione los datos a buscar, gracias.!");
      }
    },
  },
  mounted() {
    if (localStorage.getItem("login")) {
      this.usuario = JSON.parse(localStorage.getItem("login"));
    }
    this.loadRegistro();
  },
};
</script>
