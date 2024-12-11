<template>
    <div class="card-header">
        <h3 class="card-title">Modulo Control Ficha Colegiado</h3>
    </div>
    <div class="card-body pb-2">
       <div class="tab-menu-heading"  style="border-bottom: 0 !important;">
            <div class="tabs-menu" style="float: right;width: 100%;">
                <!-- Tabs -->
                <ul class="nav panel-tabs" style="float: right;">
                    <li><a href="#registrarTab" class="active" data-bs-toggle="tab" id="tabGeneralRegistrar">FICHA</a>
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
                                <div class="form-label mt-0 p-0">FILTROS</div>
                                <div class="row">
                                    <div class="col-md-3 mb-3" style="text-align: center;">
                                        <input type="text" class="form-control" placeholder="CQFP"
                                            v-model="buscador.cqf" />
                                    </div>
                                    <div class="col-md-3 mb-3" style="text-align: center;">
                                        <input type="text" class="form-control" placeholder="DNI"
                                            v-model="buscador.dni" />
                                    </div>
                                    <div class="col-md-5 mb-3" style="text-align: center;">
                                        <SearchMultiselect :value="buscador.idPersona" v-model="buscador.idPersona"
                                            :options="personasDesplegable" placeholder="Agremiado" :searchable="true" />
                                    </div>
                                    <div class="col-md-1 mb-3" style="text-align: left;">
                                        <button type="button" class="btn btn-primary" @click="verFichaColegiado()">
                                            <i class="fe fe-search me-2"></i>Buscar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <iframe :src="url_mostrar_iframe" frameborder="0" allowfullscreen height="450px"
                                width="100%"></iframe>
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
import SearchMultiselect from "../../components/SearchMultiselect/SearchMultiselect.vue";

export default {
    name: "ControlFichaColegiado",
    components: { SearchMultiselect },
    data() {
        return {
            personasDesplegable: [],
            url_mostrar_iframe: "",
            buscador: {
                idPersona: null,
                dni: "",
                cqf: ""
            }
        };
    },
    methods: {
        ...mapActions({
            ColegiadoDesplegable: "_colegiado/ColegiadoDesplegable",
        }),
        verFichaColegiado: async function () {

            if (this.buscador.dni != "") {
                this.url_mostrar_iframe = `${global.ruta_api}ficha/colegiado/generar_pdf?dni=${this.buscador.dni}`;
            } else if (this.buscador.idPersona != null) {
                this.url_mostrar_iframe = `${global.ruta_api}ficha/colegiado/generar_pdf?idPersona=${this.buscador.idPersona}`;
            } else if (this.buscador.cqf != "") {
                this.url_mostrar_iframe = `${global.ruta_api}ficha/colegiado/generar_pdf?cqf=${this.buscador.cqf}`;
            } else {
                global._mensaje_advertencia("Seleccione un filtro!");
            }
        },
        async ComboAgremiados() {
            let buscador = {
                nombreApellido: "",                
            };
            var res = await this.ColegiadoDesplegable(buscador);
            this.personasDesplegable = res.map(item => {
                return { label: item.persona_nombre, value: item.personas_id };
            });
        }
    },
    mounted() {
        this.ComboAgremiados();
    },
};
</script>
