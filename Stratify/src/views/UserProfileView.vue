<template>
	<div class="management-container">
		<Navbar />
		<div class="user-profile-container">
			<div class="user_header">
				<svg id="user_icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
					stroke-width="1.5" stroke="#000000" class="size-6">
					<path stroke-linecap="round" stroke-linejoin="round"
						d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
				</svg>
				<h2 class="user_name" v-if="user">{{user.nome}}</h2>
				<p class="user_role" v-if="user">{{user.role}}</p>
			</div>

			<div class="user_info">
				<div class="info_row">
					<span class="label">ID:</span>
					<span class="value" v-if="user">{{user.id}}</span>
				</div>
				<div class="info_row">
					<span class="label">Email:</span>
					<span class="value" v-if="user">{{user.email}}</span>
				</div>
				<button class="btn-senha">Resetar senha</button>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import TokenService from "@/services/TokenService";

export default {
	name: "UserProfile",
	components: {
		Navbar,
	},
	data() {
		return {
			user: null
		}
	},
	mounted() {
		this.user = (TokenService.decodeToken(TokenService.getToken()));
	},
};
</script>

<style scoped>
.user-profile-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 2rem;
}

.user_header {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 2rem;
}

#user_icon {
	width: 150px;
	height: 150px;
	background-color: #c4c4c4;
	padding: 10px;
	border-radius: 50%;
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}

.user_name {
	font-size: 2rem;
	font-weight: 700;
	color: #000;
	margin: 0;
}

.user_role {
	font-size: 1.25rem;
	font-weight: 600;
	color: #444;
	margin: 0;
}

.user_info {
	background-color: #f9f9f9;
	padding: 1.5rem 2rem;
	border-radius: 12px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 400px;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.info_row {
	display: flex;
	justify-content: space-between;
}

.label {
	font-weight: 600;
	color: #333;
}

.value {
	color: #555;
}

.btn-senha {
	background-color: #3f51b5;
	color: white;
	border: none;
	border-radius: 6px;
	padding: 10px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: background-color 0.2s;
	margin-top: 1rem;
}

.btn-senha:hover {
	background-color: #303f9f;
}
</style>
