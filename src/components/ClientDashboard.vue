<script setup>
import { useUserStore } from '../stores/usersStore.js'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useHistorialStore } from '../stores/historialStore.js'
import Nav from './Nav.vue'

const userStore = useUserStore()
const historialStore = useHistorialStore()
const router = useRouter()
const peliculasVistasPorUsuario = ref([])




onMounted(async () => {
  try {
    if (!userStore.isAuthenticated) {
      router.push('/')
      return
    }
    await cargarPeliculasVistas()
  }
  catch (error) {
    console.error('Error obteniendo peliculas vistas por usuario:', error)
  }
})

function logout() {
  userStore.logout()
  router.push('/')
}

async function cargarPeliculasVistas() {

  const data = await historialStore.cargarPeliculasVistas()
  if (data && Array.isArray(data)) {
    peliculasVistasPorUsuario.value = data
  } else {
    console.error('Error: Los datos de peliculas vistas no son un array válido');
  }
}

</script>
<template>
  <Nav></Nav>
  <div class="container-fluid text-center">
    <h2>Bienvenido, {{ userStore.user.username }}</h2>
    <p>Aquí puedes ver tus pedidos, historial, etc.</p>
    <div>
      <h3>🎬 Películas ya vistas:</h3>
      <ul>
        <li v-for="pelicula in peliculasVistasPorUsuario" :key="pelicula.id">
          Titulo: {{ pelicula.movieName }}
        </li>
      </ul>
    </div>
    <button @click="logout">Logout</button>
  </div>

  
</template>
