<template>
  <form class="login100-form validate-form" @submit.prevent="loguear">
    <h2 class="text-muted">Bienvenido al Intranet del CQFLL</h2>
    <div class="text-center">
      <img src="/assets/images/logo.png" />
    </div>

    <span class="login100-form-title pb-5"> Iniciar Sesión </span>
    <p class="text-muted">
      Para acceder como Colegiado, ingrese sus credenciales
    </p>

    <div class="wrap-input100 validate-input input-group">
      <a class="input-group-text bg-white text-muted">
        <i class="icon icon-user" aria-hidden="true"></i>
      </a>
      <input
        class="input100 border-start-0 form-control ms-0"
        type="text"
        placeholder="Nombre de usuario"
        v-model="usuario"
        required
      />
    </div>
    <div class="wrap-input100 validate-input input-group" id="Password-toggle">
      <a class="input-group-text bg-white text-muted">
        <i class="icon icon-lock-open" aria-hidden="true"></i>
      </a>
      <input
        class="input100 border-start-0 form-control ms-0"
        type="password"
        placeholder="Contraseña"
        v-model="contrasena"
        required
      />
    </div>
    <div class="text-end pt-4">
      <p class="mb-0">
        <router-link to="/recuperar-contrasena" class="text-primary ms-1">
          Olvidé mi contraseña
        </router-link>
      </p>
    </div>
    <div class="container-login100-form-btn">
      <button type="submit" class="login100-form-btn btn-primary">Login</button>
    </div>
    <div class="container-login100-form-btn">
      <button
        type="button"
        class="login100-form-btn btn-danger"
        @click="goGoogle"
      >
        <i class="fa fa-google mx-2"></i>
        Iniciar con Google
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import global from "../../global";
export default {
  data() {
    return {
      usuario: "",
      contrasena: "",
    };
  },
  methods: {
    ...mapActions({
      login: "_login/login",
    }),
    loguear: async function () {
      // if (
      //     this.usuario == "admin@admin.com" &&
      //     this.contrasena == "123456"
      // ) {
      //     console.log(this.usuario, this.contrasena);
      //     this.$router.push({
      //         name: "panelInicio",
      //     });
      //     global._mensaje_exito("Bienvenido admin.");
      //     //this.$router.push("/");
      // } else {
      //     global._mensaje_advertencia(
      //         "Datos incorrectos, intente de nuevo por favor, gracias."
      //     );
      // }

      if (
        await this.login({
          usuario_usu: this.usuario,
          contrasena: this.contrasena,
        })
      ) {
        //this.isLoading = false;
        this.$router.push({
          name: "panelInicio",
        });
        global._mensaje_exito("Bienvenido " + this.usuario);
      } else {
        this.isLoading = false;
        global._mensaje_advertencia(
          "Datos incorrectos, intente de nuevo por favor, gracias."
        );
      }
    },
    goGoogle: async function () {},
  },
};
</script>
