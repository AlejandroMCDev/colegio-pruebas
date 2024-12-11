<template>
    <fieldset class="border p-2">
        <legend class="float-none w-auto">
            <h5>Buscar Personas / Colegiado</h5>
        </legend>
        <BusquedaColegiadoBuscador
            :flagAbrirModal="true"
            @BotonBuscarPersona="GoModalBuscarPersona"
            @BotonLimpiarPersona="GoLimpiarPersona"
        >
            <template v-slot:botonesAdicionales>
                <slot name="botonesAdicionales"></slot>
            </template>
        </BusquedaColegiadoBuscador>
        <div class="text-center border" v-if="persona != null && persona.id > 0">
            Bienvenido {{ persona.apellidoPaterno }} {{ persona.apellidoMaterno }} {{ persona.nombres }}
        </div>
    </fieldset>
    <!-- Modal -->
    <div
        class="modal fade"
        id="staticBackdropBusquedaColegiado"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                        Resultado de la búsqueda
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    >
                        <i class="fa fa-close"></i>
                    </button>
                </div>
                <div class="modal-body container">
                    <div>
                        <h3 class="text-center">Personas</h3>
                        <BusquedaColegiadoBuscador
                            :flagAbrirModal="false"
                            @BotonBuscarPersona="GoModalBuscarPersona"
                            @BotonLimpiarPersona="GoLimpiarPersona"
                        />
                        <hr />
                        <div class="table-responsive">
                            <table
                                class="table"
                                v-if="resultadoBusqueda.datos != 0"
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">N° CQFLL</th>
                                        <th scope="col">Apellidos</th>
                                        <th scope="col">Nombres</th>
                                        <th scope="col" class="text-center">
                                            Seleccionar
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(
                                            item, index
                                        ) in resultadoBusqueda.datos"
                                        :key="index"
                                    >
                                        <td>
                                            {{
                                                item.cqfll != 0 &&
                                                item.cqfll != null &&
                                                item.cqfll != undefined
                                                    ? item.cqfll
                                                    : "No tiene"
                                            }}
                                        </td>
                                        <td>
                                            {{ item.apellidoPaterno }}
                                            {{ item.apellidoMaterno }}
                                        </td>
                                        <td>{{ item.nombres }}</td>
                                        <td class="text-center">
                                            <i
                                                class="
                                                    fa fa-check
                                                    mx-1
                                                    text-primary
                                                "
                                                @click="
                                                    SeleccionarPersona(
                                                        item,
                                                        index
                                                    )
                                                "
                                            ></i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="pagination justify-content-center mt-2">
                                <button
                                    @click="CambiarPagina(1)"
                                    class="page-link btn btn-outline-info"
                                >
                                    Primero
                                </button>
                                <li
                                    class="page-item"
                                    v-for="(
                                        item, index
                                    ) in resultadoBusqueda.totalPaginas"
                                    style="list-style: none"
                                    :key="index"
                                >
                                    <button
                                        v-if="
                                            resultadoBusqueda.paginaActual + 5 >
                                                index &&
                                            resultadoBusqueda.paginaActual - 5 <
                                                index
                                        "
                                        href="#"
                                        @click="CambiarPagina(index + 1)"
                                        :class="
                                            resultadoBusqueda.paginaActual ==
                                            index + 1
                                                ? 'page-link btn'
                                                : 'page-link btn btn-outline-info'
                                        "
                                        :style="
                                            resultadoBusqueda.paginaActual ==
                                            index + 1
                                                ? 'color: white; background-color: #36b9cc;'
                                                : ''
                                        "
                                    >
                                        {{ index + 1 }}
                                    </button>
                                </li>
                                <button
                                    @click="
                                        CambiarPagina(
                                            resultadoBusqueda.totalPaginas
                                        )
                                    "
                                    class="page-link btn btn-outline-info"
                                >
                                    Último
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import global from "../../../../global";
import BusquedaColegiadoBuscador from "./BusquedaColegiadoBuscador.vue";
export default {
    components: { BusquedaColegiadoBuscador },
    emits: ["PersonaSeleccionada"],
    props: {
        persona: { Object },
    },
    data() {
        return {};
    },
    computed: {
        ...mapState({
            busqueda: (state) => state._persona.busqueda,
            resultadoBusqueda: (state) => state._persona.resultadoBusqueda,
        }),
    },
    methods: {
        ...mapMutations("_persona", ["SetPersonaSeleccionada"]),
        ...mapMutations("_persona", ["LimpiarPersonaSeleccionada"]),
        ...mapActions({
            BuscarPersona: "_persona/BuscarPersona",
            //BuscarPersonaPorPagina: "_persona/BuscarPersonaPorPagina",
            SetResultadoBuscarPersona: "_persona/SetResultadoBuscarPersona",
            ListarColegiados: "_colegiado/ListarColegiados",
            ListarColegiados2: "_colegiado/ListarColegiados2",
        }),
        GoModalBuscarPersona: async function (datos) {
            datos.busqueda.page_index = 1;
            //var res = await this.ListarColegiados(datos.busqueda);
            var res = await this.ListarColegiados2(datos.busqueda);
            this.SetResultadoBuscarPersona(res);
            if (res.totalRegistros == 0) {
                global._mensaje_advertencia("No hay resultados");
                return;
            }
            if (datos.flagAbrirModal) this.AbrirModal();
        },
        GoLimpiarPersona: async function () {
            this.LimpiarPersonaSeleccionada();
            await this.$emit("PersonaSeleccionada", null);
        },
        SeleccionarPersona: async function (item, index) {
            await this.SetPersonaSeleccionada(item);
            await this.$emit("PersonaSeleccionada", item);
            this.CerrarModal();
        },
        CambiarPagina: async function (numeroPagina) {
            var busqueda = { ...this.busqueda };
            busqueda.page_index = numeroPagina;
            //await this.BuscarPersona(busqueda);
            var res = await this.ListarColegiados(busqueda);
            this.SetResultadoBuscarPersona(res);
        },
        AbrirModal: function () {
            new bootstrap.Modal($("#staticBackdropBusquedaColegiado")).show();
        },
        CerrarModal: function () {
            var modal = bootstrap.Modal.getInstance(
                document.getElementById("staticBackdropBusquedaColegiado")
            );
            modal.hide();
        },
    },
};
</script>

