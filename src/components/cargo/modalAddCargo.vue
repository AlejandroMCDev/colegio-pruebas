<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">AGREGAR CARGO</h5>
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
          <div class="tab-content">
            <div class="tab-menu-heading">
              <div class="tabs-menu">
                <!-- Tabs -->
                <ul class="nav panel-tabs panel-info" id="tabs">
                  <li>
                    <a
                      href="#listadoCargoTab"
                      class="active"
                      data-bs-toggle="tab"
                      id="ListadoCargo"
                      >Listado</a
                    >
                  </li>
                  <li>
                    <a
                      href="#registrarCargoTab"
                      data-bs-toggle="tab"
                      id="RegistrarCargo"
                      >Registro</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="panel-body tabs-menu-body">
              <div class="tab-content">
                <!-- LISTADO TAB -->
                <div class="tab-pane active" id="listadoCargoTab">
                  <div class="col-md-12">
                    <div class="table-responsive">
                      <table
                        class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0"
                      >
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Opciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in listCargo"
                            :key="'item-' + index"
                            v-if="listCargo.length != 0"
                          >
                            <td>{{ item.id }}</td>
                            <td>{{ item.nombre }}</td>
                            <td>
                              <div class="btn-list">
                                <button
                                  type="button"
                                  class="btn btn-sm btn-primary"
                                  @click="cargarVer(item, index)"
                                  disabled
                                >
                                  <span class="fe fe-edit"> </span>
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-sm btn-danger"
                                  @click="cargarEliminar(item, index)"
                                  disabled
                                >
                                  <span class="fe fe-trash-2"> </span>
                                </button>
                              </div>
                            </td>
                          </tr>
                          <tr v-else>
                            <td colspan="3" class="text-center">
                              Detalle Vacío
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <!-- REGISTRO TAB-->
                <div class="tab-pane" id="registrarCargoTab">
                  <div class="modal-body">
                    <div>
                      <div class="form-group">
                        <label>ID</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="ID"
                          v-model="cargo.id"
                          disabled
                        />
                      </div>
                      <div class="form-group">
                        <label>Nombre</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Nombre"
                          v-model="cargo.nombre"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Cerrar
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="cargarAgregar()"
                    >
                      Nuevo
                    </button>
                    <button
                      type="button"
                      class="btn btn-success"
                      @click="guardarCambios()"
                      :disabled="!cargoValid"
                    >
                      Guardar
                    </button>
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
import SearchMultiselect from "../SearchMultiselect/SearchMultiselect.vue";
import global from "../../global";
export default {
  name: "modalAddCargo",
  components: { SearchMultiselect },
  props: {
    certificatesSelect: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      listCargo: [],
      indiceModificando: -1,
      cargo: {},
      cargoBase: {
        id: 0,
        nombre: "",
      },
      buscador: {
        page_index: 1,
        page_size: 6,
        nombre: "",
      },
      pagination: {
        perPage: 6,
        currentPage: 1,
        perPageOptions: [6, 15, 25, 50],
        total: 0,
      },
      totalPaginas: 0,
    };
  },
  watch: {},
  computed: {
    cargoValid() {
      return this.cargo.nombre != "";
    },
  },

  methods: {
    ...mapActions({
      CargoDesplegable: "_cargo/CargoDesplegable",
      AgregarCargo: "_cargo/AgregarCargo",
    }),
    cambiarTabRegistro() {
      document.getElementById("ListadoCargo").className = "active";
      document.getElementById("listadoCargoTab").className = "tab-pane active";
      document.getElementById("RegistrarCargo").className = "";
      document.getElementById("registrarCargoTab").className = "tab-pane";
    },
    cambiarTabEditar() {
      document.getElementById("ListadoCargo").className = "";
      document.getElementById("listadoCargoTab").className = "tab-pane";
      document.getElementById("RegistrarCargo").className = "active";
      document.getElementById("registrarCargoTab").className =
        "tab-pane active";
    },
    indexMethod(index) {
      return (this.buscador.page_index - 1) * 6 + (index + 1);
    },
    listaCargo: async function () {
      var res = await this.CargoDesplegable();
      this.listCargo = res;
    },
    guardarCambios: async function () {
      var res = null;
      if (this.indiceModificando == -1) {
        res = await this.AgregarCargo(this.cargo);
      } else {
        //res = await this.ModificarEstablecimiento(this.cargo);
      }
      if (res?.exito) {
        this.cambiarTabRegistro();
        this.listaCargo();
        this.cargo = { ...this.cargoBase };
        this.$emit("addCargo", res.datos.id);
        global._mensaje_exito("El Cargo se han guardado correctamente");
      }
    },
    cargarAgregar: function () {
      this.cargo = { ...this.cargoBase };
      this.indiceModificando = -1;
    },
    cargarVer: function (item, index) {
      this.cargo = { ...item };
      this.indiceModificando = index;
      this.cambiarTabEditar();
    },
    cargarEliminar: async function (item, index) {
      this.cargo = { ...item };
      global._swal_pregunta(
        "¿Está seguro que desea eliminar el registro?",
        async () => {
          var res = await this.EliminarEstablecimiento(this.establecimiento);
          if (res?.exito) {
            this.listaCargo();
            global._mensaje_exito("Se ha eliminado");
          }
        }
      );
    },
    closeModal() {
      this.$emit("close");
    },
  },
  mounted() {
    this.cargarAgregar();
    this.listaCargo();
    global._cargar_tooltip("tooltip");
  },
};
</script>
