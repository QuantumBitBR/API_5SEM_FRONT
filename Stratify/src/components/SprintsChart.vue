<template>
    <div class="sprints-container">
        <h4 class="sprints-title">Cards por Sprint</h4>
        <div class="sprints-chart">
            <div v-if="sprintsData.length === 0" class="no-data">
                Nenhum dado disponível para as sprints selecionadas
            </div>
            <div v-else class="sprints-columns">
                <div 
                    v-for="sprint in sprintsData" 
                    :key="sprint.sprint" 
                    class="sprint-column"
                    :style="{
                        height: `${calculateColumnHeight(sprint.quantidade)}px`,
                        backgroundColor: getColumnColor(sprint.quantidade)
                    }"
                >
                    <div class="sprint-label">{{ sprint.sprint }}</div>
                    <div class="sprint-value">{{ sprint.quantidade }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserStoryService from "@/services/userStoryService";
import Chart from "primevue/chart"; 

export default {
    components: { Chart },
    props: {
        selectedProject: {
            type: Object,
            default: null
        },
        selectedUser: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            sprintsData: [],
            maxQuantity: 0
        };
    },
    methods: {
        async fetchSprintsData() {
            try {
                const projectId = this.selectedProject?.id;
                const userId = this.selectedUser?.idUsuario;
                
                const response = await UserStoryService.getQuantityBySprint(projectId, userId);
                
                if (response && Array.isArray(response)) {
                    this.sprintsData = response;
                    this.calculateMaxQuantity();
                }
            } catch (error) {
                console.error("Error fetching sprints data:", error);
            }
        },
        calculateMaxQuantity() {
            if (this.sprintsData.length === 0) {
                this.maxQuantity = 0;
                return;
            }
            this.maxQuantity = Math.max(...this.sprintsData.map(s => s.quantidade));
        },
        calculateColumnHeight(quantity) {
            if (this.maxQuantity === 0) return 0;

            return (quantity / this.maxQuantity) * 200;
        },
        getColumnColor(quantity) {
            const percentage = quantity / Math.max(this.maxQuantity, 1);
            
            if (percentage < 0.3) return "#4bc0c0"; // Azul 
            if (percentage < 0.6) return "#36a2eb"; // Azul 
            return "#5739B4"; // Roxo
        }
    },
    mounted() {
        if (this.selectedProject) {
            this.fetchSprintsData();
        }
    },
    watch: {
        selectedProject: {
            handler: "fetchSprintsData",
            deep: true
        },
        selectedUser: {
            handler: "fetchSprintsData",
            deep: true
        }
    }
};
</script>

<style scoped>
.sprints-container {
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 30px;
    height: 400px;
    border: 1px solid #5739B4;
    border-radius: 12px;
    margin-bottom: 20px;
}

.sprints-title {
    padding: 5px;
    padding-bottom: 20px;
}

.sprints-chart {
    height: 300px;
    display: flex;
    align-items: flex-end;
}

.sprints-columns {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 20px;
    align-items: flex-end;
}

.sprint-column {
    flex: 1;
    min-width: 60px;
    max-width: 100px;
    border-radius: 8px 8px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    transition: height 0.5s ease, background-color 0.5s ease;
    position: relative;
}

.sprint-label {
    position: absolute;
    top: -25px;
    font-size: 0.8rem;
    color: #666;
    text-align: center;
    word-break: break-word;
    width: 100%;
}

.sprint-value {
    margin-bottom: 10px;
    color: white;
    font-weight: bold;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}

.no-data {
    width: 100%;
    text-align: center;
    color: #666;
    font-style: italic;
    padding: 20px;
}
</style>