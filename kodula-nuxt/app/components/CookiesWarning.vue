<template>
    <div class="cookie-warning">
        <img class="cookie-cookie"
         :src="cookies"
         alt="cookies">
        <h4>Kasutame küpsiseid</h4>
        <p class="cookie-text">
            Kodula kasutab küpsiseid korralikuks tööks ja teie parimaks kasutuskogemuseks. Saate vaadata meie
            privaatsuspoliitikat, et mõista, kuidas me küpsiseid kasutame ja teavet kogume. Veebisaidi kasutamist jätkates
            nõustute nende failide kasutamisega
        </p>
        <MainButton text="Close"
         @click="closeCookie()"
         :widthRestriction="false" />
    </div>
</template>

<script>
import cookies from '../assets/img/cookies.svg';
import MainButton from './MainButton.vue';

export default {
    components: {
        MainButton,
    },
    data() {
        return {
            cookies,
        }
    },
    methods: {
        closeCookie() {
            this.cookie = false;
            // save to cookies that user has seen the cookie warning with time limit of 2 days
            this.$cookies.set('cookie', 'seen', '2d');
            this.$emit('close');
        },
    }

}
</script>

<style>
.cookie-warning {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    border-radius: var(--br);
    background-color: white;
    z-index: 100;
    padding: 1rem;
    max-width: 350px;
    display: flex !important;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.cookie-text {
    font-size: 12px;
    text-align: center;
    font-weight: 400;
    line-height: 18px;
}

.cookie-text a {
    color: var(--theme);
    font-weight: 500;
}

.cookie-cookie {
    width: 35px;
    height: 35px;
}

@media screen and (max-width: 520px) {
    .cookie-warning {
        bottom: 0.5rem;
        right: 0.5rem;
        left: 0.5rem;
        max-width: unset;
    }
}
</style>
