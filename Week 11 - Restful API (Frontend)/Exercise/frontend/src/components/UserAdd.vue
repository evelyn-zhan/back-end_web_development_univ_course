<template>
    <div>
        <div class="field">
            <label class="label has-text-black">User Name</label>
            <div class="control">
                <input class="input has-background-white has-text-black" type="text" placeholder="User Name" v-model="userName" />
            </div>
        </div>

        <div class="field">
            <label class="label has-text-black">User Email</label>
            <div class="control">
                <input class="input has-background-white has-text-black" type="text" placeholder="User Email" v-model="userEmail" />
            </div>
        </div>

        <div class="field">
            <label class="label has-text-black">User Address</label>
            <div class="control">
                <input class="input has-background-white has-text-black" type="text" placeholder="User Address" v-model="userAddress" />
            </div>
        </div>

        <div class="field">
            <label class="label has-text-black">User Phone</label>
            <div class="control">
                <input class="input has-background-white has-text-black" type="text" placeholder="User Phone" v-model="userPhone" />
            </div>
        </div>

        <div class="control">
            <button class="button is-success has-text-white" @click="saveUser">Save</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'UserAdd',
    data() {
        return {
            userName: '',
            userEmail: '',
            userAddress: '',
            userPhone: ''
        }
    },

    methods: {
        async saveUser() {
            try {
                await axios.post('http://localhost:3000/api/users', {
                    user_name: this.userName,
                    user_email: this.userEmail,
                    user_address: this.userAddress,
                    user_phone: this.userPhone
                })
                this.userName = ''
                this.userEmail = ''
                this.userAddress = ''
                this.userPhone = ''
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