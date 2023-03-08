<template>
  <HeaderComp @openMenu="openMenu"
   @switchLang="updMenu += 1" />

  <HeaderMenu ref="menu"
   :key="updMenu"
   @openedMenu="stopScroll()"
   @closedMenu="startScroll()" />

  <router-view v-slot="{ Component }">
    <main>
      <Transition name="side"
       mode="out-in">
        <component :is="Component" />
      </Transition>
    </main>
  </router-view>
  <Transition name="side">

    <CookiesWarning v-if="cookie"
     @close="cookie = false" />

  </Transition>

  <FooterComp />
</template>
<script>
import HeaderComp from '@/components/HeaderComp'
import CookiesWarning from './components/CookiesWarning.vue';
import FooterComp from './components/FooterComp.vue';
import HeaderMenu from './components/HeaderMenu.vue';

export default {
  name: 'App',
  components: {
    HeaderComp,
    HeaderMenu,
    FooterComp,
    CookiesWarning
  },
  data() {
    return {
      cookie: false,
      updMenu: 1
    }
  },
  methods: {
    openMenu() {
      this.$refs.menu.openMenu()
    },
    stopScroll() {
      document.body.classList.add('no-scroll')
    },
    startScroll() {
      document.body.classList.remove('no-scroll')
    },
    showCookie() {
      // get cookie by its key name
      const cookieData = this.$cookies.get('cookie');
      if (cookieData === 'seen') {
        this.cookie = false;
        return
      }
      this.cookie = true;
    },
    switchLang() {
      this.$i18n.locale = localStorage.getItem('lang') === 'en' ? 'en' : 'et'
    }
  },
  mounted() {
    this.showCookie()
    this.switchLang()
  }
}
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  font-family: var(--font);
  font-size: 18px;
  color: #000;
}

.no-scroll {
  overflow: hidden;
}

.side-enter-from,
.side-leave-to {
  opacity: 0;
  transform: scale(0.98);
}


.side-enter-active,
.side-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slideRight-enter-active,
.slideRight-leave-active,
.slideLeft-enter-active,
.slideLeft-leave-active {
  transition: all 0.1s linear;
}

.slideRight-leave-to,
.slideLeft-enter-from {
  opacity: 0;
  transform: translateX(10%);
}

.slideLeft-leave-to,
.slideRight-enter-from {
  opacity: 0;
  transform: translateX(-10%);
}

.burn-enter-active,
.burn-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.burn-enter-from,
.burn-leave-to {
  opacity: 0;
}

.burn-enter-to,
.burn-leave-from {
  opacity: 0.3;
}


:root {
  --padding: 0 1rem;
  --container: calc(960px + 1rem);
  --theme: #003170;
  --theme-lighter: #003f90;
  --font: "Gilroy", sans-serif;
  --gray: #f2f2f2;
  --gray-text: #7f7f7f;
  --br: 15px;
  --body: #ffffff;
  --text-color: #1a1a1a;
}

.gray-text {
  color: var(--gray-text);
}

/* dark theme */

/* @media (prefers-color-scheme: dark) {
  :root {
    --theme: #003170;
    --theme-lighter: #003f90;
    --gray: #f2f2f2;
    --body: #1a1a1a;
    --text-color: #ffffff;
  }
} */

body {
  background-color: var(--body);
  color: var(--text-color);
  font-family: var(--font);
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.flex {
  display: flex;
  align-items: center;
  gap: 5px;
}

.fat-text {
  font-weight: 600;
}

input {
  width: 100%;
  padding: 6px 7px;
  display: inline-block;
  background-color: var(--gray);
  border: 1px solid transparent;
  border-radius: 8px;
  box-sizing: border-box;
  font: var(--font);
  font-size: 13.333px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: inherit;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.section-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  position: relative;
  text-align: center;
}

.section-title h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  z-index: 1;
}

.small-section-title {
  text-transform: uppercase;
  font-size: 14px;
  color: var(--theme-lighter);
  z-index: 1;
}

/* Fonts */

@font-face {
  font-family: 'Gilroy';
  src: local('Gilroy ExtraBold'), local('Gilroy-ExtraBold'),
    url('./assets/fonts/Gilroy-ExtraBold.ttf') format('truetype');
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: 'Gilroy';
  src: local('Gilroy Heavy'), local('Gilroy-Heavy'),
    url('./assets/fonts/Gilroy-Heavy.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: 'Gilroy';
  src: local('Gilroy Light Italic'), local('Gilroy-LightItalic'),
    url('./assets/fonts/Gilroy-LightItalic.ttf') format('truetype');
  font-weight: 300;
  font-style: italic;
}

@font-face {
  font-family: 'Gilroy';
  src: local('Gilroy Thin Italic'), local('Gilroy-ThinItalic'),
    url('./assets/fonts/Gilroy-ThinItalic.ttf') format('truetype');
  font-weight: 100;
  font-style: italic;
}

@font-face {
  font-family: 'Gilroy';
  src: local('Gilroy Black Italic'), local('Gilroy-BlackItalic'),
    url('./assets/fonts/Gilroy-BlackItalic.ttf') format('truetype');
  font-weight: 900;
  font-style: italic;
}

@font-face {
  font-family: 'Gilroy';
  src: local('Gilroy Bold Italic'), local('Gilroy-BoldItalic'),
    url('./assets/fonts/Gilroy-BoldItalic.ttf') format('truetype');
  font-weight: bold;
  font-style: italic;
}

@font-face {
  font-family: 'Gilroy';
  src: local('Gilroy SemiBold'), local('Gilroy-SemiBold'),
    url('./assets/fonts/Gilroy-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'Gilroy';
  src: local('Gilroy UltraLight Italic'), local('Gilroy-UltraLightItalic'),
    url('./assets/fonts/Gilroy-UltraLightItalic.ttf') format('truetype');
  font-weight: 200;
  font-style: italic;
}

@font-face {
  font-family: 'Gilroy';
  src: local('Gilroy SemiBold Italic'), local('Gilroy-SemiBoldItalic'),
    url('./assets/fonts/Gilroy-SemiBoldItalic.ttf') format('truetype');
  font-weight: 600;
  font-style: italic;
}

@font-face {
  font-family: 'Gilroy';

  src: local('Gilroy Light'), local('Gilroy-Light'),

    url('./assets/fonts/Gilroy-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Gilroy';

  src: local('Gilroy Medium Italic'), local('Gilroy-MediumItalic'),
    url('./assets/fonts/Gilroy-MediumItalic.ttf') format('truetype');
  font-weight: 500;
  font-style: italic;
}

@font-face {
  font-family: 'Gilroy';

  src: local('Gilroy ExtraBold Italic'), local('Gilroy-ExtraBoldItalic'),
    url('./assets/fonts/Gilroy-ExtraBoldItalic.ttf') format('truetype');
  font-weight: 800;
  font-style: italic;
}

@font-face {
  font-family: 'Gilroy';

  src: local('Gilroy Regular'), local('Gilroy-Regular'),

    url('./assets/fonts/Gilroy-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Gilroy';

  src: local('Gilroy Heavy Italic'), local('Gilroy-HeavyItalic'),

    url('./assets/fonts/Gilroy-HeavyItalic.ttf') format('truetype');
  font-weight: 900;
  font-style: italic;
}

@font-face {
  font-family: 'Gilroy';

  src: local('Gilroy Medium'), local('Gilroy-Medium'),

    url('./assets/fonts/Gilroy-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Gilroy';

  src: local('Gilroy Regular Italic'), local('Gilroy-RegularItalic'),

    url('./assets/fonts/Gilroy-RegularItalic.ttf') format('truetype');
  font-weight: normal;
  font-style: italic;
}

@font-face {
  font-family: 'Gilroy';

  src: local('Gilroy UltraLight'), local('Gilroy-UltraLight'),

    url('./assets/fonts/Gilroy-UltraLight.ttf') format('truetype');
  font-weight: 200;
  font-style: normal;
}

@font-face {
  font-family: 'Gilroy';

  src: local('Gilroy Bold'), local('Gilroy-Bold'),

    url('./assets/fonts/Gilroy-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Gilroy';

  src: local('Gilroy Thin'), local('Gilroy-Thin'),

    url('./assets/fonts/Gilroy-Thin.ttf') format('truetype');
  font-weight: 100;
  font-style: normal;
}

@font-face {
  font-family: 'Gilroy';
  src: local('Gilroy Black'), local('Gilroy-Black'),
    url('./assets/fonts/Gilroy-Black.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
}
</style>
