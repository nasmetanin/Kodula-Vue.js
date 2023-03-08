<template>
    <section class="mainpage-section">
        <div ref="title"
         class="section-title">
            <h4 class="small-section-title">{{ $t('search.properties') }}</h4>
            <h1>{{ $t('search.search') }}</h1>
        </div>
        <div class="search-search-panel">
            <div ref="topBar"
             class="top-search-bar"
             style="top: -29px; left: 0; max-width: inherit;">
                <button ref="rent"
                 class="search-tab tab-selected"
                 @click="selectTab(this.$refs.rent, true)">{{ $t('search.rent') }}</button>
                <button ref="buy"
                 class="search-tab"
                 @click="selectTab(this.$refs.buy, false)">{{ $t('search.buy') }}</button>
            </div>
            <div class="search-inner">
                <div class="search-column">
                    <h4>{{ $t('search.type') }}</h4>
                    <SelectList :label="$t('search.select')"
                     :options="[{ id: 1, name: 'All' }, { id: 2, name: $t('search.flat') }, { id: 3, name: $t('search.land') }, { id: 4, name: $t('search.house') }, { id: 5, name: $t('search.commercial') }]"
                     @select="result => search.type = result.id" />
                </div>
                <div class="search-column">
                    <h4>{{ $t('search.rooms') }}</h4>
                    <input v-model="search.rooms"
                     type="number"
                     :placeholder="$t('search.enter')"
                     class="search-input">
                </div>
                <div class="search-column">
                    <h4>{{ $t('search.area') }}</h4>
                    <div class="flex">
                        <input v-model="search.area.from"
                         type="number"
                         :placeholder="$t('search.from')"
                         class="search-input">
                        <input v-model="search.area.to"
                         type="number"
                         :placeholder="$t('search.to')"
                         class="search-input">
                    </div>
                </div>
                <div class="search-column">
                    <h4>{{ $t('search.price') }}</h4>
                    <div class="flex">
                        <input v-model="search.price.from"
                         type="number"
                         :placeholder="$t('search.from')"
                         class="search-input">
                        <input v-model="search.price.to"
                         type="number"
                         :placeholder="$t('search.to')"
                         class="search-input">
                    </div>
                </div>
            </div>
            <div class="bottom-search-bar">
                <button @click="fetchData"
                 class="search-btn">{{ $t('search.search') }}</button>
            </div>
        </div>
        <transition name="side"
         mode="out-in">
            <div v-if="properties.length > 0">
                <transition name="side"
                 mode="out-in">
                    <div v-if="loaded"
                     :key="properties.length"
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
            </div>
            <div v-else>
                <div class="main">
                    <img :src="notFound"
                     alt="Registered">
                    <h2>{{ $t('search.nothingHere') }}</h2>
                    <p>
                        {{ $t('search.nothingText') }}
                    </p>

                </div>
            </div>
        </transition>

    </section>
</template>
<script>
import SelectList from '@/components/SelectList.vue'
import PropertyTile from '@/components/PropertyTile.vue'
import LoaderView from '@/components/LoaderView.vue'
import notFound from '@/assets/img/noData.svg'


export default {
    name: 'SearchView',
    components: {
        SelectList,
        PropertyTile,
        LoaderView
    },
    inject: ['baseURL'],
    data() {
        return {
            notFound,
            loaded: false,
            properties: [],
            search: {
                rent: true,
                type: 1,
                rooms: null,
                area: {
                    from: null,
                    to: null
                },
                price: {
                    from: null,
                    to: null
                }
            }
        }
    },
    methods: {
        selectTab(tab, rent) {
            this.search.rent = rent
            document.querySelectorAll('.search-tab').forEach(tab => {
                tab.classList.remove('tab-selected')
            })
            tab.classList.add('tab-selected')
        },
        fetchData() {
            fetch(this.baseURL + '/api/property/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.search)
            })
                .then(res => {
                    return res.json();
                })
                .then(data => {

                    this.properties = data
                    this.loaded = true
                })
                .catch(err => {
                    console.log(err)

                })
        }
    },
    mounted() {

    }
}

</script>
<style scoped>
.search-search-panel {
    position: relative;
    box-shadow: 0 0 35px rgba(0, 0, 0, 0.1);
    background-color: white;
    margin: 45px auto;
    max-width: 550px;
    padding: 15px 25px;
    border-radius: 30px;
}

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
