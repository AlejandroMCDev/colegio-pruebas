<template>
    <div class="table-responsive">
        <table class="table text-center">
            <thead>
                <tr>
                    <slot name="tablaCabecera"></slot>
                    <th>Concepto</th>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                    <th>Monto(S/.)</th>
                    <th>Afecto IGV</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in detallePago" :key="index">
                    <slot
                        name="tablaContenido"
                        v-bind="{ item: item, index: index }"
                    ></slot>
                    <td class="pt-4">{{ item.cod_concepto }}</td>
                    <td class="pt-4">{{ item.descripcion }}</td>
                    <td v-if="item.flagCantidadModificable == true">
                        <input
                            type="number"
                            class="form-control"
                            v-model="item.cantidad"
                            min="1"
                            @change="seHaModificadoCantidadYPrecio"
                        />
                    </td>
                    <td v-else class="pt-4">{{ item.cantidad }}</td>
                    <td v-if="item.flagPrecioModificable == true">
                        <input
                            type="number"
                            class="form-control"
                            v-model="item.precio"
                            min="1"
                            @change="seHaModificadoCantidadYPrecio"
                        />
                    </td>
                    <td v-else class="pt-4">S/. {{ item.precio }}</td>
                    <td class="pt-4">
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                id="flexCheckDefault"
                                v-model="item.afecto"
                            />
                        </div>
                    </td>
                </tr>
                <tr v-if="detallePago.length > 0">
                    <slot name="tablaParteFinal"></slot>
                    <td colspan="3">Total:</td>
                    <td>
                        S/.
                        {{
                            parseFloat(
                                detallePago
                                    .map((x) => x.importe)
                                    .reduce(
                                        (x, y) => parseFloat(x) + parseFloat(y)
                                    )
                            ).toFixed(2)
                        }}
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        detallePago: Array,
        modificarCantidades: { Boolean },
    },
    data() {
        return {};
    },
    methods:{
        seHaModificadoCantidadYPrecio: function(){
            this.$emit('procesarComprobanteDetalle');
        },
    },
    mounted() {},
};
</script>
