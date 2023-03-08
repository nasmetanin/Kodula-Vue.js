<template>
    <section class="intro">
        <div ref="picCard"
         class="intro-inner-wrap"
         :style="{ backgroundImage: 'url(' + intro + ')' }">
            <div class="intro-inner">
                <h1 class="intro-text"
                 ref="text">
                    {{ $t('home.intro') }}
                </h1>

                <div ref="search"
                 class="intro-search">
                    <IntroSearch />
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import intro from '@/assets/img/intro.jpg'
import logoWhite from '@/assets/img/logo_white.png'
import IntroSearch from './IntroSearch.vue'

import gsap from 'gsap'

export default {
    name: 'HomeIntro',
    components: {
        IntroSearch
    },
    data() {
        return {
            intro,
            logoWhite,
            vh: window.visualViewport.height + "px",
        }
    },
    methods: {
        animateIntro() {
            const picCard = this.$refs.picCard
            const text = this.$refs.text
            const search = this.$refs.search
            var tl = gsap.timeline()
            tl.from(picCard, {
                duration: 1.5,
                scale: 0.95,
                opacity: 0,
                ease: 'power4.out',
            })
                .from(text, {
                    duration: 0.5,
                    y: 15,
                    opacity: 0,
                    ease: 'power4.out',
                }, '-=1')
                .from(search, {
                    duration: 0.9,
                    scale: 0,
                    opacity: 0,
                    ease: 'power4.out',
                }, '-=0.5')
        }
    },
    mounted() {
        this.animateIntro()
    }
}

</script>
<style>
.intro {
    padding: 0rem 3rem 2rem 3rem;
    color: #fff;
    height: calc(v-bind(vh) * 0.80);
    min-height: 550px;
    max-width: calc(1200px + 1rem);
    display: block;
    margin: 0 auto;
    gap: 15px;

}

.intro-search {
    position: relative;
    bottom: -100px;
    width: 100%;
    height: 200px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}


.intro-text {
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
    line-height: 1.1;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    text-shadow: 0 0 35px rgba(0, 0, 0, 0.83);
}

.intro-inner-wrap {
    border-radius: 35px;
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 35px 0 rgba(0, 0, 0, 0.1);

}

.logo-intro {
    max-width: 370px;
    width: 100%;
}

.intro-inner {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 5rem 0 0 0;
    gap: 15px;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

}

@media screen and (max-width: 768px) {
    .intro {
        padding: 0rem 0.5rem 2rem 0.5rem;
    }

    .intro-inner-wrap {
        border-radius: 20px;
    }

}

@media screen and (max-width: 480px) {
    .intro-search {
        height: 239px !important;
        bottom: -119.5px;
        padding: 20px 0;
    }

    .intro-text {
        font-size: 2rem;
    }
}
</style>
