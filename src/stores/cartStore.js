
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export const useCartStore = defineStore('cart', () => {

  const items = ref([]) // Array de objetos { id, nombre, precio, cantidad }
  const cantidadItems = ref(items.value.length)
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price, 0)
  )

  function addItem(movieToAdd) {
    items.value.push(movieToAdd)
  }

  function removeItem(productId) {
    items.value = items.value.filter(item => item.id !== productId)
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    cantidadItems,
    totalPrice,
    addItem,
    removeItem,
    clearCart
  }

})