<template>
    <div class="row">
        <div class="col-md-5 mb-3" style="text-align: center">
            <select
                class="form-control form-select select2"
                data-bs-placeholder="Filtros"
                v-model="filtros.filtrosColegiado"
            >
                <option value="" disabled>Filtros</option>
                <option value="dni">DNI</option>
                <option value="cqf">CQFP</option>
                <option value="nombreApellido">Apellidos y Nombres</option>
            </select>
        </div>
        <div class="col-md-7 mb-3" style="text-align: center">
            <input
                type="text"
                class="form-control"
                aria-label="Text input with dropdown button"
                v-model="filtros.searchFiltro"
                placeholder=""
            />
        </div>
    </div>
    <div class="text-end">
        <button class="btn btn-primary m-2" @click="BotonLimpiarPersona()">
            Limpiar
        </button>
        <button class="btn btn-primary m-2" @click="BotonBuscarPersona()">
            <i class="fe fe-search me-2"></i>Buscar
        </button>
        <slot name="botonesAdicionales"></slot>
    </div>
</template>

<script>
import { mapState } from "vuex";
import global from "../../../../global";
export default {
    props: {
        flagAbrirModal: { Boolean },
    },
    emits: ["BotonBuscarPersona", "BotonLimpiarPersona"],
    data() {
        return {};
    },
    computed: {
        ...mapState({
            filtros: (state) => state._persona.filtros,
            busqueda: (state) => state._persona.busqueda,
            resultadoBusqueda: (state) => state._persona.resultadoBusqueda,
        }),
    },
    methods: {
        BotonBuscarPersona: async function () {
            if (this.filtros.searchFiltro == "") {
                global._mensaje_error(
                    "Al menos ingrese una letra para poder buscar"
                );
                return;
            }
            if (this.filtros.filtrosColegiado == "dni") {
                this.busqueda.dni = this.filtros.searchFiltro;
                this.busqueda.cqf = "";
                this.busqueda.nombreApellido = "";
            } else if (this.filtros.filtrosColegiado == "cqf") {
                this.busqueda.dni = "";
                this.busqueda.cqf = this.filtros.searchFiltro;
                this.busqueda.nombreApellido = "";
            } else if (this.filtros.filtrosColegiado == "nombreApellido") {
                this.busqueda.dni = "";
                this.busqueda.cqf = "";
                this.busqueda.nombreApellido = this.filtros.searchFiltro;
            } else {
                global._mensaje_error("Selecione un filtro de búsqueda");
                return;
            }
            await this.$emit("BotonBuscarPersona", {
                busqueda: { ...this.busqueda },
                flagAbrirModal: this.flagAbrirModal,
            });
        },
        BotonLimpiarPersona: function () {
            this.$emit("BotonLimpiarPersona");
        },
    },
};
</script>

