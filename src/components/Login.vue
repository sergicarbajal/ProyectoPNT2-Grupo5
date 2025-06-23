<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/usersStore.js'
import { useRouter } from 'vue-router';

const username = ref('')
const password = ref('')
const router = useRouter()
const userStore = useUserStore()

const handleLogin = async () => {
  const success = await userStore.login({ username: username.value, password: password.value })
  if (success && userStore.user.role === 'admin') 
  {
    userStore
    router.push('/admindashboard')
  } 
  else if (success)
  {
    router.push('/rent')
  } 
  else 
  {
    alert('Error al iniciar sesión. Por favor, intente de nuevo.')
  }
}
</script>

<template>
    <div class="container-fluid text-center">
        <h3>Login</h3>
        <p>Por favor, inicie sesión para continuar.</p>
        <form class="card" @submit.prevent="handleLogin">
            <label for="">Usuario: </label>
            <input type="text" v-model="username" />
            <br />
            <label for="">Contraseña: </label>
            <input type="password" v-model="password" />
            <br />
            <button type="submit">Iniciar Sesion</button>
        </form>

        <div class="card">
            <button><router-link to="/register">Registrarse</router-link></button>
        </div>
    </div>
</template>

<style scoped></style>
