<template>
  <NavBar></NavBar>
  <DashboardMain></DashboardMain>
  <FooterSmart></FooterSmart>
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
