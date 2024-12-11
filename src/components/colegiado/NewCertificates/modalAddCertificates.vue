<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                        AGREGAR CERTIFICACIÓN
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal()">
                        <i class="fa fa-close"></i>
                    </button>
                </div>

                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Fecha"
                                        onfocus="(this.type='date')" onblur="(this.type='text')"
                                        v-model="certificates.fecha" />
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Vigencia"
                                        onfocus="(this.type='date')" onblur="(this.type='text')"
                                        v-model="certificates.vigencia" />
                                </div>
                            </div>


                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">

                                    <input type="number" class="form-control" placeholder="Horas"
                                        v-model="certificates.horas" />
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <input type="number" class="form-control" placeholder="Creditos"
                                        v-model="certificates.creditos" />
                                </div>
                            </div>


                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">

                                    <input type="number" class="form-control" placeholder="Registros"
                                        v-model="certificates.registros" />
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <SearchMultiselect v-model="certificates.modalidad" :options="[
                                        { value: 'Presencial', label: 'Presencial' },
                                        { value: 'Virtual', label: 'Virtual' },
                                    ]" placeholder="Modalidad" />
                                    <!-- <select class="form-control form-select" data-bs-placeholder="Modalidad"
                                        v-model="certificates.modalidad">
                                        <option value="null">Modalidad</option>
                                        <option value="Presencial">Presencial</option>
                                        <option value="Virtual">Virtual</option>
                                    </select> -->
                                </div>
                            </div>


                        </div>
                        <div class="form-group">
                            <span data-bs-toggle="tooltip" data-bs-placement="top"
                                title="Si no encuentras tu institución, presiona enter y agrégalo">
                                <SearchMultiselect v-model="certificates.idInstitucion"
                                    :options="institucionDesplegable" :searchable="true" trackBy="label"
                                    noResultsText="Presione enter para agregar"
                                    noOptionsText="No hay items para mostrar" placeholder="Expedido Por"
                                    :createTag="true" :appendNewOption="false" @option="addOptionInstitucion" />
                            </span>
                            <!-- <select class="form-control form-select" data-bs-placeholder="Expedido Por"
                                v-model="certificates.idInstitucion">
                                <option value=null>Expedido Por</option>
                                <option v-for="item in institucionDesplegable" :key="item.id" :label="item.nombre"
                                    :value="item.id">
                                </option>
                            </select> -->
                        </div>

                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Mencion"
                                v-model="certificates.mencion" />
                        </div>



                    </div>
                </div>
                <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        Cerrar
                    </button> -->
                    <button type="button" class="btn btn-success" @click="isEdit ? saveChange() : addCertificate()"
                        :disabled="!certificatesValid">
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
import global from "../../../global";
export default {
    name: "modalAddCertificate",
    components: { SearchMultiselect },
    props: {
        certificatesSelect: {
            type: Object,
            default: null,
        }
    },
    data() {
        return {
            newValTagInstitucion: false,
            institucionDesplegable: [],
            certificates: {
                fecha: "",
                vigencia: "",
                horas: "",
                creditos: "",
                registros: "",
                modalidad: null,
                idInstitucion: null,
                institucion: null,
                mencion: "",
            }
        };
    },
    watch: {
        certificatesSelect(certificatesSelect) {
            this.comboUniversidad();
            if (certificatesSelect != null) {
                this.certificates = certificatesSelect;
            } else {
                this.certificates = [];
            }
        },
    },
    computed: {
        certificatesValid() {
            return (
                this.certificates.fecha != "" &&
                this.certificates.vigencia != "" &&
                this.certificates.horas != "" &&
                this.certificates.creditos != "" &&
                this.certificates.registro != "" &&
                this.certificates.modalidad != null &&
                this.certificates.idInstitucion != null &&
                this.certificates.mencion != ""
            );
        },
    },

    methods: {
        addOptionInstitucion(newTag) {           
            this.newValTagInstitucion = true;
            this.certificates.institucion = newTag;
        },
        ...mapActions({
            InstitucionDesplegable: "_colegiado/InstitucionDesplegable"
        }),
        comboUniversidad: async function () {
            var res = await this.InstitucionDesplegable();
            this.institucionDesplegable = res.map(item => {
                return { label: item.nombre, value: item.id };
            });
        },
        addCertificate() {
            if (this.newValTagInstitucion == true) {
                this.certificates.idInstitucion = null;
            } else {
                this.certificates.institucion = null;
            }
            this.$emit("addCertificate", this.certificates);
            this.certificates = [];
            this.newValTagInstitucion = false;
        },
        closeModal() {
            this.$emit('close');
        }
    },
    mounted() {
        this.comboUniversidad();
        global._cargar_tooltip("tooltip");
    },

};
</script>