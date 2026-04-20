<template>
    <div>
        <viewer :images="this.images">

        </viewer>
    </div>
</template>
<script>

export default {
    name: 'PreviewPhoto',
    props: {
        images: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {

        }
    },
    methods: {
        close() {
            this.$viewerApi('hide')
        }
    },
    mounted() {
        this.$viewerApi({
            images: this.images,
            options: {
                hidden: () => {
                    this.$emit('close')
                }
            }
        })
    }

}
</script>
<style>
.viewer-close {
    border-radius: 0 !important;
}

.viewer-button {
    width: 40px !important;
    height: 40px !important;
    top: 0 !important;
    right: 0 !important;
}

.viewer-button::before {
    left: 10px !important;
    bottom: 10px !important;
}
</style>
