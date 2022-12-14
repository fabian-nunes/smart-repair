<template>
  <tr v-for="(client, index) in clients" :key="client.id"  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th scope="row" @click="openV(index)" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {{ client.name }}
    </th>
    <td @click="openV(index)" class="py-4 px-6">
      {{ client.phone }}
    </td>
    <td @click="openV(index)" class="py-4 px-6">
      {{ client.email }}
    </td>
    <td @click="openV(index)" class="py-4 px-6">
      {{ client.repairs.length }}
    </td>
    <td class="py-4 px-6 text-right">
      <button @click="openEdit(index)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
    </td>
    <td class="py-4 px-6 text-right">
      <button @click="deleteClient(index)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
    </td>
  </tr>

  <Teleport to="body">
    <ModalCE :show-edit="showEdit" @update-client="updateClient" @close-edit="closeEdit" :email="eEmail" :phone="ePhone" :name="eName"></ModalCE>
  </Teleport>

  <Teleport to="body">
    <ModalCV  class="align-middle" v-show="showV" @close-v="closeV" :name-v="nameV" :email-v="emailV" :phone-v="phoneV" :repairs-v="repairsV"></ModalCV>
  </Teleport>

</template>

<script>

import ModalCE from "@/components/Clients/ModalCE";
import ModalCV from "@/components/Clients/ModalCV";

export default {
  name: "ClientsTValues",
  components: {
    ModalCE,
    ModalCV
  },
  data() {
    return {
      clients: [],
      showEdit: false,
      showV: false,
      eName: "",
      eEmail: "",
      ePhone: "",
      eId: "",
      index: 0,
      type: 0,
      clientsCopy: [],
      nameV: "",
      emailV: "",
      phoneV: "",
      repairsV: [],
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
    openV(key) {
      this.nameV = this.clients[key].name;
      this.emailV = this.clients[key].email;
      this.phoneV = this.clients[key].phone;
      this.repairsV = this.clients[key].repairs;
      this.showV = true;
    },
    closeV() {
      this.showV = false;
    },
    updateClient(name, email, phone) {

      this.eName = name;
      this.eEmail = email;
      this.ePhone = phone;

      if (isNaN(this.ePhone)) {
        this.error('Phone number must be a number');
        this.ePhone = '';
      } else {
        if(this.ePhone.length < 9) {
          this.error('Phone number must be 9 digits');
          this.ePhone = '';
        } else {
          fetch(`http://localhost:3000/api/clients/${this.eId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "auth-token": this.$store.getters["auth/getToken"]
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
        }
      }


    },
    resetValues() {
      this.clients[this.index].name = this.eName;
      this.clients[this.index].email = this.eEmail;
      this.clients[this.index].phone = this.ePhone;
      this.copyValues()
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
        confirmButtonColor: '#d33',
        cancelButtonColor: '#848484',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteFetch(this.clients[key]._id, key);
        }
      });
    },
    deleteFetch(id, key) {
      fetch(`http://localhost:3000/api/clients/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": this.$store.getters["auth/getToken"]
        }
      }).then(res => res).then(res => {
        if (res.ok) {
          this.success('Client deleted successfully');
          this.clients.splice(key, 1);
          this.copyValues()
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
    },
    filterTable(e) {
      if (e === '') {
        this.clients = this.clientsCopy;
      } else {
        this.clients = this.clientsCopy.filter(client => {
          return client.name.toLowerCase().includes(e.toLowerCase());
        });
      }
    },
    copyValues() {
      this.clientsCopy = this.clients;
    }
  },
  mounted() {
    fetch("http://localhost:3000/api/clients", {
      headers: {
        "Content-Type": "application/json",
        "auth-token": this.$store.getters["auth/getToken"]
      }
    }).then(response => response.json())
      .then(data => {
        this.clients = data;
        this.copyValues();
      });
  }
}
</script>

<style scoped>

</style>