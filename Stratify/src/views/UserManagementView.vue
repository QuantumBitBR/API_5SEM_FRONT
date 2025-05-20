<template>
	<div class="management-container">
		<Navbar />
		<!--<UserFilter />-->
		<UserTable />
	</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import UserFilter from "@/components/UserFilter.vue";
import UserTable from "@/components/UserTable.vue";

export default {
	name: "UserManagement",
	components: {
		Navbar,
		UserTable,
		UserFilter
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
};
</script>

<style scoped>
.my-view {
	padding: 1rem;
	font-family: Arial, sans-serif;
}
</style>
