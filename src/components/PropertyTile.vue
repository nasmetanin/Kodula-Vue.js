<template>
    <div @click="toProperty"
     class="property-tile">
        <div :style="{ backgroundImage: 'url(' + property.photo + ')' }"
         class="property-tile-img"></div>
        <div class="property-tile-info">
            <div class="tile-info-line">
                <h5>{{ etPropType(property.types_of_objects) }}</h5>
                <h5>€{{ property.price }}<span v-if="property.rent">/{{ $t('home.month') }}</span></h5>
            </div>
            <div class="tile-info-line">
                <p class="tile-text">{{ property.address }}</p>
            </div>
            <div v-if="property.area || property.rooms || property.floor"
             class="tile-info-line">
                <p v-if="property.area"
                 class="tile-text fat-text">{{ property.area }}m²</p>
                <p v-if="property.rooms"
                 class="tile-text fat-text">{{ property.rooms }}
                    {{ property.rooms > 1 ? $t('home.rooms') : $t('home.room') }}
                </p>
                <p v-if="property.floor"
                 class="tile-text fat-text">{{ property.floor }} {{ $t('home.floor') }}</p>
            </div>
            <p class="small-text"
             v-else>{{ $t('home.noinfo') }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PropertyTile',
    props: {
        property: {
            type: Object,
            required: true
        }
    },
    data() {
        return {

        }
    },
    methods: {
        toProperty() {
            this.$router.push({
                name: 'property',
                params: {
                    id: this.property.id
                }
            })
        },
        etPropType(type) {
            if (this.$i18n.locale === 'et') {
                switch (type) {
                    case 'Flat':
                        return this.$t('home.flat')
                    case 'Business space':
                        return this.$t('home.business')
                    case 'Land':
                        return this.$t('home.land')
                    case 'House':
                        return this.$t('home.house')

                    default:
                        return 'Unknown'
                }
            } else {
                return type
            }
        }
    },
    mounted() {

    }

}
</script>
<style>
.property-tile-img {
    height: 66%;
    background-size: cover;
    background-position: center;
    border-top-left-radius: var(--br);
    border-top-right-radius: var(--br);
}

.small-text {
    width: 100%;
    font-size: 12px;
    text-align: center;
}

.tile-info-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.property-tile-info {
    padding: 10px 15px;
    height: 34%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.tile-text {
    font-size: 14px;
    color: var(--text-color);
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    word-wrap: break-word;
    max-width: 230px;
    white-space: nowrap;
}

.property-tile {
    background-color: #ffffff;
    cursor: pointer;
    height: 290px;
    border-radius: var(--br);
    box-shadow: 0px 0px 35px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.property-tile:hover {
    scale: 0.99;
    box-shadow: 0px 0px 35px 0 rgba(0, 0, 0, 0.2);
}
</style>
