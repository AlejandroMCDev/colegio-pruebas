<template>
    <div class="card-header">
        <h3 class="card-title">Modulo Registro de Pagos</h3>
    </div>
    <div class="card-body pb-2">
        <div class="tab-menu-heading tab-menu-heading-boxed" style="border-bottom: 0 !important;">
            <div class="tabs-menu-boxed" style="float: right;width: 100%;">
                <!-- Tabs -->
                <ul class="nav panel-tabs" style="float: right;">
                    <li><a href="#listadoTab" class="active" data-bs-toggle="tab" id="tabGeneralListado">LISTADO</a>
                    </li>
                    <li><a href="#registrarTab" data-bs-toggle="tab" id="tabGeneralRegistrar">REGISTRAR</a>
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
                            <div class="col-md-4 mb-3" style="text-align: center;">
                                <select class="form-control form-select" data-bs-placeholder="Todos">
                                    <option value="">Modo
                                    </option>
                                    <option value="FECHA">FECHA
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-4 mb-3" style="text-align: center;">
                                <input class="form-control" onfocus="(this.type='date')" onblur="(this.type='text')"
                                    placeholder="Fecha Inicio" />
                            </div>
                            <div class="col-md-4 mb-3" style="text-align: center;">
                                <input class="form-control" onfocus="(this.type='date')" onblur="(this.type='text')"
                                    placeholder="Fecha Fin" />
                            </div>
                            <div class="col-md-4 mb-3" style="text-align: center;">
                                <select class="form-control form-select" data-bs-placeholder="Todos">
                                    <option value="">Ventanilla
                                    </option>
                                    <option value="1">01- Caja
                                    </option>
                                    <option value="2">02- Otros
                                    </option>

                                </select>
                            </div>
                            <div class="col-md-4 mb-3" style="text-align: left;">
                                <button type="button" class="btn btn-primary">
                                    <i class="fe fe-search me-2"></i>Buscar</button>
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
                                                <th>Operación</th>
                                                <th>Tipo</th>
                                                <th>Serie</th>
                                                <th>Número</th>
                                                <th>Dni</th>
                                                <th>CQFLL</th>
                                                <th>Beneficiado</th>
                                                <th>Tipo</th>
                                                <th>Fecha</th>
                                                <th>Importe</th>
                                                <th>Pago</th>
                                                <th>Usuario</th>
                                                <th>Estado</th>
                                                <th>Opciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in listadoRegistro" :key="'item-' + index"
                                                v-if="listadoRegistro.length != 0">
                                                <td scope="row">{{ item.correlativo }}</td>
                                                <td>{{ item.operacion }}</td>
                                                <td>{{ item.tipo }}</td>
                                                <td>{{ item.serie }}</td>
                                                <td>{{ item.numero }}</td>
                                                <td>{{ item.dni }}</td>
                                                <td>{{ item.cqfll }}</td>
                                                <td>{{ item.beneficiado }}</td>
                                                <td>{{ item.tipo2 }}</td>
                                                <td>{{ item.fecha }}</td>
                                                <td>{{ item.importe }}</td>
                                                <td>{{ item.pago }}</td>
                                                <td>{{ item.usuario }}</td>
                                                <td>{{ item.estado }}</td>
                                                <td class="text-center">
                                                    <i class="fa fa-pencil mx-1 text-yellow" role="button"></i>
                                                    <i class="fa fa-trash mx-1 text-danger" role="button"></i>
                                                </td>
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
                </div>
                <div class="tab-pane" id="registrarTab">
                    <div class="form-label mt-0 p-0"> <button type="button" class="btn btn-primary"><i
                                class="fe fe-file me-2"></i>Nuevo</button></div>
                    <div class="row">
                        <div class="col-md-12 row">
                            <div class="mb-5 p-4 br-5">
                                <div class="row">
                                    <div class="form-label mt-0 p-0">DATOS DEL PAGO</div>
                                    <div class="col-md-12 row">
                                        <div class="border mb-5 p-4 br-5">
                                            <div class="form-label mt-0 p-0">Comprobante</div>
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Serie</label>
                                                        <select class="form-control form-select"
                                                            data-bs-placeholder="Tipo Comprobante">
                                                            <option value="">Tipo Comprobante
                                                            </option>
                                                            <option value="1">Ticket Recibo
                                                            </option>
                                                            <option value="2">02- Otros
                                                            </option>

                                                        </select>

                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Serie</label>
                                                        <input type="text" class="form-control" placeholder="Serie">

                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Número</label>
                                                        <input type="text" class="form-control" placeholder="Número">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Fecha Emisión</label>
                                                        <input type="date" class="form-control"
                                                            placeholder="Fecha Emisión">

                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>RUC</label>
                                                        <input type="text" class="form-control" placeholder="RUC">
                                                    </div>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="form-group">
                                                        <label>Razón Social</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Razón Social / Nombre">
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Dirección</label>
                                                        <input type="text" class="form-control" placeholder="Dirección">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Documento</label>
                                                        <select class="form-control form-select"
                                                            data-bs-placeholder="Tipo Comprobante">
                                                            <option value="">Documento
                                                            </option>
                                                            <option value="1">Colegiado
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>N° CQFP</label>
                                                        <input type="text" class="form-control" placeholder="Serie">

                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label>Agremiado</label>
                                                        <input type="text" class="form-control" placeholder="Agremiado">
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Estado Agremiado</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Estado Agremiado">

                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Última Cuota</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Última Cuota">
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Última FOMAF</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Última FOMAF">
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Tipo Operación</label>
                                                        <select class="form-control form-select"
                                                            data-bs-placeholder="Tipo Operación">
                                                            <option value="">Tipo Operación
                                                            </option>
                                                            <option value="1">Contado
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Campaña</label>
                                                        <select class="form-control form-select"
                                                            data-bs-placeholder="Campaña">
                                                            <option value="">Campaña
                                                            </option>
                                                            <option value="1">Normal
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Estado Comprobante</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Estado Comprobante">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Cobrador</label>
                                                        <select class="form-control form-select"
                                                            data-bs-placeholder="Cobrador">
                                                            <option value="">Cobrador
                                                            </option>
                                                            <option value="1">Gil Sanchez Lidia
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Operación</label>
                                                        <input type="text" class="form-control" placeholder="Operación">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Fecha Registro</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Fecha Registro" disabled>

                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Usuario Registro</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Usuario Registro" disabled>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 row">
                                        <div class="border mb-5 p-4 br-5">
                                            <div class="form-label mt-0 p-0">DETALLE</div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="table-responsive">
                                                        <table
                                                            class="table border text-nowrap text-md-nowrap table-striped table-sm mb-0">
                                                            <thead>
                                                                <tr>
                                                                    <th>COD</th>
                                                                    <th>CONCEPTO</th>
                                                                    <th>DESCRIPCION</th>
                                                                    <th>CANTIDAD</th>
                                                                    <th>PRECIO</th>
                                                                    <th>IMPORTE</th>
                                                                    <th>AFECTO</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="(item, index) in listadoRegistroDetalle"
                                                                    :key="'item-' + index"
                                                                    v-if="listadoRegistroDetalle.length != 0">
                                                                    <td>{{ item.cod }}</td>
                                                                    <td>{{ item.concepto }}</td>
                                                                    <td>{{ item.descripcion }}</td>
                                                                    <td>{{ item.cantidad }}</td>
                                                                    <td>{{ item.precio }}</td>
                                                                    <td>{{ item.importe }}</td>
                                                                    <td class="text-center">
                                                                        <input type="checkbox"
                                                                            name="example-checkbox1" />
                                                                    </td>
                                                                    <td class="text-center">
                                                                        <i class="fa fa-pencil mx-1 text-yellow"
                                                                            role="button"></i>
                                                                        <i class="fa fa-trash mx-1 text-danger"
                                                                            role="button"></i>
                                                                    </td>
                                                                </tr>
                                                                <tr v-else>
                                                                    <td colspan="6" class="text-center">Ningun registro
                                                                        encontrado
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label>Concepto</label>
                                                        <input type="text" class="form-control" placeholder="Concepto">
                                                    </div>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="form-group">
                                                        <label>Descripción Concepto</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Descripción Concepto" disabled>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Observación</label>
                                                        <input type="text" class="form-control"
                                                            placeholder="Observación">
                                                    </div>
                                                </div>

                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <label>Descuento</label>
                                                        <input type="number" class="form-control"
                                                            placeholder="Descuento">

                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <!-- <label></label>
                                                        <input type="checkbox" class="mt-6 p-0"
                                                            name="example-checkbox1" /> -->
                                                        <label class="custom-control custom-checkbox mt-6">
                                                            <input type="checkbox" class="custom-control-input"
                                                                name="example-checkbox1" value="option1">
                                                            <span class="custom-control-label">Convenio</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <label></label>
                                                        <button class="btn btn-primary mt-6 p-1"
                                                            type="button" disabled>Programación</button>
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <label>SubTotal</label>
                                                        <input type="number" class="form-control"
                                                            placeholder="SubTotal">

                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <label>Igv</label>
                                                        <input type="number" class="form-control" placeholder="Igv">

                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <label>Total</label>
                                                        <input type="number" class="form-control" placeholder="Total">

                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Comentario</label>
                                                        <textarea class="form-control" placeholder="Comentario"
                                                            rows="2"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 row">
                                        <div class="border mb-5 p-4 br-5">
                                            <div class="form-label mt-0 p-0">PAGO</div>
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Tipo Transacción</label>
                                                        <select class="form-control form-select"
                                                            data-bs-placeholder="Tipo Transacción">
                                                            <option value="">Tipo Transacción
                                                            </option>
                                                            <option value="1">Banco
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Aplicar Resolución</label>
                                                        <select class="form-control form-select"
                                                            data-bs-placeholder="Aplicar Resolución">
                                                            <option value="">Aplicar Resolución
                                                            </option>
                                                            <option value="1">Ninguno
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Paga</label>
                                                        <input type="number" class="form-control" placeholder="Paga">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label>Vuelto</label>
                                                        <input type="number" class="form-control" placeholder="Vuelto">
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
//Library
import dayjs from "dayjs";
export default {
    name: "Concepto",
    data() {
        return {
            date: new Date(),
            currentDate: dayjs(this.date).format("YYYY-MM-DD"),
            listadoRegistro: [
                {
                    correlativo: "1",
                    operacion: "82936",
                    tipo: "Ticket Recibo",
                    serie: "00001",
                    numero: "0010430",
                    dni: "27512",
                    cqfll: "27512",
                    beneficiado: "CARRASCO MIRANDA JHISET",
                    tipo2: "CON",
                    fecha: "10/09/2022",
                    importe: "90.00",
                    pago: "Banco",
                    usuario: "Igil",
                    estado: "Normal",
                },
                {
                    correlativo: "2",
                    operacion: "82935",
                    tipo: "Ticket Recibo",
                    serie: "00001",
                    numero: "0010431",
                    dni: "27512",
                    cqfll: "27512",
                    beneficiado: "CARRASCO MIRANDA JHISET",
                    tipo2: "CON",
                    fecha: "10/09/2022",
                    importe: "160.00",
                    pago: "Efectivo",
                    usuario: "Igil",
                    estado: "Normal",
                },
                {
                    correlativo: "3",
                    operacion: "82934",
                    tipo: "Ticket Recibo",
                    serie: "00001",
                    numero: "0010432",
                    dni: "27512",
                    cqfll: "27512",
                    beneficiado: "CARRASCO MIRANDA JHISET",
                    tipo2: "CON",
                    fecha: "10/09/2022",
                    importe: "70.00",
                    pago: "Banco",
                    usuario: "Igil",
                    estado: "Normal",
                },
                {
                    correlativo: "4",
                    operacion: "82933",
                    tipo: "Ticket Recibo",
                    serie: "00001",
                    numero: "0010433",
                    dni: "27512",
                    cqfll: "27512",
                    beneficiado: "CARRASCO MIRANDA JHISET",
                    tipo2: "CON",
                    fecha: "10/09/2022",
                    importe: "20.00",
                    pago: "Efectivo",
                    usuario: "Igil",
                    estado: "Normal",
                },
                {
                    correlativo: "5",
                    operacion: "82932",
                    tipo: "Ticket Recibo",
                    serie: "00001",
                    numero: "0010434",
                    dni: "27512",
                    cqfll: "27512",
                    beneficiado: "CARRASCO MIRANDA JHISET",
                    tipo2: "CON",
                    fecha: "10/09/2022",
                    importe: "25.00",
                    pago: "Banco",
                    usuario: "Igil",
                    estado: "Normal",
                }
            ],
            listadoRegistroDetalle: [
                {
                    cod: "2",
                    concepto: "CUOTA ORDINARIA",
                    descripcion: "DICIEMBRE - 2021 A ENERO-2022",
                    cantidad: "2",
                    precio: "15.00",
                    importe: "30"
                },
                {
                    cod: "8",
                    concepto: "CUOTA MENSUAL FOMAF",
                    descripcion: "DICIEMBRE - 2021 A ENERO - 2022",
                    cantidad: "2",
                    precio: "5",
                    importe: "10"
                },
                {
                    cod: "136",
                    concepto: "TRAMITE ADMINISTRATIVO DE TRASLADO",
                    descripcion: "DICIEMBRE-2021 A ENERO-2022",
                    cantidad: "1",
                    precio: "50",
                    importe: "50"
                },

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
