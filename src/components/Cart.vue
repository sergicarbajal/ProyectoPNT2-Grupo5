<script setup>

import { ref, computed } from 'vue';
import { useCartStore } from '../stores/cartStore.js';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();
const cartItems = computed(() => cartStore.items);
const totalPrice = computed(() => cartStore.totalPrice);
const emit = defineEmits(['compraRealizada','PeliculaEliminada']);

function removeFromCart(index) {
    cartStore.removeItem(index);
    emit('PeliculaEliminada');
}



async function pagar() {
    if (cartItems.value.length === 0) {
        alert('Tu carrito está vacío. Por favor, agrega productos antes de pagar.');
        return;
    }
    await registrarCompra(cartItems.value);
    alert('Gracias por tu compra!');
    cartStore.clearCart();
    emit('compraRealizada');
    router.push('/rent');
}

const registrarCompra = async (items) => {
    try {
        for (const item of items) {
            const response = await fetch('https://683cbe69199a0039e9e34d64.mockapi.io/ortmovies/compras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
               
            body: JSON.stringify({
                userId: item.clientId,
                movieId: String(item.id),
                movieName: String(item.title),
                movieGenre: Array.isArray(item.movieGenre) ? item.movieGenre : [item.movieGenre],
                moviePrice:Number(item.price)
                })

            });

            if (!response.ok) {
                throw new Error(`Error al registrar la compra de ${item.title}`);
            }
        }
        console.log('Todas las compras fueron registradas correctamente.');
    } catch (error) {
        console.error('Error al registrar compras:', error);
    }
};

</script>
<template>
    <div class="container-fluid text-center">
        <h2>Tu Carrito</h2>
        <p>Estos son los productos que has seleccionado:</p>
        <div class="card">
            <ul>

                <li v-for="(item, index) in cartItems" :key="index">
                    {{ item.title }} - ${{ item.price }}
                    <button @click="removeFromCart(item.id)">Eliminar</button>
                <p></p>
                </li>

            </ul>
            <p>Total: ${{ totalPrice }}</p>
            <button @click="pagar">Pagar</button>
        </div>
    </div>
</template>
<style scoped>

.card {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    padding: 20px;
    margin: 20px auto;
    max-width: 600px;
}


.container-fluid {
    top: 150px;
    right: 0;
    width: 35%;
    position: fixed;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: scale(0.75);
    transform-origin: top right;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    opacity: 0.9;
}

.container-fluid:hover {
    transform: scale(0.9);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

</style>