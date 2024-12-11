<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                        LISTA DE PARTICIPANTES
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal()">
                        <i class="fa fa-close"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>CQF</th>
                                        <th>Persona</th>
                                        <th>Asistencia</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in listaParticipantes" :key="'item-' + index"
                                        v-if="listaParticipantes.length != 0">
                                        <td scope="row">{{ indexMethod(index) }}</td>
                                        <td>{{ item.persona_cqf }}</td>
                                        <td>{{ item.persona }}</td>
                                        <td>{{ item.asistencia }}</td>
                                        <td class="text-center">
                                            <i class="fa fa-trash mx-1 text-danger" role="button"
                                                @click="cargarEliminar(item, index)"></i>
                                        </td>
                                    </tr>
                                    <tr v-else>
                                        <td colspan="5" class="text-center">Detalle Vacío
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="row">
                                <div class="pagination justify-content-center mt-1">
                                    <div class="dataTables_info" id="responsive-datatable_info" role="status"
                                        aria-live="polite">
                                        Showing {{ pagination.currentPage == 1 ? pagination.currentPage :
                                                pagination.perPage * pagination.currentPage - 9
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
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        Cerrar
                    </button>
                    <input type="file" id="files" style="display: none" />
                    <button type="button" class="btn btn-primary" @click="openDocumentFile"><i
                            class="fe fe-upload me-2"></i>
                        Validar Asistencia
                    </button>
                    <button type="button" class="btn btn-success" @click="listarColegiadosCQF()">
                        Procesar Participantes
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import * as XLSX from 'xlsx/xlsx.mjs';
import global from "../../global";

//Librayr
import dayjs from "dayjs";

export default {
    name: "modalAddParticipantes",
    props: {
        idEvento: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            date: new Date(),
            currentDate: dayjs(this.date).format("YYYY-MM-DD  HH:mm:ss"),
            listaAsistencia: [],
            listaParticipantes: [],
            listaParticipantesEvento: [],
            buscador: {
                page_index: 1,
                idEvento: 0
            },
            pagination: {
                perPage: 10,
                currentPage: 1,
                total: 0
            },
            totalPaginas: 0,
            //evento: {},
            evento: {
                idEvento: 0,
                participantes: []
            }
        };
    },
    watch: {
        idEvento(idEvento) {
            this.listarParticipantes();
        },
    },
    computed: {

    },
    methods: {
        openDocumentFile() {
            const inputFile = document.getElementById("files");
            inputFile.click();
        },
        loadParticipantesEvento: function () {
            this.evento = { ...this.eventoBase };
        },
        indexMethod(index) {
            return (this.buscador.page_index - 1) * 10 + (index + 1);
        },
        cambiarPagina: function (paginaDestino) {
            this.listarParticipantes(paginaDestino);
        },
        cargarEliminar: async function (item, index) {
            let evento = {
                idEvento: item.idEvento,
                idPersona: item.idPersona
            };
            global._swal_pregunta(
                "¿Está seguro que desea eliminar el registro?",
                async () => {
                    var res = await this.EliminarParticipante(evento);
                    if (res?.exito) {
                        this.listarParticipantes();
                        global._mensaje_exito("Se ha eliminado");
                    }
                }
            );
        },
        ...mapActions({
            ListadoParticipantes: "_controlEvento/ListadoParticipantes",
            AgregarModificarParticipante: "_controlEvento/AgregarModificarParticipante",
            EliminarParticipante: "_controlEvento/EliminarParticipante",
            ListadoColegiadoCQF: "_colegiado/ListadoColegiadoCQF"
        }),
        async listarColegiadosCQF() {
            let res_listado = await this.ListadoColegiadoCQF();

            let participantes = {
                cqf: "",
                asistencia: 0,
                fechaIngreso: ""
            };
            this.evento.idEvento = this.idEvento;
            res_listado.forEach(colegiados => {
                participantes = {
                    cqf: colegiados.cqfll,
                    asistencia: 0,
                    fechaIngreso: this.currentDate
                };
                this.evento.participantes.push(participantes);
            });

            let res = await this.AgregarModificarParticipante(this.evento);
            if (res?.exito) {
                this.listarParticipantes();
                global._mensaje_exito(
                    "Los cambios se han guardado correctamente, " + res.mensaje + " participantes"
                );
                this.evento.participantes = [];
            }
        },
        listarParticipantes: async function (pagina = 1) {
            this.buscador.page_index = pagina;
            this.buscador.idEvento = this.idEvento;
            var res = await this.ListadoParticipantes(this.buscador);
            this.pagination.total = res.totalRegistros;
            this.pagination.perPage = res.registrosPorPagina;
            this.pagination.currentPage = res.paginaActual;
            this.listaParticipantes = res.datos;

            this.buscador.page_index = res.paginaActual;
            this.totalPaginas = res.totalPaginas;
        },
        closeModal() {
            this.$emit('close');
        },
        setupFileInput() {
            document
                .getElementById("files")
                .addEventListener("change", this.fileUpload, false);
        },
        async listarParticipantesEvento() {
            const buscador = {
                page_index: 1,
                page_size: 999999,
                idEvento: this.idEvento
            }
            var res = await this.ListadoParticipantes(buscador);
            this.listaParticipantesEvento = res.datos;
        },
        async fileUpload(e) {
            var files = e.target.files, f = files[0];
            var reader = new FileReader();
            let participantes = {
                cqf: "",
                asistencia: 0
            };

            reader.onload = async function (e) {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, { type: 'array' });
                let sheetName = workbook.SheetNames[0]
                let worksheet = workbook.Sheets[sheetName];
                let json = XLSX.utils.sheet_to_json(worksheet);

                json.forEach(asistencia => {
                    participantes = {
                        cqf: asistencia.CQF,
                        asistencia: asistencia.Asistencia
                    };
                    this.listaAsistencia.push(participantes);
                });

                localStorage.setItem("asistencia", JSON.stringify(this.listaAsistencia));
            }.bind(this);
            reader.readAsArrayBuffer(f);

            let asistencia = JSON.parse(localStorage.getItem("asistencia"));

            let asistenciaParticipantes = {
                cqf: "",
                asistencia: 0,
                fechaIngreso: ""
            };

            this.evento.idEvento = this.idEvento;
            await this.listarParticipantesEvento();
           
            for (let participantes of this.listaParticipantesEvento) {
                for (let asist of asistencia) {
                    if (participantes.persona_cqf === asist.cqf) {
                        asistenciaParticipantes = {
                            cqf: participantes.persona_cqf,
                            asistencia: 1,
                            fechaIngreso: participantes.fechaIngreso
                        };
                        break;
                    } else {
                        asistenciaParticipantes = {
                            cqf: participantes.persona_cqf,
                            asistencia: 0,
                            fechaIngreso: participantes.fechaIngreso
                        };
                    }
                }
                this.evento.participantes.push(asistenciaParticipantes);
            }

            let res = await this.AgregarModificarParticipante(this.evento);
            if (res?.exito) {
                this.listarParticipantes();
                global._mensaje_exito(
                    "Los cambios se han guardado correctamente, " + res.mensaje + " participantes"
                );
                this.evento.participantes = [];
            }
        },
    },
    mounted() {
      
        this.setupFileInput();
        this.listarParticipantes();
        global._cargar_tooltip("tooltip");
    },
};
</script>