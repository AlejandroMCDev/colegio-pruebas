<template>
  <div class="card-header">
    <h3 class="card-title">Modulo de Meses</h3>
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
              >REGISTRAR</a
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- DATOS GENERALES -->
    <div class="panel-body tabs-menu-body">
      <div class="tab-content">
        <!-- <div class="tab-pane active" id="listadoTab">
                    <div class="mb-5 p-4 br-5">
                        <div class="form-label mt-0 p-0">LISTA</div>
                        <div class="row">
                            <div class="col-md-6 mb-3" style="text-align: center;">
                                <input type="text" class="form-control" placeholder="Nombre" />
                            </div>

                            <div class="col-md-3 mb-3" style="text-align: left;">
                                <button type="button" class="btn btn-primary" style="margin: 2px;">
                                    <i class="fe fe-search me-2"></i>Buscar</button>
                                <button type="button" class="btn btn-primary">
                                    <i class="fe fe-file me-2"></i>Nuevo</button>
                            </div>

                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Numero</th>
                                                <th>Descripción</th>
                                                <th>Tipo</th>
                                                <th>Debe</th>
                                                <th>Haber</th>
                                                <th>Opciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in listadoRegistro" :key="'item-' + index"
                                                v-if="listadoRegistro.length != 0">
                                                <td scope="row">{{ indexMethod(index) }}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td class="text-center">
                                                    <i class="fa fa-pencil mx-1 text-yellow" role="button"
                                                        @click="cargarVer(item, index)"></i>
                                                    <i class="fa fa-trash mx-1 text-danger" role="button"
                                                        @click="cargarEliminar(item, index)"></i>
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <td colspan="7" class="text-center">Ningun registro encontrado
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
        <div class="tab-pane active" id="registrarTab">
          <div class="form-label mt-0 p-0">
            <!-- <button type="button" class="btn btn-primary"><i
                                class="fe fe-file me-2"></i>Nuevo</button> -->
            <div class="row">
              <div class="col-md-12">
                <!-- <button class="btn btn-primary" type="button" @click="asignarCuota()">
                                    <i class="fe fe-external-link me-2"></i>Asignar </button> -->
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="generarMeses()"
                >
                  <i class="fe fe-database me-2"></i>Generar
                </button>
                <!-- <button class="btn btn-primary" type="button"><i
                                        class="fe fe-log-in me-2"></i>Cancelar</button> -->
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 row">
              <div class="mb-5 p-4 br-5">
                <div class="form-label mt-0 p-0">LISTA</div>
                <div class="row">
                  <div class="col-md-6 mb-3" style="text-align: center">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Año"
                      v-model="anio"
                    />
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
                  </div>
                </div>

                <div class="row">
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
                            <th>#</th>
                            <th>Mes</th>
                            <th>Estado</th>
                            <th class="text-center">Asignar</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in listadoRegistro"
                            :key="'item-' + index"
                            v-if="listadoRegistro.length != 0"
                          >
                            <!-- <td class="d-flex justify-content-center">
                                                            <div class="form-group">
                                                                <label class="custom-control custom-checkbox">
                                                                    <input type="checkbox" class="custom-control-input"
                                                                        name="example-checkbox1"
                                                                        @change="seleccionarRegistro(item.cod_cuota)"
                                                                        :v-model="'seleccionado-' + index" />
                                                                    <span class="custom-control-label"> </span>
                                                                </label>
                                                            </div>
                                                        </td> -->
                            <th scope="row">{{ indexMethod(index) }}</th>
                            <td>{{ item.nombre }}</td>
                            <td>
                              {{
                                item.activo_cuota == 1
                                  ? "ACTIVADO"
                                  : "PENDIENTE"
                              }}
                            </td>
                            <td class="text-center">
                              <i
                                class="fe fe-external-link mx-1 text-yellow"
                                role="button"
                                title="Asignar"
                                @click="asignarCuota(item.cod_cuota)"
                              ></i>
                            </td>
                          </tr>
                          <tr v-else>
                            <td colspan="3" class="text-center">
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
          <!-- <div class="row">
                        <div class="col-md-12 text-center">
                            <button class="btn btn-primary" type="button">Cancelar</button>
                            <button class="btn btn-primary m-5" type="button">
                                Asignar </button>
                            <button class="btn btn-primary" type="button">Generar
                            </button>
                        </div>
                    </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import global from "../../../global";
//Library
import dayjs from "dayjs";
export default {
  name: "Concepto",
  data() {
    return {
      seleccionado: false,
      //cod_cuota: "",
      filtros: "",
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      currentAnio: dayjs(this.date).format("YYYY"),
      listadoRegistro: [],
      anio: "",
      usuarioRegistro: "",
      fechaRegistro: "",
      buscador: {
        page_index: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      ListarRegistros: "_cuotasmeses/ListarRegistros",
      /*CuotaGenerar: "_cuotasmeses/CuotaGenerar",*/
      GenerarCuotasMensuales: "_cuotasmeses/GenerarCuotasMensuales",
      MesesGenerar: "_cuotasmeses/MesesGenerar",
    }),
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 10 + (index + 1);
    },

    generarMeses: async function () {
      global._swal_pregunta(
        "¿Está seguro que desea generar los meses del año ingresado?",
        async () => {
          var res = null;
          res = await this.MesesGenerar(this.anio);

          if (res?.exito) {
            global._mensaje_exito("Los cambios se han guardado correctamente");
            this.cargarRegistros();
          } else {
            this.cargarRegistros();
          }
        },
        "Advertencia"
      );
    },   
    asignarCuota: async function (cod_cuota) {
      global._swal_pregunta(
        "¿Está seguro que desea asignar las cuotas?",
        async () => {
          let cuotas = {
            cod_cuota: cod_cuota,
          };
          var res = null;
          res = await this.GenerarCuotasMensuales(cuotas);

          if (res?.exito) {
            global._mensaje_exito("Los cambios se han guardado correctamente");
            this.cargarRegistros();
          } else {
            this.cargarRegistros();
          }
        },
        "Advertencia"
      );
    },
    cargarRegistros: async function () {
      let buscador = {
        anio: this.anio,
      };

      var res = await this.ListarRegistros(buscador);

      this.listadoRegistro = res;
      //console.log(res);
    },
  },
  mounted() {
    this.anio = this.currentAnio;
    this.cargarRegistros();
    this.fechaRegistro = this.currentDate;
  },
};
</script>
