<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                        AGREGAR DIRECCIÓN
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal()">
                        <i class="fa fa-close"></i>
                    </button>
                </div>

                <div class="panel-body tabs-menu-body">
                    <div class="tab-content">
                        <div class="tab-menu-heading">
                            <div class="tabs-menu">
                                <!-- Tabs -->
                                <ul class="nav panel-tabs panel-info" id="tabs">
                                    <li><a href="#listadoDireccionTab" class="active" data-bs-toggle="tab"
                                            id="ListadoDireccion">Listado</a></li>
                                    <li><a href="#registrarDireccionTab" data-bs-toggle="tab"
                                            id="RegistrarDireccion">Registro</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="panel-body tabs-menu-body">
                            <div class="tab-content">
                                <!-- LISTADO TAB -->
                                <div class="tab-pane active" id="listadoDireccionTab">
                                    <div class="col-md-12">
                                        <div class="table-responsive">
                                            <table
                                                class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>ID</th>
                                                        <th>Nombre</th>
                                                        <th>Opciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in listDireccion" :key="'item-' + index"
                                                        v-if="listDireccion.length != 0">
                                                        <th scope="row">{{ indexMethod(index) }}</th>
                                                        <td>{{ item.id }}</td>
                                                        <td>{{ item.direccion }}</td>
                                                        <td>
                                                            <div class="btn-list">
                                                                <button type="button" class="btn btn-sm btn-primary"
                                                                    @click="cargarVer(item, index)">
                                                                    <span class="fe fe-edit"> </span>
                                                                </button>
                                                                <button type="button" class="btn  btn-sm btn-danger"
                                                                    @click="cargarEliminar(item, index)">
                                                                    <span class="fe fe-trash-2"> </span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr v-else>
                                                        <td colspan="3" class="text-center">Detalle Vacío
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="row">
                                                <div class="pagination justify-content-center mt-3">
                                                    <div class="dataTables_info" id="responsive-datatable_info"
                                                        role="status" aria-live="polite">
                                                        Showing {{ pagination.currentPage == 1 ? pagination.currentPage
                                                                :
                                                                pagination.perPage * pagination.currentPage - 5
                                                        }} to
                                                        {{ pagination.perPage * pagination.currentPage >
                                                                pagination.total ?
                                                                pagination.total : pagination.perPage * pagination.currentPage
                                                        }} of
                                                        {{ pagination.total }} entries</div>
                                                </div>
                                                <div class="pagination justify-content-center mt-3">
                                                    <button @click="cambiarPagina(1)"
                                                        class="page-link btn btn-outline-info">
                                                        Primero
                                                    </button>
                                                    <li class="page-item" v-for="(item, index) in totalPaginas"
                                                        style="list-style: none" :key="index">
                                                        <button href="#" @click="cambiarPagina(index + 1)" :class="
                                                            buscador.page_index == index + 1
                                                                ? 'page-link btn'
                                                                : 'page-link btn btn-outline-info'
                                                        "
                                                            :style="buscador.page_index == index + 1 ? 'color: white; background-color: #36b9cc;' : ''">
                                                            {{ index + 1 }}
                                                        </button>
                                                    </li>
                                                    <button @click="cambiarPagina(totalPaginas)"
                                                        class="page-link btn btn-outline-info">
                                                        Último
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <!-- REGISTRO TAB-->
                                <div class="tab-pane" id="registrarDireccionTab">
                                    <div class="modal-body">
                                        <div>
                                            <div class="form-group">
                                                <label>IdEstablecimiento</label>
                                                <input type="text" class="form-control" placeholder="ID"
                                                    v-model="establecimiento.idEstablecimiento" disabled />
                                            </div>
                                            <div class="form-group">
                                                <label>Dirección</label>
                                                <input type="text" class="form-control" placeholder="Dirección"
                                                    v-model="establecimiento.direccion" />
                                            </div>

                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                                            Cerrar
                                        </button>
                                        <button type="button" class="btn btn-primary" @click="nuevaDireccion()">
                                            Nuevo
                                        </button>
                                        <button type="button" class="btn btn-success" @click="guardarCambios()"
                                            :disabled="!direccionValid">
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
    name: "modalAddDireccion",
    components: { SearchMultiselect },
    props: {
        idEstablecimiento: {
            type: Number,
            default: null,
        }
    },
    data() {
        return {
            listDireccion: [],
            indiceModificando: -1,
            listTipoResolucion: [],
            establecimiento: {},
            establecimientoBase: {
                idEstablecimiento: 0,
                direccion: ""
            },
            buscador: {
                page_index: 1,
                page_size: 6,
                idEstablecimiento: 0
            },
            pagination: {
                perPage: 6,
                currentPage: 1,
                perPageOptions: [6, 15, 25, 50],
                total: 0
            },
            totalPaginas: 0,
        };
    },
    watch: {
        idEstablecimiento(idEstablecimiento) {
            this.establecimiento.idEstablecimiento = idEstablecimiento;
            this.buscador.idEstablecimiento = idEstablecimiento;
            this.listaDireccion();
        },
    },
    computed: {
        direccionValid() {
            return (
                this.establecimiento.direccion != ""
            );
        },
    },

    methods: {
        cambiarTabRegistro() {
            document.getElementById("ListadoDireccion").className = "active";
            document.getElementById("listadoDireccionTab").className = "tab-pane active";
            document.getElementById("RegistrarDireccion").className = "";
            document.getElementById("registrarDireccionTab").className = "tab-pane";
        },
        cambiarTabEditar() {
            document.getElementById("ListadoDireccion").className = "";
            document.getElementById("listadoDireccionTab").className = "tab-pane";
            document.getElementById("RegistrarDireccion").className = "active";
            document.getElementById("registrarDireccionTab").className = "tab-pane active";
        },
        indexMethod(index) {
            return (this.buscador.page_index - 1) * 10 + (index + 1);
        },
        cambiarPagina: function (paginaDestino) {
            this.listaDireccion(paginaDestino);
        },
        listaDireccion: async function () {
            if (this.buscador.idEstablecimiento != 0) {
                var res = await this.ListarDireccion(this.buscador);
                this.listDireccion = res.datos;

                this.pagination.total = res.totalRegistros;
                this.pagination.perPage = res.registrosPorPagina;
                this.pagination.currentPage = res.paginaActual;

                this.totalPaginas = res.totalPaginas;
            }
        },
        guardarCambios: async function () {
            var res = null;
            if (this.indiceModificando == -1) {
                res = await this.AgregarDireccion(this.establecimiento);
            } else {
                res = await this.ModificarDireccion(this.establecimiento);
            }
            if (res?.exito) {
                this.cambiarTabRegistro();
                this.listaDireccion();
                this.establecimiento = { ...this.establecimientoBase };
                this.$emit("addDireccion", res.datos.id);
                global._mensaje_exito(
                    "La dirección se han guardado correctamente"
                );
            }
        },
        nuevaDireccion() {
            this.cargarAgregar();
            if (this.establecimiento.idEstablecimiento == 0) {
                this.establecimiento.idEstablecimiento = this.buscador.idEstablecimiento;
            }
        },
        cargarAgregar: function () {
            this.establecimiento = { ...this.establecimientoBase };
            this.indiceModificando = -1;
        },
        cargarVer: function (item, index) {
            this.establecimiento = { ...item };
            this.indiceModificando = index;
            this.cambiarTabEditar();
        },
        cargarEliminar: async function (item, index) {
            this.establecimiento = { ...item };
            global._swal_pregunta(
                "¿Está seguro que desea eliminar el registro?",
                async () => {
                    var res = await this.EliminarDireccion(this.establecimiento);
                    if (res?.exito) {
                        this.listaDireccion();
                        global._mensaje_exito("Se ha eliminado");
                    }
                }
            );
        },
        ...mapActions({
            AgregarDireccion: "_establecimiento/AgregarDireccion",
            ModificarDireccion: "_establecimiento/ModificarDireccion",
            EliminarDireccion: "_establecimiento/EliminarDireccion",
            ListarDireccion: "_establecimiento/ListarDireccion",
        }),
        closeModal() {
            this.$emit('close');
        }
    },
    mounted() {
        this.cargarAgregar();
        this.listaDireccion();
        global._cargar_tooltip("tooltip");
    },

};
</script>