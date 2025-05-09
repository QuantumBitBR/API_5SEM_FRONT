<template>
	<div class="management-container">
		<Navbar />

	</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { showToast } from "@/eventBus";
import Cookies from "js-cookie";

export default {
	name: "UserProfile",
	components: {
		Navbar,
	},
	data() {
		return {
			title: "Minha View",
			message: "Olá",
		};
	},
	methods: {
		handleClick() {
			this.message = "Você clicou no botão!";
		},
	},
	mounted(){
		if(Cookies.get("RoleCookie") !== "ADMIN"){
			showToast({
                    severity: 'error',
                    summary: 'Blocked',
                    detail: "You don't have permission to access this page",
                    life: 3000
                });
			this.$router.push(`/dashboard`);
		}
	}
};
</script>

<style scoped>
.my-view {
	padding: 1rem;
	font-family: Arial, sans-serif;
}
</style>
