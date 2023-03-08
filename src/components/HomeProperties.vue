<template>
    <section ref="trigger"
     class="mainpage-section">
        <div ref="title"
         class="section-title">
            <h4 class="small-section-title">{{ $t('home.properties') }}</h4>
            <h1>{{ $t('home.newOffers') }}</h1>
        </div>
        <HomePropGrid v-if="loaded"
         :properties="properties" />
        <LoaderView style="max-height: 100px;"
         v-else />
    </section>
</template>
<script>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LoaderView from './LoaderView.vue'
gsap.registerPlugin(ScrollTrigger)
import HomePropGrid from './HomePropGrid.vue'

export default {
    name: 'HomeProperties',
    props: {

    },
    data() {
        return {
            properties: [],
            loaded: false,
        }
    },
    components: {
        HomePropGrid,
        LoaderView
    },
    inject: ['baseURL'],
    methods: {
        getProperties() {
            fetch(this.baseURL + '/api/home_properties')
                .then(res => res.json())
                .then(data => {

                    this.properties = data
                    this.loaded = true
                })
        },

        animate() {
            const trigger = this.$refs.trigger
            const title = this.$refs.title

            var tl = gsap.timeline({
                scrollTrigger: {
                    trigger: trigger,
                    start: 'top 70%',
                    end: 'bottom 70%',
                    toggleActions: 'play none none reverse',
                    markers: false,
                }
            })

            tl.from(title, {
                duration: 0.5,
                y: -10,
                opacity: 0,
                zIndex: 1,
                ease: 'power4',
            }, 'start')


        }
    },
    mounted() {
        this.getProperties()
        this.animate()
    }

}
</script>
<style>
.mainpage-section {
    max-width: calc(1100px + 1rem);
    margin: 70px auto;
    padding: var(--padding);
}

.properties-grid {
    margin: 20px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;
}

.look-more {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    background-color: var(--primary-color);
    border-radius: var(--br);
    height: 100%;
    width: 100%;
    cursor: pointer;
    background-color: rgb(244, 244, 244);
    border-radius: var(--br);
    height: 100%;
    min-height: 280px;
    transition: all .3s ease;
}

.look-more:hover {
    background-color: rgb(230, 230, 230);
    scale: 0.99;
}

@media screen and (max-width: 1024px) {
    .properties-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media screen and (max-width: 840px) {
    .properties-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (max-width: 540px) {
    .properties-grid {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>
