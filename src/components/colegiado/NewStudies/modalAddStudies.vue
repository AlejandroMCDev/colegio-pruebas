<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                        AGREGAR ESTUDIOS
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal()">
                        <i class="fa fa-close"></i>
                    </button>
                </div>

                <div class="modal-body">
                    <div>
                        <div class="form-group">
                            <SearchMultiselect :lista_opciones="gradoDesplegable" v-model="studies.idGrado"
                                placeholder="Grado" />
                        </div>
                        <div class="form-group">
                            <span data-bs-toggle="tooltip" data-bs-placement="top"
                                title="Si no encuentras tu especialidad, presiona enter y agrégalo">
                                <SearchMultiselect v-model="studies.idEspecialidad" :searchable="true"
                                    :options="especialidadDesplegable" noResultsText="Presione enter para agregar"
                                    noOptionsText="No hay items para mostrar" placeholder="Especialidad"
                                    @option="addOptionEspecialidad" :createTag="true" :appendNewOption="false" />
                            </span>
                        </div>
                        <!-- <div class="form-group">
                            <input type="text" class="form-control" placeholder="Nombre" v-model="studies.nombre" />
                        </div> -->
                        <div class="form-group">
                            <span data-bs-toggle="tooltip2" data-bs-placement="top"
                                title="Si no encuentras tu institución, presiona enter y agrégalo">
                                <SearchMultiselect v-model="studies.idInstituto" :options="institucionDesplegable"
                                    :searchable="true" trackBy="label" noResultsText="Presione enter para agregar"
                                    noOptionsText="No hay items para mostrar" placeholder="Expedido Por"
                                    :createTag="true" :appendNewOption="false" @option="addOptionInstitucion" />
                            </span>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" onfocus="(this.type='date')"
                                onblur="(this.type='text')" placeholder="Fecha Finalización"
                                v-model="studies.fechaFinalizacion" />
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Nº Registro"
                                v-model="studies.nRegistro" />
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        Cerrar
                    </button> -->
                    <button type="button" class="btn btn-success" @click="addStudies()" :disabled="!studiesValid">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
import SearchMultiselect from "../../SearchMultiselect/SearchMultiselect.vue";
// import Multiselect from "@vueform/multiselect";
import global from "../../../global";
export default {
    name: "modalAddStudies",
    components: { SearchMultiselect },
    props: {
        studiesSelect: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            newValTagEspecialidad: false,
            newValTagInstitucion: false,
            gradoDesplegable: [],
            institucionDesplegable: [],
            especialidadDesplegable: [],
            studies: {
                idGrado: null,
                nombre: "",
                idInstituto: null,
                instituto: null,
                idEspecialidad: null,
                especialidad: null,
                fechaFinalizacion: "",
                nRegistro: ""
            }
        };
    },
    watch: {
        studiesSelect(studiesSelect) {
            this.comboEspecialidad();
            this.comboUniversidad();

            if (studiesSelect != null) {
                this.studies = studiesSelect;
            } else {
                this.studies = [];
            }
        },
    },
    computed: {
        studiesValid() {
            return (
                this.studies.idGrado != null &&
                this.studies.idInstituto != null &&
                this.studies.idEspecialidad != null &&
                this.studies.fechaFinalizacion != "" &&
                this.studies.nRegistro != ""
            );
        },

    },

    methods: {
        addOptionEspecialidad(newTag) {           
            this.newValTagEspecialidad = true;
            this.studies.especialidad = newTag;
        },
        addOptionInstitucion(newTag) {           
            this.newValTagInstitucion = true;
            this.studies.instituto = newTag;
        },
        ...mapActions({
            GradoDesplegable: "_colegiado/GradoDesplegable",
            InstitucionDesplegable: "_colegiado/InstitucionDesplegable",
            EspecialidadDesplegable: "_colegiado/EspecialidadDesplegable"
        }),
        comboGrado: async function () {
            var res = await this.GradoDesplegable();
           
            this.gradoDesplegable = res.map(item => {
                return { label: item.nombre, value: item.id };
            });
           
        },
        comboUniversidad: async function () {
            var res = await this.InstitucionDesplegable();
            this.institucionDesplegable = res.map(item => {
                return { label: item.nombre, value: item.id };
            });            
        },
        comboEspecialidad: async function () {
            var res = await this.EspecialidadDesplegable();
            this.especialidadDesplegable = res.map(item => {
                return { label: item.nombre, value: item.id };
            });           
        },
        addStudies() {
           
            if (this.newValTagEspecialidad == true) {
                this.studies.idEspecialidad = null;
            } else {
                this.studies.especialidad = null;
            }
            if (this.newValTagInstitucion == true) {
                this.studies.idInstituto = null;
            } else {
                this.studies.instituto = null;
            }          
            this.$emit("addStudies", this.studies);
            this.studies = [];
            this.newValTagEspecialidad = false;
            this.newValTagInstitucion = false;   
        },
        closeModal() {
            this.$emit('close');
        },
        item_seleccionado(item_seleccionado) {
            console.log(item_seleccionado);
        }
    },
    mounted() {
        this.comboGrado();
        this.comboUniversidad();
        this.comboEspecialidad();
        global._cargar_tooltip("tooltip");
        global._cargar_tooltip("tooltip2");
    },

};
</script>
<style>
.tooltip {
    z-index: 100000000;
}
</style>