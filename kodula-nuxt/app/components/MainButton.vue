<template>
    <button>
        {{ text }}
    </button>
</template>
<script>
export default {
    name: 'MainButton',
    props: {
        text: {
            type: String,
            required: true
        },
        widthRestriction: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            maxWidth: '100%',
            margin: '0 auto'
        }
    },
    methods: {
        restrictSize() {
            if (!this.widthRestriction) return this.maxWidth = '100%'
            this.maxWidth = 'fit-content';
            this.margin = '0';
        }
    },
    mounted() {
        this.restrictSize();
    }
}
</script>
<style scoped>
button {
    background: var(--theme);
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-family: var(--font);
    font-weight: 700;
    cursor: pointer;
    transition: all .2s ease;
    width: v-bind(maxWidth);
    margin: v-bind(margin);
    display: block;
}

@media screen and (max-width: 450px) {
    button {
        width: 100%;
    }
}

button:hover {
    background: var(--theme-lighter);
    scale: 0.98;
}

button:focus {
    outline: none;
}

button:active {
    scale: 0.95;
    background: var(--theme);
}
</style>
