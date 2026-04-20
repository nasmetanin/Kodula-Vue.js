<template lang="">
    <div ref="menu"
         class="menu">
         <nav class="menu-list">
             <ul class="menu-list-wrap">
                 <li class="menu-item" v-for="link in links" :key="link.id" ref="listItem">
                     <NuxtLink @click="closeMenu" :to="link.link">{{ link.name }}</NuxtLink>
                 </li>
             </ul>
         </nav>

        <button @click="closeMenu" class="close-menu">
            <img class="cross-icon" :src="cross" alt="close">
        </button>
    </div>
</template>
<script setup lang="ts">
import cross from '@/assets/img/cross.svg'
import gsap from 'gsap'

const emit = defineEmits<{
    closeMenu: []
}>()

const menu = ref<HTMLElement | null>(null)
const listItem = ref<HTMLElement[]>([])

const openMenu = () => {
    const tl = gsap.timeline()
    tl.to(menu.value, {
        duration: 0.5,
        translateX: '0%',
        ease: 'power3.out',
    }).to(listItem.value, {
        duration: 0.3,
        opacity: 1,
        y: 0,
        stagger: 0.1,
    }, '-=0.1')
}

const closeMenu = () => {
    const tl = gsap.timeline({
        onComplete: () => emit('closeMenu')
    })
    tl.to(listItem.value, {
        duration: 0.3,
        opacity: 0,
        y: 20,
        stagger: 0.1,
    }).to(menu.value, {
        duration: 0.5,
        translateX: '100%',
        ease: 'power3.in',
    }, '-=0.1')
}

const links = [
    {
        id: 1,
        name: $t('home.properties'),
        link: '/properties'
    },
    {
        id: 2,
        name: $t('about'),
        link: '/about'
    },
    {
        id: 3,
        name: $t('privacy'),
        link: '/privacy'
    },
    {
        id: 4,
        name: $t('home.search'),
        link: '/search'
    },
]

onMounted(() => {
    openMenu()
})
</script>
<style>
.close-menu {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 50px;
    height: 50px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cross-icon {
    width: 20px;
    height: 20px;
}

.menu {
    transform: translateX(100%);
    padding: 80px 40px;
    position: fixed;
    top: 0;
    right: 0;
    min-width: 420px;
    height: 100vh;
    background-color: var(--theme);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 99;
    display: flex;
}

.menu-list,
.menu-pictures {
    display: flex;
    z-index: 5;
}

.menu-list ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.menu-list ul li {
    font-size: 2rem;
    font-weight: 800;
    opacity: 0;
    transform: translateY(20px);
    cursor: pointer;
    position: relative;
    color: white;
    width: fit-content;
}

.menu-list ul li:hover:after {
    width: 100%;
}

.menu-list ul li:after {
    content: "";
    display: block;
    width: 0%;
    height: 4px;
    border-radius: 10px;
    background: white;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

@media (max-width: 800px) {
    .close-menu {
        top: 15px;
        right: 0px;
    }

    .cross-icon {
        width: 15px;
        height: 15px;
    }

    .menu-list {
        width: 100%;
    }

}

@media (max-width: 420px) {
    .menu {
        min-width: 100%;
        padding-inline: 20px;
    }

    .menu-list,
    .menu-pictures {
        justify-content: flex-start;
    }

}
</style>
