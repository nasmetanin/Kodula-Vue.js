<template>
    <NuxtLink to="/search"
     class="search-panel">
        <p>{{ $t('home.search') }}</p>
    </NuxtLink>
</template>
<script setup lang="ts">

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
    font: inherit;
    border: none;
    font-weight: 600;
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
