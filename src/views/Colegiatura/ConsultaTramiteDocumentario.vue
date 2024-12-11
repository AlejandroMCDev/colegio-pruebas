<template>
    <div class="card-header">
        <h3 class="card-title">Comsultar Tramite Documentario</h3>
    </div>
    <div class="card-body pb-2">
        <div class="tab-menu-heading" style="border-bottom: 0 !important;">
            <div class="tabs-menu" style="float: right;width: 100%;">
                <!-- Tabs -->
                <ul class="nav panel-tabs" style="float: right;">
                    <li><a href="#registrarTab" class="active" data-bs-toggle="tab" id="tabGeneralRegistrar">TRAMITE</a>
                    </li>
                    <!-- <li><a href="#listadoTab" data-bs-toggle="tab" id="tabGeneralListado">LISTADO</a></li> -->
                </ul>
            </div>
        </div>
        <!-- DATOS GENERALES -->
        <div class="panel-body tabs-menu-body">
            <div class="tab-content">
                <div class="tab-pane active" id="registrarTab">
                    <div class="row">
                        <div class="col-md-12 row">
                            <div class="mb-5 p-4 br-5">
                                <div class="row">
                                    <div class="col-md-3 mb-3" style="text-align: center;">
                                        <input type="text" class="form-control" placeholder="Nº Expediente"
                                            v-model="nroExpediente" @keypress.enter="buscarExpediente()" />
                                    </div>
                                    <div class="col-md-1 mb-3" style="text-align: left;">
                                        <button type="button" class="btn btn-primary" @click="buscarExpediente()">
                                            <i class="fe fe-search me-2"></i>Buscar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-xl-12">
                            <div class="card" style="background-color:#F5F5F5;">
                                <div class="card-body">
                                    <h4 class="card-title" style="color:#1E90FF;font-weight: bold;">Comprobante de
                                        Solicitud de Tramite</h4>
                                    <div class="col-md-12 col-xl-12">
                                        <div class="card" style="background-color:#F5FFFA;">
                                            <div class="card-body">
                                                <p class="card-text"> Sistema de Tramite Documentario CQFLL
                                                    <b>Codigo:</b> <span style="color:red">{{  expediente.nroExpediente 
                                                        }}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <h4 class="card-title" style="color:#1E90FF;font-weight: bold;">Datos Personales:
                                        Solicitante Apoderado</h4>
                                    <div class="col-md-12 col-xl-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <label for="staticEmail"
                                                        class="col-sm-2 col-form-label"><b>Nombre</b></label>
                                                    <div class="col-sm-3">
                                                        <input type="text" readonly class="form-control-plaintext"
                                                            id="staticEmail" :value=expediente.persona_nombre>
                                                    </div>
                                                    <label for="staticEmail"
                                                        class="col-sm-2 col-form-label"><b>Apellido:</b></label>
                                                    <div class="col-sm-3">
                                                        <input type="text" readonly class="form-control-plaintext"
                                                            id="staticEmail" :value=expediente.persona_apellido>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <label for="staticEmail"
                                                        class="col-sm-2 col-form-label"><b>Correo:</b></label>
                                                    <div class="col-sm-3">
                                                        <input type="text" readonly class="form-control-plaintext"
                                                            id="staticEmail" :value=expediente.persona_email>
                                                    </div>
                                                    <label for="staticEmail"
                                                        class="col-sm-2 col-form-label"><b>DNI:</b></label>
                                                    <div class="col-sm-3">
                                                        <input type="text" readonly class="form-control-plaintext"
                                                            id="staticEmail" :value=expediente.persona_nroDocumento>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <h4 class="card-title" style="color:#1E90FF;font-weight: bold;">Datos Expediente
                                    </h4>
                                    <div class="col-md-12 col-xl-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="mb-3 row">
                                                    <label class="col-sm-2 col-form-label"><b>Expediente:</b></label>
                                                    <div class="col-sm-10">
                                                        <input type="text" readonly class="form-control-plaintext"
                                                            id="staticEmail" :value=expediente.nroExpediente>
                                                    </div>
                                                </div>
                                                <div class="mb-3 row">
                                                    <label class="col-sm-2 col-form-label"><b>Fecha
                                                            Registro:</b></label>
                                                    <div class="col-sm-10">
                                                        <input type="text" readonly class="form-control-plaintext"
                                                            id="staticEmail" :value=expediente.fechaRegistro>
                                                    </div>
                                                </div>
                                                <!-- <div class="mb-3 row">
                                                    <label class="col-sm-2 col-form-label">Sumilla:</label>
                                                    <div class="col-sm-10">
                                                        <input type="text" readonly class="form-control-plaintext"
                                                            id="staticEmail" value="Restriccion de Certificado">
                                                    </div>
                                                </div> -->
                                                <div class="mb-3 row">
                                                    <label class="col-sm-2 col-form-label"><b>Asunto:</b></label>
                                                    <div class="col-sm-10">
                                                        <input type="text" readonly class="form-control-plaintext"
                                                            id="staticEmail" :value=expediente.asunto>
                                                    </div>
                                                </div>
                                                <div class="mb-2 row">
                                                    <label class="col-sm-4 col-form-label"><b>Requisitos
                                                            Adjuntos:</b></label>
                                                    <div class="col-sm-10">
                                                        <input type="text" readonly class="form-control-plaintext"
                                                            id="staticEmail" value="-Copia de documento de identidad.">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-xl-12">
                            <div class="card" style="background-color:#FFE4C4;">
                                <div class="card-body">
                                    <p class="card-text">Cualquier acceso o uso indebido de la información
                                        contenidad en este sistema, sera saccionado de acuerdo a lo establecido en la
                                        Ley Nº
                                        19.223 que tipifica figuras penales relativo a delitos informaticos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-xl-12">
                            <div class="card">
                                <div class="card-body">
                                    <p class="card-text text-center">Colegio Quimico Farmacético del Perú
                                        Av. Andrés Tinoco Mza. A-3. Lt.1.
                                        Urb. Prolongación Benavides - Surco - Lima
                                    </p>
                                    <p class="card-text text-center"> Correo:
                                        <span style="color:#1E90FF;font-weight: bold;">mesadepartes@cqfp.pe</span> /
                                        Telefono:
                                        <span style="color:red;font-weight: bold;">511-680-3665</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row row-sm">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header border-bottom-0 custom-card-header">
                                    <h6 class="main-content-label mb-0">Trazabilidad Grafica</h6>
                                </div>
                                <div class="card-body">
                                    <div class="vtimeline" v-for="(item, index) in movimientosExpediente"
                                        :key="'item-' + index">
                                        <div :class="classTimeLine(index)">
                                            <div class="avatar avatar-md timeline-badge">
                                                <span class="timeline-icon">
                                                    <svg style="width:25px;height:25px" viewBox="0 0 24 24">
                                                        <path fill="currentColor" :d="classSvg(index)" />
                                                    </svg>

                                                </span>
                                            </div>
                                            <div class="timeline-panel">
                                                <div class="timeline-heading">
                                                    <h6 class="timeline-title">{{  item.estadoExpediente  }}</h6>
                                                </div>
                                                <div class="timeline-body">
                                                    <p>{{  item.comentario  }}</p>
                                                </div>
                                                <div class="timeline-footer d-flex align-items-center flex-wrap">
                                                    <i class="fe fe-user  text-muted me-1"></i>
                                                    <span>{{  item.usuarioRegistro  }}</span>
                                                    <span class="ms-auto"><i
                                                            class="fe fe-calendar text-muted me-1"></i>{{
                                                         item.fechaExpediente 
                                                        }}</span>
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
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import global from "../../global";
//Librayr
import dayjs from "dayjs";
export default {
    name: "ConsultaTramiteDocumentario",
    data() {
        return {
            class: "timeline-wrapper timeline-wrapper-primary",
            class2: "timeline-wrapper timeline-inverted timeline-wrapper-secondary",
            class3: "timeline-wrapper timeline-wrapper-green",
            nroExpediente: "",
            movimientosExpediente: [],
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
                persona_apellido: "",
                persona_email: "",
                persona_celular: "",
            },
        };
    },
    methods: {
        ...mapActions({
            ObtenerExpediente: "_sistram/ObtenerExpediente",
            ListadoMovimiento: "_movimiento_expediente/Listar"
        }),
        classTimeLine(index) {
            if (index === 0) {
                return 'timeline-wrapper timeline-wrapper-primary';
            } else if (index === 1) {
                return 'timeline-wrapper timeline-inverted timeline-wrapper-secondary'
            } else if (index === 2) {
                return 'timeline-wrapper timeline-wrapper-green'
            } else {
                return 'timeline-wrapper timeline-inverted timeline-wrapper-danger'
            }
        },
        classSvg(index) {
            if (index === 0) {
                return 'M4,2A2,2 0 0,0 2,4V11C2,11.55 2.22,12.05 2.59,12.42L11.59,21.42C11.95,21.78 12.45,22 13,22C13.55,22 14.05,21.78 14.41,21.41L21.41,14.41C21.78,14.05 22,13.55 22,13C22,12.45 21.77,11.94 21.41,11.58L12.41,2.58C12.05,2.22 11.55,2 11,2H4V2M11,4L20,13L13,20L4,11V4H11V4H11M6.5,5A1.5,1.5 0 0,0 5,6.5A1.5,1.5 0 0,0 6.5,8A1.5,1.5 0 0,0 8,6.5A1.5,1.5 0 0,0 6.5,5M10.95,10.5C9.82,10.5 8.9,11.42 8.9,12.55C8.9,13.12 9.13,13.62 9.5,14L13,17.5L16.5,14C16.87,13.63 17.1,13.11 17.1,12.55A2.05,2.05 0 0,0 15.05,10.5C14.5,10.5 13.97,10.73 13.6,11.1L13,11.7L12.4,11.11C12.03,10.73 11.5,10.5 10.95,10.5Z';
            } else if (index === 1) {
                return 'M12 4C14.2 4 16 5.8 16 8C16 10.1 13.9 13.5 12 15.9C10.1 13.4 8 10.1 8 8C8 5.8 9.8 4 12 4M12 2C8.7 2 6 4.7 6 8C6 12.5 12 19 12 19S18 12.4 18 8C18 4.7 15.3 2 12 2M12 6C10.9 6 10 6.9 10 8S10.9 10 12 10 14 9.1 14 8 13.1 6 12 6M20 19C20 21.2 16.4 23 12 23S4 21.2 4 19C4 17.7 5.2 16.6 7.1 15.8L7.7 16.7C6.7 17.2 6 17.8 6 18.5C6 19.9 8.7 21 12 21S18 19.9 18 18.5C18 17.8 17.3 17.2 16.2 16.7L16.8 15.8C18.8 16.6 20 17.7 20 19Z'
            } else if (index === 2) {
                return 'M15.33 11.05C14.17 11.88 13.34 13.14 13.09 14.58L11.55 11.63L7.66 15.5L8 18L6.95 19.06L5.18 15.87L2 14.11L3.06 13.05L5.54 13.4L9.43 9.5L2 5.62L3.41 4.21L12.61 6.33L16.5 2.44C17.08 1.85 18.03 1.85 18.62 2.44C19.2 3.03 19.2 4 18.62 4.56L14.73 8.45L15.33 11.05M22 15.5C22 18.1 18.5 22 18.5 22S15 18.1 15 15.5C15 13.6 16.6 12 18.5 12S22 13.6 22 15.5M19.7 15.6C19.7 15 19.1 14.4 18.5 14.4S17.3 14.9 17.3 15.6C17.3 16.2 17.8 16.8 18.5 16.8S19.8 16.2 19.7 15.6'
            } else {
                return 'M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3M15.96,10.29L13.21,13.83L11.25,11.47L8.5,15H19.5L15.96,10.29Z'
            }
        },
        buscarExpediente: async function () {

            let expediente = {
                id: "",
                nroExpediente: this.nroExpediente
            }
            let res = await this.ObtenerExpediente(expediente);

            if (res != null) {
                this.expediente.nroExpediente = res.nroExpediente;
                this.expediente.persona_nombre = res.persona_nombre;
                this.expediente.persona_apellido = res.persona_apellidoPaterno + " " +
                    res.persona_apellidoMaterno;
                this.expediente.nroExpediente = res.nroExpediente;
                this.expediente.persona_nroDocumento = res.persona_nroDocumento;
                this.expediente.persona_email = res.persona_email;
                this.expediente.fechaRegistro = dayjs(res.fechaRegistro).format(
                    "DD-MM-YYYY, H:mm A"
                );
                this.expediente.asunto = res.asunto;

                let buscar_movimiento = {
                    page_index: 1,
                    idExpediente: res.id,
                    page_size: 30
                };

                var res_movimiento = await this.ListadoMovimiento(buscar_movimiento);
                this.movimientosExpediente = res_movimiento.datos.map(el => ({
                    ...el,
                    fechaExpediente: dayjs(el.fechaExpediente).format(
                        "DD-MM-YYYY"
                    )
                }));

            } else {
                global._mensaje_advertencia("Registro no existe!");
                this.loadExpediente();
            }
        },
        loadExpediente() {
            this.expediente = { ...this.expedienteBase };
            this.movimientosExpediente = [];
        }
    },
    mounted() {
        this.loadExpediente();
    },
};
</script>
