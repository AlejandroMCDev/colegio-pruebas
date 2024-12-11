<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                        AGREGAR ESTABLECIMIENTO
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
                                    <li><a href="#listadoEstablecimientoTab" class="active" data-bs-toggle="tab"
                                            id="ListadoEstablecimiento">Listado</a></li>
                                    <li><a href="#registrarEstablecimientoTab" data-bs-toggle="tab"
                                            id="RegistrarEstablecimiento">Registro</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="panel-body tabs-menu-body">
                            <div class="tab-content">
                                <!-- LISTADO TAB -->
                                <div class="tab-pane active" id="listadoEstablecimientoTab">
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
                                                    <tr v-for="(item, index) in listEstablecimiento"
                                                        :key="'item-' + index" v-if="listEstablecimiento.length != 0">
                                                        <th scope="row">{{ indexMethod(index) }}</th>
                                                        <td>{{ item.id }}</td>
                                                        <td>{{ item.nombre }}</td>
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
                                <div class="tab-pane" id="registrarEstablecimientoTab">
                                    <div class="modal-body">
                                        <div>
                                            <div class="form-group">
                                                <label>ID</label>
                                                <input type="text" class="form-control" placeholder="ID"
                                                    v-model="establecimiento.id" disabled />
                                            </div>
                                            <div class="form-group">
                                                <label>Nombre</label>
                                                <input type="text" class="form-control" placeholder="Nombre"
                                                    v-model="establecimiento.nombre" />
                                            </div>

                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                                            Cerrar
                                        </button>
                                        <button type="button" class="btn btn-primary" @click="cargarAgregar()">
                                            Nuevo
                                        </button>
                                        <button type="button" class="btn btn-success" @click="guardarCambios()"
                                            :disabled="!establecimientoValid">
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
    name: "modalAddEstablecimiento",
    components: { SearchMultiselect },
    props: {
        certificatesSelect: {
            type: Object,
            default: null,
        }
    },
    data() {
        return {
            listEstablecimiento: [],
            indiceModificando: -1,           
            establecimiento: {},
            establecimientoBase: {
                id: 0,
                nombre: ""
            },
            buscador: {
                page_index: 1,
                page_size: 6,
                nombre: ""
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
       
    },
    computed: {
        establecimientoValid() {
            return (
                this.establecimiento.nombre != ""
            );
        },
    },

    methods: {
        cambiarTabRegistro() {
            document.getElementById("ListadoEstablecimiento").className = "active";
            document.getElementById("listadoEstablecimientoTab").className = "tab-pane active";
            document.getElementById("RegistrarEstablecimiento").className = "";
            document.getElementById("registrarEstablecimientoTab").className = "tab-pane";
        },
        cambiarTabEditar() {
            document.getElementById("ListadoEstablecimiento").className = "";
            document.getElementById("listadoEstablecimientoTab").className = "tab-pane";
            document.getElementById("RegistrarEstablecimiento").className = "active";
            document.getElementById("registrarEstablecimientoTab").className = "tab-pane active";
        },
        indexMethod(index) {
            return (this.buscador.page_index - 1) * 6 + (index + 1);
        },
        cambiarPagina: function (paginaDestino) {
            this.listaEstablecimiento(paginaDestino);
        },
        listaEstablecimiento: async function (pagina = 1) {
            this.buscador.page_index = pagina;
            var res = await this.ListarEstablecimiento(this.buscador);
         
            this.pagination.total = res.totalRegistros;
            this.pagination.perPage = res.registrosPorPagina;
            this.pagination.currentPage = res.paginaActual;
            this.listEstablecimiento = res.datos;
            this.totalPaginas = res.totalPaginas;
        },
        guardarCambios: async function () {
            var res = null;
            if (this.indiceModificando == -1) {
                res = await this.AgregarEstablecimiento(this.establecimiento);
            } else {
                res = await this.ModificarEstablecimiento(this.establecimiento);
            }
            if (res?.exito) {
                this.cambiarTabRegistro();
                this.listaEstablecimiento();
                this.establecimiento = { ...this.establecimientoBase };
                this.$emit("addEstablecimiento", res.datos.id);
                global._mensaje_exito(
                    "El Establecimiento se han guardado correctamente"
                );
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
                    var res = await this.EliminarEstablecimiento(this.establecimiento);
                    if (res?.exito) {
                        this.listaEstablecimiento();
                        global._mensaje_exito("Se ha eliminado");
                    }
                }
            );
        },
        ...mapActions({
            ModificarEstablecimiento: "_establecimiento/ModificarEstablecimiento",
            AgregarEstablecimiento: "_establecimiento/AgregarEstablecimiento",
            EliminarEstablecimiento: "_establecimiento/EliminarEstablecimiento",
            EstablecimientoDesplegable: "_establecimiento/EstablecimientoDesplegable",
            ListarEstablecimiento: "_establecimiento/ListarEstablecimiento",
        }),
        closeModal() {
            this.$emit('close');
        }
    },
    mounted() {
        this.cargarAgregar();
        this.listaEstablecimiento();
        global._cargar_tooltip("tooltip");
    },

};
</script>