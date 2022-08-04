<template>
  <tr v-for="(client, index) in clients" :key="client.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {{ client.name }}
    </th>
    <td class="py-4 px-6">
      {{ client.phone }}
    </td>
    <td class="py-4 px-6">
      {{ client.email }}
    </td>
    <td class="py-4 px-6">
      {{ client.repairs.length }}
    </td>
    <td class="py-4 px-6 text-right">
      <a href="#" @click="openEdit(index)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
    </td>
    <td class="py-4 px-6 text-right">
      <a href="#" @click="deleteClient(index)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
    </td>
  </tr>

  <Teleport to="body">
    <ModalCE :show-edit="showEdit" @update-client="updateClient" @close-edit="closeEdit" :email="eEmail" :phone="ePhone" :name="eName"></ModalCE>
  </Teleport>

</template>

<script>

import ModalCE from "@/components/Clients/ModalCE";

export default {
  name: "ClientsTValues",
  components: {
    ModalCE
  },
  data() {
    return {
      clients: [],
      showEdit: false,
      eName: "",
      eEmail: "",
      ePhone: "",
      eId: "",
      index: 0,
      type: 0,
    };
  },
  methods: {
    openEdit(key) {
      this.eName = this.clients[key].name;
      this.eEmail = this.clients[key].email;
      this.ePhone = this.clients[key].phone;
      this.eId = this.clients[key]._id;
      this.index = key;

      this.showEdit = true;
    },
    closeEdit() {
      this.showEdit = false;
    },
    updateClient(name, email, phone) {

      this.eName = name;
      this.eEmail = email;
      this.ePhone = phone;

      fetch(`http://localhost:3000/clients/${this.eId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.eName,
          email: this.eEmail,
          phone: this.ePhone
        })
      }).then(res => res).then(res => {
        if (res.ok) {
          this.success('Client updated successfully');
          this.resetValues();
        } else {
          this.error(res.statusText);
        }
      });
    },
    resetValues() {
      this.clients[this.index].name = this.eName;
      this.clients[this.index].email = this.eEmail;
      this.clients[this.index].phone = this.ePhone;
      this.closeEdit();
    },
    success(message) {
      this.$swal({
        title: 'Success!',
        text: message,
        icon: 'success',
        button: 'OK'
      });
    },
    error(message) {
      this.$swal({
        title: 'Error!',
        text: message,
        icon: 'error',
        button: 'OK'
      });
    },
    deleteClient(key) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteFetch(this.clients[key]._id, key);
        }
      });
    },
    deleteFetch(id, key) {
      fetch(`http://localhost:3000/clients/${id}`, {
        method: "DELETE"
      }).then(res => res).then(res => {
        if (res.ok) {
          this.success('Client deleted successfully');
          this.clients.splice(key, 1);
        } else {
          this.error(res.statusText);
        }
      });
    },
    sortTableA(a, b) {
      if ( a.repairs.length < b.repairs.length ){
        return -1;
      }
      if ( a.repairs.length > b.repairs.length ){
        return 1;
      }
      return 0;
    },

    sortTableD(a, b) {
      if ( b.repairs.length < a.repairs.length ){
        return -1;
      }
      if ( b.repairs.length > a.repairs.length ){
        return 1;
      }
      return 0;
    },

    sortRepairs() {
      if (this.type === 0) {
        this.clients.sort(this.sortTableA);
        this.type = 1;
      } else {
        this.clients.sort(this.sortTableD);
        this.type = 0;
      }
    }
  },
  mounted() {
    fetch("http://localhost:3000/clients")
      .then(response => response.json())
      .then(data => {
        this.clients = data;
      });
  }
}
</script>

<style scoped>

</style>