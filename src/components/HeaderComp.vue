<template>
    <header ref="header">
        <router-link to="/">
            <img :src="logoBlack"
             alt="logo"
             class="logo">
        </router-link>
        <div class="right-menu">
            <button @click="switchLang"
             class="lang-switch">
                {{ this.$i18n.locale }}
            </button>
            <div @click="$emit('openMenu')"
             class="menu-button"></div>
        </div>
    </header>
</template>
<script>
import logoBlack from '@/assets/img/logo_black.png'
import gsap from 'gsap'
import lang from '@/assets/img/lang.svg'

export default {
    name: 'HeaderComp',
    components: {

    },
    data() {
        return {
            logoBlack,
            lang
        }
    },
    methods: {
        animateHeader() {
            const header = this.$refs.header
            var tl = gsap.timeline()
            tl.from(header, {
                duration: 1,
                y: -110,
                opacity: 0,
                ease: 'power4.out',
            }, '+=0.5')
        },
        switchLang() {
            this.$i18n.locale = this.$i18n.locale === 'en' ? 'et' : 'en'
            // save to local storage
            localStorage.setItem('lang', this.$i18n.locale)
            this.$emit('switchLang')
        }

    },
    mounted() {
        this.animateHeader()
    }
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
