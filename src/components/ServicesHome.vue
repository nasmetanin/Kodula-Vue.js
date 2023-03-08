<template lang="">
    <div ref="start" class="mainpage-section sect-margin">
        <div ref="title"
         class="section-title">
            <h4 class="small-section-title">{{ $t('home.services') }}</h4>
            <h1>{{ $t('home.offer') }}</h1>
            <MainButton @click="openModal" style="margin: 15px auto;" :text="this.$t('contact')" :widthRestriction="true" />
        </div>
        <div ref="services" class="services-grid">
                <ServiceTile v-for="service in services"
             :key="service.id" :service="service"/>
        </div>
        <transition name="side">
            <ModalWindow v-if="modal" @close="closeModal" />
        </transition>
    </div>
</template>
<script>
import ServiceTile from './ServiceTile.vue'
import broker from '@/assets/img/broker.svg'
import message from '@/assets/img/message.svg'
import staging from '@/assets/img/staging.svg'
import gsap from 'gsap'
import MainButton from '@/components/MainButton.vue'
import ModalWindow from '@/components/ModalWindow.vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
    name: 'ServicesHome',
    props: {

    },
    inject: ['baseURL'],
    components: {
        ServiceTile,
        MainButton,
        ModalWindow
    },
    data() {
        return {
            modal: false,
            services: [
                {
                    id: 1,
                    title: this.$t('home.brokerage'),
                    text: this.$t('home.brokerText'),
                    icon: broker,
                    button: "Order brokerage"
                },
                {
                    id: 2,
                    title: this.$t('home.consult'),
                    text: this.$t('home.consultText'),
                    icon: message,
                    button: "Order consulting"
                },
                {
                    id: 3,
                    title: this.$t('home.staging'),
                    text: this.$t('home.stagingText'),
                    icon: staging,
                    button: "Order staging"
                },
            ]
        }
    },
    methods: {
        openModal() {
            this.modal = true
            this.manageScroll(this.modal)
        },
        closeModal() {
            this.modal = false
            this.manageScroll(this.modal)
        },
        manageScroll(status) {
            if (status) {
                document.body.classList.add('no-scroll')
            } else {
                document.body.classList.remove('no-scroll')
            }
        },
        animate() {
            const services = this.$refs.services
            const title = this.$refs.title
            const start = this.$refs.start

            var tl = gsap.timeline({
                scrollTrigger: {
                    trigger: start,
                    start: 'top 90%',
                    end: 'bottom 90%',
                    toggleActions: 'play none none reverse',
                    markers: false,
                },
            })

            tl.fromTo(title, {
                y: 30,
                opacity: 0,
                ease: 'linear'
            }, {
                y: 0,
                opacity: 1,
                duration: 0.3
            })
            tl.from(services, {
                y: 30,
                opacity: 0,
                ease: 'linear',
                duration: 0.3
            })
        }
    },
    mounted() {
        this.animate()
    },
}
</script>
<style>
.services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    margin: 20px 0;
}

.sect-margin {
    margin-top: 70px;
}

@media (max-width: 900px) {
    .services-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}


@media (max-width: 600px) {
    .services-grid {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>
