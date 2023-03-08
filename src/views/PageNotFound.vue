<template>
    <div class="main">
        <img :src="notFound"
         alt="Registered">
        <h2>404</h2>
        <h3>Page not found</h3>
        <p>
            We couldn't find page you are looking for.
            The link is incorrect or might be expired. Please, check the link.
        </p>
        <router-link to="/">
            <MainButton class="marg-top"
             text="Go to home"
             :widthRestrict="true" />
        </router-link>
    </div>
</template>
<script>
import notFound from '@/assets/img/notFound.svg'
import MainButton from '@/components/MainButton.vue';


export default {
    name: "PageNotFound",
    data() {
        return {
            notFound,
            displayHeight: window.visualViewport.height + 'px',
        };
    },
    components: { MainButton }
}
</script>
<style scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    height: calc(v-bind(displayHeight) - 90px);
    min-height: 500px;
    padding: 20px;
}

a {
    width: 100%;
    display: flex;
    justify-content: center;
}

p {
    max-width: 450px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
}

img {
    width: 100%;
    max-width: 300px;
}

@media screen and (max-width: 420px) {

    img {
        max-width: 300px;
    }

}
</style>
