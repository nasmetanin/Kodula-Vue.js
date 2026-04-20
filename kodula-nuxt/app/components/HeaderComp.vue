<template>
    <header ref="header">
        <NuxtLink to="/">
            <img :src="logoBlack"
             alt="logo"
             class="logo">
        </NuxtLink>
        <div class="right-menu">
            <button class="lang-switch"
             @click="switchLang">
                {{ $i18n.locale }}
            </button>
            <button @click="toggleMenu"
             class="menu-button"></button>
        </div>
    </header>
    <HeaderMenu v-if="isMenuOpen"
     @close-menu="isMenuOpen = false" />
</template>
<script setup lang="ts">
import logoBlack from '@/assets/img/logo_black.png'
import HeaderMenu from './HeaderMenu.vue'
import { useI18n } from 'vue-i18n'


const i18n = useI18n();
const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const switchLang = () => {
    i18n.setLocale(i18n.locale.value === 'en' ? 'et' : 'en');
    // save to local storage
    localStorage.setItem('lang', i18n.locale.value);
}


</script>
<style>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 0 3rem;
    max-width: calc(1200px + 1rem);
    height: 90px;

}

header a {
    display: flex;
    align-items: center;
    width: fit-content;
}

.logo {
    height: 68px;
}

.right-menu {
    display: flex;
    align-items: center;
    gap: 30px;
}

.lang-switch {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 10px;
    line-height: 0.8rem;
    font-weight: 800;
    color: #000;
    background-color: #f1f1f193;
    border-radius: 10px;
    text-transform: uppercase;
}


.menu-button {
    cursor: pointer;
    border: none;
    background: none;
}

.menu-button::before {
    content: '';
    display: block;
    width: 20px;
    height: 3px;
    background-color: #000;
    margin-bottom: 4px;
    border-radius: 10px;
}

.menu-button::after {
    content: '';
    display: block;
    width: 20px;
    height: 3px;
    background-color: #000;
    border-radius: 10px;
}

@media screen and (max-width: 768px) {
    header {
        padding: 0 1rem;
        height: 50px;
        margin: 1rem 0;

    }

    .logo {
        height: 45px;
    }
}
</style>
