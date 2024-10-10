<template>
    <MainLayout>
        <DataTable :columns="columns" :data="roles" class="display" :options="options">
            <template #actions="{ row }">
                <button class="btn btn-sm btn-warning" @click="editRole(row.roleId)">Edit</button>
                <button class="btn btn-sm btn-error ml-1" @click="deleteRole(row.roleId)">Delete</button>
            </template>
        </DataTable>
    </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout.vue';

DataTable.use(DataTablesCore);

const columns = [
    {
        data: null, // Menggunakan null untuk nomor urut
        title: '#',
        render: (data, type, row, meta) => meta.row + 1 // Menambahkan nomor urut
    },
    { data: 'roleId', title: 'Role ID' },
    { data: 'roleName', title: 'Role Name' },
    { data: null, render: '#actions', title: 'Actions' },
];

const roles = ref([]);

const options = {
    processing: true,
    serverSide: false,
    responsive: true,
    fixedColumns: true,
};

const fetchRoles = async () => {
    try {
        const response = await axios.get('https://localhost:7180/roles', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
            },
        });
        roles.value = response.data.data; // Asumsi data dalam format ini
    } catch (error) {
        console.error('Error fetching roles:', error);
    }
};

const editRole = (id) => {
    console.log(`Edit role with ID: ${id}`);
};

const deleteRole = (id) => {
    console.log(`Delete role with ID: ${id}`);
};

// Ambil data saat komponen dimuat
onMounted(() => {
    fetchRoles()
});
</script>

<style>
@import 'datatables.net-dt';

/* Gaya untuk perataan teks */
</style>
