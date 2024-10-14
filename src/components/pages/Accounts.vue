<template>
    <MainLayout>
        <div class="mb-4 flex justify-between">
            <div class="">
                <!-- You can open the modal using ID.showModal() method -->
                <button class="btn btn-info" @click="addAccount">
                    Tambah Data
                </button>
                <dialog id="my_modal_3" class="modal">
                    <div class="modal-box">
                        <form method="dialog">
                            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <form @submit.prevent="submitAccount" id="accountForm" class="m-3">
                            <input type="text" class="hidden" id="inputID" placeholder="ID Account" />

                            <div class="mb-4">
                                <label for="inputNamaDepan" class="block text-gray-700 font-semibold mb-2">Nama
                                    Depan</label>
                                <input name="inputNamaDepan" v-model="account.firstName" type="text"
                                    class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="inputNamaDepan" placeholder="Nama Depan" />
                            </div>

                            <div class="mb-4">
                                <label for="inputNamaBelakang" class="block text-gray-700 font-semibold mb-2">Nama
                                    Belakang</label>
                                <input name="inputNamaBelakang" v-model="account.lastName" type="text"
                                    class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="inputNamaBelakang" placeholder="Nama Belakang" />
                            </div>

                            <div class="mb-4">
                                <label for="inputTelepon" class="block text-gray-700 font-semibold mb-2">Nomor
                                    Telepon</label>
                                <input name="inputTelepon" v-model="account.phone" type="tel"
                                    class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="inputTelepon" placeholder="Nomor Telepon" />
                            </div>

                            <div class="mb-4">
                                <label for="inputTanggalLahir" class="block text-gray-700 font-semibold mb-2">Tanggal
                                    Lahir</label>
                                <input name="inputTanggalLahir" v-model="account.birthDate" type="date" :max="maxBirthDate"
                                    class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="inputTanggalLahir" />
                            </div>

                            <div class="mb-4">
                                <label for="inputEmail" class="block text-gray-700 font-semibold mb-2">Email</label>
                                <input name="inputEmail" v-model="account.email" type="email"
                                    class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="inputEmail" placeholder="Email" />
                            </div>

                            <div class="mb-4">
                                <label for="inputPassword"
                                    class="block text-gray-700 font-semibold mb-2">Password</label>
                                <input name="inputPassword" v-model="account.password" type="password"
                                    class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="inputPassword" placeholder="Password" />
                            </div>

                            <div class="mb-4">
                                <label for="inputUniversity"
                                    class="block text-gray-700 font-semibold mb-2">University</label>
                                <select name="inputUniversity" v-model="account.university_Id"
                                    class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="inputUniversity">
                                    <option value="" disabled>--Select University--</option>
                                    <option v-for="(university, index) in universities" :key="university.id" :value="university.id">{{ university.name }}</option>
                                    <!-- Add your university options here -->
                                </select>
                            </div>

                            <div class="mb-4">
                                <label for="inputDegree" class="block text-gray-700 font-semibold mb-2">Degree</label>
                                <select name="inputDegree" v-model="account.degree"
                                    class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="inputDegree">
                                    <option value="" disabled>--Select Degree--</option>
                                    <option value="0">D3</option>
                                    <option value="1">D4</option>
                                    <option value="2">S1</option>
                                    <option value="3">S2</option>
                                    <option value="4">S3</option>
                                </select>
                            </div>

                            <div class="mb-4">
                                <label for="inputGpa" class="block text-gray-700 font-semibold mb-2">GPA</label>
                                <input name="inputGpa" v-model="account.gpa" type="number" min="0" max="4" step="0.01"
                                    class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    id="inputGpa" placeholder="GPA" />
                            </div>

                            <div class="flex justify-end">
                                <button type="submit" class="btn"
                                    :class="isEditing ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600' + ' text-white font-bold py-2 px-4 rounded'">
                                    {{ isEditing ? 'Edit' : 'Submit' }}
                                </button>
                            </div>
                        </form>

                    </div>
                </dialog>
            </div>
        </div>

        <FeaturedTable :items="accounts" :fields="[
            'nik',
            'firstName',
            'lastName',
            'email',
            'phone',
            'birthDate',
            'universityName',
            'gpa',
            'degree',
        ]" :headers="[
            'nik',
            'firstName',
            'lastName',
            'email',
            'phone',
            'birthDate',
            'universityName',
            'gpa',
            'degree',
        ]" />
    </MainLayout>
</template>

<script>
import axios from 'axios';
import MainLayout from '../layouts/MainLayout.vue';
import Swal from 'sweetalert2';
import FeaturedTable from '../tables/FeaturedTable.vue';
import { computed } from 'vue';

export default {
    components: {
        MainLayout,
        FeaturedTable
    },
    data() {
        return {
            accounts: [],
            universities:[],
            account: {
                firstName: "",
                lastName: "",
                phone: "",
                birthDate: "",
                email: "",
                password: "",
                university_Id: "",
                degree: '',
                gpa: 0
            },
            isEditing: false,
        };
    },
    setup(){
        const maxBirthDate = computed(() => {
            const today = new Date();
            const futureDate = new Date(today.getFullYear(), 9, 13); // 13 October of current year
            if (today > futureDate) {
                futureDate.setFullYear(futureDate.getFullYear() + 1); // Move to next year if the date has passed
            }
            return futureDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        });

        return{maxBirthDate}
    },
    mounted() {
        this.fetchAccounts();
        this.fetchUniversities();
    },
    methods: {
        fetchAccounts() {
            axios
                .get(`https://localhost:7180/accounts`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    }
                })
                .then((response) => {
                    this.accounts = response.data.data;
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
        fetchUniversities() {
            axios
                .get(`https://localhost:7180/universities`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    }
                })
                .then((response) => {
                    this.universities = response.data.data;
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
        addAccount() {
            this.account.firstName = '';
            this.account.lastName = '';
            this.account.phone = '';
            this.account.birthDate = '';
            this.account.email = '';
            this.account.password = '';
            this.account.university_Id = '';
            this.account.degree = '';
            this.account.gpa = 0;
            this.isEditing = false;
            document.getElementById('my_modal_3').showModal();
        },
        submitAccount() {
            if (!this.isEditing) {
                // add account

                this.account.degree = parseInt(this.account.degree)
                axios
                    .post('https://localhost:7180/accounts/register', this.account, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        this.accounts.push(response.data.data);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            document.getElementById('my_modal_3').close();
                        });
                    })
                    .catch((error) => {
                        console.error('Error adding account:', error);
                    });
            } else {
                // edit account
            }
        },
    }
}
</script>

<style lang="scss" scoped>
// .table{
//     width: 100%;
//     border-collapse: collapse; // Ensures borders are merged for a cleaner look
// }

// .table th, .table td {
//     border: 1px solid #ccc; // Border color and style
//     padding: 8px; // Add some padding for better spacing
//     text-align: left; // Align text to the left
// }

// .table th {
//     background-color: #f8f8f8; // Light background for headers
//     font-weight: bold; // Bold font for headers
// }

// .table tr:nth-child(even) {
//     background-color: #f2f2f2; // Zebra striping for better readability
// }
// </style>