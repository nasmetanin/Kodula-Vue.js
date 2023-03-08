<template lang="">
    <section ref="trigger"
     class="mainpage-section">
        <div ref="title"
         class="section-title">
            <h4 class="small-section-title">{{ $t('home.properties') }}</h4>
            <h1>{{ $t('home.alloffers') }}</h1>
        </div>
        <transition name="side" mode="out-in">
            <div v-if="loaded" ref="trigger"
            class="properties-grid">
                <div ref="property"
                v-for="n in properties"
                :key="n"
                class="animate-tile">
                <PropertyTile :property="n" />
                </div>
            </div>
            <LoaderView v-else />
        </transition>

    </section>
</template>
<script>
import PropertyTile from '@/components/PropertyTile.vue'
import LoaderView from '@/components/LoaderView.vue'

export default {
    name: 'AllProperties',
    components: {
        PropertyTile,
        LoaderView
    },
    data() {
        return {
            properties: [],
            loaded: false,
        }
    },
    inject: ['baseURL'],
    methods: {
        getProperties() {
            fetch(this.baseURL + '/api/all_properties')
                .then(res => res.json())
                .then(data => {
                    this.properties = data
                    this.loaded = true
                })
        },
    },

    mounted() {
        this.getProperties()
    }
}
</script>
<style lang="">

</style>
