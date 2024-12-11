<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                        SEGUIMIENTO
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal()">
                        <i class="fa fa-close"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Nº Expediente</label>
                                <input type="text" class="form-control" placeholder="Nº Expediente"
                                    v-model="nroExpediente" disabled />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Estado</label>
                                <select class="form-control form-select" data-bs-placeholder="Estado"
                                    @change="verificarRegistroExistente()" v-model="movimiento.estadoExpediente"
                                    ref="comentario"
                                    :style="showAdvertise && movimiento.estadoExpediente == '' ? 'border-color: #e23e3d;' : ''">
                                    <option value="">Estado</option>
                                    <option value="SIN DERIVACION">SIN DERIVACION</option>
                                    <option value="EN TRAMITE">EN TRAMITE</option>
                                    <option value="PROCESADO">PROCESADO</option>
                                    <option value="OBSERVADO">OBSERVADO</option>
                                </select>

                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Fecha</label>
                                <input type="date" class="form-control" placeholder="Fecha"
                                    v-model="movimiento.fechaExpediente" ref="fechaExpediente"
                                    :style="showAdvertise && movimiento.fechaExpediente == '' ? 'border-color: #e23e3d;' : ''" />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Comentario/ Observación</label>
                                <textarea class="form-control mb-4" placeholder="Comentario/ Observación" rows="1"
                                    v-model="movimiento.comentario" ref="comentario"
                                    :style="showAdvertise && movimiento.comentario == '' ? 'border-color: #e23e3d;' : ''"></textarea>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <!-- data-bs-dismiss="modal" -->
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        Cerrar
                    </button>
                    <button type="button" class="btn btn-primary" @click="guardarCambios()"
                        :disabled="disabledButtonGuardar">
                        Guardar
                    </button>
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nº Expediente</th>
                                        <th>Estado</th>
                                        <th>Fecha</th>
                                        <th>Comentario</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in listaMovimientos" :key="'item-' + index"
                                        v-if="listaMovimientos.length != 0">
                                        <td scope="row">{{ indexMethod(index) }}</td>
                                        <td>{{ item.expediente_nroExpediente }}</td>
                                        <td>{{ item.estadoExpediente }}</td>
                                        <td>{{ item.fechaExpediente }}</td>
                                        <td>{{ item.comentario }}</td>
                                        <td class="text-center">
                                            <i class="fa fa-pencil mx-1 text-yellow" role="button"
                                                @click="cargarVer(item, index)"></i>
                                            <i class="fa fa-trash mx-1 text-danger" role="button"
                                                @click="cargarEliminar(item, index)"></i>
                                        </td>
                                    </tr>
                                    <tr v-else>
                                        <td colspan="6" class="text-center">Detalle Vacío
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="row">
                                <div class="pagination justify-content-center mt-1">
                                    <div class="dataTables_info" id="responsive-datatable_info" role="status"
                                        aria-live="polite">
                                        Showing {{ pagination.currentPage == 1 ? pagination.currentPage :
                                                pagination.perPage * pagination.currentPage - 1
                                        }} to
                                        {{ pagination.perPage * pagination.currentPage > pagination.total ?
                                                pagination.total : pagination.perPage * pagination.currentPage
                                        }} of
                                        {{ pagination.total }} entries</div>
                                </div>
                                <div class="pagination justify-content-center mt-1">
                                    <button @click="cambiarPagina(1)" class="page-link btn btn-outline-info">
                                        Primero
                                    </button>
                                    <li class="page-item" v-for="(item, index) in totalPaginas" style="list-style: none"
                                        :key="index">
                                        <button href="#" @click="cambiarPagina(index + 1)" :class="
                                            buscador.page_index == index + 1
                                                ? 'page-link btn'
                                                : 'page-link btn btn-outline-info'
                                        "
                                            :style="buscador.page_index == index + 1 ? 'color: white; background-color: #36b9cc;' : ''">
                                            {{ index + 1 }}
                                        </button>
                                    </li>
                                    <button @click="cambiarPagina(totalPaginas)" class="page-link btn btn-outline-info">
                                        Último
                                    </button>
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
import global from "../../global";

//Librayr
import dayjs from "dayjs";

export default {
    name: "modalAddMovimiento",
    props: {
        expediente: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            disabledButtonGuardar: false,
            nroExpediente: "",
            showAdvertise: false,
            date: new Date(),
            currentDate: dayjs(this.date).format("YYYY-MM-DD  HH:mm:ss"),
            listaMovimientos: [],
            buscador: {
                page_index: 1,
                page_size: 2,
                idExpediente: 0
            },
            pagination: {
                perPage: 2,
                currentPage: 1,
                total: 0
            },
            totalPaginas: 0,
            movimiento: {},
            movimientoBase: {
                id: 0,
                idExpediente: 0,
                fechaExpediente: "",
                estadoExpediente: "",
                comentario: ""
            }
        };
    },
    watch: {
        expediente() {
            this.listarMovimientos();
            this.loadMovimiento();
        },
    },
    computed: {

    },
    methods: {
        loadMovimiento: function () {
            this.movimiento = { ...this.movimientoBase };
            this.movimiento.idExpediente = this.expediente.id;
            this.nroExpediente = this.expediente.nroExpediente;
            this.indiceModificando = -1;
        },
        indexMethod(index) {
            return (this.buscador.page_index - 1) * 2 + (index + 1);
        },
        cargarVer: async function (item, index) {

            let movimiento = {
                id: item.id
            }
            let res = await this.ObtenerMovimiento(movimiento);

            this.movimiento.id = res.id;
            this.movimiento.idExpediente = res.idExpediente;
            this.movimiento.fechaExpediente = res.fechaExpediente;
            this.movimiento.estadoExpediente = res.estadoExpediente;
            this.movimiento.comentario = res.comentario;

            this.indiceModificando = index;
            this.disabledButtonGuardar = false;

        },
        cambiarPagina: function (paginaDestino) {
            this.listarMovimientos(paginaDestino);
        },
        validarMovimiento() {
            let valida = false;

            if (this.movimiento.fechaExpediente == "") {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.fechaExpediente.focus();
                });
            } else if (this.movimiento.estadoExpediente == "") {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.estadoExpediente.focus();
                });
            } else if (this.movimiento.comentario == "") {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.comentario.focus();
                });
            }
            return valida;
        },
        verificarRegistroExistente: async function () {

            let buscador = {
                page_index: 1,
                page_size: 10,
                idExpediente: this.expediente.id
            };
            var res = await this.ListadoMovimiento(buscador);
            let registros = res.datos;
            let estadoExpediente = registros.find((movimiento) => movimiento.estadoExpediente === this.movimiento.estadoExpediente);
          
            if (estadoExpediente !== undefined) {
                global._mensaje_advertencia(
                    "Los datos ingresados, ya existen!"
                );
                this.disabledButtonGuardar = true;
            } else {
                this.disabledButtonGuardar = false;
            }
        },
        guardarCambios: async function () {
            var res = null;
            let valor = this.validarMovimiento();
            if (!valor) {
                if (this.indiceModificando == -1) {
                    res = await this.AgregarMovimiento(this.movimiento);
                } else {
                    res = await this.ModificarMovimiento(this.movimiento);
                }
            }

            if (res?.exito) {
                this.listarMovimientos();
                this.loadMovimiento();
                this.showAdvertise = false;
                global._mensaje_exito(
                    "Los cambios se han guardado correctamente"
                );
            }
        },
        cargarEliminar: async function (item, index) {
            let evento = {
                id: item.id
            };
            global._swal_pregunta(
                "¿Está seguro que desea eliminar el registro?",
                async () => {
                    var res = await this.EliminarMovimiento(evento);
                    if (res?.exito) {
                        this.listarMovimientos();
                        this.movimiento = { ...this.movimientoBase };
                        this.movimiento.idExpediente = this.expediente.id;
                        global._mensaje_exito("Se ha eliminado");
                    }
                }
            );
        },
        ...mapActions({
            ListadoMovimiento: "_movimiento_expediente/Listar",
            AgregarMovimiento: "_movimiento_expediente/Agregar",
            EliminarMovimiento: "_movimiento_expediente/Eliminar",
            ModificarMovimiento: "_movimiento_expediente/Modificar",
            ObtenerMovimiento: "_movimiento_expediente/Obtener"
        }),
        closeModal() {
            this.$emit('close');
        },
        async listarMovimientos(pagina = 1) {

            this.buscador.idExpediente = this.expediente.id;

            if (this.expediente.id != 0) {
                this.buscador.page_index = pagina;
                var res = await this.ListadoMovimiento(this.buscador);

                this.pagination.total = res.totalRegistros;
                this.pagination.perPage = res.registrosPorPagina;
                this.pagination.currentPage = res.paginaActual;
                this.listaMovimientos = res.datos;

                this.buscador.page_index = res.paginaActual;
                this.totalPaginas = res.totalPaginas;
            }

        },

    },
    mounted() {
        global._cargar_tooltip("tooltip");
    },
};
</script>