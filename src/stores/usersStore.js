import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

const API_BASE = 'https://68478103ec44b9f3493d3f3e.mockapi.io/api/users';

export const useUserStore = defineStore('user', () => {
    const isAuthenticated = ref(false)
    const user = ref(null)
    const userId = ref(null)
    const loading = ref(false)
    const error = ref(null)
    const isAdmin = ref(false)
    const allUsers = ref([])

    async function login({ username, password }) {
        loading.value = true
        error.value = null
        try {
            const res = await axios.get(`${API_BASE}?username=${username}&password=${password}`)
            if (res.data.length > 0) {
                user.value = res.data[0]
                userId.value = user.value.id
                isAuthenticated.value = true
                return true

            } else if (user.value === "admin") {
                isAdmin.value = true

            } else {
                error.value = 'Credenciales inválidas'
                return false
            }
        } catch (err) {
            error.value = 'Error de red'
            return false
        } finally {
            loading.value = false
        }
    }

    async function register({ username, password }) {
        loading.value = true
        error.value = null
        try {
            const res = await axios.post(API_BASE, { username, password })
            user.value = res.data
            isAuthenticated.value = true
            return true
        } catch (err) {
            error.value = 'Error al registrar usuario'
            return false
        } finally {
            loading.value = false
        }
    }

    function logout() {
        user.value = null
        isAuthenticated.value = false
    }


    async function fetchAllUsers() {
        loading.value = true
        error.value = null
        try {
            const res = await fetch('https://68478103ec44b9f3493d3f3e.mockapi.io/api/users');
            if (!res.ok) throw new Error('La respuesta no fue ok');
            const data = await res.json();
            
            allUsers.value = data;
           
            return allUsers.value;
        } catch (error) {
            console.error('Error cargando usuarios:', error);
        }
    }

    async function deleteUsers(userId) {
        loading.value = true
        error.value = null
        try {
            console.log('Eliminando usuario con ID:', userId)
            const res = await axios.delete(API_BASE + userId)
            console.log(res.data)
            allUsers = res.data
            return allUsers
        } catch (err) {
            error.value = 'Error al eliminar usuarios'

        } finally {
            loading.value = false
        }
    }


    return {
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        register,
        deleteUsers,
        fetchAllUsers
    }

})