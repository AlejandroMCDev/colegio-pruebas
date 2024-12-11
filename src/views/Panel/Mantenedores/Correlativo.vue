<template>
    <div class="card-header">
        <h3 class="card-title">Mantenedor Correlativo</h3>
    </div>
    <div class="card-body pb-2">
        <h3 class="text-left">Lista de Correlativo</h3>
        <div class="table-responsive">
            <table class="table" v-if="listaRegistros.length != 0">
                <thead>
                    <tr>
                        <th scope="col">Año</th>
                        <th scope="col">Certificado de Habilidad</th>
                        <th scope="col">Resolución</th>
                        <th scope="col">Traslado</th>
                        <th scope="col">TramiteDoc</th>
                        <th scope="col" class="text-center">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ listaRegistros.anio }}</td>
                        <td>{{ listaRegistros.certHabilidad }}</td>
                        <td>{{ listaRegistros.resolucion }}</td>
                        <td>{{ listaRegistros.traslado }}</td>
                        <td>{{ listaRegistros.tramiteDoc }}</td>
                        <td class="text-center">
                            <i class="fa fa-pencil mx-1 text-yellow" role="button" data-bs-toggle="modal"
                                data-bs-target="#staticBackdropMantenedorDecano"
                                @click="cargarVer(listaRegistros, index)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="staticBackdropMantenedorDecano" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                            Correlativo
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <i class="fa fa-close"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div>

                            <div class="form-group">
                                <label>Año</label>
                                <input type="number" class="form-control" v-model="correlativo.anio" ref="anio"
                                    :style="showAdvertise && correlativo.anio == '' ? 'border-color: #e23e3d;' : ''" />
                            </div>
                            <div class="form-group">
                                <label>Certificado de Habilidad</label>
                                <input type="number" class="form-control" v-model="correlativo.certHabilidad"
                                    ref="certHabilidad"
                                    :style="showAdvertise && correlativo.certHabilidad == '' ? 'border-color: #e23e3d;' : ''" />
                            </div>
                            <div class="form-group">
                                <label>Traslado</label>
                                <input type="number" class="form-control" v-model="correlativo.traslado" ref="traslado"
                                    :style="showAdvertise && correlativo.traslado == '' ? 'border-color: #e23e3d;' : ''" />
                            </div>
                            <div class="form-group">
                                <label>Resolución</label>
                                <input type="number" class="form-control" v-model="correlativo.resolucion"
                                    ref="resolucion"
                                    :style="showAdvertise && correlativo.resolucion == '' ? 'border-color: #e23e3d;' : ''" />
                            </div>
                            <div class="form-group">
                                <label>Resolución</label>
                                <input type="number" class="form-control" v-model="correlativo.tramiteDoc"
                                    ref="tramiteDoc"
                                    :style="showAdvertise && correlativo.tramiteDoc == '' ? 'border-color: #e23e3d;' : ''" />
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                            Cerrar
                        </button>
                        <button type="button" class="btn btn-success" @click="guardarCambios()">
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
//Librayr
import dayjs from "dayjs";
export default {
    data() {
        return {
            showAdvertise: false,
            nameNewFileSello: "",
            nameNewFileFirma: "",
            cqf: "",
            iprutaFiles: global.ruta_api,
            indiceModificando: -1,
            correlativo: {},
            correlativoBase: {
                anio: 0,
                certHabilidad: 0,
                traslado: 0,
                resolucion: 0,
                tramiteDoc: 0
            },
            listaRegistros: [],
            buscador: {
                page_index: 1,
                page_size: 10,
                nombre: "",
                anio: ""
            },
            totalPaginas: 0,
        };
    },
    methods: {
        ...mapActions({
            ObtenerCorrelativo: "_correlativo/ObtenerCorrelativo",
            ModificarCorrelativo: "_correlativo/ModificarCorrelativo"
        }),
        cargarVer: async function (item, index) {
            this.correlativo = { ...item };
            this.indiceModificando = index;
        },
        validarCorrelativo() {
            let valida = false;

            if (this.correlativo.anio == 0) {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.anio.focus();
                });
            } else if (this.correlativo.certHabilidad == 0) {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.certHabilidad.focus();
                });
            } else if (this.correlativo.traslado == 0) {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.traslado.focus();
                });
            } else if (this.correlativo.resolucion == 0) {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.resolucion.focus();
                });
            } else if (this.correlativo.tramiteDoc == 0) {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.tramiteDoc.focus();
                });
            }

            return valida;
        },
        guardarCambios: async function () {
            var res = null;
            if (this.indiceModificando == -1) {

            } else {
                let valor = this.validarCorrelativo();
                if (!valor) {
                    res = await this.ModificarCorrelativo(this.correlativo);
                }
            }
            if (res?.exito) {
                this.cargarRegistros();
                this.cerrarModal();
                global._mensaje_exito(
                    "Los cambios se han guardado correctamente"
                );
            }
        },
        cargarRegistros: async function () {

            var res = await this.ObtenerCorrelativo();           
            this.listaRegistros = res;

        },
        cerrarModal: function () {
            var modal = bootstrap.Modal.getInstance(
                document.getElementById("staticBackdropMantenedorDecano")
            );
            modal.hide();
        },
    },
    mounted() {
        this.cargarRegistros();
    },
};
</script>
