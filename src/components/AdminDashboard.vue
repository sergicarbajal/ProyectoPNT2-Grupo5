<script setup>
import { useUserStore } from '../stores/usersStore.js'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import Nav from './Nav.vue'
import LineChart from './LineChart.vue'

const userStore = useUserStore()
const router = useRouter()
const allUsers = ref([])


onMounted(async () => {
    if (!userStore.isAuthenticated || userStore.user.role !== 'admin') {
        router.push('/')
    }
    try {
        console.log('Montando componente AdminDashboard');
        console.log('Usuario autenticado:', userStore.user);
    } catch (error) {
        console.error('Error al montar AdminDashboard:', error);
    }
    await cargarUsuarios();

        
})

async function cargarUsuarios() {
    const data = await userStore.fetchAllUsers()
    if (data && Array.isArray(data)) {
        allUsers.value = data;
        
    } else {
        console.error('Error: Los datos de usuarios no son un array válido');
    } 
}

function logout() {
    userStore.logout()
    router.push('/')
}

function deleteUsers(user) {
    userStore.deleteUsers(user)
    console.log('Usuario eliminado:', user);
    allUsers.value = allUsers.value.filter(u => u.id !== user);
    alert('Usuario eliminado correctamente');
    router.push('/admindashboard');

}
</script>

<template>

    <Nav></Nav>
    <br>
    <div class="container">
        <h2>Bienvenido, {{ userStore.user.username }}</h2>

        <p>Este es tu panel de control!</p>
        <p>Tu rol es: {{ userStore.user.role }}</p>
        <p>Cantidad de usuarios registrados: {{ allUsers.length }}</p>
        <h3>Administrar Usuarios</h3>
        <div v-for="user in allUsers">
            <div :key="user.id" class="user-card">
                <h3>{{ user.username }}</h3>
                <p>Email: {{ user.email }}</p>
                <p>Role: {{ user.role }}</p> 
                <div v-if="user.role === 'admin'">
                    <p>Este usuario es un administrador.</p>
                </div>
                
                <div class="user-actions">
                    <button v-if="user.role != 'admin'" @click="deleteUsers(user.id)">Eliminar</button>
                </div>
            </div>
        </div>
        <div>
        <br>
        <LineChart />

        </div>
        <button @click="logout">Logout</button>
    </div>
</template>
<style scoped>
.user-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
}

.user-actions {
    display: flex;
    gap: 10px;
}
</style>