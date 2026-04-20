<template>
    <div :id="id"
     class="input-list">
        <div :id="id"
         @click="toggle"
         class="select">
            <p :id="id"
             class="label">
                {{ selected }}
            </p>
            <Transition name="side">
                <div v-if="show"
                 class="options">
                    <ul v-if="mode == 'text'">
                        <li v-for="option in options"
                         :key="option.id"
                         @click="select(option)">
                            {{ option.name }}
                        </li>
                    </ul>
                    <ul v-else-if="mode == 'json'">
                        <li v-for="option in options"
                         :key="option.id"
                         @click="selectJson(option)">
                            {{ option.name }}
                        </li>
                    </ul>
                </div>
            </Transition>
        </div>
    </div>
</template>
<script>
export default {
    name: "SelectTag",
    props: {
        options: {
            type: Array,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        mode: {
            type: String,
            default: 'text'
        }
    },
    data() {
        return {
            selected: this.label,
            show: false,
            br: "10px",
            id: Math.random().toString(36).substr(2, 9)
        }
    },
    mounted() {
        // if clicked outside of the select tag, close the options
        document.addEventListener("click", (e) => {
            if (e.target.id !== this.id) {
                if (this.show) {
                    this.toggle()
                }
            }
        });
    },
    methods: {
        toggle() {
            this.show = !this.show
            this.br = this.show ? "0px" : "10px"
        },
        selectJson(value) {
            this.selected = value.name
            this.$emit("select", value.id)
        },
        select(value) {
            this.selected = value.name
            this.$emit("select", value)
        }
    }
}
</script>
<style scoped>
.label {
    font-size: 13.333px;
    user-select: none;
    color: #000;
    font-weight: 500;
    width: 100%;
    height: 100%;
}

.input-list {
    width: 100%;
}

.disabled {
    color: var(--disabled);
}

.select::after {
    position: absolute;
    content: "";
    top: 12px;
    right: 1em;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-color: #000 transparent transparent transparent;
}

.options {
    position: absolute;
    color: #000;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 170px;
    overflow-y: auto;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    left: 0;
    z-index: 50;
    width: 100%;
    top: 27px;
    background-color: rgb(247, 247, 247);
}

ul {
    list-style: none;
    display: flex;
    flex-direction: column;
}

ul li {
    padding: 6px 15px;
    transition: all 0.2s ease-in-out;
    font-size: 13.333px;
    font-weight: 500;
}

.select {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: var(--gray);
    border: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: v-bind("br");
    border-bottom-right-radius: v-bind("br");
    padding: 6px 15px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}

.select:hover,
ul li:hover {
    background-color: var(--gray);
}
</style>
