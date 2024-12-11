<template>
    <div class="text-center m-2">
        <img src="https://www.cqfll.pe/assets/web/images/logo.png" alt="Logo del CIP" class="img-fluid" />
        <!-- <img :src="ruta_api + '/img/logo2.png'" alt="Logo del CIP" class="img-fluid" /> -->
    </div>

    <div class="text-center border container">
        <h3 class="text-success">¡El certificado es válido y vigente!</h3>
        <!-- <p>Más detalles:</p> -->
        <div class="row">
            <div class="col" >
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Más detalles:</h3>
                    </div>
                    <div class="card-body">
                        <div class="">
                            <ul class="list-group">
                                <li class="list-group-item">Codigo del certificado: 10137</li>
                                <li class="list-group-item">Nº CQF: 16396 </li>
                                <li class="list-group-item">Agremiado: VASQUEZ ALVAREZ, JENNIFER ELIZABETH</li>
                                <li class="list-group-item">Decano:	Dra. Q.F. JUDITH LILIANA GONZALEZ MORENO</li>
                                <li class="list-group-item">Número de constancia:	C.H.P: 663-2022</li>
                                <li class="list-group-item">Fecha de registro:	09/06/2022</li>
                                <li class="list-group-item">Fecha de expiración:	31/05/2023</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br />

        <!-- <router-link class="btn btn-outline-danger m-2" to="/">
            Volver al inicio
        </router-link> -->
    </div>
</template>
<script>
import global from "../../global";
// import { mapActions } from "vuex";
export default {
    components: {

    },
    data() {
        return {
            cargando: false,
            token: "",
            beneficio: null,
            lista_beneficios: [],
            ruta_api: global.ruta_api
        };
    },
    methods: {
        // ...mapActions()
    },
    async mounted() {

    },
};
</script>
    