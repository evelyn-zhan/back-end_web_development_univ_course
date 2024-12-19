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
            <button class="button is-warning has-text-white" @click="updateUser">Update</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'UserEdit',
    data() {
        return {
            userName: '',
            userEmail: '',
            userAddress: '',
            userPhone: ''
        }
    },

    created() {
        this.getUserById()
    },

    methods: {
        async getUserById() {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/${this.$route.params.id}`)
                this.userName = response.data.user_name
                this.userEmail = response.data.user_email
                this.userAddress = response.data.user_address
                this.userPhone = response.data.user_phone
            } catch (error) {
                console.log(error)
            }
        },

        async updateUser() {
            try {
                await axios.put(`http://localhost:3000/api/user/${this.$route.params.id}`, {
                    user_name: this.userName,
                    user_email: this.userEmail,
                    user_address: this.userAddress,
                    user_phone: this.userPhone
                })
                this.userName = '',
                this.userEmail = '',
                this.userAddress = '',
                this.userPhone = ''
                this.$router.push('/')
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>