<template>
    <div class="photo-slider">
        <transition :name="transitionName"
         mode="out-in">
            <div :key="index"
             @click="openPreview()"
             class="photo-photo"
             :style="{ background: ' url(' + photos[index] + ')' }"></div>
        </transition>
        <div class="slider-controls">
            <div v-if="index > 0"
             class="slider-back">
                <button @click="back($event)"
                 class="reset-styles">
                    <img class="back-btn"
                     :src="arrow"
                     alt="back">
                </button>
            </div>

            <div v-if="index < photos.length - 1"
             class="slider-forward">
                <button @click="next($event)"
                 class="reset-styles">
                    <img class="forward-btn"
                     :src="arrow"
                     alt="forward">
                </button>
            </div>
        </div>

        <img @click="$emit('close')"
         class="close-slider"
         :src="close"
         alt="close">

        <PreviewPhoto v-if="preview"
         :photos="photos"
         :openedIndex="index"
         @close="this.preview = false" />
    </div>
</template>

<script>
import PreviewPhoto from './PreviewPhoto.vue'
import arrow from '../assets/img/arrow.svg'
import close from '../assets/img/close.svg'
import chevron from '../assets/img/chevron.svg'



export default {
    name: 'PhotoSlider',
    data() {
        return {
            vh: window.visualViewport.height + "px",
            index: 0,
            arrow,
            close,
            chevron,
            preview: false,
            cardPosition: 0,
            cardPositionY: 0,
            justify: 'flex-end',
            transitionName: 'slideLeft'
        }
    },
    components: {
        PreviewPhoto
    },
    props: {
        photos: {
            type: Array,
            required: true
        }
    },
    methods: {

        next(e) {
            e.preventDefault();
            if (this.index < this.photos.length - 1) {
                this.transitionName = 'side'
                this.index += 1
                return
            }
        },
        back(e) {
            e.preventDefault();

            if (this.index > 0) {
                this.transitionName = 'slideRight'
                this.transitionName = 'side'
                this.index -= 1
                return
            }
        },
        openPreview() {
            // open preview if not pressed on controls

            if (this.index > 0 || this.index < this.photos.length - 1) {
                this.preview = true
                return
            }
        }


    },
    mounted() {

    },
}
</script>
<style>
.photo-slider {
    height: calc(v-bind(vh) * 0.80);
    min-height: 450px;
    border-radius: 35px;
    background-size: cover !important;
    background-position: center center !important;
    background-repeat: no-repeat;
    width: 100%;
    display: flex;
    justify-content: v-bind(justify);
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 3rem;
    position: relative;
    box-shadow: 0px 0px 35px 0 rgba(0, 0, 0, 0.1);
    transition: all .2s cubic-bezier(0.39, 0.575, 0.565, 1);
}

.photo-photo {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    background-size: cover !important;
    background-position: center center !important;
    background-repeat: no-repeat;
    border-radius: 35px;
    transition: all .2s cubic-bezier(0.39, 0.575, 0.565, 1);
    z-index: 1;
}

.slider-instructions {
    font-weight: 500;
    color: #fff;
}

.slider-back,
.slider-forward {
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.back-btn {
    transform: rotate(180deg);
}

.forward-btn {
    transform: rotate(0deg);
}

.back-btn,
.forward-btn {
    width: 30px;
    height: 30px;
}

.close-slider {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    width: 30px;
    height: 30px;
    z-index: 5;
}


.slider-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 5;
}
</style>
