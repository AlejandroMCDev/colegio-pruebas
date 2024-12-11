<template>
    <div class="row">
        <div class="col-md-6">
            <div class="form-group">
                <div class="form-floating">
                    <input
                        type="number"
                        class="form-control"
                        placeholder="Nombres"
                        v-model="cantidad"
                        min="1"
                    />
                    <label>Cantidad de cuotas</label>
                </div>
            </div>
        </div>
        <div class="col-md-3 mt-3 text-center">
            <button class="btn btn-outline-success" @click="AgregarCuota">
                Agregar
            </button>
        </div>
        <div class="col-md-3 mt-3 text-center">
            <button class="btn btn-outline-danger" @click="QuitarCuota">
                Quitar
            </button>
        </div>
        <div class="col-md-12">
            <div class="form-group">
                <div class="form-floating">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Nombres"
                        readonly
                        :value="obtenerDeudaResumida"
                    />
                    <label>DeudaActual</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        listaDeuda: { Array },
        codConcepto: { Number },
    },
    emits: ["AgregarCuota", "QuitarCuota"],
    data() {
        return {
            cantidad: 1,
        };
    },
    computed: {
        obtenerDeudaResumida() {
            return this.ObtenerDeudaResumen(this.listaDeuda ?? []);
        },
    },
    methods: {
        AgregarCuota: async function () {
            await this.$emit("AgregarCuota", {
                codConcepto: this.codConcepto,
                cantidad: this.cantidad,
            });
        },
        QuitarCuota: async function () {
            await this.$emit("QuitarCuota", {
                codConcepto: this.codConcepto,
                cantidad: this.cantidad,
            });
        },
        ObtenerDeudaResumen: function (listaDeuda) {
            if (listaDeuda.length == 0) return "No hay deuda pendiente";
            if (listaDeuda.length == 1) return listaDeuda[0].nombre;
            if (listaDeuda.length > 1)
                return `${listaDeuda[0].nombre} - ${
                    listaDeuda[listaDeuda.length - 1].nombre
                }`;
        },
    },
};
</script>
