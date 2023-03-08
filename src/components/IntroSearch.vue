<template>
    <div ref="searchPanel"
     @click="showSearch"
     @mouseleave="hideSearch"
     class="search-panel">
        <Transition name="side"
         mode="out-in">
            <p v-if="smallSearch">{{ $t('home.search') }}</p>
            <div class="big-search"
             v-else>
                <div ref="topBar"
                 class="top-search-bar">
                    <button ref="rent"
                     class="search-tab tab-selected"
                     @click="selectTab(this.$refs.rent)">Rent</button>
                    <button ref="buy"
                     class="search-tab"
                     @click="selectTab(this.$refs.buy)">Buy</button>
                </div>
                <div class="search-inner">
                    <div class="search-column">
                        <h4>Type</h4>
                        <SelectList label="Select"
                         :options="[{ id: 1, name: 'All' }, { id: 2, name: 'House' }, { id: 3, name: 'Flat' }, { id: 4, name: 'Land' }]" />
                    </div>
                    <div class="search-column">
                        <h4>Rooms</h4>
                        <input type="text"
                         placeholder="1..."
                         class="search-input">
                    </div>
                    <div class="search-column">
                        <h4>Area</h4>
                        <div class="flex">
                            <input type="text"
                             placeholder="From"
                             class="search-input">
                            <input type="text"
                             placeholder="To"
                             class="search-input">
                        </div>
                    </div>
                    <div class="search-column">
                        <h4>Price</h4>
                        <div class="flex">
                            <input type="text"
                             placeholder="From"
                             class="search-input">
                            <input type="text"
                             placeholder="To"
                             class="search-input">
                        </div>
                    </div>
                </div>
                <div class="bottom-search-bar">
                    <button class="search-btn">Search</button>
                </div>
            </div>
        </Transition>
    </div>
</template>
<script>
import SelectList from '@/components/SelectList.vue'

export default {
    name: 'IntroSearch',
    components: {
        SelectList
    },
    data() {
        return {
            smallSearch: true,
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
        showSearch() {
            // const searchPanel = this.$refs.searchPanel
            // searchPanel.classList.add('animated-search')
            // this.smallSearch = false
            this.$router.push('/search')

        },
        hideSearch() {
            const searchPanel = this.$refs.searchPanel
            const topBar = this.$refs.topBar
            if (topBar) {
                topBar.style.opacity = 0
                topBar.style.transform = 'translateY(30%)'
            }
            this.smallSearch = true
            setTimeout(() => {
                searchPanel.classList.remove('animated-search')
            }, 120)
        },
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
<style>
.search-panel {
    z-index: 1000;
    background-color: white;
    border-radius: 30px;
    font-weight: 600;
    color: black;
    cursor: pointer;
    font-size: 16px;
    padding: 5px 30px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    max-width: 140px;
    max-height: 45px;
    box-shadow: 0 0 35px rgba(0, 0, 0, 0.2);
    transition: all .5s cubic-bezier(0.215, 0.610, 0.355, 1);
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-btn {
    padding: 5px 20px;
    background-color: var(--theme);
    border: none;
    font: var(--font);
    border-radius: 10px;
    color: #fff;
    font-weight: 600;
    font-size: 15px;
    transition: all .2s;
    cursor: pointer;
}

.search-btn:hover {
    background-color: var(--theme-lighter);
}

.search-btn:active {
    background-color: var(--theme);
    scale: 0.98;
}

.bottom-search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10px;
}

.big-search {
    position: relative;
}

.top-search-bar {
    position: absolute;
    top: -45px;
    display: flex;
    gap: 0;
    justify-content: center;
    align-items: center;
    width: 100%;
    transition: all .1s ease;
}

.search-tab {
    background: none;
    border: none;
    font: var(--font);
    cursor: pointer;
    outline: none;
    font-size: 16px;
    font-weight: 600;
    color: black;
    background-color: #e4e4e4;
    padding: 5px 30px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transition: all 1s cubic-bezier(0.215, 0.610, 0.355, 1);
}

.search-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.tab-selected {
    background-color: white;
}

.animated-search {
    max-width: 550px;
    max-height: 130px;
    border-radius: 30px;
}

.search-inner {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    gap: 10px;
}

.small-search-panel:hover {
    box-shadow: 0 0 35px rgba(0, 0, 0, 0.3);
}

@media screen and (max-width: 450px) {
    .search-inner {
        grid-template-columns: 1fr 1fr;
    }


    .animated-search {
        max-height: 500px;
    }
}
</style>
