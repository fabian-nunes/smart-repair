<template>
  <tr v-for="(repair, index) in repairs" :key="repair.id"  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {{ repair.name }}
    </th>
    <td class="py-4 px-6">
      {{ repair.price }}
    </td>
    <td class="py-4 px-6">
      {{ repair.client.name }}
    </td>
    <td class="py-4 px-6">
      <button v-if="repair.status === 0" @click="changeStatus(repair._id, repair.status, index)" class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">To Do</button>
      <button v-else-if="repair.status === 1" @click="changeStatus(repair._id, repair.status, index)" class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">In progress</button>
      <button v-else-if="repair.status === 2" @click="changeStatus(repair._id, repair.status, index)" class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Waiting Payment</button>
      <span v-else class="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900 pointer-events-none">Done</span>
    </td>
    <td class="py-4 px-6 text-right">
      <button v-if="repair.status === 0" @click="openEdit(index)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
      <button v-else class="font-mediumtext-gray-200 dark:text-gray-100 hover:underline pointer-events-none">Edit</button>
    </td>
    <td class="py-4 px-6 text-right">
      <button v-if="repair.status === 0 || repair.status === 3" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
      <button v-else class="font-mediumtext-gray-200 dark:text-gray-100 hover:underline pointer-events-none">Delete</button>
    </td>
  </tr>

  <Teleport to="body">
    <ModalRE :show-edit="showEdit" @update-repair="updateRepair" @close-edit="closeEdit" :name="eName" :price="ePrice" :description="eDescription"></ModalRE>
  </Teleport>

</template>


<script>

import ModalRE from "@/components/Repairs/ModalRE";

export default {
  name: "RepairsTValues",
  components: {
    ModalRE
  },
  data() {
    return {
      repairs: [],
      showEdit: false,
      eName: "",
      ePrice: "",
      eDescription: "",
      eId: "",
      index : 0,
    };
  },
  methods: {
    changeStatus(id, status, index) {
      status++;
      const textStatus = status === 0 ? "To Do" : status === 1 ? "In progress" : status === 2 ? "Waiting Payment" : "Done";
      this.$swal({
        title: 'Do you want to update the repair?',
        html: 'Update to ' + textStatus.bold(),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#13b904',
        cancelButtonColor: '#848484',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateStatus(id, status, index);
        }
      });
    },
    updateStatus(id, status, index) {
      fetch(`http://localhost:3000/repairs/status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: status
        })
      }).then(res => res).then(res => {
        if (res.ok) {
          this.repairs[index].status = status;
          this.success('Repair updated successfully');
        } else {
          this.error(res.statusText);
        }
      });
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
    updateRepair(name, price, description) {

      this.eName = name;
      this.ePrice = price;
      this.eDescription = description;

      fetch(`http://localhost:3000/repairs/${this.eId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          price: price,
          description: description,
        })
      }).then(res => res).then(res => {
        if (res.ok) {
          this.success('Repair updated successfully');
          this.resetValues();
        } else {
          this.error(res.statusText);
        }
      });
    },
    openEdit(key) {
      this.eName = this.repairs[key].name;
      this.ePrice = this.repairs[key].price;
      this.eDescription = this.repairs[key].description;
      this.eId = this.repairs[key]._id;
      this.index = key;

      this.showEdit = true;
    },
    resetValues() {
      this.repairs[this.index].name = this.eName;
      this.repairs[this.index].price = this.ePrice;
      this.repairs[this.index].description = this.eDescription;
      this.closeEdit();
    },
    closeEdit() {
      this.showEdit = false;
    },
  },
  mounted() {
    fetch("http://localhost:3000/repairs")
        .then(response => response.json())
        .then(data => {
          this.repairs = data;
        });
  },
}
</script>

<style scoped>

</style>