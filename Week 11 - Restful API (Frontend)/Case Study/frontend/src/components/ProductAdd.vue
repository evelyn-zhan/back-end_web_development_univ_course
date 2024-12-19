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
            <button class="button is-success has-text-white" @click="saveProduct">Save</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ProductAdd',
    data() {
        return {
            productName: '',
            productPrice: ''
        }
    },

    methods: {
        async saveProduct() {
            try {
                await axios.post('http://localhost:3000/api/products', {
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

<style>
input[type="text"]::placeholder {
    color: black;
}
</style>