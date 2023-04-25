<template lang="">
    <transition name="side"
     mode="out-in">
        <LoaderView v-if="!loaded" />
        <div v-else class="property-view">
            <transition name="side"
                mode="out-in">

                <section class="property-intro-wrap">
                    <div @click="sliderHandler" :style="{ background: 'linear-gradient(rgba(245, 246, 252, 0) 64.71%, rgba(97, 102, 102, 0.16) 86.55%, rgba(0, 0, 0, 0.33)), url(' + property.mainphoto + ')' }" class="property-intro">

                        <h1 class="property-title">{{ property.title }}</h1>
                        <div class="property-intro-info">
                            <img :src="eye" class="property-icon" alt="eye"> <span>{{ property.views}}</span> ● <span>{{ property.updated_at}}</span>
                        </div>
                        <div v-if="this.property.photos" class="underline-btn">
                            <img :src="photo" class="property-icon" alt="photos"> {{ this.property.photos.length }}
                        </div>

                    </div>

                    <button @click="this.$router.go(-1)" class="exit-btn-wrap">
                        <img class="exit-btn"
                            :src="arrow"
                            alt="back">
                    </button>
                </section>

            </transition>

            <Transition name="side"
                    mode="out-in">
                <PreviewPhoto v-if="showSlider"
                    :photos="this.property.photos"
                    @close="this.showSlider = false" />
            </Transition>
            <div class="property-manage">
                <div>
                    <h4>{{ property.address }}</h4>
                    <h5 class="gray-text">€{{ property.price }}{{ property.rent ? "/" + $t('home.month') : "" }}</h5>
                </div>
                <MainButton @click="openModal" :text="$t('contact')" />
            </div>
            <Transition name="side"
                    mode="out-in">
                <ModalWindow @close="closeModal" v-if="modal" />
            </Transition>
            <div class="property-data">
                <div class="properties">
                    <div v-if="property.types_of_objects" class="properties-prop">
                        <img class="prop-icon" :src="houseFill" alt="">
                        {{ etPropType(property.types_of_objects) }}
                    </div>
                    <div v-if="property.area" class="properties-prop">
                        <img class="prop-icon" :src="area" alt="">
                        {{ property.area}}m²
                    </div>
                    <div v-if="property.rooms" class="properties-prop">
                        <img class="prop-icon" :src="door" alt="">
                        {{ property.rooms}} {{ $t('home.rooms') }}
                    </div>
                    <div v-if="property.floor" class="properties-prop">
                        <img class="prop-icon" :src="floor" alt="">
                        {{ property.floor}} {{ $t('home.floor') }}
                    </div>
                    <div v-if="property.balconies" class="properties-prop">
                        <img class="prop-icon" :src="balcony" alt="">
                        {{ property.balconies}}
                    </div>
                    <div v-if="property.utilities" class="properties-prop">
                        <img class="prop-icon" :src="utilities" alt="">
                        {{ property.utilities}}
                    </div>
                    <div v-if="property.building_type" class="properties-prop">
                        <img class="prop-icon" :src="materials" alt="">
                        {{ property.building_type}}
                    </div>
                    <div v-if="property.parking" class="properties-prop">
                        <img class="prop-icon" :src="parking" alt="">
                        {{ $t('home.yes') }}
                    </div>
                    <div v-if="property.elevator" class="properties-prop">
                        <img class="prop-icon" :src="elevator" alt="">
                        {{ $t('home.yes') }}
                    </div>
                    <div v-if="property.condition" class="properties-prop">
                        <img class="prop-icon" :src="condition" alt="">
                        {{ property.condition}}
                    </div>

                </div>
                <div class="property-description">
                    <div class="property-description-text" v-html="contentData()"></div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
import eye from '../assets/img/eye.svg'
import LoaderView from '../components/LoaderView.vue'
import PreviewPhoto from '@/components/PreviewPhoto.vue'
import houseFill from '../assets/img/house-fill.svg'
import area from '../assets/img/area.svg'
import door from '../assets/img/door.svg'
import floor from '../assets/img/floor.svg'
import parking from '../assets/img/parking.svg'
import materials from '../assets/img/materials.svg'
import utilities from '../assets/img/utilities.svg'
import balcony from '../assets/img/balcony.svg'
import condition from '../assets/img/condition.svg'
import elevator from '../assets/img/elevator.svg'
import arrow from '../assets/img/arrow.svg'
import photo from '../assets/img/photo.svg'
import MainButton from '../components/MainButton.vue'
import ModalWindow from '@/components/ModalWindow.vue'


export default {
    name: 'PropertyView',
    data() {
        return {
            property: {},
            showSlider: false,
            loaded: false,
            vh: window.visualViewport.height + "px",
            eye,
            houseFill,
            modal: false,
            area,
            arrow,
            door,
            photo,
            floor,
            parking,
            materials,
            utilities,
            balcony,
            condition,
            elevator
        }
    },
    components: {
        LoaderView,
        PreviewPhoto,
        MainButton,
        ModalWindow
    },
    inject: ['baseURL'],
    methods: {
        contentData() {
            console.log(this.property.contenteng.body)
            if (this.$i18n.locale == 'et') {
                return this.property.content.body
            } else {
                if (this.property.contenteng.body == "") {
                    return this.property.content.body
                }
                return this.property.contenteng.body
            }
        },
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
        },
        sliderHandler() {
            if (!this.property.photos) return
            this.showSlider = true
        },
        fetchData() {
            fetch(this.baseURL + '/api/property/' + this.$route.params.id)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    this.property = data
                    this.loaded = true
                    console.log(this.property)
                })
                .catch(err => {
                    console.log(err)
                    this.$router.push({
                        name: 'not-found'
                    })
                })
        }
    },
    mounted() {
        this.fetchData()
    },

}
</script>
<style>
.property-intro-wrap {
    position: relative;
}

.property-manage {
    display: flex;
    flex-direction: row !important;
    align-items: center;
    justify-content: space-between;
    background-color: #f1f1f174;
    padding: 1.5rem;
    border-radius: var(--br);
}

.underline-btn {
    all: unset;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 5px;
}

.exit-btn-wrap {
    position: absolute;
    top: 20px;
    left: 20px;
    border: none;
    background-color: transparent;
}

.exit-btn {
    width: 30px;
    height: 30px;
    cursor: pointer;
    transform: rotate(180deg);
}

.reset-styles {
    all: unset;
}

.properties {
    background-color: #f1f1f174;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1.5rem;
    padding: 1.5rem;
    border-radius: var(--br);
}

.properties-prop {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
}

.about-text,
.property-description {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.about-text,
.property-description-text {
    font-size: 17px;
    color: #333333;
    line-height: 1.5;
    margin-bottom: 25px;
}

.prop-icon {
    height: 18px;
}

.underline-btn:hover {
    color: #cccccc;
}

.underline-btn:active {
    color: #ffffff;
    scale: 0.98;
}

.about,
.property-view {
    width: 100%;
    max-width: calc(1200px + 1rem);
    padding: 0 1rem;
    margin: 0 auto;
}

.property-intro {
    height: calc(v-bind(vh) * 0.70);
    min-height: 450px;
    border-radius: 35px;
    background-size: cover !important;
    background-position: center center !important;
    background-repeat: no-repeat;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 3rem;
    cursor: pointer;
    box-shadow: 0px 0px 35px 0 rgba(0, 0, 0, 0.1);
}

.about,
.property-manage,
.property-data {
    max-width: calc(720px + 1rem);
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.property-intro-info {
    display: flex;
    align-items: center;
    gap: 5px;
    color: white;
    font-weight: 600;
    font-size: 16px;
}

.property-icon {
    width: 20px;
}

.property-title {
    color: white;
    text-align: center;
    font-size: 35px;
}

@media screen and (max-width: 450px) {
    .property-title {
        font-size: 25px;
    }

    .property-intro {
        border-radius: var(--br);
    }

    .property-view {

        padding: 0 10px;
    }

    .property-manage {
        flex-direction: column !important;
        gap: 1rem;
        padding: 15px;
        align-items: flex-start;
    }

    .property-description {
        padding: 0 10px;
    }

    .properties {
        grid-template-columns: repeat(2, 1fr);
    }

}
</style>
