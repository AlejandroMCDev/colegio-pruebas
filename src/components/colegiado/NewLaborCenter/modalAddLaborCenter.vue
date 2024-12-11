<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                        AGREGAR CENTRO LABORAL
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="closeModal()">
                        <i class="fa fa-close"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="form-group">
                            <span data-bs-toggle="tooltip" data-bs-placement="top"
                                title="Si no encuentras tu Centro Laboral, presiona enter y agrégalo">
                                <SearchMultiselect v-model="laborCenters.idCentroLaboral"
                                    :options="centroLaboralDesplegable" :searchable="true" trackBy="label"
                                    noResultsText="Presione enter para agregar"
                                    noOptionsText="No hay items para mostrar" placeholder="Centro Laboral"
                                    :createTag="true" :appendNewOption="false" @option="addOptionCentroLaboral" />
                            </span>
                        </div>
                        <div class="form-group">
                            <span data-bs-toggle="tooltip2" data-bs-placement="top"
                                title="Si no encuentras tu Sector, presiona enter y agrégalo">
                                <SearchMultiselect v-model="laborCenters.idSectorLaboral"
                                    :options="sectorLaboralDesplegable" :searchable="true" trackBy="label"
                                    noResultsText="Presione enter para agregar"
                                    noOptionsText="No hay items para mostrar" placeholder="Sector" :createTag="true"
                                    :appendNewOption="false" @option="addOptionSector" />
                            </span>
                        </div>
                        <div class="form-group">
                            <span data-bs-toggle="tooltip3" data-bs-placement="top"
                                title="Si no encuentras tu Cargo, presiona enter y agrégalo">
                                <SearchMultiselect v-model="laborCenters.idCargo" :options="cargoDesplegable"
                                    :searchable="true" noResultsText="Presione enter para agregar"
                                    noOptionsText="No hay items para mostrar" placeholder="Cargo" :createTag="true"
                                    valueProp="value" label="label" :appendNewOption="false" @option="addOptionCargo" />
                            </span>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Fecha Ingreso"
                                onfocus="(this.type='date')" onblur="(this.type='text')"
                                v-model="laborCenters.fechaIngreso" />
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Fecha Culminación"
                                onfocus="(this.type='date')" onblur="(this.type='text')" 
                                v-model="laborCenters.fechaCulminacion"/>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                        Cerrar
                    </button> -->
                    <button type="button" class="btn btn-success" @click="addLaborCenter()"
                        :disabled="!laborCentersValid">
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
    name: "modalAddLaborCenter",
    components: { SearchMultiselect },
    props: {
        laborCentersSelect: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            newValTagCentroLaboral: false,
            newValTagSector: false,
            newValTagCargo: false,
            centroLaboralDesplegable: [],
            sectorLaboralDesplegable: [],
            cargoDesplegable: [],
            laborCenters: {
                idCentroLaboral: null,
                centroLaboral: null,
                idSectorLaboral: null,
                sectorLaboral: null,
                idCargo: null,
                cargo: null,
                fechaIngreso: "",
                fechaCulminacion: null,

            }
        };
    },
    watch: {
        laborCentersSelect(laborCentersSelect) {
            this.comboCentroLaboral();
            this.comboSectorLaboral();
            this.comboCargo();
            if (laborCentersSelect != null) {
                this.laborCenters = laborCentersSelect;
            } else {
                this.laborCenters = [];
            }
        },
    },
    computed: {
        laborCentersValid() {
            return (
                this.laborCenters.idCentroLaboral != null &&
                this.laborCenters.idSectorLaboral != null &&
                this.laborCenters.idCargo != null &&
                this.laborCenters.fechaIngreso != ""
            );
        },
    },

    methods: {
        addOptionCentroLaboral(newTag) {
            this.newValTagCentroLaboral = true;
            this.laborCenters.centroLaboral = newTag;
        },
        addOptionSector(newTag) {
            this.newValTagSector = true;
            this.laborCenters.sectorLaboral = newTag;
        },
        addOptionCargo(newTag) {
            this.newValTagCargo = true;
            this.laborCenters.cargo = newTag;
        },
        ...mapActions({
            CentroLaboralDesplegable: "_colegiado/CentroLaboralDesplegable",
            SectorLaboralDesplegable: "_colegiado/SectorLaboralDesplegable",
            CargoDesplegable: "_cargo/CargoDesplegable"
        }),
        comboCentroLaboral: async function () {
            var res = await this.CentroLaboralDesplegable();
            this.centroLaboralDesplegable = res.map(item => {
                return { label: item.nombre, value: item.id };
            });
            //this.centroLaboralDesplegable = res;
        },
        comboSectorLaboral: async function () {
            var res = await this.SectorLaboralDesplegable();
            this.sectorLaboralDesplegable = res.map(item => {
                return { label: item.nombre, value: item.id };
            });
            //this.sectorLaboralDesplegable = res;
        },
        comboCargo: async function () {
            var res = await this.CargoDesplegable();
            this.cargoDesplegable = res.map(item => {
                return { label: item.nombre, value: item.id };
            });
            //this.cargoDesplegable = res;
        },
        addLaborCenter() {
            if (this.newValTagCentroLaboral == true) {
                this.laborCenters.idCentroLaboral = null;
            } else {
                this.laborCenters.centroLaboral = null;
            }
            if (this.newValTagSector == true) {
                this.laborCenters.idSectorLaboral = null;
            } else {
                this.laborCenters.sectorLaboral = null;
            }
            if (this.newValTagCargo == true) {
                this.laborCenters.idCargo = null;
            } else {
                this.laborCenters.cargo = null;
            }

            this.$emit("addLaborCenter", this.laborCenters);
            this.laborCenters = [];
            this.newValTagCentroLaboral = false;
            this.newValTagSector = false;
            this.newValTagCargo = false;
        },
        closeModal() {
            this.$emit('close');
        }
    },

    mounted() {
        this.comboCentroLaboral();
        this.comboSectorLaboral();
        this.comboCargo();

        global._cargar_tooltip("tooltip");
        global._cargar_tooltip("tooltip2");
        global._cargar_tooltip("tooltip3");
    },

};
</script>