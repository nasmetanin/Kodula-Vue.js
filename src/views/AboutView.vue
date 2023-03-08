<template>
  <div class="about">
    <div ref="title"
     class="section-title">
      <h4 class="small-section-title">{{ $t('about') }}</h4>
      <h1>{{ $t('aboutPage.title') }}</h1>
    </div>

    <div class="owner-profile">
      <img class="person-photo"
       :src="margit"
       alt="Margit Rajaste">
      <h3>Margit Rajaste</h3>
      <p class="owner-info-text">Kodula CEO</p>
      <p class="owner-info-text">+372 5663 8397</p>
      <p class="owner-info-text">margit@kodula.ee</p>
    </div>

    <div class="about-text">
      <p>
        {{ $t('aboutPage.p1') }}
      </p>
      <p>
        {{ $t('aboutPage.p2') }}
      </p>
      <p>
        {{ $t('aboutPage.p3') }}
      </p>
      <p>
        {{ $t('aboutPage.p4') }}
      </p>
      <p>
        {{ $t('aboutPage.p5') }}
      </p>
      <p>
        {{ $t('aboutPage.p6') }}
      </p>

      <p>
        {{ $t('aboutPage.p7') }}
      </p>
    </div>


  </div>
</template>
<script>
import margit from '@/assets/img/margit-small.jpg'

export default {
  name: 'AboutView',
  components: {

  },
  data() {
    return {
      margit
    }
  },
}
</script>
<style>
.person-photo {
  width: 300px;
  height: 300px;
  border-radius: 50em;
  object-fit: cover;
}

.owner-info-text {
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

.owner-profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
