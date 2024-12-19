<template>
    <div>
        <router-link :to="{ name: 'Create' }" class="button is-success has-text-white" style="margin-top: 10px;">
            Add New
        </router-link>

        <table class="table is-striped is-bordered mt-3 is-fullwidth" style="margin: 10px auto;">
            <thead class="has-background-white">
                <tr>
                    <th class="has-text-black">Product Name</th>
                    <th class="has-text-black">Product Price</th>
                    <th class="has-text-black has-text-centered">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.product_id" class="has-background-white">
                    <td class="has-text-black">{{ item.product_name }}</td>
                    <td class="has-text-black">{{ item.product_price }}</td>
                    <td class="has-text-centered">
                        <router-link :to="{ name: 'Edit', params: { id: item.product_id } }" class="button is-warning is-small">
                            Edit
                        </router-link>
                        <a class="button is-danger is-small has-text-white" style="margin-left: 5px;" @click="deleteProduct(item.product_id)">
                            Delete
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ProductList',
    data() {
        return {
            items: []
        }
    },

    created() {
        this.getProducts()
    },

    methods: {
        async getProducts() {
            try {
                const response = await axios.get('http://localhost:3000/api/products')
                this.items = response.data.response
            } catch (error) {
                console.log(error)
            }
        },

        async deleteProduct(id) {
            try {
                await axios.delete(`http://localhost:3000/api/products/${id}`)
                this.getProducts()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>