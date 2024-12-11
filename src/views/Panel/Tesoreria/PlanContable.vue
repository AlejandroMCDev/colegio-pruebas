<template>
    <div class="card-header">
        <h3 class="card-title">Modulo Plan Contable</h3>
    </div>
    <div class="card-body pb-2">
        <div class="tab-menu-heading tab-menu-heading-boxed" style="border-bottom: 0 !important;">
            <div class="tabs-menu-boxed" style="float: right;width: 100%;">
                <!-- Tabs -->
                <ul class="nav panel-tabs" style="float: right;">
                    <li><a href="#listadoTab" class="active" data-bs-toggle="tab"
                            id="tabListadoPlanContable">LISTADO</a>
                    </li>
                    <li><a href="#registrarTab" data-bs-toggle="tab" id="tabRegistrarPlanContable">REGISTRAR</a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- DATOS GENERALES -->
        <div class="panel-body tabs-menu-body">
            <div class="tab-content">
                <div class="tab-pane active" id="listadoTab">
                    <div class="mb-5 p-4 br-5">
                        <div class="form-label mt-0 p-0">LISTA</div>
                        <div class="row">
                            <div class="col-md-6 mb-3" style="text-align: center;">
                                <input type="text" class="form-control" placeholder="Nombre" v-model="plan_dsc" />
                            </div>

                            <div class="col-md-3 mb-3" style="text-align: left;">
                                <button type="button" class="btn btn-primary" style="margin: 2px;"
                                    @click="cargarRegistros()">
                                    <i class="fe fe-search me-2"></i>Buscar</button>
                                <button type="button" class="btn btn-primary" @click="nuevoRegistro()">
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
                                                <th>Numero</th>
                                                <th>Descripción</th>
                                                <th>Tipo</th>
                                                <th>Debe</th>
                                                <th>Haber</th>
                                                <th>Opciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in listadoRegistro" :key="'item-' + index"
                                                v-if="listadoRegistro.length != 0">
                                                <th scope="row">{{ indexMethod(index) }}</th>
                                                <td>{{item.plan_codigo}}</td>
                                                <td>{{item.plan_dsc}}</td>
                                                <td>{{item.plan_tipo}}</td>
                                                <td>{{item.plan_debe}}</td>
                                                <td>{{item.plan_haber}}</td>
                                                <td class="text-center">
                                                    <i class="fa fa-pencil mx-1 text-yellow" role="button"
                                                        @click="cargarVer(item, index)"></i>
                                                    <i class="fa fa-trash mx-1 text-danger" role="button"
                                                        @click="cargarEliminar(item, index)"></i>
                                                </td>
                                            </tr>
                                            <tr v-else>
                                                <td colspan="7" class="text-center">Ningun registro encontrado
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="row">
                                        <div class="pagination justify-content-center mt-3">
                                            <div class="dataTables_info" id="responsive-datatable_info" role="status"
                                                aria-live="polite">
                                                Showing {{ pagination.currentPage == 1 ? pagination.currentPage :
                                                pagination.perPage * pagination.currentPage - 9






                                                }} to
                                                {{ pagination.perPage * pagination.currentPage > pagination.total ?
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
                <div class="tab-pane" id="registrarTab">
                    <div class="form-label mt-0 p-0"> <button type="button" class="btn btn-primary"><i
                                class="fe fe-file me-2" @click="loadRegistro()"></i>Nuevo</button></div>
                    <div class="row">
                        <div class="col-md-12 row">
                            <div class="mb-5 p-4 br-5">
                                <div class="form-label mt-0 p-0">DATOS GENERALES</div>
                                <br />
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Número</label>
                                            <input type="number" class="form-control" placeholder="Número"
                                                ref="plan_codigo"
                                                :style="showAdvertise && planCuenta.plan_codigo == '' ? 'border-color: #e23e3d;' : ''"
                                                v-model="planCuenta.plan_codigo">

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Descripción</label>
                                            <input type="text" class="form-control" placeholder="Descripción"
                                                ref="plan_dsc"
                                                :style="showAdvertise && planCuenta.plan_dsc == '' ? 'border-color: #e23e3d;' : ''"
                                                v-model="planCuenta.plan_dsc">

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Tipo</label>
                                            <input type="number" class="form-control" placeholder="Tipo" ref="plan_tipo"
                                                :style="showAdvertise && planCuenta.plan_tipo == '' ? 'border-color: #e23e3d;' : ''"
                                                v-model="planCuenta.plan_tipo">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Debe</label>
                                            <input type="number" class="form-control" placeholder="Debe"
                                                v-model="planCuenta.plan_debe">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Haber</label>
                                            <input type="number" class="form-control" placeholder="Haber"
                                                v-model="planCuenta.plan_haber">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input"
                                                    name="example-checkbox1">
                                                <span class="custom-control-label">Activo</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Fecha Registro</label>
                                            <input type="text" class="form-control" placeholder="Fecha Registro"
                                                disabled v-model="fechaRegistro">

                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Usuario Registro</label>
                                            <input type="text" class="form-control" placeholder="Usuario Registro"
                                                disabled v-model="usuarioRegistro">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <button class="btn btn-primary m-2" type="button">Cancelar</button>
                            <button class="btn btn-primary" type="button" @click="guardarCambios">Guardar</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>


</template>

<script>
import { mapActions } from "vuex";

import global from "../../../global";
//Library
import dayjs from "dayjs";
export default {
    name: "Concepto",
    data() {
        return {
            showAdvertise: false,
            indiceModificando: -1,
            filtros: "",
            date: new Date(),
            currentDate: dayjs(this.date).format("YYYY-MM-DD"),
            listadoRegistro: [],
            usuarioRegistro: "",
            fechaRegistro: "",
            planCuenta: {},
            planCuentaBase: {
                plan_codigo: "",
                plan_dsc: "",
                plan_tipo: "",
                plan_debe: "",
                plan_haber: ""
            },
            plan_dsc: "",
            buscador: {
                page_index: 1,
                page_size: 10,
                plan_dsc: ""
            },
            totalPaginas: 0,
            pagination: {
                perPage: 10,
                currentPage: 1,
                perPageOptions: [10, 15, 25, 50],
                total: 0
            },
        };
    },
    methods: {
        ...mapActions({
            AgregarPlanCuenta: "_plancuenta/AgregarPlanCuenta",
            ModificarPlanCuenta: "_plancuenta/ModificarPlanCuenta",
            EliminarPlanCuenta: "_plancuenta/EliminarPlanCuenta",
            ListarRegistros: "_plancuenta/ListarRegistros",
            ObtenerPlanCuenta: "_plancuenta/ObtenerPlanCuenta"
        }),
        cambiarPagina: function (paginaDestino) {
            this.cargarRegistros(paginaDestino);
        },
        indexMethod(index) {
            return (this.buscador.page_index - 1) * 10 + (index + 1);
        },
        cargarVer: function (item, index) {          

            this.planCuenta.plan_codigo = item.plan_codigo;
            this.planCuenta.plan_dsc = item.plan_dsc;
            this.planCuenta.plan_tipo = item.plan_tipo;
            this.planCuenta.plan_debe = item.plan_debe;
            this.planCuenta.plan_haber = item.plan_haber;

            this.indiceModificando = index;
            this.cambiarTabRegistro();
        },
        cargarEliminar: async function (item, index) {
            this.planCuenta = { ...item };
            global._swal_pregunta(
                "¿Está seguro que desea eliminar el registro?",
                async () => {
                    var res = await this.EliminarPlanCuenta(this.planCuenta);
                    if (res?.exito) {
                        this.cargarRegistros();
                        global._mensaje_exito("Se ha eliminado");
                    }
                }
            );
        },
        cambiarTabListar() {
            document.getElementById("tabRegistrarPlanContable").className = "";
            document.getElementById("registrarTab").className = "tab-pane";
            document.getElementById("tabListadoPlanContable").className = "active";
            document.getElementById("listadoTab").className = "tab-pane active";
        },
        cambiarTabRegistro() {
            document.getElementById("tabRegistrarPlanContable").className = "active";
            document.getElementById("registrarTab").className = "tab-pane active";
            document.getElementById("tabListadoPlanContable").className = "";
            document.getElementById("listadoTab").className = "tab-pane";
        },
        validarRegistro() {
            let valida = false;

            if (this.planCuenta.plan_codigo == "") {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.plan_codigo.focus();
                });
            } else if (this.planCuenta.plan_dsc == "") {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.plan_dsc.focus();
                });
            } else if (this.planCuenta.plan_tipo == "") {
                this.showAdvertise = true;
                valida = true;
                setTimeout(() => {
                    this.$refs.plan_tipo.focus();
                });
            }          
            return valida;
        },
        guardarCambios: async function () {
            var res = null;
            let valor = this.validarRegistro();
            if (!valor) {
                if (this.indiceModificando == -1) {
                    res = await this.AgregarPlanCuenta(this.planCuenta);
                } else {
                    res = await this.ModificarPlanCuenta(this.planCuenta);
                }
            }
            if (res?.exito) {
                this.showAdvertise = false;
                this.nuevoRegistro();
                this.cargarRegistros();
                global._mensaje_exito(
                    "Los cambios se han guardado correctamente"
                );
                this.cambiarTabListar();

            }
        },
        loadRegistro: function () {
            this.planCuenta = { ...this.planCuentaBase };
            this.fechaRegistro = this.currentDate;
            this.usuarioRegistro = "";
            this.indiceModificando = -1;
        },
        nuevoRegistro() {
            this.loadRegistro();
            this.cambiarTabRegistro();
        },
        cargarRegistros: async function (pagina = 1) {

            this.buscador.page_index = pagina;
            this.buscador.plan_dsc = this.plan_dsc;

            var res = await this.ListarRegistros(this.buscador);

            this.listadoRegistro = res.datos;
            this.pagination.total = res.totalRegistros;
            this.pagination.perPage = res.registrosPorPagina;
            this.pagination.currentPage = res.paginaActual;
            this.buscador.page_index = res.paginaActual;
            this.totalPaginas = res.totalPaginas;
            
        },

    },
    mounted() {
        this.loadRegistro();
        this.cargarRegistros();
        this.fechaRegistro = this.currentDate;
    },
};
</script>
