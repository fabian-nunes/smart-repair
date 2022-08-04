<template>
  <transition name="modal">
    <div v-show="showEdit" @click="$emit('closeEdit')" tabindex="-1" aria-hidden="true" class="modal-fade flex justify-center fade bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
      <div class="relative p-4 w-full max-w-md h-full md:h-auto m-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700" @click.stop="">
          <button type="button" @click="$emit('closeEdit')" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="py-6 px-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit the Client</h3>
            <form class="space-y-6" @submit.prevent="updateClient">
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Client's Name</label>
                <input type="text" v-model="eName" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
              </div>
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Client's email</label>
                <input type="email" id="email" v-model="eEmail" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
              </div>
              <div>
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Client's Phone Number</label>
                <input type="text" id="phone" v-model="ePhone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
              </div>
              <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Client</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalCE",
  emits: ['closeEdit', 'updateClient'],
  data() {
    return {
      eName: '',
      eEmail: '',
      ePhone: ''
    }
  },
  props: {
    showEdit: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
  },
  watch: {
    showEdit: function(val) {
      if (val) {
        this.eName = this.name;
        this.eEmail = this.email;
        this.ePhone = this.phone;
      }
    }
  },
  methods: {
    updateClient() {
      this.$emit('updateClient', this.eName, this.eEmail, this.ePhone);
    }
  }
}
</script>

<style scoped>

.modal-fade {
  transition: opacity 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>