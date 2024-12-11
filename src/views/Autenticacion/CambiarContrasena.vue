<template>
    <div class="card-header">
        <h3 class="card-title">Cambiar Contraseña</h3>
    </div>
    <div class="text-center">
        <!--<Loading :mostrar="cargando" />-->
    </div>
    <div class="text-center container pt-4 pb-4" v-if="!cargando">
        <h3>Para cambiar su contraseña, ingrese los siguientes campos</h3>
        <div class="row">
            <div class="d-flex justify-content-center">
                <form
                    class="form-group col-md-5"
                    @submit.prevent="contrasena_cambiar"
                >
                    <div class="form-group">
                        <label>Contraseña actual</label>
                        <input
                            type="password"
                            class="form-control m-2"
                            placeholder="Contraseña actual"
                            v-model="usuario.contrasena_actual"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label>Contraseña nueva</label>
                        <input
                            type="password"
                            class="form-control m-2"
                            placeholder="Contraseña nueva"
                            v-model="usuario.contrasena_nueva1"
                            required
                        />
                        <input
                            type="password"
                            class="form-control m-2"
                            placeholder="Repetir contraseña"
                            v-model="usuario.contrasena_nueva2"
                            required
                        />
                    </div>

                    <span
                        v-if="
                            usuario.contrasena_nueva1 !=
                            usuario.contrasena_nueva2
                        "
                        class="text-danger"
                    >
                        Las contraseñas tienen que ser iguales
                    </span>

                    <router-link class="btn btn-outline-success m-2" to="/">
                        Volver al inicio
                    </router-link>
                    <button
                        class="btn btn-success"
                        type="submit"
                        :disabled="
                            usuario.contrasena_nueva1 !=
                            usuario.contrasena_nueva2
                        "
                    >
                        Cambiar contraseña
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
//import Loading from "../../components/Loading.vue";
import global from "../../global";
//import { mapActions } from "vuex";
export default {
    components: {
        //Loading,
    },
    data() {
        return {
            cargando: false,
            usuario: {
                contrasena_actual: "",
                contrasena_nueva1: "",
                contrasena_nueva2: "",
            },
        };
    },
    methods: {
        //...mapActions("_login", ["cambiarcontrasena"]),
        contrasena_cambiar: async function () {
            console.log(this.usuario.contrasena_nueva1);
            console.log(this.usuario.contrasena_nueva1.length);
            if (this.usuario.contrasena_nueva1.length < 6){
                await global._mensaje_error("La nueva contraseña debe tener un mínimo de 6 caracteres");
                return;
            }
            this.cargando = true;
            //const resultado = await this.cambiarcontrasena({
            //    contrasena_actual: this.usuario.contrasena_actual,
            //    contrasena_nueva: this.usuario.contrasena_nueva1,
            //});
            //this.cargando = false;
            //if (resultado.success) {
            //    await global._mensaje_exito("La contraseña se ha cambiado de manera correcta");
            //    this.$router.go();
            //}
        },
    },
    mounted() {},
};
</script>
