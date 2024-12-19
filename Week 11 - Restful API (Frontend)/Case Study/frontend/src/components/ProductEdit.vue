<template>
    <div>
        <div class="field">
            <label class="label has-text-black">Product Name</label>
            <div class="control">
                <input class="input has-background-white has-text-black" type="text" placeholder="Product Name" v-model="productName" />
            </div>
        </div>

        <div class="field">
            <label class="label has-text-black">Product Price</label>
            <div class="control">
                <input class="input has-background-white has-text-black" type="text" placeholder="Product Price" v-model="productPrice" />
            </div>
        </div>

        <div class="control">
            <button class="button is-warning has-text-white" @click="updateProduct">Update</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ProductEdit',
    data() {
        return {
            productName: '',
            productPrice: ''
        }
    },

    created() {
        this.getProductById()
    },

    methods: {
        async getProductById() {
            try {
                const response = await axios.get(`http://localhost:3000/api/product/${this.$route.params.id}`)
                this.productName = response.data.response[0].product_name
                this.productPrice = response.data.response[0].product_price
            } catch (error) {
                console.log(error)
            }
        },

        async updateProduct() {
            try {
                await axios.put(`http://localhost:3000/api/product/${this.$route.params.id}`, {
                    product_name: this.productName,
                    product_price: this.productPrice
                })
                this.productName = ''
                this.productPrice = ''
                this.$router.push('/')
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>