<template>
    <div class="card-header">
        <h3 class="card-title">Mantenedor Firma y Sello Decano</h3>
    </div>
    <div class="card-body pb-2">
        <h3 class="text-left">Lista de Registros</h3>
        <!-- <div class="text-left">
            <button class="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#staticBackdropMantenedorDecano"
                @click="cargarAgregar()">
                Agregar
            </button>
        </div> -->
        <div class="row">
            <div class="col-md-4 mb-3" style="text-align: center;">
                <input type="text" class="form-control" placeholder="Nombre" v-model="buscador.nombre" />
            </div>
            <div class="col-md-4 mb-3" style="text-align: center;">
                <input type="text" class="form-control" placeholder="Año" v-model="buscador.anio" />
            </div>

            <div class="col-md-4 mb-3" style="text-align: left;">
                <button type="button" class="btn btn-primary" style="margin: 2px;" @click="cargarRegistros()">
                    <i class="fe fe-search me-2"></i>Buscar</button>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdropMantenedorDecano"
                    @click="cargarAgregar()">
                    <i class="fe fe-file me-2"></i>
                    Agregar
                </button>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table" v-if="listaRegistros.length != 0">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Fecha Registro</th>
                        <th scope="col">Fecha Inicio</th>
                        <th scope="col">Fecha Fin</th>
                        <th scope="col" class="text-center">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in listaRegistros" :key="index">
                        <th scope="row">{{  index + 1  }}</th>
                        <td>{{  item.nombre  }}</td>
                        <td>{{  item.fechaRegistro  }}</td>
                        <td>{{  item.fecha_inicio  }}</td>
                        <td>{{  item.fecha_fin  }}</td>
                        <td class="text-center">
                            <i class="fa fa-500px mx-1 text-primary" role="button" title="Sello"
                                @click="openurlArchivo(item.urlSello, index)"></i>
                            <i class="fa fa-file-code-o mx-1 text-primary" role="button" title="Firma"
                                @click="openurlArchivo(item.urlFirma, index)"></i>
                            <i class="fa fa-pencil mx-1 text-yellow" role="button" data-bs-toggle="modal"
                                data-bs-target="#staticBackdropMantenedorDecano" @click="cargarVer(item, index)"></i>
                            <i class="fa fa-trash mx-1 text-danger" role="button"
                                @click="cargarEliminar(item, index)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination justify-content-center mt-2">
                <button @click="cambiarPagina(1)" class="page-link btn btn-outline-info">
                    Primero
                </button>
                <li class="page-item" v-for="(item, index) in totalPaginas" style="list-style: none" :key="index">
                    <button href="#" @click="cambiarPagina(index + 1)" :class="
                        buscador.page_index == index + 1
                            ? 'page-link btn'
                            : 'page-link btn btn-outline-info'
                    " :style="
    buscador.page_index == index + 1
        ? 'color: white; background-color: #36b9cc;'
        : ''
">
                        {{  index + 1  }}
                    </button>
                </li>
                <button @click="cambiarPagina(totalPaginas)" class="page-link btn btn-outline-info">
                    Último
                </button>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="staticBackdropMantenedorDecano" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                            Firma y Sello
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <i class="fa fa-close"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <!-- <h3 class="text-center">Detalle de Documento</h3> -->
                            <!-- <div class="form-group" v-if="indiceModificando != -1">
                                <label>Codigo</label>
                                <input type="number" class="form-control" v-model="decano.cod_int" readonly />
                            </div> -->
                            <!-- <div class="form-group">
                                <label>Numero de registro</label>
                                <input type="number" class="form-control" v-model="decano.nro_registro" />
                            </div> -->
                            <div class="row">
                                <div class="col-5">
                                    <div class="form-group">
                                        <label>CQF</label>
                                        <div class="input-group">
                                            <input type="text" v-model="cqf" class="form-control" placeholder="CQF"
                                                aria-label="Example text with button addon"
                                                aria-describedby="button-addon1" maxlength="8"
                                                @keypress.enter="obtenerColegiado()">

                                            <button type="button" class="btn btn-primary"><i class="fe fe-search me-2"
                                                    @click="obtenerColegiado()"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <label>Nombres</label>
                                        <input type="text" class="form-control" v-model="decano.nombre" readonly
                                            ref="nombre"
                                            :style="showAdvertise && decano.nombre == '' ? 'border-color: #e23e3d;' : ''" />
                                    </div>
                                </div>
                            </div>


                            <div class="form-group">
                                <label>Fecha Inicio</label>
                                <input type="date" class="form-control" v-model="decano.fecha_inicio" ref="fecha_inicio"
                                    :style="showAdvertise && decano.fecha_inicio == '' ? 'border-color: #e23e3d;' : ''" />
                            </div>
                            <div class="form-group">
                                <label>Fecha Fin</label>
                                <input type="date" class="form-control" v-model="decano.fecha_fin" ref="fecha_fin"
                                    :style="showAdvertise && decano.fecha_fin == '' ? 'border-color: #e23e3d;' : ''" />
                            </div>
                            <div class="form-group">
                                <label>Sello</label>
                                <input class="form-control" type="file" id="file_sello" style="display:none">
                                <div class="input-group">
                                    <button class="btn btn-primary" type="button" id="button-addon1"
                                        @click="openDocumentFileSello()">Examinar</button>
                                    <input class="form-control form-control-sm" type="text" v-model="nameNewFileSello"
                                        ref="nameNewFileSello"
                                        :style="showAdvertise && nameNewFileSello == '' ? 'border-color: #e23e3d;' : ''"
                                        readonly>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Firma</label>
                                <input class="form-control" type="file" id="file_firma" style="display:none">
                                <div class="input-group">
                                    <button class="btn btn-primary" type="button" id="button-addon1"
                                        @click="openDocumentFileFirma()">Examinar</button>
                                    <input class="form-control form-control-sm" type="text" v-model="nameNewFileFirma"
                                        ref="nameNewFileFirma"
                                        :style="showAdvertise && nameNewFileFirma == '' ? 'border-color: #e23e3d;' : ''"
                                        readonly>
                                </div>
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
            decano: {},
            decanoBase: {
                id: 0,
                nombre: "",
                firma: "",
                sello: "",
                fecha_inicio: "",
                fecha_fin: "",
                urlFirma: "",
                urlSello: ""
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
            ListarRegistros: "_decano/ListarRegistros",
            AgregarDecano: "_decano/AgregarDecano",
            ModificarDecano: "_decano/ModificarDecano",
            EliminarDecano: "_decano/EliminarDecano",
            ObtenerDecano: "_decano/ObtenerDecano",
            ObtenerColegiado: "_colegiado/ObtenerColegiado",
        }),
        openDocumentFileSello() {
            if (this.decano.nombre != "") {
                const inputFile = document.getElementById("file_sello");
                inputFile.click();
            } else {
                global._mensaje_advertencia("Debe seleccionar un colegiado.");
            }
        },
        setupFileSelloInput() {
            document
                .getElementById("file_sello")
                .addEventListener("change", this.fileUploadSello, false);
        },
        fileUploadSello(evt) {
            if (
                evt.target.files[0].type == "image/png" ||
                evt.target.files[0].type == "image/jpeg"
            ) {
                this.decano.sello = evt.target.files[0];
                this.nameNewFileSello = evt.target.files[0].name;
            } else {
                global._mensaje_advertencia("Lo sentimos, solo se permite extensiones (jpeg,png).");
            }
        },
        openDocumentFileFirma() {
            if (this.decano.nombre != "") {
                const inputFile = document.getElementById("file_firma");
                inputFile.click();
            } else {
                global._mensaje_advertencia("Debe seleccionar un colegiado.");
            }
        },
        setupFileFirmaInput() {
            document
                .getElementById("file_firma")
                .addEventListener("change", this.fileUploadFirma, false);
        },
        fileUploadFirma(evt) {
            if (
                /*evt.target.files[0].type == "application/pdf"*/
                evt.target.files[0].type == "image/png" ||
                evt.target.files[0].type == "image/jpeg"
            ) {
                this.decano.firma = evt.target.files[0];
                this.nameNewFileFirma = evt.target.files[0].name;
            } else {
                global._mensaje_advertencia("Lo sentimos, solo se permite extensiones (jpeg,png).");
            }
        },
        obtenerColegiado: async function () {
            if (this.cqf.length > 0) {
                let persona = {
                    id: null,
                    dni: null,
                    cqf: this.cqf
                }
                let res = await this.ObtenerColegiado(persona);

                if (res != null) {
                    this.decano.nombre = res.nombres + " " + res.apellidoPaterno + " " + res.apellidoMaterno;
                } else {
                    global._mensaje_advertencia("Lo sentimos, colegiado no existe.");
                }
            }
        },
        openurlArchivo(url) {
            window.open(
                this.iprutaFiles + "" + url,
                "_blank"
            );
        },
        cargarAgregar: function () {
            this.decano = { ...this.decanoBase };
            this.nameNewFileFirma = "";
            this.nameNewFileSello = "";
            this.cqf = "";
            this.indiceModificando = -1;
        },
        cargarVer: async function (item, index) {
            this.nameNewFileFirma = "";
            this.nameNewFileSello = "";
            this.cqf = "";

            let decano = {
                id: item.id,
            }
            let res = await this.ObtenerDecano(decano);
            console.log(res);

            this.decano.id = res.id;
            this.decano.fecha_inicio = res.fecha_inicio;
            this.decano.fecha_fin = res.fecha_fin;
            this.decano.nombre = res.nombre;
            this.decano.firma = "";
            this.decano.sello = "";
            this.decano.urlFirma = "";
            this.decano.urlSello = "";

            this.nameNewFileFirma = res.urlFirma;
            this.nameNewFileSello = res.urlSello;

            this.indiceModificando = index;
        },
        cargarEliminar: async function (item, index) {
            this.decano = { ...item };
            global._swal_pregunta(
                "¿Está seguro que desea eliminar el registro?",
                async () => {
                    var res = await this.EliminarDecano(this.decano);
                    if (res?.exito) {
                        this.cargarRegistros();
                        global._mensaje_exito("Se ha eliminado");
                    }
                }
            );
        },
        guardarCambios: async function () {
            var res = null;
            if (this.indiceModificando == -1) {
                let valor = this.validarRegistroDecano();
                if (!valor) {
                    res = await this.AgregarDecano(this.decano);
                }
            } else {
                res = await this.ModificarDecano(this.decano);
            }
            if (res?.exito) {
                this.cargarRegistros();
                this.cerrarModal();
                global._mensaje_exito(
                    "Los cambios se han guardado correctamente"
                );
            }
        },
        validarRegistroDecano() {
            let valida = false;

            if (this.decano.nombre == "") {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.nombre.focus();
                });
            } else if (this.decano.fecha_inicio == "") {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.fecha_inicio.focus();
                });
            } else if (this.decano.fecha_fin == "") {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.fecha_fin.focus();
                });
            } else if (this.decano.firma == "") {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.firma.focus();
                });
            } else if (this.decano.sello == "") {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.sello.focus();
                });
            }

            return valida;
        },
        cargarRegistros: async function (pagina = 1) {
            this.buscador.page_index = pagina;
            var res = await this.ListarRegistros(this.buscador);
            //this.listaRegistros = res.datos;
            this.listaRegistros = res.datos.map(el => ({
                ...el,
                fechaRegistro: dayjs(el.fechaRegistro).format(
                    "DD-MM-YYYY, H:mm A"
                ),
                fecha_inicio: dayjs(el.fecha_inicio).format(
                    "DD-MM-YYYY"
                ),
                fecha_fin: dayjs(el.fecha_fin).format(
                    "DD-MM-YYYY"
                )
            }));
            this.buscador.page_index = res.paginaActual;
            this.totalPaginas = res.totalPaginas;
        },
        cambiarPagina: function (paginaDestino) {
            this.cargarRegistros(paginaDestino);
        },
        cerrarModal: function () {
            var modal = bootstrap.Modal.getInstance(
                document.getElementById("staticBackdropMantenedorDecano")
            );
            modal.hide();
        },
    },
    mounted() {
        this.setupFileSelloInput();
        this.setupFileFirmaInput();
        this.cargarRegistros();
    },
};
</script>
