<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            BUSCAR PENDIENTES
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModalPendientes()"
          >
            <i class="fa fa-close"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 mb-3">
              <div class="row mb-4">
                <label for="inputName" class="col-md-8 form-label">
                  <span style="font-weight: bold"
                    >RELACIÓN DE DOCUMENTOS PENDIENTES</span
                  >
                  POR</label
                >
                <div class="col-md-4">
                  <select
                    class="form-control form-select"
                    data-bs-placeholder="Todas"
                    v-model="tipo"
                  >
                    <option value="0">Todas</option>
                    <option value="1">01</option>
                    <option value="2">02</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="col-md-3 mb-3">
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
                @click="procesarListaAll()"
              >
                <i class="fe fe-plus me-2"></i>Agregar
              </button>
            </div>
          </div>
          <div class="col-md-12">
            <div class="table-responsive">
              <div class="text-center">
                <loading :mostrar="cargando" />
              </div>
              <table
                class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
              >
                <thead>
                  <tr>
                    <!-- <th>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          @change="checkAll"
                        />
                      </div>
                    </th> -->
                    <th>#</th>
                    <th>Tipo</th>
                    <th>Serie</th>
                    <th>Numero</th>
                    <th>Comentario</th>
                    <th>Ruc</th>
                    <th>Razón Social</th>
                    <th>Fecha Ven</th>
                    <th>Cuota</th>
                    <th>Pagar El</th>
                    <th>Imp.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in listaApagarPendientes"
                    :key="'item-' + index"
                    v-if="listaApagarPendientes.length != 0"
                  >
                    <td>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          checked="false"
                          v-model="item.select"
                          @change="checkItem(item, index)"
                        />
                      </div>
                    </td>
                    <td>
                      <!-- <a
                        href="javascript:void(0)"
                        class="fw-semibold"
                        @click="guardarCambios(item)"
                      >
                        {{ item.tipcom_dsc }}</a
                      > -->
                      {{ item.tipcom_dsc }}
                    </td>
                    <td>{{ item.com_serie }}</td>
                    <td>{{ item.com_numero }}</td>
                    <td>
                      <span
                        data-bs-placement="top"
                        data-bs-toggle="tooltip"
                        :title="item.com_obs"
                      >
                        <p class="overflow-ellipsis">
                          {{ item.com_obs }}
                        </p>
                      </span>
                    </td>
                    <td>{{ item.ruc }}</td>
                    <td>
                      <span
                        data-bs-placement="top"
                        data-bs-toggle="tooltip2"
                        :title="item.razonsocial"
                      >
                        <p class="overflow-ellipsis">
                          {{ item.razonsocial }}
                        </p>
                      </span>
                    </td>
                    <td>{{ item.com_fechaven }}</td>
                    <td>{{ item.cuota }}</td>
                    <td>{{ item.progdet_fecha2 }}</td>
                    <td>{{ item.progdet_importe }}</td>
                  </tr>
                  <tr v-else>
                    <td colspan="11" class="text-center">Detalle Vacío</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="closeModalPendientes()"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Loading from "../../components/varios/Loading.vue";
import global from "../../global";
//Library
import dayjs from "dayjs";
export default {
  name: "BuscarPendientes",
  components: { Loading },
  props: {
    fechareembolso: {
      type: String,
      default: "",
    },
    reloadData: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cargando: false,
      listaAllAgregar: [],
      tipo: 0,
      listaApagarPendientes: [],
      date: new Date(),
      currentDate: dayjs(this.date).format("YYYY-MM-DD"),
      reembolso_caja_detalle: {},
      reembolso_caja_detalleBase: {
        prog_codigo: 0,
        progdet_cuota: 0,
        recade_importe: 0,
        reecaj_fechaliq: "",
        cod_ventanilla: "",
        recade_gastosplanilla: "",
        reecaj_usuarioreg: "",
      },
    };
  },
  methods: {
    ...mapActions({
      ListarApagarPendiente: "_comprobantepago/ListarApagarPendiente",
      Agregar: "_reembolsocajadetalle/Agregar",
      Modificar: "_reembolsocajadetalle/Modificar",
    }),
    procesarListaAll: async function () {
      if (this.listaAllAgregar.length > 0) {
        global._swal_pregunta(
          "¿Está seguro que desea agregar los registros, seleccionados?",
          async () => {
            this.listaAllAgregar.forEach((item) => {
              this.guardarCambios(item);
            });

            this.cargarRegistros();
            this.$emit("cargarRegistros");
            //this.closeModal();
            global._mensaje_exito("Los cambios se han guardado correctamente");
          },
          "Advertencia"
        );
      } else {
        global._mensaje_advertencia(
          "Debe seleccionar los registros a procesar, gracias."
        );
      }
    },
    checkItem(item, index) {
      if (item.select == false) {
        this.listaAllAgregar.splice(index, 1);
      } else {
        this.listaAllAgregar.push(item);
      }
    },
    guardarCambios: async function (item) {
      this.reembolso_caja_detalle.prog_codigo = item.prog_codigo;
      this.reembolso_caja_detalle.progdet_cuota = item.progdet_cuota;
      this.reembolso_caja_detalle.recade_importe = item.progdet_importe;
      this.reembolso_caja_detalle.reecaj_fechaliq = item.progdet_fecha;
      //this.reembolso_caja_detalle.reecaj_fechaliq = this.currentDate;
      this.reembolso_caja_detalle.cod_ventanilla = "01";
      this.reembolso_caja_detalle.recade_gastosplanilla = item.G;
      this.reembolso_caja_detalle.reecaj_usuarioreg = "1";

      //var res = null;

      if (this.indiceModificando == -1) {
        await this.Agregar(this.reembolso_caja_detalle);
      } else {
        await this.Modificar(this.reembolso_caja_detalle);
      }

      // if (res?.exito) {
      //   this.$emit("cargarRegistros");
      //   this.cargarRegistros();
      //   this.closeModal();
      //   global._mensaje_exito("Los cambios se han guardado correctamente");
      // }
    },
    closeModalPendientes() {
      this.$emit("closeModalPendientes");
    },
    cargarRegistros: async function () {
      let buscador = {
        tipo: this.tipo,
        fechaini: this.fechareembolso,
        fechafin: this.fechareembolso,
        ruc: 0,
      };
      this.cargando = true;
      var res = await this.ListarApagarPendiente(buscador);

      if (res != null) {
        this.listaApagarPendientes = res.map((el) => ({
          ...el,
          select: false,
          com_fechaven: dayjs(el.com_fechaven).format("DD-MM-YYYY"),
          progdet_fecha2: dayjs(el.progdet_fecha).format("DD-MM-YYYY"),
        }));
      } else {
        this.listaApagarPendientes = [];
      }
      this.cargando = false;
      console.log(res);
    },
    loadRegistro: function () {
      this.reembolso_caja_detalle = { ...this.reembolso_caja_detalleBase };
      this.indiceModificando = -1;
    },
  },
  watch: {
    reloadData() {
      console.log("ReloadData", this.reloadData);
      if (this.fechareembolso != "") {
        this.cargarRegistros();
      }
    },
    /*fechareembolso() {
      console.log(this.fechareembolso);
      if (this.fechareembolso != "") {
        this.cargarRegistros();
      }
    },*/
  },
  mounted() {
    this.loadRegistro();
    global._cargar_tooltip("tooltip");
    global._cargar_tooltip("tooltip2");
  },
};
</script>

<style lang="css" scoped>
p {
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
}

.overflow-ellipsis {
  text-overflow: ellipsis;
}

.tooltip {
  z-index: 100000000;
}
</style>
