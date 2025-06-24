import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './usersStore'

const API_BASE = 'https://683cbe69199a0039e9e34d64.mockapi.io/ortmovies/compras/'

export const useHistorialStore = defineStore('historial', () => {

    const userStore = useUserStore()
    const peliculasVistasPorUsuario = ref([])
    const peliculasVistasPorUsuarioCount = ref()

    async function cargarPeliculasVistas() {
        try {
            const resPeliPorUser = await fetch(API_BASE);
            if (!resPeliPorUser.ok) throw new Error('La respuesta no fue ok');
            const compras = await resPeliPorUser.json();
            peliculasVistasPorUsuario.value = compras.filter(
                pelicula => pelicula.userId === userStore.user.id
            );

            return peliculasVistasPorUsuario.value;
        } catch (error) {
            console.error('Error obteniendo peliculas vistas por usuario:', error);
        }
    }

    async function cargarPeliculasVistasCount() {
        const contar = await cargarPeliculasVistas();
        let sumar = 0
        for (let i = 0; i < contar.length; i++) {
            sumar++
        }
        return sumar
    }

    function obtenerVisualizacionesPorGenero() {
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


    return {
        peliculasVistasPorUsuario,
        peliculasVistasPorUsuarioCount,
        cargarPeliculasVistas,
        cargarPeliculasVistasCount
    }
})