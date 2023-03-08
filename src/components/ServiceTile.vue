<template lang="">
    <div ref="tile"  class="service-tile">
        <div class="service-tile-info">
            <img class="service-icon" :src="service.icon" alt="Brokerage">
            <h3 class="service-tile-title">{{ service.title }}</h3>
            <p class='service-tile-text'>{{ service.text }}</p>
        </div>

    </div>
</template>
<script>

export default {
    name: 'ServiceTile',
    props: {
        service: {
            type: Object,
            required: true

        }
    },
    data() {
        return {

        }
    },
    components: {
    },
    methods: {

    },

}
</script>
<style>
.service-tile {
    width: 100%;
    background-color: #f4f4f8;
    border-radius: var(--br);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
    position: relative;
    transition: all 0.3s ease;
    z-index: 2;
}

.service-tile-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
}

.service-icon {

    height: 50px;
}

.service-tile-title {
    font-size: 1.2rem;
    font-weight: 600;
}

.service-tile-text {
    font-size: 15px;
    line-height: 24px;
}
</style>
