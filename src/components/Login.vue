<template>
    <div class="bg-slate-100 p-6 rounded-md shadow-lg m-auto w-80 h-96 skeleton">
        <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
        <form action="" method="">
            <div class="label">
                <span class="label-text">Email</span>
            </div>
            <input type="text" class="input input-bordered w-full max-w-xs"/>
            <div class="label">
                <span class="label-text">Password</span>
            </div>
            <input id="password" v-model="password" type="password" class="input input-bordered w-full max-w-xs"/>
            <div class="mt-6 flex justify-center">
                <button @click="login()" type="button" 
                :class="isLoading ? 'bg-yellow-400 text-transparent loading loading-bars loading-lg' : 'btn btn-active skeleton'"
                >Masuk</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    data(){
        return {
            password: ''
        }
    },
    setup () {
        let isLoading = ref(false)
        return {isLoading}
    },
    methods: {
        login(){
            this.isLoading = !this.isLoading
            setTimeout(() => {
                this.isLoading = !this.isLoading
            }, 2000)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>