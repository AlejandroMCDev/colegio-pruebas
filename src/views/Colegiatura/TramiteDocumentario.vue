<template>
    <div class="card-header">
        <h3 class="card-title">Modulo Tramite Documentario</h3>
    </div>
    <div class="card-body pb-2">
        <div class="tab-menu-heading tab-menu-heading-boxed" style="border-bottom: 0 !important;">
            <div class="tabs-menu-boxed" style="float: right;width: 100%;">
                <!-- Tabs -->
                <ul class="nav panel-tabs" style="float: right;">
                    <li><a href="#registrarTab" class="active" data-bs-toggle="tab"
                            id="tabGeneralRegistrar">REGISTRAR</a>
                    </li>
                    <li><a href="#listadoTab" data-bs-toggle="tab" id="tabGeneralListado">LISTADO</a></li>
                </ul>
            </div>
        </div>
        <!-- DATOS GENERALES -->
        <div class="panel-body tabs-menu-body">
            <div class="tab-content">
                <div class="tab-pane active" id="registrarTab">
                    <div class="form-label mt-0 p-0"> <button type="button" class="btn btn-primary"
                            @click="loadExpediente()"><i class="fe fe-file me-2"></i>Nuevo</button></div>
                    <div class="row">

                        <div class="col-md-12 row">
                            <div class="mb-5 p-4 br-5">
                                <div class="row">
                                    <div class="col-9">
                                        <div class="form-label mt-0 p-0">DATOS DEL SOLICITANTE</div>
                                    </div>
                                    <div class="col-3">
                                        <div class="form-label mt-0 p-0"> <input type="text" class="form-control"
                                                placeholder="Nº Expediente" v-model="expediente.nroExpediente"
                                                ref="nroExpediente" readonly
                                                :style="showAdvertise && expediente.nroExpediente == '' ? 'border-color: #e23e3d;' : ''">
                                        </div>
                                    </div>
                                </div>

                                <br />
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Tipo Documento</label>
                                            <select class="form-control form-select" data-bs-placeholder="Tipo Doc"
                                                v-model="expediente.persona_idTipoDocumento"
                                                @change="validaNumeroDocumento" ref="persona_idTipoDocumento"
                                                :style="showAdvertise && expediente.persona_idTipoDocumento == null ? 'border-color: #e23e3d;' : ''">
                                                <option value=null>Tipo Doc</option>
                                                <option v-for="item in tipoDocumentoDesplegable" :key="item.id"
                                                    :label="item.nombre" :value="item.id">
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Nº Documento</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" placeholder="Nº Documento"
                                                    aria-label="Example text with button addon"
                                                    aria-describedby="button-addon1"
                                                    @keypress.enter="verificarTipoDocumento()"
                                                    @input="verificarTipoDocumento()" ref="persona_nroDocumento"
                                                    :style="showAdvertise && expediente.persona_nroDocumento == '' ? 'border-color: #e23e3d;' : ''"
                                                    v-model="expediente.persona_nroDocumento"
                                                    :maxlength="maxlengthTipoDocumento">
                                                <button type="button" class="btn btn-primary"
                                                    @click="verificarTipoDocumento()"><i
                                                        class="fe fe-search me-2"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Nombre o Razón Social</label>
                                            <input type="text" class="form-control" placeholder="Nombre o Razón Social"
                                                ref="persona_nombre"
                                                :style="showAdvertise && expediente.persona_nombre == '' ? 'border-color: #e23e3d;' : ''"
                                                v-model="expediente.persona_nombre" :readonly=readonly>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Apellido Paterno</label>
                                            <input type="text" class="form-control" placeholder="Apellido Paterno"
                                                ref="persona_apellidoPaterno"
                                                :style="showAdvertise && expediente.persona_apellidoPaterno == '' ? 'border-color: #e23e3d;' : ''"
                                                v-model="expediente.persona_apellidoPaterno" :readonly=readonly>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Apellido Materno</label>
                                            <input type="text" class="form-control" placeholder="Apellido Materno"
                                                ref="persona_apellidoMaterno"
                                                :style="showAdvertise && expediente.persona_apellidoMaterno == '' ? 'border-color: #e23e3d;' : ''"
                                                v-model="expediente.persona_apellidoMaterno" :readonly=readonly>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input type="text" class="form-control" placeholder="Email"
                                                v-model="expediente.persona_email" :readonly=readonly>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Telefono o Celular</label>
                                            <input type="text" class="form-control" placeholder="Telefono o Celular"
                                                v-model="expediente.persona_celular" :readonly=readonly>
                                        </div>
                                    </div>                                   
                                </div>
                                <div class="form-label mt-0 p-0">TRAMITE DOCUMENTARIO</div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <SearchMultiselect :value="expediente.idTramite"
                                                v-model="expediente.idTramite" :options="tramiteDesplegable"
                                                placeholder="Tramite Documentario" :searchable="true" ref="idTramite"
                                                :style="showAdvertise && expediente.idTramite == 0 ? 'border-color: #e23e3d;' : ''" />

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <SearchMultiselect :value="expediente.idTipoExpediente"
                                                v-model="expediente.idTipoExpediente"
                                                :options="tipoExpedienteDesplegable" placeholder="Tipo Expediente"
                                                :searchable="true" ref="idTipoExpediente"
                                                :style="showAdvertise && expediente.idTipoExpediente == 0 ? 'border-color: #e23e3d;' : ''" />

                                        </div>
                                    </div>
                                </div>
                                <div class="form-label mt-0 p-0">OBSERVACIONES Y FOLIO</div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <textarea class="form-control mb-4" placeholder="Asunto(Opcional)" rows="4"
                                                v-model="expediente.asunto"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Nº Folio"
                                                v-model="expediente.nroFolio" ref="nroFolio"
                                                :style="showAdvertise && expediente.nroFolio == '' ? 'border-color: #e23e3d;' : ''">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-label mt-0 p-0">ARCHIVOS ADJUNTOS</div>
                                <div class="row">
                                    <div class="col-md-10 mb-3" style="text-align: center;">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Documento" readonly
                                                v-model="nombrearchivo" />
                                            <input type="file" class="form-control" placeholder="Documento" id="files"
                                                name="document_files[]" style="display: none" />
                                            <button type="button" class="btn btn-dark" @click="openDocumentFile()"><i
                                                    class="fe fe-upload me-2"></i></button>
                                        </div>
                                    </div>
                                    <div class="col-md-2 mb-3" style="text-align: left;">
                                        <button type="button" class="btn btn-primary"
                                            @click="addDocumentFile()">Agregar</button>
                                    </div>
                                    <br />
                                    <div class="col-md-12">
                                        <div class="table-responsive">
                                            <table
                                                class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Documento</th>
                                                        <th>Opciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(document_file, index) in expediente.multimedia"
                                                        :key="'document_files-' + index"
                                                        v-if="expediente.multimedia != 0">
                                                        <td style="display:none">{{ document_file.id }}</td>
                                                        <td>{{ document_file.nombre }}</td>
                                                        <td>{{ document_file.nombre }}</td>
                                                        <td style="display:none">{{ document_file.estado }}</td>
                                                        <td>
                                                            <div class="btn-list">
                                                                <button type="button"
                                                                    @click="openurlArchivo(document_file)"
                                                                    class="btn btn-sm btn-primary"
                                                                    v-show="document_file.id != 0">
                                                                    <span class="fe fe-eye"> </span>
                                                                </button>
                                                                <button type="button" class="btn  btn-sm btn-danger"
                                                                    @click="deleteDocumentFile(document_file, index)">
                                                                    <span class="fe fe-trash-2"> </span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr v-else>
                                                        <td colspan="5" class="text-center">Detalle Vacío
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
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <button class="btn btn-primary m-2" type="button" @click="loadExpediente()">Cancelar</button>
                            <button class="btn btn-primary" type="button" @click="guardarCambios()">Guardar</button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane" id="listadoTab">
                    <div class="mb-5 p-4 br-5">
                        <div class="form-label mt-0 p-0">DATOS DEL SOLICITANTE</div>
                        <div class="row">
                            <div class="col-md-5 mb-3" style="text-align: center;">
                                <SearchMultiselect :value="filtros.idTramite" v-model="filtros.idTramite"
                                    :options="tramiteDesplegable" placeholder="Tramite" :searchable="true" />
                            </div>
                            <div class="col-md-4 mb-3" style="text-align: center;">
                                <input type="text" class="form-control" placeholder="Nº Expediente"
                                    v-model="filtros.nroExpediente" />
                            </div>
                            <div class="col-md-3 mb-3" style="text-align: left;">
                                <button type="button" class="btn btn-primary" @click="listarExpediente()"
                                    style="margin: 2px;">
                                    <i class="fe fe-search me-2"></i>Buscar</button>
                                <button type="button" class="btn btn-primary" @click="nuevoTramite()">
                                    <i class="fe fe-file me-2"></i>Nuevo</button>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-12">
                                <div class="table-responsive">
                                    <table class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Expediente</th>
                                                <th>F. Registro</th>
                                                <th>T. Expediente</th>
                                                <th>Sumilla</th>
                                                <th>DNI</th>
                                                <th>Solicitante</th>
                                                <!-- <th>Estado</th> -->
                                                <th>Opciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in listadoExpediente" :key="'item-' + index"
                                                v-if="listadoExpediente.length != 0">
                                                <td scope="row">{{ indexMethod(index) }}</td>
                                                <td>{{ item.nroExpediente }}</td>
                                                <td>{{ item.fechaRegistro }}</td>
                                                <td>{{ item.tipoExpediente_nombre }}</td>
                                                <td>
                                                    <span data-bs-placement="top" data-bs-toggle="tooltip"
                                                        :title=item.asunto>
                                                        <p class="overflow-ellipsis">{{
                                                                item.asunto
                                                        }}</p>
                                                    </span>
                                                </td>
                                                <td>{{ item.persona_nroDocumento }}</td>
                                                <td>{{ item.persona_nombre }} {{ item.persona_apellidoPaterno }}
                                                    {{ item.persona_apellidoMaterno }}</td>
                                                <!-- <td></td> -->
                                                <td class="text-center">
                                                    <i class="fa fa-pencil mx-1 text-yellow" role="button"
                                                        @click="cargarVer(item, index)"></i>
                                                    <i class="fa fa-folder-open mx-1 text-primary" role="button"
                                                        data-bs-toggle="modal" @click="cargarMovimientos(item, index)"
                                                        data-bs-target="#modalAddMovimiento"></i>
                                                    <i class="fa fa-trash mx-1 text-danger" role="button"
                                                        @click="cargarEliminar(item, index)"></i>
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <td colspan="5" class="text-center">Ningun registro encontrado
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="row">
                                        <div class="pagination justify-content-center mt-3">
                                            <div class="dataTables_info" id="responsive-datatable_info" role="status"
                                                aria-live="polite">
                                                Showing {{ pagination.currentPage == 1 ? pagination.currentPage
                                                        :
                                                        pagination.perPage * pagination.currentPage - 9
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                }} to
                                                {{ pagination.perPage * pagination.currentPage >
                                                        pagination.total ?
                                                        pagination.total : pagination.perPage * pagination.currentPage
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                }} of
                                                {{ pagination.total }} entries</div>
                                        </div>
                                        <div class="pagination justify-content-center mt-3">
                                            <button @click="cambiarPagina(1)" class="page-link btn btn-outline-info">
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
                    </div>
                </div>
            </div>
        </div>

    </div>
    <modal-add-movimiento id="modalAddMovimiento" :expediente="expediente" />

</template>

<script>
import { mapActions } from "vuex";
import global from "../../global";
import SearchMultiselect from "../../components/SearchMultiselect/SearchMultiselect.vue";
import modalAddMovimiento from "../../components/expediente/modalAddMovimiento.vue";
//Librayr
import dayjs from "dayjs";
export default {
    name: "TramiteDocumentario",
    components: { SearchMultiselect, modalAddMovimiento },
    data() {
        return {
            date: new Date(),
            currentDate: dayjs(this.date).format("YYYY-MM-DD"),
            maxlengthTipoDocumento: 1,
            readonly: true,
            expediente: [],
            showAdvertise: false,
            iprutaFiles: global.ruta_api,
            nombrearchivo: "",
            archivo: "",
            document_files: [],
            tipoExpedienteDesplegable: [],
            tipoDocumentoDesplegable: [],
            tramiteDesplegable: [],
            listadoExpediente: [],
            filtros: {
                idTramite: "",
                nroExpediente: ""
            },
            buscador: {
                page_index: 1,
                page_size: 10,
                idTramite: "",
                nroExpediente: ""
            },
            pagination: {
                perPage: 10,
                currentPage: 1,
                total: 0
            },
            totalPaginas: 0,
            indiceModificando: -1,
            expediente: {},
            expedienteBase: {
                id: 0,
                idTramite: 0,
                idTipoExpediente: 0,
                nroExpediente: "",
                nroFolio: "",
                asunto: "",
                persona_id: null,
                persona_idTipoDocumento: null,
                persona_nroDocumento: "",
                persona_nombre: "",
                persona_apellidoPaterno: "",
                persona_apellidoMaterno: "",
                persona_email: "",
                persona_celular: "",
                multimedia: []
            },
        };
    },
    methods: {
        indexMethod(index) {
            return (this.buscador.page_index - 1) * 10 + (index + 1);
        },
        cargarMovimientos(item, index) {
            this.expediente = item;
        },
        nuevoTramite() {
            this.loadExpediente();
            this.cambiarTab();
        },
        cargarEliminar: async function (item, index) {
            let expediente = {
                id: item.id
            };
            global._swal_pregunta(
                "¿Está seguro que desea eliminar el registro?",
                async () => {
                    var res = await this.EliminarExpediente(expediente);
                    if (res?.exito) {
                        this.listarExpediente();
                        this.expediente = { ...this.expedienteBase };
                        global._mensaje_exito("Se ha eliminado");
                    }
                }
            );
        },
        cargarVer: async function (item, index) {

            let expediente = {
                id: item.id,
                nroExpediente: ""
            }
            let res = await this.ObtenerExpediente(expediente);

            this.expediente.id = res.id;
            this.expediente.persona_id = res.persona_id;
            this.expediente.persona_idTipoDocumento = res.tipoDocumento_id;
            this.expediente.persona_nroDocumento = res.persona_nroDocumento;
            this.expediente.persona_nombre = res.persona_nombre;
            this.expediente.persona_apellidoPaterno = res.persona_apellidoPaterno;
            this.expediente.persona_apellidoMaterno = res.persona_apellidoMaterno;
            this.expediente.persona_email = res.persona_email;
            this.expediente.persona_celular = res.persona_celular;
            this.expediente.asunto = res.asunto;
            this.expediente.nroExpediente = res.nroExpediente;
            this.expediente.nroFolio = res.nroFolio;
            this.expediente.idTipoExpediente = res.tipoExpediente_id;
            this.expediente.idTramite = res.tramite_id;

            let multimedia = {
                page_index: 1,
                page_size: 30,
                nombre: "",
                idExpediente: item.id
            }

            let res_multimedia = await this.ListarMultimedia(multimedia);
            let multimedia_update = {};

            res_multimedia.datos.forEach(multimedia => {
                multimedia_update = {
                    id: multimedia.id,
                    nombre: multimedia.nombre,
                    url: multimedia.url,
                    estado: 1
                };
                this.expediente.multimedia.push(multimedia_update);
            });

            this.indiceModificando = index;
            this.cambiarTab();
        },
        validarExpediente() {
            let valida = false;

            if (this.expediente.idTramite == 0) {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.idTramite.$el.focus();
                });
            } else if (this.expediente.idTipoExpediente == 0) {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.idTipoExpediente.$el.focus();
                });
            } else if (this.expediente.nroExpediente == "") {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.nroExpediente.focus();
                });
            } else if (this.expediente.nroFolio == "") {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.nroFolio.focus();
                });
            } else if (this.expediente.persona_idTipoDocumento == null) {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.persona_idTipoDocumento.focus();
                });
            } else if (this.expediente.persona_nroDocumento == "") {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.persona_nroDocumento.focus();
                });
            }
            return valida;
        },
        validarNuevaPersona() {

            let valida = false;
            if (this.readonly == false) {
                if (this.expediente.persona_nombre == "") {
                    this.showAdvertise = true;
                    valida = true;
                    setTimeout(() => {
                        this.$refs.persona_nombre.focus();
                    });
                } else if (this.expediente.persona_apellidoPaterno == "") {
                    this.showAdvertise = true;
                    valida = true;
                    setTimeout(() => {
                        this.$refs.persona_apellidoPaterno.focus();
                    });
                } else if (this.expediente.persona_apellidoMaterno == "") {
                    this.showAdvertise = true;
                    valida = true;
                    setTimeout(() => {
                        this.$refs.persona_apellidoMaterno.focus();
                    });
                }

            }

            return valida;
        },
        primerMovimientoTramite: async function (idExpediente) {
            let movimiento = {
                comentario: "SIN DERIVACION",
                estadoExpediente: "SIN DERIVACION",
                fechaExpediente: this.currentDate,
                id: 0,
                idExpediente: idExpediente
            }
            let res = await this.AgregarMovimiento(movimiento);
        },
        guardarCambios: async function () {
            var res = null;
            let validaExpediente = this.validarExpediente();
            let validaPersona = this.validarNuevaPersona();

            if (!validaExpediente) {
                if (!validaPersona) {
                    if (this.indiceModificando == -1) {
                        res = await this.AgregarExpediente(this.expediente);
                        this.primerMovimientoTramite(res.datos.id);
                    } else {
                        res = await this.ModificarExpediente(this.expediente);
                    }
                }
            }

            if (res?.exito) {
                this.cargarCorrelativo();
                this.showAdvertise = false;
                this.loadExpediente();
                this.listarExpediente();
                global._mensaje_exito(
                    "Los cambios se han guardado correctamente"
                );

                document.getElementById("tabGeneralRegistrar").className = "";
                document.getElementById("registrarTab").className = "tab-pane";
                document.getElementById("tabGeneralListado").className = "active";
                document.getElementById("listadoTab").className = "tab-pane active";
            }
        },
        async addDocumentFile() {
            let archivo = {
                archivo: this.archivo
            }
            let res = await this.GenerarUrl(archivo);

            let multimedia =
            {
                id: 0,
                nombre: res.datos.nombre,
                url: res.datos.url,
                estado: 1
            };

            this.expediente.multimedia.push(multimedia);

            this.nombrearchivo = "";
            this.archivo = "";
        },
        async deleteDocumentFile(item, index) {
            if (item.id != 0) {
                let multimedia = {
                    id: item.id
                };
                global._swal_pregunta(
                    "¿Está seguro que desea eliminar el registro?",
                    async () => {
                        var res = await this.EliminarMultimedia(multimedia);
                        if (res?.exito) {
                            this.expediente.multimedia.splice(index, 1);
                            global._mensaje_exito("Se ha eliminado");
                        }
                    }
                );
            } else {
                this.expediente.multimedia.splice(index, 1);
            }
        },
        openurlArchivo(document_file) {
            window.open(
                this.iprutaFiles + "" + document_file.url,
                "_blank"
            );
        },
        openDocumentFile() {
            const inputFile = document.getElementById("files");
            inputFile.click();
        },
        setupFileInput() {
            document
                .getElementById("files")
                .addEventListener("change", this.fileUpload, false);
        },
        fileUpload(evt) {
            this.nombrearchivo = evt.target.files[0].name;
            this.archivo = evt.target.files[0];
        },
        comboTipoDocumento: async function () {
            var res = await this.TipoDocumentoDesplegable();
            this.tipoDocumentoDesplegable = res;
        },
        cambiarPagina: function (paginaDestino) {
            this.listarExpediente(paginaDestino);
        },
        ...mapActions({
            AgregarExpediente: "_sistram/AgregarExpediente",
            ModificarExpediente: "_sistram/ModificarExpediente",
            EliminarExpediente: "_sistram/EliminarExpediente",
            ListarExpediente: "_sistram/ListarExpediente",
            TramiteDesplegable: "_tramite/TramiteDesplegable",
            TipoExpedienteDesplegable: "_tipoExpediente/TipoExpedienteDesplegable",
            TipoDocumentoDesplegable: "_colegiado/TipoDocumentoDesplegable",
            ObtenerColegiado: "_colegiado/ObtenerColegiado",
            ObtenerExpediente: "_sistram/ObtenerExpediente",
            ListarMultimedia: "_multimedia/ListarMultimedia",
            EliminarMultimedia: "_multimedia/EliminarMultimedia",
            GenerarUrl: "_multimedia/GenerarUrl",
            AgregarMovimiento: "_movimiento_expediente/Agregar",
            ObtenerCorrelativo: "_correlativo/ObtenerCorrelativo",
        }),
        verificarDNI: async function () {

            let persona = {
                id: 0,
                dni: this.expediente.persona_nroDocumento,
                cqf: null
            }
            let res = await this.ObtenerColegiado(persona);

            if (res != null) {
                this.expediente.persona_id = res.id;
                this.expediente.persona_nombre = res.nombres;
                this.expediente.persona_apellidoPaterno = res.apellidoPaterno;
                this.expediente.persona_apellidoMaterno = res.apellidoMaterno;
                this.expediente.persona_email = res.correo;
                this.expediente.persona_celular = res.celular;
                this.readonly = true;
            } else {
                this.readonly = false;
                this.limpiarPersona();
                global._mensaje_advertencia(
                    "Datos Ingresados no existen, gracias."
                );
            }

        },
        validaNumeroDocumento() {
            if (this.expediente.persona_idTipoDocumento == 1) {
                this.$refs.persona_nroDocumento.focus();
                this.maxlengthTipoDocumento = 8;
                this.expediente.persona_nroDocumento = "";
                this.limpiarPersona();
            } else if (this.expediente.persona_idTipoDocumento == 2) {
                this.$refs.persona_nroDocumento.focus();
                this.maxlengthTipoDocumento = 11;
                this.expediente.persona_nroDocumento = "";
                this.limpiarPersona();
            }
        },
        limpiarPersona() {
            this.expediente.persona_id = null;
            this.expediente.persona_nombre = "";
            this.expediente.persona_apellidoPaterno = "";
            this.expediente.persona_apellidoMaterno = "";
            this.expediente.persona_email = "";
            this.expediente.persona_celular = "";
        },
        verificarTipoDocumento() {

            if (this.expediente.persona_idTipoDocumento == 1) {
                if (this.expediente.persona_nroDocumento.length == 8) {
                    this.verificarDNI();
                }
            } else if (this.expediente.persona_idTipoDocumento == 2) {
                if (this.expediente.persona_nroDocumento.length == 11) {
                    this.verificarDNI();
                }
            } else {
                this.$refs.persona_idTipoDocumento.focus();
                global._mensaje_advertencia(
                    "Seleccione el tipo de documento."
                );
            }
        },
        loadExpediente: function () {
            this.expediente = { ...this.expedienteBase };
            this.expediente.multimedia = [];
            this.cargarCorrelativo();
            this.showAdvertise = false;
            this.indiceModificando = -1;
        },
        listarExpediente: async function (pagina = 1) {

            this.buscador.page_index = pagina;

            if (this.filtros.idTramite == null) {
                this.filtros.idTramite = "";
            }
            this.buscador.idTramite = this.filtros.idTramite;
            this.buscador.nroExpediente = this.filtros.nroExpediente;

            var res = await this.ListarExpediente(this.buscador);
            this.pagination.total = res.totalRegistros;
            this.pagination.perPage = res.registrosPorPagina;
            this.pagination.currentPage = res.paginaActual;

            this.listadoExpediente = res.datos.map(el => ({
                ...el,
                fechaRegistro: dayjs(el.fechaRegistro).format(
                    "DD-MM-YYYY, H:mm A"
                )
            }));

            this.buscador.page_index = res.paginaActual;
            this.totalPaginas = res.totalPaginas;
        },
        comboTramite: async function () {
            var res = await this.TramiteDesplegable();
            this.tramiteDesplegable = res.map(item => {
                return { label: item.nombre, value: item.id };
            });
        },
        comboTipoExpediente: async function () {
            var res = await this.TipoExpedienteDesplegable();
            this.tipoExpedienteDesplegable = res.map(item => {
                return { label: item.nombre, value: item.id };
            });
        },
        cambiarTab() {
            document.getElementById("tabGeneralRegistrar").className = "active";
            document.getElementById("registrarTab").className = "tab-pane active";
            document.getElementById("tabGeneralListado").className = "";
            document.getElementById("listadoTab").className = "tab-pane";
        },
        cargarCorrelativo: async function () {
            var res = await this.ObtenerCorrelativo();
            this.expediente.nroExpediente = res.tramiteDoc;
        }
    },
    mounted() {
        this.setupFileInput();
        this.comboTipoDocumento();
        this.comboTipoExpediente();
        this.loadExpediente();
        this.comboTramite();
        this.listarExpediente();
        this.cargarCorrelativo();
        global._cargar_tooltip("tooltip");
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
