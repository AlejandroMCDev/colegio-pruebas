<template>
    <div class="table-responsive">
        <table class="table text-center">
            <tbody>
                <tr>
                    <th>Cod Comprobante</th>
                    <td>{{comprobante.comprobante.cod_comprobante}}</td>
                </tr>
                <tr>
                    <th>Nombres</th>
                    <td>{{comprobante.comprobante.nombres}}</td>
                </tr>
                <tr>
                    <th>Fecha</th>
                    <td>{{comprobante.comprobante.fecha_comprobante}}</td>
                </tr>
                <tr>
                    <th>Tipo de comprobante</th>
                    <td>{{comprobante.comprobante.desc_tipodoc}}</td>
                </tr>
                <tr>
                    <th>Total</th>
                    <td>S/. {{comprobante.comprobante.total}}</td>
                </tr>
                <tr v-if="comprobante.comprobante.nubefact_url != null && comprobante.comprobante.nubefact_url != ''">
                    <th colspan="2">Link para imprimir</th>
                </tr>
                <tr v-if="comprobante.comprobante.nubefact_url != null && comprobante.comprobante.nubefact_url != ''">
                    <td colspan="2">
                        <a target="_blank" :href="comprobante.comprobante.nubefact_url">
                            {{comprobante.comprobante.nubefact_url}}
                        </a>
                    </td>
                </tr>
                <tr v-if="comprobante.comprobante.tipo_comprobante == CODIGO_RECIBO">
                    <td colspan="2">
                        <a target="_blank" :href="obtenerUrlRecibo()">
                            {{obtenerUrlRecibo()}}
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import global from "../../../../global";
export default {
    name: "ResumenPago",
    props: {
        comprobante: Object,
    },
    data() {
        return {
            ruta_api: global.ruta_api,
            CODIGO_RECIBO: global.CODIGO_RECIBO,
            CODIGO_FACTURA: global.CODIGO_FACTURA,
            CODIGO_BOLETA: global.CODIGO_BOLETA,
        };
    },
    methods: {
        obtenerUrlRecibo(){
            if (this.comprobante != null)
                return this.ruta_api + "comprobante/ver/" + this.comprobante.comprobante.cod_comprobante;
            return this.ruta_api;
        },
    },
    async created() {},
};
</script>
