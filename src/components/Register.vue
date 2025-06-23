<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/usersStore.js';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();
const username = ref('')
const password = ref('')
const email = ref('');

const handleRegistration = async () => {
    const success = await userStore.register({ username: username.value, password: password.value })
    if (success) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        router.push('/')
    } else {
        alert('Error al registrarse. Por favor, intente de nuevo.');
    }
}

</script>

<template>
    <div class="card">
        <form @submit.prevent="handleRegistration">
            <h1>Registro</h1>
            <label for="">Nombre de Usuario: </label>
            <input type="text" v-model="username" />
            <br />
            <label for="">Contraseña: </label>
            <input type="password" v-model="password" />
            <br />
            <label for="">Email: </label>
            <input type="text" v-model="email" />
            <br />
            <br />
            <button type="submit">Registrarse</button>
        </form>
    </div>

</template>

<style scoped></style>
