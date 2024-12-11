<template>
    <div class="card-header">
        <h3 class="card-title">Mantenedor Documentos</h3>
    </div>
    <div class="card-body pb-2">
        <h3 class="text-center">Lista de Documentos</h3>
        <div class="text-center">
            <button
                class="btn btn-primary m-2"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropMantenedorDocumento"
                @click="cargarAgregar()"
            >
                Agregar
            </button>
        </div>
        <div class="table-responsive">
            <table class="table" v-if="listaDocumentos.length != 0">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">N° registro</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Persona</th>
                        <th scope="col">Documento</th>
                        <th scope="col" class="text-center">Ver</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in listaDocumentos" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ item.nro_registro }}</td>
                        <td>{{ item.fecha_txt }}</td>
                        <td>{{ item.persona }}</td>
                        <td>{{ item.documento }}</td>
                        <td class="text-center">
                            <i
                                class="fa fa-eye mx-1 text-primary"
                                role="button"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdropMantenedorDocumento"
                                @click="cargarVer(item, index)"
                            ></i>
                            <i
                                class="fa fa-trash mx-1 text-danger"
                                role="button"
                                @click="cargarEliminar(item, index)"
                            ></i>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination justify-content-center mt-2">
                <button
                    @click="cambiarPagina(1)"
                    class="page-link btn btn-outline-info"
                >
                    Primero
                </button>
                <li
                    class="page-item"
                    v-for="(item, index) in totalPaginas"
                    style="list-style: none"
                    :key="index"
                >
                    <button
                        href="#"
                        @click="cambiarPagina(index + 1)"
                        :class="
                            buscador.page_index == index + 1
                                ? 'page-link btn'
                                : 'page-link btn btn-outline-info'
                        "
                        :style="
                            buscador.page_index == index + 1
                                ? 'color: white; background-color: #36b9cc;'
                                : ''
                        "
                    >
                        {{ index + 1 }}
                    </button>
                </li>
                <button
                    @click="cambiarPagina(totalPaginas)"
                    class="page-link btn btn-outline-info"
                >
                    Último
                </button>
            </div>
        </div>
        <!-- Modal -->
        <div
            class="modal fade"
            id="staticBackdropMantenedorDocumento"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                            Documento
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        >
                            <i class="fa fa-close"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <h3 class="text-center">Detalle de Documento</h3>
                            <div class="form-group" v-if="indiceModificando != -1">
                                <label>Codigo</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    v-model="documento.cod_int"
                                    readonly
                                />
                            </div>
                            <div class="form-group">
                                <label>Numero de registro</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    v-model="documento.nro_registro"
                                />
                            </div>
                            <div class="form-group">
                                <label>Fecha</label>
                                <input
                                    type="datetime-local"
                                    class="form-control"
                                    v-model="documento.fecha"
                                />
                            </div>
                            <div class="form-group">
                                <label>Motivo</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="documento.motivo"
                                />
                            </div>
                            <div class="form-group">
                                <label>[postd]</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="documento.postd"
                                />
                            </div>
                            <div class="form-group">
                                <label>Tipo de resolución</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="documento.tipo_resolution"
                                />
                            </div>
                            <div class="form-group">
                                <label>Persona</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="documento.persona"
                                />
                            </div>
                            <div class="form-group">
                                <label>Documento</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="documento.documento"
                                />
                            </div>
                            <div class="form-group">
                                <label>Tramite</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="documento.tramite"
                                />
                            </div>
                            <div class="form-group">
                                <label>Archivo</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="documento.archivo"
                                />
                            </div>
                            <div class="form-group">
                                <label>Tipo</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="documento.tipo"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                        >
                            Cerrar
                        </button>
                        <button
                            type="button"
                            class="btn btn-success"
                            @click="guardarCambios()"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import global from "../../../global";
export default {
    data() {
        return {
            indiceModificando: -1,
            documento: {},
            documentoBase: {
                cod_int: 0,
                nro_registro: 0,
                fecha: "",
                motivo: "",
                postd: "",
                tipo_resolution: "",
                persona: "",
                documento: "",
                tramite: "",
                archivo: "",
                tipo: "",
            },
            listaDocumentos: [],
            buscador: {
                page_index: 1,
            },
            totalPaginas: 0,
        };
    },
    methods: {
        ...mapActions({
            ListarDocumentos: "_documento/ListarDocumentos",
            AgregarDocumento: "_documento/AgregarDocumento",
            ModificarDocumento: "_documento/ModificarDocumento",
            EliminarDocumento: "_documento/EliminarDocumento",
        }),
        cargarAgregar: function () {
            this.documento = { ...this.documentoBase };
            this.indiceModificando = -1;
        },
        cargarVer: function (item, index) {
            this.documento = { ...item };
            this.indiceModificando = index;
        },
        cargarEliminar: async function (item, index) {
            this.documento = { ...item };
            global._swal_pregunta(
                "¿Está seguro que desea eliminar el documento?",
                async () => {
                    var res = await this.EliminarDocumento(this.documento);
                    if (res?.exito) {
                        this.cargarDocumentos();
                        global._mensaje_exito("Se ha eliminado");
                    }
                }
            );
        },
        guardarCambios: async function () {
            var res = null;
            if (this.indiceModificando == -1) {
                res = await this.AgregarDocumento(this.documento);
            } else {
                res = await this.ModificarDocumento(this.documento);
            }
            if (res?.exito) {
                this.cargarDocumentos();
                this.cerrarModal();
                global._mensaje_exito(
                    "Los cambios se han guardado correctamente"
                );
            }
        },
        cargarDocumentos: async function (pagina = 1) {
            this.buscador.page_index = pagina;
            var res = await this.ListarDocumentos(this.buscador);
            this.listaDocumentos = res.datos;
            this.buscador.page_index = res.paginaActual;
            this.totalPaginas = res.totalPaginas;
        },
        cambiarPagina: function (paginaDestino) {
            this.cargarDocumentos(paginaDestino);
        },
        cerrarModal: function () {
            var modal = bootstrap.Modal.getInstance(
                document.getElementById("staticBackdropMantenedorDocumento")
            );
            modal.hide();
        },
    },
    mounted() {
        this.cargarDocumentos();
    },
};
</script>
