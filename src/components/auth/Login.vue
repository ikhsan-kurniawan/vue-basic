<template>
    <div class="h-screen flex justify-center">
        <div class="bg-slate-100 p-6 rounded-md shadow-lg m-auto w-80 h-96 skeleton">
            <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
            <form @submit.prevent="login">
                <div class="label">
                    <span class="label-text">Email</span>
                </div>
                <input v-model="email" type="text" class="input input-bordered w-full max-w-xs" />
                <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p> <!-- Email error message -->
                <div class="label">
                    <span class="label-text">Password</span>
                </div>
                <input id="password" v-model="password" type="password" class="input input-bordered w-full max-w-xs" />
                <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
                <!-- Password error message -->
                <div class="mt-6 flex justify-center">
                    <button @click="login" type="submit"
                        :class="isLoading ? 'loading loading-bars loading-lg' : 'btn btn-active skeleton'">Masuk</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';

export default {
    components: {
        RouterLink,
        RouterView
    },
    setup() {
        const router = useRouter();
        let email = ref('');
        let password = ref('');
        const emailError = ref('');
        const passwordError = ref('');

        let isLoading = ref(false)

        const validate = () => {
            emailError.value = '';
            passwordError.value = '';

            if (!email.value) {
                emailError.value = 'Email is required.';
            } else if (!/\S+@\S+\.\S+/.test(email.value)) {
                emailError.value = 'Please enter a valid email address.';
            }

            if (!password.value) {
                passwordError.value = 'Password is required.';
            }

            return !emailError.value && !passwordError.value;
        };

        const parseJwt = (token) => {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        };

        const login = () => {
            if (!validate()) return;

            isLoading.value = true;

            const account = {
                emailOrNik: email.value,
                password: password.value
            };

            axios.post('https://localhost:7180/accounts/login', account)
                .then(response => {
                    // SET LOCAL STORAGE
                    localStorage.setItem('userToken', response.data.data.token);
                    const payload = parseJwt(response.data.data.token);
                    localStorage.setItem('username', payload.Username);
                    localStorage.setItem('nik', payload.NIK);
                    localStorage.setItem('roles', JSON.stringify(payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']));
                    localStorage.setItem('message', "Selamat datang " + payload.Username);

                    router.push({ name: 'Dashboard' });
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: error.response.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .finally(() => {
                    isLoading.value = false; // Reset loading state
                });
        };

        return { isLoading, login, email, password, emailError, passwordError }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped></style>