<template lang="">
    <div ref="menu"
         class="menu">
         <nav class="menu-list">
             <ul class="menu-list-wrap">
                 <li class="menu-item" v-for="link in links" :key="link.id" ref="listItem"  @mouseover="changePic(link.id)" @mouseleave="resetbackground()">
                     <router-link @click="openMenu" :to="link.link">{{ link.name }}</router-link>
                 </li>
             </ul>
         </nav>
        <div class="menu-pictures" >

        </div>
        <div ref="background" class="background-pattern"></div>
        <transition name="burn" mode="out-in">
            <div v-if="showPics"  ref="picture" :key="currentPic" :style="{ backgroundImage: 'url(' + currentPic + ')' }" alt="pic1" class="background-menu-image"></div>
        </transition>

        <button @click="openMenu" class="close-menu">
            <img class="cross-icon" :src="cross" alt="close">
        </button>
    </div>
</template>
<script>
import gsap from 'gsap'
import pic1 from '@/assets/img/margit-small.jpg'
import pic2 from '@/assets/img/intro2.jpg'
import pic3 from '@/assets/img/lock.jpg'
import cross from '@/assets/img/cross.svg'

export default {

    name: 'HeaderMenu',
    components: {

    },
    data() {
        return {
            menuOpened: false,
            currentPic: pic2,
            cross,
            showPics: false,
            links: [
                {
                    id: 1,
                    name: this.$t('home.properties'),
                    link: '/properties'
                },
                {
                    id: 2,
                    name: this.$t('about'),
                    link: '/about'
                },
                {
                    id: 3,
                    name: this.$t('privacy'),
                    link: '/privacy'
                },
                {
                    id: 4,
                    name: this.$t('home.search'),
                    link: '/search'
                },
            ],
            pics: [
                {
                    id: 2,
                    pic: pic1
                },
                {
                    id: 1,
                    pic: pic2
                },
                {
                    id: 3,
                    pic: pic3
                },
                {
                    id: 4,
                    pic: pic2
                },
            ]
        }
    },
    methods: {
        openMenu() {
            this.menuOpened = !this.menuOpened
            const menu = this.$refs.menu
            const listItem = this.$refs.listItem
            const tl = gsap.timeline()
            const background = this.$refs.background

            if (this.menuOpened) {
                tl.to(menu, {
                    duration: 0.5,
                    width: '100%',
                    ease: 'power3',
                })
                    .to(listItem, {
                        duration: 0.3,
                        opacity: 1,
                        y: 0,
                        stagger: 0.1,
                    }, '-=0.1')
                    .to(background, {
                        duration: 0.3,
                        opacity: 1,
                    }, '-=0.1')
                this.$emit('openedMenu')
                return
            }
            tl.to(listItem, {
                duration: 0.3,
                opacity: 0,
                y: 20,
                stagger: 0.1,
            })
                .to(background, {
                    duration: 0.3,
                    opacity: 0,
                }, '-=0.1')
                .to(menu, {
                    duration: 0.5,
                    width: '0%',
                    ease: 'power3',
                }, '-=0.1')
            this.showPics = false
            this.$emit('closedMenu')

        },
        changePic(id) {
            this.showPics = true
            this.currentPic = this.pics.find(pic => pic.id === id).pic
            this.magnifybackground(id)
        },
        magnifybackground(id) {
            let background = this.$refs.background
            var position = '0% 0%'

            const tl = gsap.timeline()
            switch (id) {
                case 1:
                    position = '0% -75%'
                    break
                case 2:
                    position = '0% -150%'
                    break
                case 3:
                    position = '0% -225%'
                    break
                default:
                    position = '0% 0%'
            }

            tl.to(background, {
                duration: 0.8,
                opacity: 0.3,
                backgroundPosition: position,
                ease: 'easeOut'
            }, 'change')

        },
        resetbackground() {
            let background = this.$refs.background

            const tl = gsap.timeline()

            tl.to(background, {
                duration: 0.8,
                opacity: 1,
                backgroundPosition: '0% 0%',
                ease: 'easeOut'
            }, 'change')

        }
    },
    mounted() {

    }

}
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
    position: fixed;
    top: 0;
    right: 0;
    width: 0%;
    height: 100vh;
    background-color: var(--theme);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
}

.background-pattern {
    height: 100vh;
    width: 100vw;
    background-image: radial-gradient(rgba(255, 255, 255, 0.1) 25%,
            transparent 9%);
    background-position: 0% 0%;
    background-size: 15vmin 15vmin;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: 1;
}

.background-menu-image {
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.3;
    z-index: 0;
}

.menu-list,
.menu-pictures {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
}

.menu-picture {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.menu-list ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.menu-list ul li {
    font-size: 3rem;
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

    .menu-list ul {
        align-items: center;
        justify-content: center;
    }

    .menu-pictures {
        display: none;
    }
}
</style>
