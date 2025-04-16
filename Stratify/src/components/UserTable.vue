<template>
	<div class="tabela">
		<DataTable :value="usuarios" class="tabela-src" removableSort showGridlines stripedRows>
			<Column field="nome" header="Nome" sortable>
				<template #body="slotProps">
					<i class="pi pi-user" style="margin-right: 8px"></i>
					{{ slotProps.data.nome }}
				</template>
			</Column>

			<Column field="email" header="Email" sortable />

			<Column header="Cargo">
				<template #body="slotProps">
					<Dropdown v-model="slotProps.data.cargo" :options="cargos" optionLabel="label" optionValue="value"
						class="w-full" />
				</template>
			</Column>

			<Column header="Gestor">
				<template #body="slotProps">
					<div v-if="slotProps.data.cargo === 'Funcionário'">
						<Dropdown v-model="slotProps.data.gestor" :options="usuarios
								.filter((u) => u.cargo === 'Gestor')
								.map((u) => ({ label: u.nome, value: u.nome }))
							" optionLabel="label" optionValue="value" placeholder="Selecione o gestor" class="w-full" />
					</div>
					<div v-else>
						{{ slotProps.data.gestor ? slotProps.data.gestor : '-' }}
					</div>
				</template>
			</Column>

			<Column header="Habilitado">
				<template #body="slotProps">
					<ToggleButton v-model="slotProps.data.habilitado" onLabel="Sim" offLabel="Não" onIcon="pi pi-check"
						offIcon="pi pi-times" class="p-button-sm" />
				</template>
			</Column>

			<Column header="Ações">
				<template #body="slotProps">
					<button @click="editPass(slotProps.data)" class="btn-senha">Trocar senha</button>
				</template>
			</Column>
		</DataTable>
	</div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";
import ToggleButton from "primevue/togglebutton";

export default {
	components: {
		DataTable,
		Column,
		Dropdown,
		ToggleButton,
	},
	data() {
		return {
			cargos: [
				{ label: "Admin", value: "Admin" },
				{ label: "Gestor", value: "Gestor" },
				{ label: "Funcionário", value: "Funcionário" },
			],
			usuarios: [
				{
					nome: "André Meneses",
					email: "andre@email.com",
					cargo: "Admin",
					gestor: null,
					habilitado: true,
				},
				{
					nome: "Maria Silva",
					email: "maria@email.com",
					cargo: "Funcionário",
					gestor: "João Santos",
					habilitado: true,
				},
				{
					nome: "João Santos",
					email: "joao@email.com",
					cargo: "Gestor",
					gestor: null,
					habilitado: false,
				},
			],
		};
	},
	methods: {
		editPass(pass) {
			console.log("Editar clicado:", pass);
		},
	},
};
</script>

<style scoped>
.tabela {
	padding: 40px;
	padding-top: 20px;
}

.tabela-src {
	border: 1px solid #5739b4;
	max-height: 25rem;
	border-radius: 12px;
	padding: 5px;
	background-color: #fff;
}

::v-deep(.p-datatable-table-container) {
	max-height: 24rem;
	overflow: auto;
}

.tabela-src::-webkit-scrollbar {
	width: 8px;
	background: transparent;
}

.tabela-src::-webkit-scrollbar-thumb {
	background-color: blue;
	border-radius: 12px;
	height: 30px;
	transition: background-color 0.3s ease;
}

.btn-senha {
	background-color: #3f51b5;
	color: white;
	border: none;
	border-radius: 6px;
	padding: 5px 10px;
	margin-right: 5px;
	cursor: pointer;
	font-size: 0.85rem;
}

.btn-senha:hover {
	background-color: #303f9f;
}
</style>
