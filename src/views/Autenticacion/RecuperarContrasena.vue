<template>
	<form
		class="login100-form validate-form"
		@submit.prevent="solicitar_contrasena"
	>
		<span class="login100-form-title pb-5"> Recuperar Contraseña </span>
		<p class="text-muted mx-4 text-center">
			Por favor ingresa tu número de DNI <br />
			y te enviaremos tus nuevas contraseñas a tu email
		</p>
		<div class="wrap-input100 validate-input input-group">
			<a
				href="javascript:void(0)"
				class="input-group-text bg-white text-muted"
			>
				<i class="icon icon-user" aria-hidden="true"></i>
			</a>
			<input
				class="input100 border-start-0 form-control ms-0"
				type="number"
                placeholder="Número CIP o DNI"
				v-model="cip_dni"
				required
			/>
		</div>
		<div class="container-login100-form-btn">
			<button type="submit" class="login100-form-btn btn-primary">
				Recuperar Contraseña
			</button>
		</div>
		<div class="container-login100-form-btn">
			<router-link
				to="/login"
				class="
					login100-form-btn
					btn-outline-primary
					border border-primary
				"
			>
				Volver al Login
			</router-link>
		</div>
		<br />
		<p class="text-muted mx-4 text-center">
			Recuerda que si no has recibido ningún email 
			<br />
			Comunicate con CIP-CDLL al 951067283 
			<br />
			o haciendo click
			<a :href="link_whatsapp">aquí</a>
		</p>
	</form>
</template>

<script>
//import { mapActions } from "vuex";
import global from "../../global";
export default {
	data() {
		return {
			cip_dni: "",
            link_whatsapp: '',
            texto_prueba: ''
		};
	},
	methods: {
		//...mapActions({ solicitarcontrasena: "_login/solicitarcontrasena" }),
		solicitar_contrasena: async function () {
			//const resultado = await this.solicitarcontrasena(this.cip_dni);
			//if (resultado.success) {
			//	global._mensaje_exito(resultado.message);
			//	this.$router.push("/login");
			//}
		},
	},
	created(){
        var txt_mensaje = encodeURIComponent(global.TXT_WHATSAPP_MENSAJE);
        this.link_whatsapp = `https://wa.me/${global.TXT_WHATSAPP_NUMERO}?text=${txt_mensaje}`
	}
};
</script>