<script>
//import { mapActions } from "vuex";
export default {
	methods: {
		//...mapActions({ logout: "_login/logout" }),
	},
	created() {
		//this.logout();
		//this.$router.push("/");
		//this.$router.push("/login");
        location.href = "/login";
		//location.reload();
	},
};
</script>