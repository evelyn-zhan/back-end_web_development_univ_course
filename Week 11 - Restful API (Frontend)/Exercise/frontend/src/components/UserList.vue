<template>
    <div>
        <router-link :to="{ name: 'Create' }" class="button is-success has-text-white" style="margin-top: 10px;">
            Add New
        </router-link>

        <table class="table is-striped is-bordered mt-3 is-fullwidth" style="margin: 10px auto;">
            <thead class="has-background-white">
                <tr>
                    <th class="has-text-black">User Name</th>
                    <th class="has-text-black">User Email</th>
                    <th class="has-text-black">User Address</th>
                    <th class="has-text-black">User Phone</th>
                    <th class="has-text-black has-text-centered">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.user_id" class="has-background-white">
                    <td class="has-text-black">{{ user.user_name }}</td>
                    <td class="has-text-black">{{ user.user_email }}</td>
                    <td class="has-text-black">{{ user.user_address }}</td>
                    <td class="has-text-black">{{ user.user_phone }}</td>
                    <td class="has-text-centered">
                        <router-link :to="{ name: 'Edit', params: { id: user.user_id } }" class="button is-warning is-small">
                            Edit
                        </router-link>
                        <a class="button is-danger is-small has-text-white" style="margin-left: 5px;" @click="deleteUser(user.user_id)">
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
    name: 'UserList',
    data() {
        return {
            users: []
        }
    },

    created() {
        this.getUsers()
    },

    methods: {
        async getUsers() {
            try {
                const response = await axios.get('http://localhost:3000/api/users')
                this.users = response.data
            } catch (error) {
                console.log(error)
            }
        },

        async deleteUser(id) {
            try {
                await axios.delete(`http://localhost:3000/api/user/${id}`)
                this.getUsers()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>