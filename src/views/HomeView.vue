<template>
  <div class="home">
    <HomeIntro />
    <HomeProperties />
    <ServicesHome />

  </div>
</template>

<script>
import HomeIntro from '@/components/HomeIntro'
import HomeProperties from '@/components/HomeProperties'

import ServicesHome from '@/components/ServicesHome'

export default {
  name: 'HomeView',
  components: {
    HomeIntro,
    HomeProperties,
    ServicesHome,

  }
}
</script>
