<template>
    <MainLayout>
        <div class="mb-4 flex justify-between">
            <div class="">
                <!-- You can open the modal using ID.showModal() method -->
                <button class="btn btn-info" @click="addRole">
                    Tambah Data
                </button>
                <dialog id="my_modal_3" class="modal">
                    <div class="modal-box">
                        <form method="dialog">
                            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <form @submit.prevent="submitRole" id="roleForm" class="m-3">
                            <div class="mb-4">
                                <label for="inputNama" class="block text-gray-700 font-semibold mb-2">Nama
                                    Roles</label>
                                <input name="inputNama" v-model="role.roleName" type="text" id="inputNama"
                                    placeholder="Nama Role"
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
        </div>

        <FeaturedTable
            :items="roles"
            :fields="['roleId', 'roleName']"
            :headers="['ID', 'Name']"
            :showActions="true"
            @edit="editRole"
            @delete="deleteRole"
        />
    
    </MainLayout>
</template>

<script>
import axios from 'axios';
import MainLayout from '../layouts/MainLayout.vue';
import Swal from 'sweetalert2';
import FeaturedTable from '../tables/FeaturedTable.vue';

export default {
    components: {
        MainLayout,
        FeaturedTable
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
        addRole() {
            this.role.roleId = '';
            this.role.roleName = '';
            this.isEditing = false;
            document.getElementById('my_modal_3').showModal();
        },
        editRole(id) {
            const selectedRole = this.roles.find(role => role.roleId === id);
            if (selectedRole) {
                this.role.roleId = selectedRole.roleId;
                this.role.roleName = selectedRole.roleName;
                this.isEditing = true;
                document.getElementById('my_modal_3').showModal();
            }
        },
        submitRole() {
            if (!this.isEditing) {
                // add role
                axios
                    .post('https://localhost:7180/roles', this.role, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        this.roles.push(response.data.data);
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
                        console.error('Error adding role:', error);
                    });
            } else {
                // edit role
                const updatedRole = {
                    roleId: this.role.roleId,
                    roleName: this.role.roleName
                };

                axios
                    .put(`https://localhost:7180/roles/${updatedRole.roleId}`, updatedRole, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        const index = this.roles.findIndex(role => role.roleId === updatedRole.roleId);
                        if (index !== -1) {
                            this.roles.splice(index, 1, response.data.data);
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
                        console.error('Error updating role:', error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: error.response.data.message || "An error occurred while updating.",
                        });
                    });
            }
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
                            // Remove the deleted role from the list
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
// .table {
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
</style>