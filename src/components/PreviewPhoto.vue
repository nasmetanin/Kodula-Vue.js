<template>
    <div class="preview-wrap">
        <transition name="side">
            <div v-if="index > 0"
             class="prw-slider-btn grid-first">
                <button @click="
                                    backward($event)"
                 class="reset-styles">
                    <img class="back-btn"
                     :src="arrow"
                     alt="back">
                </button>
            </div>
        </transition>

        <picture ref="container"
         @touchstart="started($event)"
         @touchmove="moved($event)"
         @touchend="ended($event)"
         class="photo-wrap">
            <transition name="side">
                <img v-show="isLoadedImg"
                 class="preview-photo"
                 @load="imageLoadHandler()"
                 :src="photos[index]"
                 :key="index"
                 alt="preview">
            </transition>
            <LoaderView v-if="!isLoadedImg"
             color="#fff" />
        </picture>

        <transition name="side">
            <div v-if="index < photos.length - 1"
             class="prw-slider-btn grid-last">
                <button @click="forward($event)"
                 class="reset-styles">
                    <img class="forward-btn"
                     :src="arrow"
                     alt="forward">
                </button>
            </div>
        </transition>
        <span class="photo-index">{{ index + 1 }} / {{ photos.length }}</span>

        <img @click="$emit('close')"
         class="close-slider"
         :src="close"
         alt="close">
    </div>
</template>
<script>
import arrow from '../assets/img/arrow.svg'
import LoaderView from './LoaderView.vue';
import close from '../assets/img/close.svg'


export default {
    nam: 'PreviewPhoto',
    props: {
        photos: {
            type: Array,
            required: true,

        },
    },
    components: {
        LoaderView

    },
    data() {
        return {
            close,
            isLoadedImg: false,
            arrow,
            index: 0,
            initialDistance: null,
            initialScale: null,
            lastX: null,
            lastXHorizontal: null,
            fingerLocationX: null,
            lastY: null,

        }
    },
    methods: {
        handleResize() {
            // set proper height for the image
            const vh = window.visualViewport.height;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        },
        imageLoadHandler() {
            this.isLoadedImg = true;
        },
        started(e) {
            const container = this.$refs.container;
            if (e.touches.length === 2) {
                e.preventDefault();
                this.initialDistance = Math.hypot(
                    e.touches[1].clientX - e.touches[0].clientX,
                    e.touches[1].clientY - e.touches[0].clientY
                );
                this.initialScale = parseFloat(
                    window.getComputedStyle(container).getPropertyValue("transform").split("(")[1].split(")")[0]
                );
            }
        },
        moved(e) {

            const container = this.$refs.container;

            if (e.touches.length === 2) {
                e.preventDefault();
                const currentDistance = Math.hypot(
                    e.touches[1].clientX - e.touches[0].clientX,
                    e.touches[1].clientY - e.touches[0].clientY
                );
                const scale = (currentDistance / this.initialDistance);

                // pinch to zoom in and out the image to the point where the fingers are
                if (this.lastX === null) {
                    this.lastX = e.touches[0].clientX;
                }
                const x = e.touches[0].clientX - this.lastX;
                const y = e.touches[0].clientY / e.touches[1].clientY

                container.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            } else if (e.touches.length === 1) {
                // move from the point where the finger is
                if (this.lastXHorizontal === null) {
                    this.lastXHorizontal = e.touches[0].clientX;
                }
                this.fingerLocationX = e.touches[0].clientX - this.lastXHorizontal;

                container.style.transform = `translate(${this.fingerLocationX}px, 0)`;
            }
        },
        ended(e) {
            e.preventDefault();
            console.log(this.lastXHorizontal);
            switch (true) {

                case this.fingerLocationX > 80:
                    this.backward()
                    break;
                case this.fingerLocationX < -80:
                    this.forward()
                    break;

            }
            this.reset();
        },
        forward() {
            if (this.index < this.photos.length - 1) {
                this.isLoadedImg = false;
                // if width is less 600px, none the index
                this.index += 1;
                this.lastXHorizontal = null;
                this.fingerLocationX = null;
            }
        },
        backward() {
            if (this.index > 0 && this.photos.length > 1) {
                this.isLoadedImg = false;
                this.index -= 1;
                this.lastXHorizontal = null;
                this.fingerLocationX = null;
            }
        },
        reset() {
            const container = this.$refs.container;
            this.lastX = null;
            this.lastXHorizontal = null;
            this.fingerLocationX = null;
            container.style.transform = `translate(0, 0) scale(1)`;
        },
        manageScroll(status) {
            if (status) {
                document.body.classList.add('no-scroll')
            } else {
                document.body.classList.remove('no-scroll')
            }
        }


    },
    mounted() {
        this.manageScroll(true);
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
        this.manageScroll(false);
    }
}
</script>
<style >
.preview-wrap .dot-wave-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.preview-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    object-fit: contain;
    background-color: rgba(0, 0, 0, 0.8);
    /* add blur filter */
    backdrop-filter: blur(10px);
    z-index: 100;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 10px;
    place-items: center;
}

.photo-index {
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    user-select: none;
}

.prw-slider-btn {
    cursor: pointer;
    user-select: none;
}

.grid-first {
    grid-area: 1 / 1 / 2 / 2;
}

.grid-last {
    grid-area: 1 / 6 / 2 / 7;
}

.photo-wrap {
    transition: all 0.1s ease;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-width: 1200px;
    grid-area: 1 / 2 / 2 / 6;
}

.preview-photo {
    width: 100%;
    max-width: 1200px;
    height: 100%;
    min-height: calc(var(--vh) - 40px);
    max-height: var(--vh);
    object-fit: contain;
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


@media screen and (max-width: 600px) {
    .prw-slider-btn {
        display: none;
    }

    .photo-wrap {
        grid-area: 1 / 1 / 2 / 7;
    }
}
</style>
