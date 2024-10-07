<template>
    <div>
        <ModalDashboard>
            <button 
            class="btn btn-outline btn-primary rounded-full"
            @click="showModal()"
            :class="stateShowModal ? 'btn btn-outline btn-primary rounded-full' : 'btn btn-outline btn-error rounded-full' "
            >Click</button>

            <p v-if="stateShowModal" class="text-sky-500">Dashboard = modal {{ stateShowModal }} {{ MyData }}</p>
            <p v-else="stateShowModal" class="text-red-500">Dashboard = modal {{ stateShowModal }} {{ MyData }}</p>
            <div class="">
                <table class="table table-zebra">
                    <thead>
                        <th>No</th>
                        <th>Bulan</th>
                    </thead>
                    <tbody> 
                        <tr v-for="(bulan, index) in months" :key="index">
                            <td>{{ ++index }}</td>
                            <td>{{ bulan }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex flex-col">
                <p>{{ Days }}</p>
                <p>{{ DaysPayload }}</p>
                <p>{{ Text }}</p>
                <p :class="'text-'+ Color">{{ Color }}</p>
            </div>
        </ModalDashboard>
    </div>
</template>

<script>
import { ref } from 'vue'
import ModalDashboard from './Dashboard/Modal.vue';

export default {
    props: ["Days", "Text", "Color"],
    components:{
        ModalDashboard
    },
    setup (props) {
        const MyData = "Hello World"
        const DaysPayload = props.Days.splice(0, 1)
        let stateShowModal = ref(false)
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]

        return {MyData, stateShowModal, months, DaysPayload}
    },
    methods: {
        showModal() {
            this.stateShowModal = !this.stateShowModal
        }
    }
}
</script>

<style lang="scss" scoped>

</style>