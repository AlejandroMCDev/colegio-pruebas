<template>
    <div class="table-responsive">
        <table class="table text-center">
            <thead>
                <tr>
                    <th>Concepto</th>
                    <th>Monto</th>
                    <th>Seleccionar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in listaCuota" :key="index">
                    <td>{{ item.desc_concepto }} {{ item.nombre }}</td>
                    <td>S/. {{ parseFloat(item.monto).toFixed(2) }}</td>
                    <td class="d-flex justify-content-center">
                        <div class="form-group">
                            <label class="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    name="example-checkbox1"
                                    v-model="item.seleccionado"
                                    @change="CuotaSeleccionada(index)"
                                />
                                <span class="custom-control-label"> </span>
                            </label>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        listaCuota: Array,
    },
    data() {
        return {};
    },
    methods: {
        CuotaSeleccionada: async function (index) {
            this.listaCuota
                .filter((_, index2) => index2 > index)
                .forEach((item2) => (item2.seleccionado = false));
            this.listaCuota
                .filter((_, index2) => index2 < index)
                .forEach((item2) => (item2.seleccionado = true));
        },
    },
};
</script>
