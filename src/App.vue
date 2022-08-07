<template>
  <main class="bg-gray-200 flex flex-col min-h-screen">
    <NavBar></NavBar>
    <router-view></router-view>
    <FooterSmart class="mt-auto"></FooterSmart>
  </main>
</template>

<script>
import NavBar from "@/components/NavBar";
import FooterSmart from "@/components/FooterSmart";

import './assets/tailwind.css';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterSmart,
  },
  mounted() {
    this.$store.dispatch('auth/tryLogin');
  },
}
</script>

<style>
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
