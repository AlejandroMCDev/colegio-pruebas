<template>
	<Multiselect mode="single"  :options="lista_opciones" noOptionsText="No hay items para mostrar" />
</template>

<script>
import Multiselect from "@vueform/multiselect";
export default {
	props: {
		lista_opciones: Array
	},
	components: {
		Multiselect,
	},
	data() {
		return {

		};
	},
	methods: {

	},
};
</script>

<style src="@vueform/multiselect/themes/default.css">
</style>
