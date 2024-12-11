<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            APLICAR DESCUENTO POR RESOLUCIÓN
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal()"
          >
            <i class="fa fa-close"></i>
          </button>
        </div>

        <div class="panel-body tabs-menu-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Tramitado</label>
                <SearchMultiselect
                  :value="descuento.tramitado"
                  v-model="descuento.tramitado"
                  :options="usuarios"
                  placeholder="Tramitado"
                  :searchable="true"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Autoriza</label>
                <SearchMultiselect
                  :value="descuento.aprobado"
                  v-model="descuento.aprobado"
                  :options="usuarios"
                  placeholder="Aprobado"
                  :searchable="true"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-2" style="text-align: left">
                <div class="form-group">
                  <label>Descuento</label>
                  <input
                    type="number"
                    v-model="porcentaje_descuento"
                    class="form-control"
                    placeholder="Descuento"
                    min="0"
                  />
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="descuentoTodos"
                    @change="aplicarDescuentoTodos()"
                    v-model="descuento_todos"
                  />
                  <label class="form-check-label" for="descuentoTodos">
                    Aplicar descuento a todos
                  </label>
                </div>
              </div>

              <div
                class="col-md-6"
                style="text-align: right; position: relative; top: 30px"
              >
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="aplicarDescuento()"
                >
                  Aplicar Descuento
                </button>
              </div>
            </div>
          </div>
          <div class="tab-content">
            <div class="tab-menu-heading">
              <div class="tabs-menu">
                <!-- Tabs -->
                <ul class="nav panel-tabs panel-info" id="tabs">
                  <li>
                    <a
                      href="#listadoDeudaResolucionTab"
                      class="active"
                      id="ListadoDeudaResolucion"
                      data-bs-toggle="tab"
                      >Deuda</a
                    >
                  </li>
                  <li>
                    <a
                      href="#listadoDescuentosResolucionTab"
                      data-bs-toggle="tab"
                      id="ListadoDescuentoResolucion"
                      >Descuentos</a
                    >
                  </li>
                </ul>
              </div>
            </div>

            <div class="panel-body tabs-menu-body">
              <div class="tab-content">
                <!-- LISTADO TAB -->
                <div class="tab-pane active" id="listadoDeudaResolucionTab">
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
                            <th>#</th>
                            <th>AÑO</th>
                            <th>MES</th>
                            <th>DESCRIPCIÓN</th>
                            <th>MONTO</th>
                            <th>% DTO</th>
                            <th>M. DTO</th>
                            <th>DTO</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in listaDetalleDeuda"
                            :key="'item-' + index"
                            v-if="listaDetalleDeuda.length != 0"
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
                            <td>{{ item.anio }}</td>
                            <td>{{ item.mes }}</td>
                            <td>{{ item.descripcion }}</td>
                            <td>{{ item.monto }}</td>
                            <td>{{ item.porcentaje_descuento }}</td>
                            <td>{{ item.monto_descuento }}</td>
                            <td>{{ item.aplica_descuento }}</td>
                          </tr>
                          <tr v-else>
                            <td colspan="9" class="text-center">
                              Detalle Vacío
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <!-- REGISTRO TAB-->
                <div class="tab-pane" id="listadoDescuentosResolucionTab">
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
                            <th>AÑO</th>
                            <th>MES</th>
                            <th>DESCRIPCIÓN</th>
                            <th>MONTO</th>
                            <th>% DTO</th>
                            <th>M. DTO</th>
                            <th>DTO</th>
                            <th>#</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in listaDescuentosResolucion"
                            :key="'item-' + index"
                            v-if="listaDescuentosResolucion.length != 0"
                          >
                            <!-- <td>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  checked="false"
                                  v-model="item.select"
                                  @change="checkItem(item, index)"
                                />
                              </div>
                            </td> -->
                            <td>{{ item.anio }}</td>
                            <td>{{ item.mes }}</td>
                            <td>{{ item.descripcion }}</td>
                            <td>{{ item.monto }}</td>
                            <td>{{ item.porcentaje_descuento }}</td>
                            <td>{{ item.monto_descuento }}</td>
                            <td>{{ item.aplica_descuento }}</td>
                            <i
                              class="fa fa-trash mx-1 text-danger"
                              role="button"
                              @click="cargarEliminar(item)"
                            ></i>
                          </tr>
                          <tr v-else>
                            <td colspan="9" class="text-center">
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
</template>
<script>
import { mapActions } from "vuex";
import SearchMultiselect from "../../SearchMultiselect/SearchMultiselect.vue";
import Loading from "../../../components/varios/Loading.vue";
import global from "../../../global";
export default {
  name: "modalAddDescuento",
  components: { SearchMultiselect, Loading },
  props: {
    cod_colegiado: {
      type: Number,
      default: 0,
    },
    id_resolucion: {
      type: Number,
      default: 0,
    },
    aprobado: {
      type: String,
      default: null,
    },
    tramitado: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      cbo_tramitado: "",
      cbo_aprobado: "",
      usuarios: [],
      descuento_todos: false,
      cargando: false,
      indiceModificando: -1,
      listaDetalleDeuda: [],
      listaDescuentosResolucion: [],
      porcentaje_descuento: 0,
      descuento: {},
      descuentoBase: {
        id_resolucion: 0,
        tramitado: "",
        aprobado: "",
        fecha_registro: "",
        usuario_registro: "",
        descuentodetalle: [],
      },
      listaAplicarDescuento: [],
    };
  },

  methods: {
    ...mapActions({
      MovimientoDetalleDeudaDetalleColegiado:
        "_movimiento/MovimientoDetalleDeudaDetalleColegiado",
      UsuariosDesplegable: "_usuarios/UsuariosDesplegable",
      AplicarDescuentoResolucion: "_resoluciones/AplicarDescuentoResolucion",
      AnularDescuentoResolucion: "_resoluciones/AnularDescuentoResolucion",
      ListarDescuentoResolucion: "_resoluciones/ListarDescuentoResolucion",
    }),
    cambiarTabEditar() {
      document.getElementById("ListadoDeudaResolucion").className = "";
      document.getElementById("listadoDeudaResolucionTab").className =
        "tab-pane";
      document.getElementById("ListadoDescuentoResolucion").className =
        "active";
      document.getElementById("listadoDescuentosResolucionTab").className =
        "tab-pane active";
    },
    cambiarTabRegistro() {
      document.getElementById("ListadoDeudaResolucion").className = "active";
      document.getElementById("listadoDeudaResolucionTab").className =
        "tab-pane active";
      document.getElementById("ListadoDescuentoResolucion").className = "";
      document.getElementById("listadoDescuentosResolucionTab").className =
        "tab-pane";
    },
    aplicarDescuentoTodos() {
      if (this.porcentaje_descuento == 0 || this.porcentaje_descuento == "") {
        this.cargarRegistrosDetalleDeudaColegiado();
        global._mensaje_advertencia("Ingrese el porcentaje a descontar");
        this.descuento_todos = !this.descuento_todos;
        return;
      }

      if (this.descuento_todos) {
        this.listaDetalleDeuda = this.listaDetalleDeuda.map((row) => ({
          ...row,
          select: true,
          aplica_descuento: "SI",
        }));

        this.listaDetalleDeuda.forEach((item) => {
          let porcentaje_descuento =
            parseFloat(this.porcentaje_descuento) / 100;
          let monto_descuento = parseFloat(item.monto) * porcentaje_descuento;
          let descuento = {
            id_detalle: item.id_detalle,
            porcentaje_descuento: porcentaje_descuento,
            monto_descuento: monto_descuento,
            aplica_descuento: item.select == true ? 1 : 0,
          };
          this.listaAplicarDescuento.push(descuento);
        });
      } else {
        this.listaDetalleDeuda = this.listaDetalleDeuda.map((row) => ({
          ...row,
          select: false,
          aplica_descuento: "NO",
        }));

        this.listaAplicarDescuento = [];
      }

    },
    checkItem(item, index) {
      if (this.porcentaje_descuento == 0 || this.porcentaje_descuento == "") {
        this.cargarRegistrosDetalleDeudaColegiado();
        global._mensaje_advertencia("Ingrese el porcentaje a descontar");
      } else {
        if (item.select == false) {
          this.listaAplicarDescuento.splice(index, 1);
        } else {
          let porcentaje_descuento =
            parseFloat(this.porcentaje_descuento) / 100;
          let monto_descuento = parseFloat(item.monto) * porcentaje_descuento;
          let descuento = {
            id_detalle: item.id_detalle,
            porcentaje_descuento: porcentaje_descuento,
            monto_descuento: monto_descuento,
            aplica_descuento: item.select == true ? 1 : 0,
          };
          this.listaAplicarDescuento.push(descuento);
        }
        console.log(this.listaAplicarDescuento);
      }
    },
    cargarEliminar: async function (item) {
      let descuento = {
        id_detalle: item.id_detalle,
        id_resolucion: item.id_resolucion,
      };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.AnularDescuentoResolucion(descuento);
          if (res?.exito) {
            this.cargarRegistrosDescuentosResolucion();
            this.cargarRegistrosDetalleDeudaColegiado();
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    cargarRegistrosDescuentosResolucion: async function () {
      let colegiado = {
        cod_colegiado: this.cod_colegiado,
        id_resolucion: this.id_resolucion,
      };
      this.cargando = true;
      var res = await this.ListarDescuentoResolucion(colegiado);

      if (res.length > 0) {
        this.listaDescuentosResolucion = res.map((el) => ({
          ...el,
          select: false,
          monto: parseFloat(el.monto).toFixed(2),
          porcentaje_descuento: parseFloat(el.porcentaje_descuento).toFixed(2),
          monto_descuento: parseFloat(el.monto_descuento).toFixed(2),
          aplica_descuento: el.aplica_descuento == 0 ? "NO" : "SI",
        }));
      } else {
        this.listaDescuentosResolucion = [];
      }
      this.cargando = false;
    },
    cargarRegistrosDetalleDeudaColegiado: async function () {
      let colegiado = {
        cod_colegiado: this.cod_colegiado,
      };
      this.cargando = true;
      var res = await this.MovimientoDetalleDeudaDetalleColegiado(colegiado);

      if (res.length > 0) {
        this.listaDetalleDeuda = res.map((el) => ({
          ...el,
          select: false,
          monto: parseFloat(el.monto).toFixed(2),
          porcentaje_descuento: parseFloat(el.porcentaje_descuento).toFixed(2),
          monto_descuento: parseFloat(el.monto_descuento).toFixed(2),
          aplica_descuento: el.aplica_descuento == 0 ? "NO" : "SI",
        }));
      } else {
        this.listaDetalleDeuda = [];
      }
      this.cargando = false;
    },
    aplicarDescuento: async function () {
      /* console.log(this.listaAplicarDescuento);

      var res = null;
      if (this.indiceModificando == -1) {
        this.descuento.id_resolucion = this.id_resolucion;
        this.descuento.usuario_registro = "usuarioPrueba";
        this.descuento.descuentodetalle = this.listaAplicarDescuento;
        res = await this.AplicarDescuentoResolucion(this.descuento);
      } else {
        //res = await this.ModificarTipoResolucion(this.tiporesolucion);
      }
      if (res?.exito) {
        this.cargarRegistrosDetalleDeudaColegiado();
        this.cargarRegistrosDescuentosResolucion();
        //this.descuento = { ...this.descuentoBase };

        global._mensaje_exito("Se han guardado correctamente");
      } */
    },
    comboUsuarios: async function () {
      var res = await this.UsuariosDesplegable();
      this.usuarios = res.map((item) => {
        return {
          label:
            item.nombres_usu + " " + item.apepat_usu + " " + item.apemat_usu,
          value:
            item.nombres_usu + " " + item.apepat_usu + " " + item.apemat_usu,
        };
      });
    },
    closeModal() {
      this.descuento_todos = false
      this.$emit("closeModalDescuento");
    },
  },
  watch: {
    cod_colegiado() {
      if (this.cod_colegiado != 0) {
        this.cargarRegistrosDetalleDeudaColegiado();
        this.cargarRegistrosDescuentosResolucion();
      }
    },
    tramitado() {
      this.descuento.tramitado = this.tramitado;
    },
    aprobado() {
      this.descuento.aprobado = this.aprobado;
    },
  },
  computed: {
    tipoResolucionValid() {
      return this.tiporesolucion.nombre != "";
    },
  },

  mounted() {
    this.comboUsuarios();
    global._cargar_tooltip("tooltip");
  },
};
</script>
