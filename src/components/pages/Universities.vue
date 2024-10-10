<template>
    <MainLayout>
        <div class="mb-3">
            <!-- You can open the modal using ID.showModal() method -->
            <button class="btn btn-info" @click="addUniversity">
                Tambah Data
            </button>
            <dialog id="my_modal_3" class="modal">
                <div class="modal-box">
                    <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form @submit.prevent="submitUniversity" id="universityForm" class="m-3">
                        <div class="mb-4">
                            <input v-model="university.id" type="text" id="inputID" placeholder="ID Universitas"
                                class="hidden">
                        </div>
                        <div class="mb-4">
                            <label for="inputNama" class="block text-gray-700 font-semibold mb-2">Nama
                                Universitas</label>
                            <input name="inputNama" v-model="university.name" type="text" id="inputNama"
                                placeholder="Nama Universitas"
                                class="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div class="flex justify-end">
                            <button type="submit" class="btn" :class="isEditing ? 'btn-warning' : 'btn-primary'">
                                {{ isEditing ? 'Edit' : 'Submit' }}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
        <table class="table table-zebra">
            <thead>
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(university, index) in universities" :key="university.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ university.id }}</td>
                    <td>{{ university.name }}</td>
                    <td>
                        <button @click="editUniversitas(university.id)" class="btn btn-sm btn-warning">
                            Edit
                        </button>
                        <button @click="deleteUniversitas(university.id)" class="ml-1 btn btn-sm btn-error">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </MainLayout>
</template>

<script>
import axios from 'axios';
import MainLayout from '../layouts/MainLayout.vue';
import Swal from 'sweetalert2';

export default {
    components: {
        MainLayout
    },
    data() {
        return {
            universities: [],
            university: {
                id: '',
                name: ''
            },
            isEditing: false,
        };
    },
    mounted() {
        this.fetchUniversities();
    },
    updated(){

    },
    unmounted(){

    },
    methods: {
        fetchUniversities() {
            axios
                .get('https://localhost:7180/universities', {
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
        addUniversity() {
            this.university.id = '';
            this.university.name = '';
            this.isEditing = false;
            document.getElementById('my_modal_3').showModal();
        },
        editUniversitas(id) {
            const selectedUniversity = this.universities.find(university => university.id === id);
            if (selectedUniversity) {
                this.university.id = selectedUniversity.id;
                this.university.name = selectedUniversity.name;
                this.isEditing = true;
                document.getElementById('my_modal_3').showModal();
            }
        },
        submitUniversity() {
            if (!this.isEditing) {
                // add university
                axios
                    .post('https://localhost:7180/universities', this.university, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        this.universities.push(response.data.data);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        document.getElementById('my_modal_3').close();
                    })
                    .catch((error) => {
                        console.error('Error adding university:', error);
                    });
            } else {
                // edit university
                const updatedUniversity = {
                    id: this.university.id,
                    name: this.university.name
                };

                axios
                    .put(`https://localhost:7180/universities/${updatedUniversity.id}`, updatedUniversity, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        const index = this.universities.findIndex(university => university.id === updatedUniversity.id);
                        if (index !== -1) {
                            this.universities.splice(index, 1, response.data.data);
                        }
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        document.getElementById('my_modal_3').close();
                    })
                    .catch((error) => {
                        console.error('Error updating university:', error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: error.response.data.message || "An error occurred while updating.",
                        });
                    });
            }
        },
        deleteUniversitas(id) {
            Swal.fire({
                title: "Yakin mau hapus?",
                text: "Data akan dihapus permanen!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Hapus!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .delete(`https://localhost:7180/universities/${id}`, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("userToken")
                            }
                        })
                        .then((response) => {
                            // Remove the deleted university from the list
                            this.universities = this.universities.filter(university => university.id !== id);
                            Swal.fire({
                                title: "Deleted!",
                                text: response.data.message,
                                showConfirmButton: false,
                                icon: "success",
                                timer: 1500
                            });
                        })
                        .catch((error) => {
                            console.error('Error deleting university:', error);
                            Swal.fire({
                                title: "Error!",
                                text: "There was an error deleting the university.",
                                icon: "error"
                            });
                        });
                }
            });
            // Add your delete logic here
        }
    }
}
</script>

<style lang="scss" scoped></style>