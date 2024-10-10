<template>
    <MainLayout :email="email">
        <button class="btn btn-outline btn-primary rounded-full" @click="showModal()"
            :class="stateShowModal ? 'btn btn-outline btn-primary rounded-full' : 'btn btn-outline btn-error rounded-full'">Click</button>

        <p v-if="stateShowModal" class="text-sky-500">Dashboard = modal {{ stateShowModal }} {{ MyData }}</p>
        <p v-else="stateShowModal" class="text-red-500">Dashboard = modal {{ stateShowModal }} {{ MyData }}</p>
        <div class="">
            <table class="table table-zebra">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Bulan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(bulan, index) in months" :key="index">
                        <td>{{ ++index }}</td>
                        <td>{{ bulan }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </MainLayout>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';

export default {
    props: ["Days", "Text", "Color"],
    components: {
        MainLayout,
    },
    setup(props) {
        const MyData = "Hello World"
        let stateShowModal = ref(false)

        const route = useRoute();
        const email = route.query.emailPayload;

        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',

        ]

        return { MyData, stateShowModal, months, email }
    },
    methods: {
        showModal() {
            this.stateShowModal = !this.stateShowModal
        }
    }
}
</script>

<style lang="scss" scoped></style>