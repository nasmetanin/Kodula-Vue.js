<template>
    <div ref="trigger"
     class="properties-grid">
        <div ref="property"
         v-for="n in properties"
         :key="n"
         class="animate-tile">
            <PropertyTile :property="n" />
        </div>
        <div @click="$router.push('properties')"
         ref="lookAll"
         class="look-more">
            <img :src="house"
             alt="look more image">
            <h4>{{ $t('home.lookmore') }}</h4>
        </div>
    </div>
</template>
<script>
import PropertyTile from './PropertyTile.vue'
import house from '@/assets/img/house.svg'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)


export default {
    name: 'HomePropGrid',
    props: {
        properties: {
            type: Array,
            required: true
        }
    },
    components: {
        PropertyTile
    },
    data() {
        return {
            house,
        }
    },
    methods: {
        animate() {
            const property = [this.$refs.property, this.$refs.lookAll]
            const trigger = this.$refs.trigger

            var tl = gsap.timeline({
                scrollTrigger: {
                    trigger: trigger,
                    start: 'top 80%',
                    end: 'bottom 80%',
                    toggleActions: 'play none none none',
                    markers: false,
                }
            })

            tl.fromTo(property, {
                opacity: 0,
                x: -20,
                scale: 0.97,
                ease: 'linear',
            }, {
                duration: 0.5,
                scale: 1,
                x: 0,
                opacity: 1,
                stagger: 0.1,
            })
        },
    },
    mounted() {
        this.animate()
    }


}
</script>
<style lang="">

</style>
