<template>
    <MainLayout>        
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
                <tr v-for="(role, index) in roles" :key="role.roleId">
                    <td>{{ index + 1 }}</td>
                    <td>{{ role.roleId }}</td>
                    <td>{{ role.roleName }}</td>
                    <td>
                        <button @click="editRole(role.roleId)" class="btn btn-sm btn-warning">
                            Edit
                        </button>
                        <button @click="deleteRole(role.roleId)" class="ml-1 btn btn-sm btn-error">
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
            roles: [],
            role: {
                roleId: '',
                roleName: ''
            },
            isEditing: false,
        };
    },
    mounted() {
        this.fetchRoles();
    },
    methods: {
        fetchRoles() {
            axios
                .get(`https://localhost:7180/roles`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
                    }
                })
                .then((response) => {
                    this.roles = response.data.data;
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
        deleteRole(id) {
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
                        .delete(`https://localhost:7180/roles/${id}`, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("userToken")
                            }
                        })
                        .then((response) => {
                            // Remove the deleted university from the list
                            this.roles = this.roles.filter(role => role.roleId !== id);
                            Swal.fire({
                                title: "Deleted!",
                                text: response.data.message,
                                showConfirmButton: false,
                                icon: "success",
                                timer: 1500
                            });
                        })
                        .catch((error) => {
                            console.error('Error deleting role:', error);
                            Swal.fire({
                                title: "Error!",
                                text: "There was an error deleting the role.",
                                icon: "error"
                            });
                        });
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.table {
    width: 100%;
    border-collapse: collapse; // Ensures borders are merged for a cleaner look
}

.table th, .table td {
    border: 1px solid #ccc; // Border color and style
    padding: 8px; // Add some padding for better spacing
    text-align: left; // Align text to the left
}

.table th {
    background-color: #f8f8f8; // Light background for headers
    font-weight: bold; // Bold font for headers
}

.table tr:nth-child(even) {
    background-color: #f2f2f2; // Zebra striping for better readability
}
</style>