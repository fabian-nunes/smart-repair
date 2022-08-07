<template>
  <transition name="modal">
    <div v-show="show" @click="$emit('close')" tabindex="-1" aria-hidden="true" class="modal-fade flex justify-center fade bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
      <div class="relative p-4 w-full max-w-md h-full md:h-auto m-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700" @click.stop="">
          <button type="button" @click="$emit('close')" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="py-6 px-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a Repair</h3>
            <form class="space-y-6" @submit.prevent="submitForm">
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Repairs's Title</label>
                <input type="text" v-model="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Screen Repair" required>
              </div>
              <div>
                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Repair's price</label>
                <div class="flex">
                  <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    €
                  </span>
                  <input type="text" v-model="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="59.99" required>
                </div>
              </div>
              <div>
                <label for="client" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Client</label>
                <select type="text" v-model="clientID" id="client" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                  <option v-for="client in clients" :key="client.id" :value="client._id">{{client.name}}</option>
                </select>
              </div>
              <div>
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Repair's price</label>
                <textarea type="number" v-model="description" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Repair Details"></textarea>
              </div>
              <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Repair</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalRC",
  emits: ['close', 'reRender'],
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      name: '',
      price: '',
      description: '',
      clientID: '',
      clients: [],
    }
  },
  methods: {
    submitForm() {
      fetch('http://localhost:3000/api/repairs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.name,
          description: this.description,
          price: this.price,
          client: this.clientID,
        })
      }).then(res => res).then(res => {
        if (res.ok) {
          this.success();
          this.resetValues();
        } else {
          this.error(res.statusText);

        }
      });
    },
    resetValues() {
      this.name = '';
      this.price = '';
      this.description = '';
      this.clientID = '';
      this.$emit('reRender');
      this.$emit('close');
    },
    success() {
      this.$swal({
        title: 'Success!',
        text: 'Repair created successfully!',
        icon: 'success',
        button: 'OK'
      })
    },
    error(message) {
      this.$swal({
        title: 'Error!',
        text: message,
        icon: 'error',
        button: 'OK'
      })
    },
  },
  mounted() {
    fetch('http://localhost:3000/clients')
      .then(res => res.json())
      .then(res => {
        this.clients = res;
      });
  },
}
</script>

<style scoped>

</style>