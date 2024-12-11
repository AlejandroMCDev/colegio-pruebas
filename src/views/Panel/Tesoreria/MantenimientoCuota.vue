<template>
    <div class="card-header">
        <h3 class="card-title">Modulo de Cuota</h3>
    </div>
    <div class="card-body pb-2">
        <div class="tab-menu-heading tab-menu-heading-boxed" style="border-bottom: 0 !important;">
            <div class="tabs-menu-boxed" style="float: right;width: 100%;">
                <!-- Tabs -->
                <ul class="nav panel-tabs" style="float: right;">
                    <!-- <li><a href="#listadoTab" class="active" data-bs-toggle="tab" id="tabGeneralListado">LISTADO</a>
                    </li> -->
                    <li><a href="#registrarTab" class="active" data-bs-toggle="tab"
                            id="tabGeneralRegistrar">REGISTRAR</a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- DATOS GENERALES -->
        <div class="panel-body tabs-menu-body">
            <div class="tab-content">

                <div class="tab-pane active" id="registrarTab">
                    <div class="row">
                        <div class="form-label mt-0 p-0">ACTUALIZAR DATOS PROFESIONAL</div>
                        <div class="col-md-12 row">
                            <div class="border mb-5 p-4 br-5">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Número CQFP</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" placeholder="CQFP"
                                                    aria-label="Example text with button addon" ref="CQFP"
                                                    aria-describedby="button-addon1">
                                                <button type="button" class="btn btn-primary"><i
                                                        class="fe fe-search me-2"></i></button>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label>Agremiado</label>
                                            <input type="text" class="form-control" placeholder="Agremiado">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Estado</label>
                                            <input type="text" class="form-control" placeholder="Estado" disabled>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Último Mes</label>
                                            <input type="text" class="form-control" placeholder="Último Mes" disabled>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Último FOMAF</label>
                                            <input type="text" class="form-control" placeholder="Último FOMAF" disabled>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="form-label mt-0 p-0">DETALLE</div>
                        <div class="col-md-12 row">
                            <div class="border mb-5 p-4 br-5">
                                <div class="form-label mt-0 p-0">
                                    <div class="row">
                                        <div class="col-2">
                                            <div class="input-group">
                                                <input type="number" class="form-control form-control-sm"
                                                    aria-label="Example text with button addon"
                                                    aria-describedby="button-addon1" value="1">
                                                <button type="button" class="btn btn-primary btn-sm"><i
                                                        class="fe fe-plus p-1 m-1"></i></button>
                                            </div>
                                        </div>
                                        <div class="col-2">
                                            <label>Agregar Cuotas</label>
                                        </div>
                                        <div class="col-2">
                                            <div class="input-group">
                                                <input type="number" class="form-control form-control-sm"
                                                    aria-label="Example text with button addon"
                                                    aria-describedby="button-addon1" value="1">
                                                <button type="button" class="btn btn-primary btn-sm"><i
                                                        class="fe fe-plus p-1 m-1"></i></button>
                                            </div>

                                        </div>
                                        <div class="col-2">
                                            <label>Agregar FOMAF</label>
                                        </div>
                                        <div class="col-2">
                                            <button class="btn btn-sm btn-danger p-1 m-1">
                                                -
                                            </button>
                                            <label>Quitar Cuotas</label>
                                        </div>
                                        <div class="col-2">
                                            <button class="btn btn-sm btn-danger p-1 m-1">
                                                -
                                            </button>
                                            <label>Quitar FOMAF</label>
                                        </div>

                                    </div>

                                </div>
                                <div class="table-responsive">
                                    <table class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0">
                                        <thead>
                                            <tr>
                                                <th>Concepto</th>
                                                <th>Mes</th>
                                                <th>Monto</th>
                                                <th>Fecha</th>
                                                <th>Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in listadoRegistro" :key="'item-' + index"
                                                v-if="listadoRegistro.length != 0">
                                                <td>{{ item.concepto }}</td>
                                                <td>{{ item.mes }}</td>
                                                <td>{{ item.monto }}</td>
                                                <td>{{ item.fecha }}</td>
                                                <td>{{ item.estado }}</td>
                                            </tr>
                                            <tr v-else>
                                                <td colspan="6" class="text-center">Ningun registro encontrado
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <button class="btn btn-primary m-2" type="submit">Cancelar</button>
                            <button class="btn btn-primary" type="submit">Guardar</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>


</template>

<script>
import SearchMultiselect from "../../../components/SearchMultiselect/SearchMultiselect.vue";
//Library
import dayjs from "dayjs";
export default {
    name: "Concepto",
    data() {
        return {
            filtros: "",
            date: new Date(),
            currentDate: dayjs(this.date).format("YYYY-MM-DD"),
            listadoRegistro: [
                {
                    mes: "ENERO",
                    concepto: "CUOTA MENSUAL",
                    monto: "25.00",
                    fecha: "10/09/2022",
                    estado: "CANCELADO"
                },
                {
                    mes: "FEBRERO",
                    concepto: "CUOTA MENSUAL",
                    monto: "25.00",
                    fecha: "10/09/2022",
                    estado: "CANCELADO"
                },
                {
                    mes: "MARZO",
                    concepto: "CUOTA MENSUAL",
                    monto: "25.00",
                    fecha: "10/09/2022",
                    estado: "CANCELADO"
                },
                {
                    mes: "ABRIL",
                    concepto: "CUOTA MENSUAL",
                    monto: "25.00",
                    fecha: "10/09/2022",
                    estado: "CANCELADO"
                },
                {
                    mes: "MAYO",
                    concepto: "CUOTA MENSUAL",
                    monto: "25.00",
                    fecha: "10/09/2022",
                    estado: "CANCELADO"
                }
            ],
            usuarioRegistro: "",
            fechaRegistro: ""
        };
    },
    methods: {

    },
    mounted() {
        this.fechaRegistro = this.currentDate;
    },
};
</script>
