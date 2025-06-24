<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../stores/usersStore';
import { useCartStore } from '../stores/cartStore';
import { useHistorialStore } from '../stores/historialStore';
import Nav from './Nav.vue'
import Cart from './Cart.vue'

const movies = ref([])
const filterMovie = ref('')
const filterGenre = ref('')
const peliculasVistasPorUsuario = ref([])
const userStore = useUserStore()
const cartStore = useCartStore();
const historialStore = useHistorialStore()
const peliculasAgregadas = ref([]);



onMounted(async () => {
    try {
        if (!userStore.isAuthenticated) {
            router.push('/')
            return
        }
        await cargarPeliculasVistas()
        await ActualizarPelisEnCarrito(); 
    }
    catch (error) {
        console.error('Error obteniendo peliculas vistas por usuario:', error)
    }
    try {
        const res = await fetch('https://api.andrespecht.dev/movies');
        if (!res.ok) {
            throw new Error('La respuesta no fue ok');
        }
        const data = await res.json();
        movies.value = data.response;
    } catch (error) {
        console.error('Error obteniendo peliculas:', error);
    }
}
);

const filteredMovies = computed(() => {
    return movies.value.filter(movie =>
        movie.title.toLowerCase().includes(filterMovie.value.toLowerCase())
    );
});

const filteredMoviesByGenre = computed(() => {
    console.log('Filtrando películas por género:', filterGenre.value)
    if (!filterGenre.value) return filteredMovies.value;
    return movies.value.filter(movie =>
        movie.genre.filter(genre => genre.toLowerCase() === filterGenre.value.toLowerCase()).length > 0
    )
});


async function ActualizarPelisEnCarrito() {
   peliculasAgregadas.value = [];
  const itemsEnCarrito = cartStore.items;
  peliculasAgregadas.value = itemsEnCarrito.map(item => item.id);
}




async function cargarPeliculasVistas() {
  const data = await historialStore.cargarPeliculasVistas();
  if (data && Array.isArray(data)) {
    peliculasVistasPorUsuario.value = data;
  }
}

function fueVista(movie) {
  return peliculasVistasPorUsuario.value.some(pelicula => pelicula.movieName === movie.title);
}


function agregarAlCarrito(movie) {   //HAY QUE PENSAR  ESTA PARTE, ME QUEDE ACA. 
    const movieToAdd =
    {
        id: movie._id,
        title: movie.title,
        poster: movie.poster,
        year: movie.year,
        price: movie.year * 5,
        clientId: userStore.user.id,
        movieGenre: movie.genre // HARDCODEAMOS EL PRECIO
    };

    cartStore.addItem(movieToAdd);
    console.log('Película agregada al carrito:', movieToAdd);
    
    if (!peliculasAgregadas.value.includes(movie._id)) {
            peliculasAgregadas.value.push(movie._id);
        }

}

async function manejarCompraRealizada() {
  await cargarPeliculasVistas();         // Actualiza historial
  await ActualizarPelisEnCarrito();      // Limpia el carrito
}
//_______________________________________________________________________________
/*function obtenerVisualizacionesPorGenero() {
    const generosDisponibles = [
        'action', 'comedy', 'drama', 'horror', 'romance', 'sci-fi',
        'thriller', 'animation', 'fantasy', 'mystery', 'adventure', 'crime'
    ];

    const conteoPorGenero = {};
    generosDisponibles.forEach(genero => {
        conteoPorGenero[genero] = 0;
    });

    peliculasVistasPorUsuario.value.forEach(pelicula => {
        if (Array.isArray(pelicula.moviesGenre)) {
            pelicula.moviesGenre.forEach(genero => {
                const generoNormalizado = genero.toLowerCase();
                if (conteoPorGenero.hasOwnProperty(generoNormalizado)) {
                    conteoPorGenero[generoNormalizado]++;
                }
            });
        }
    });

    return conteoPorGenero;
}
*/


</script>


<template>
    <Nav></Nav>
    
    <Cart @compraRealizada="manejarCompraRealizada" />
    <Cart @PeliculaEliminada="ActualizarPelisEnCarrito" />
    <div class="container-fluid text-center">
        <h2>Alquilar Peliculas</h2>
        </br />
        <label for="filter">Buscar Peliculas: </label>
        <p></p>
        <input type="text" v-model="filterMovie" placeholder="Buscar por titulo..." />
        <p>Filtrar por genero:</p>
        <label for="filterGenre"></label>
        <select v-model="filterGenre">
            <option value="">Todos</option>
            <option value="action">Acción</option>
            <option value="comedy">Comedia</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Ciencia Ficción</option>
            <option value="thriller">Thriller</option>
            <option value="animation">Animación</option>
            <option value="fantasy">Fantasía</option>
            <option value="mystery">Misterio</option>
            <option value="adventure">Aventura</option>
            <option value="crime">Crimen</option>

        </select>


        <div class="cointainer text-center">
            <ul class="list-unstyled d-flex flex-wrap justify-content-center">
                <li v-for="movie in filteredMoviesByGenre" :key="movie.id">

                    <div v-if="!fueVista(movie)" class="card">
                        <h4>{{ movie.title }}</h4>
                        <img class="" :src="movie.poster" alt="Poster de la pelicula"
                            style="width: 100px; height: 150px;" />
                        <p>Año: {{ movie.year }}</p>
                        <p>Precio: ${{ movie.year * 5 }}</p>
                        <button
                            @click="agregarAlCarrito(movie)"
                            :disabled="peliculasAgregadas.includes(movie._id)">
                            {{ peliculasAgregadas.includes(movie._id) ? 'Agregada' : 'Agregar al carrito' }}
                        </button>           
                    </div>
                    <div v-else="" class="card vista">
                        <h4>{{ movie.title }}</h4>
                        <img class="" :src="movie.poster" alt="Poster de la pelicula"
                            style="width: 100px; height: 150px;" />
                        <p>Año: {{ movie.year }}</p>
                        <p class="text-success">✅ Ya comprada -<a
                                href="https://www.youtube.com/watch?v=Pl_H2Lmjn6k&t=16s">VER</a></p>

                    </div>
                </li>
            </ul>
        </div>
        <p v-if="filteredMovies.length === 0">No se encontraron peliculas con ese nombre</p>
    </div>
</template>


<style scoped>
.card {
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
    width: 300px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.1);

}

.card img {
    max-width: 100%;
    height: auto;
}

.vista {
    opacity: 0.5;
}
</style>