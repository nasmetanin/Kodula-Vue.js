<template >
    <div class="about">
        <div ref="title"
         class="section-title">
            <h4 class="small-section-title">Kodula</h4>
            <h1>{{ $t('policy.title') }}</h1>
        </div>

        <div class="about-text">
            <h3>1. {{ $t('policy.h1') }}</h3>
            <p>
                1.1 {{ $t('policy.p1') }}
            </p>
            <p>
                1.2 {{ $t('policy.p2') }}
            </p>
            <p>
                1.3 {{ $t('policy.p3') }}
            </p>
            <h3>2. {{ $t('policy.h2') }}</h3>
            <p>
                2.1 {{ $t('policy.p4') }}
            </p>
            <p>
                2.2 {{ $t('policy.p5') }}
            </p>
            <p>
                2.3 {{ $t('policy.p6') }}
            </p>
            <p>
                2.4 {{ $t('policy.p7') }}
            </p>
            <h3>3. {{ $t('policy.h3') }}</h3>
            <p>
                3.1 {{ $t('policy.p8') }}
            </p>
            <p>
                3.2 {{ $t('policy.p9') }}
            </p>
        </div>


    </div>
</template>
<script>
export default {
    name: 'PrivacyView',

}
</script>
<style>
</style>
