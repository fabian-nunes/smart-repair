<template>
  <main class="bg-gray-200 flex flex-col min-h-screen">
    <NavBar></NavBar>
    <DashboardMain></DashboardMain>
    <FooterSmart class="mt-auto"></FooterSmart>
  </main>
</template>

<script>
import NavBar from "@/components/NavBar";
import FooterSmart from "@/components/FooterSmart";
import DashboardMain from "@/components/Dashboard/DashboardMain";

import './assets/tailwind.css';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterSmart,
    DashboardMain
  }
}
</script>

<style>

</style>
