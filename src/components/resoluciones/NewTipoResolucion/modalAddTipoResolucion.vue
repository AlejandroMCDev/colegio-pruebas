<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                        AGREGAR TIPO DE RESOLUCIÓN
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
                                    <li><a href="#listadoTipoResolucionTab" class="active" id="ListadoTipoResolucion"
                                            data-bs-toggle="tab">Listado</a></li>
                                    <li><a href="#registrarTipoResolucionTab" data-bs-toggle="tab"
                                            id="RegistrarTipoResolucion">Registro</a></li>
                                </ul>
                            </div>
                        </div>


                        <div class="panel-body tabs-menu-body">
                            <div class="tab-content">
                                <!-- LISTADO TAB -->
                                <div class="tab-pane active" id="listadoTipoResolucionTab">
                                    <div class="col-md-12">
                                        <div class="table-responsive">
                                            <table
                                                class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>ID</th>
                                                        <th>Tipo Resolución</th>
                                                        <th>Opciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in listTipoResolucion"
                                                        :key="'item-' + index" v-if="listTipoResolucion.length != 0">
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
                                <div class="tab-pane" id="registrarTipoResolucionTab">
                                    <div class="modal-body">
                                        <div>
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="ID"
                                                    v-model="tiporesolucion.id" disabled />
                                            </div>
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="nombre"
                                                    v-model="tiporesolucion.nombre" />
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
                                            :disabled="!tipoResolucionValid">
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
import SearchMultiselect from "../../SearchMultiselect/SearchMultiselect.vue";
import global from "../../../global";
export default {
    name: "modalAddTipoResolucion",
    components: { SearchMultiselect },
    props: {
        certificatesSelect: {
            type: Object,
            default: null,
        }
    },
    data() {
        return {
            indiceModificando: -1,
            listTipoResolucion: [],
            tiporesolucion: {},
            tiporesolucionBase: {
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
        tipoResolucionValid() {
            return (
                this.tiporesolucion.nombre != ""
            );
        },
    },

    methods: {
        cambiarTabEditar() {
            document.getElementById("ListadoTipoResolucion").className = "";
            document.getElementById("listadoTipoResolucionTab").className = "tab-pane";
            document.getElementById("RegistrarTipoResolucion").className = "active";
            document.getElementById("registrarTipoResolucionTab").className = "tab-pane active";
        },
        cambiarTabRegistro() {
            document.getElementById("ListadoTipoResolucion").className = "active";
            document.getElementById("listadoTipoResolucionTab").className = "tab-pane active";
            document.getElementById("RegistrarTipoResolucion").className = "";
            document.getElementById("registrarTipoResolucionTab").className = "tab-pane";
        },
        indexMethod(index) {
            return (this.buscador.page_index - 1) * 6 + (index + 1);
        },
        cargarAgregar: function () {
            this.tiporesolucion = { ...this.tiporesolucionBase };
            this.indiceModificando = -1;
        },
        cargarVer: function (item, index) {
            this.tiporesolucion = { ...item };
            this.indiceModificando = index;
            this.cambiarTabEditar();
        },
        cargarEliminar: async function (item, index) {
            this.tiporesolucion = { ...item };
            global._swal_pregunta(
                "¿Está seguro que desea eliminar el registro?",
                async () => {
                    var res = await this.EliminarTipoResolucion(this.tiporesolucion);
                    if (res?.exito) {
                        this.listaTipoResolucion();
                        global._mensaje_exito("Se ha eliminado");
                    }
                }
            );
        },
        ...mapActions({
            ListarTipoResolucion: "_tipoResolucion/Listar",
            AgregarTipoResolucion: "_tipoResolucion/Agregar",
            ModificarTipoResolucion: "_tipoResolucion/Modificar",
            EliminarTipoResolucion: "_tipoResolucion/Eliminar"
        }),
        cambiarPagina: function (paginaDestino) {
            this.listaTipoResolucion(paginaDestino);
        },
        listaTipoResolucion: async function (pagina = 1) {
            this.buscador.page_index = pagina;
            var res = await this.ListarTipoResolucion(this.buscador);
            this.pagination.total = res.totalRegistros;
            this.pagination.perPage = res.registrosPorPagina;
            this.pagination.currentPage = res.paginaActual;
            this.listTipoResolucion = res.datos;
            this.totalPaginas = res.totalPaginas;
        },
        guardarCambios: async function () {
            var res = null;
            if (this.indiceModificando == -1) {
                res = await this.AgregarTipoResolucion(this.tiporesolucion);
            } else {
                res = await this.ModificarTipoResolucion(this.tiporesolucion);
            }
            if (res?.exito) {
                this.cambiarTabRegistro();
                this.listaTipoResolucion();
                this.tiporesolucion = { ...this.tiporesolucionBase };
                this.$emit("addTipoResolucion", res.datos.id);
                global._mensaje_exito(
                    "El Tipo de Resolución se han guardado correctamente"
                );
            }
        },
        closeModal() {
            this.$emit('close');
        }
    },
    mounted() {
        this.listaTipoResolucion();
        global._cargar_tooltip("tooltip");
    },

};
</script>