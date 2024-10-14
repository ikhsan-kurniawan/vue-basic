<template>
    <div class="shadow p-4 max-w-full">
        <div class="flex justify-between">            
            <div class="mb-4">
                <label for="itemsPerPage" class="mr-2">Show:</label>
                <select v-model="itemsPerPage" id="itemsPerPage" class="border border-gray-300 rounded-lg p-2">
                    <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
                </select>
            </div>

            <input 
                type="text" 
                v-model="searchTerm" 
                placeholder="Search..." 
                class="border border-gray-300 rounded-lg p-2 mb-4"
            />
        </div>

        <div class="overflow-x-auto w-full">
            <table class="table table-sm table-pin-cols">
                <thead>
                    <tr>
                        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
                        <th v-if="showActions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedItems" :key="item.id">
                        <td v-for="(field, fieldIndex) in fields" :key="fieldIndex">{{ item[field] }}</td>
                        <td v-if="showActions">
                            <button @click="$emit('edit', item[fields[0]])" class="btn btn-sm btn-warning">Edit</button>
                            <button @click="$emit('delete', item[fields[0]])" class="ml-1 btn btn-sm btn-error">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true
        },
        fields: {
            type: Array,
            required: true
        },
        headers: {
            type: Array,
            required: true
        },
        showActions: {
            type: Boolean,
            default: false // Default to not showing actions
        }
    },
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 5,
            searchTerm: '',
            options: [5, 10, 15, 20]
        };
    },
    watch: {
        itemsPerPage(newVal, oldVal) {
            // Reset the current page to 1 if items per page changes
            this.currentPage = 1;
        },
        searchTerm(newVal, oldVal) {
            // Reset the current page to 1 if the search term changes
            this.currentPage = 1;
        }
    },
    computed: {
        filteredItems() {
            if (!this.searchTerm) return this.items;
            return this.items.filter(item => {
                return Object.values(item).some(value => 
                    String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
                );
            });
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredItems.slice(start, start + this.itemsPerPage);
        },
        totalPages() {
            return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        }
    },
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        }
    }
}
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 1em;
}
.pagination button {
    margin: 0 0.5em;
}
</style>
