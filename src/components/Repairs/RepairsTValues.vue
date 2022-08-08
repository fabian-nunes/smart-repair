<template>
  <tr v-for="(repair, index) in repairs" :key="repair.id"  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th scope="row" @click="openV(index)" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {{ repair.name }}
    </th>
    <td class="py-4 px-6" @click="openV(index)">
      {{ repair.price }}
    </td>
    <td class="py-4 px-6" @click="openV(index)">
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
      <button v-if="repair.status === 0 || repair.status === 3" @click="deleteRepair(index)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
      <button v-else class="font-mediumtext-gray-200 dark:text-gray-100 hover:underline pointer-events-none">Delete</button>
    </td>
  </tr>

  <Teleport to="body">
    <ModalRE :show-edit="showEdit" @update-repair="updateRepair" @close-edit="closeEdit" :name="eName" :price="ePrice" :description="eDescription"></ModalRE>
  </Teleport>

  <Teleport to="body">
    <ModalRV  class="align-middle" v-show="showV" @close-v="closeV" :name-v="nameV" :price-v="priceV" :description-v="descriptionV" :client-v="clientV"></ModalRV>
  </Teleport>
</template>


<script>

import ModalRE from "@/components/Repairs/ModalRE";
import ModalRV from "@/components/Repairs/ModalRV";

export default {
  name: "RepairsTValues",
  components: {
    ModalRE,
    ModalRV
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
      showV: false,
      nameV: "",
      priceV: "",
      descriptionV: "",
      clientV: "",
      sortS: 0,
      repairCopy: [],
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
      fetch(`http://localhost:3000/api/repairs/status/${id}`, {
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

      fetch(`http://localhost:3000/api/repairs/${this.eId}`, {
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
      this.copyValues();
      this.closeEdit();
    },
    closeEdit() {
      this.showEdit = false;
    },
    deleteRepair(key) {
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
          this.deleteFetch(this.repairs[key]._id, key);
        }
      });
    },
    deleteFetch(id, key) {
      fetch(`http://localhost:3000/api/repairs/${id}`, {
        method: "DELETE"
      }).then(res => res).then(res => {
        if (res.ok) {
          this.success('Repair deleted successfully');
          this.repairs.splice(key, 1);
          this.copyValues();
        } else {
          this.error(res.statusText);
        }
      });
    },
    openV(key) {
      this.nameV = this.repairs[key].name;
      this.priceV = this.repairs[key].price;
      this.descriptionV = this.repairs[key].description;
      this.clientV = this.repairs[key].client.name;
      this.showV = true;
    },
    closeV() {
      this.showV = false;
    },
    sortTableAS(a, b) {
      if ( a.status < b.status ){
        return -1;
      }
      if ( a.status > b.status ){
        return 1;
      }
      return 0;
    },
    sortTableAP(a, b) {
      if ( a.price < b.price ){
        return -1;
      }
      if ( a.price > b.price ){
        return 1;
      }
      return 0;
    },
    sortTableDS(a, b) {
      if ( b.status < a.status ){
        return -1;
      }
      if ( b.status > a.status ){
        return 1;
      }
      return 0;
    },
    sortTableDP(a, b) {
      if ( b.price < a.price ){
        return -1;
      }
      if ( b.price > a.price ){
        return 1;
      }
      return 0;
    },
    sortTable(type) {
      if (type === 0) {
        if (this.sortS === 0) {
          this.repairs.sort(this.sortTableAS);
          this.sortS = 1
        } else {
          this.repairs.sort(this.sortTableDS);
          this.sortS = 0;
        }
      } else {
        if (this.sortS === 0) {
          this.repairs.sort(this.sortTableAP);
          this.sortS = 1
        } else {
          this.repairs.sort(this.sortTableDP);
          this.sortS = 0;
        }
      }
    },
    filterTable(e) {
      if (e === '') {
        this.repairs = this.repairCopy;
      } else {
        this.repairs = this.repairCopy.filter(repair => {
          return repair.name.toLowerCase().includes(e.toLowerCase());
        });
      }
    },
    copyValues() {
      this.repairCopy = this.repairs;
    }
  },
  mounted() {
    fetch("http://localhost:3000/api/repairs")
        .then(response => response.json())
        .then(data => {
          this.repairs = data;
          this.copyValues();
        });
  },
}
</script>

<style scoped>

</style>