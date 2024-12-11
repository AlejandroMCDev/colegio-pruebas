<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                        AGREGAR FAMILIAR
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
                                    <select class="form-control form-select" data-bs-placeholder="Tipo Doc"
                                        v-model="family.idTipoDocumento" @change="validaNumeroDocumento">
                                        <option value=null>Tipo Doc</option>
                                        <option v-for="item in tipoDocumentoDesplegable" :key="item.id"
                                            :label="item.nombre" :value="item.id">
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Documento Identidad"
                                        v-model="family.documentoIdentidad" :maxlength="maxLength"
                                         ref="documentoIdentidad" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">

                                    <input type="text" class="form-control" placeholder="Nombre"
                                        v-model="family.nombre" />
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Apellido"
                                        v-model="family.apellido" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <select class="form-control form-select" data-bs-placeholder="Estado"
                                        v-model="family.estadoFamilia">
                                        <option value=null>Estado</option>
                                        <option value="Vivo">Vivo</option>
                                        <option value="Fallecido">Fallecido</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Fecha Nacimiento"
                                        onfocus="(this.type='date')" onblur="(this.type='text')"
                                        v-model="family.fechaNacimiento" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">

                                    <select class="form-control form-select" data-bs-placeholder="Parentesco"
                                        v-model="family.parentesco">
                                        <option value="null">Parentesco</option>                                 
                                        <option value="Padre">Padre</option>
                                        <option value="Madre">Madre</option>
                                        <option value="Esposo">Esposo</option>
                                        <option value="Esposa">Esposa</option>
                                        <option value="Hijo">Hijo</option>
                                        <option value="Hija">Hija</option>
                                        <option value="Hermano">Hermano(a)</option>
                                        <option value="Sobrino">Sobrino(a)</option>
                                        <option value="Pariente">Otros</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group">
                                    <select class="form-control form-select" data-bs-placeholder="Beneficio FOMAF"
                                        v-model="family.beneficioFomaf">
                                        <option value=null>Beneficio FOMAF</option>
                                        <option v-for="item in beneficioFONAF" :key="item.id" :label="item.nombre"
                                            :value="item.id">
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        Cerrar
                    </button> -->
                    <button type="button" class="btn btn-success" @click="addFamily()" :disabled="!familyValid">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
    name: "modalAddFamily",
    props: {
        familySelect: {
            type: Object,
            default: null,
        }
    },
    data() {
        return {
            maxLength: null,
            tipoDocumentoDesplegable: [],
            beneficioFONAF:
                [{ id: 1, nombre: "Sí" }, { id: 0, nombre: "No" }],

            family: {
                idTipoDocumento: null,
                documentoIdentidad: "",
                nombre: "",
                apellido: "",
                estadoFamilia: null,
                fechaNacimiento: null,
                parentesco: null,
                beneficioFomaf: null,
            }
        };
    },
    watch: {
        familySelect(familySelect) {
            if (familySelect != null) {
                this.family = familySelect;
            } else {
                this.family = [];
            }
        },
    },
    computed: {
        familyValid() {
            return (
                this.family.idTipoDocumento != null &&
                this.family.documentoIdentidad != "" &&
                this.family.nombre != "" &&
                this.family.apellido != "" &&
                this.family.estadoFamilia != null &&
                !!this.family.fechaNacimiento &&
                this.family.parentesco != null &&
                this.family.beneficioFomaf != null
            );
        },
    },

    methods: {
        ...mapActions({
            TipoDocumentoDesplegable: "_colegiado/TipoDocumentoDesplegable"
        }),
        validaNumeroDocumento() {
            if (this.family.idTipoDocumento == 1) {
                this.maxLength = 8;
            } else if (this.family.idTipoDocumento == 2) {
                this.maxLength = 12;
            }

            this.$refs.documentoIdentidad.focus();
        },
        comboTipoDocumento: async function () {
            var res = await this.TipoDocumentoDesplegable();
            this.tipoDocumentoDesplegable = res;
        },
        addFamily() {
            this.$emit("addFamily", this.family);
            this.family = [];

        },
        closeModal() {
            this.$emit('close');
        }
    },
    mounted() {
        this.comboTipoDocumento();
    },

};
</script>