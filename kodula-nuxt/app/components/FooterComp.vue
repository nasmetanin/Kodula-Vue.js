<template>
    <footer>
        <div class="footer">


            <div class="list">
                <h3>{{ $t('contacts') }}</h3>
                <ul>
                    <li>
                        +372 5663 8397
                    </li>
                    <li>
                        margit@kodula.ee
                    </li>
                    <li>
                        Margit Rajaste
                    </li>
                </ul>
            </div>

            <div class="list">
                <h3>{{ $t('legal') }}</h3>
                <ul>
                    <li>
                        +372 5663 8397
                    </li>
                    <li>
                        Kodula OÜ
                    </li>
                    <li>
                        Registrikood 12470722
                    </li>
                </ul>
            </div>

            <div class="list">
                <h3>{{ $t('quicklinks') }}</h3>
                <ul>
                    <li>
                        <RouterLink to="/about">{{ $t('about') }}</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/properties">{{ $t('home.properties') }}</RouterLink>
                    </li>
                </ul>
            </div>

            <div class="list">
                <h3>{{ $t('additional') }}</h3>
                <ul>
                    <li>
                        <RouterLink to="/privacy">{{ $t('privacypolicy') }}</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <h4 class="made-by-title">
                Designed and developed by
            </h4>
            <a class="made-by-link"
             href="https://nsweb.dev">Nikita Smetanin</a>
        </div>
    </footer>
</template>

<script>


export default {
    name: "FooterComp",
    data() {
        return {

        }
    },
    methods: {
        contractLink() {
            switch (this.$i18n.locale) {
                case 'en':
                    return 'https://app.35fit.com/resources/client_contract_ENG.pdf'
                case 'ru':
                    return 'https://app.35fit.com/resources/client_contract_RUS.pdf'
                default:
                    return 'https://app.35fit.com/resources/client_contract_ET.pdf'
            }
        },
        priceListLink() {
            switch (this.$i18n.locale) {
                case 'en':
                    return 'https://app.35fit.com/resources/price_list_ENG.pdf'
                case 'ru':
                    return 'https://app.35fit.com/resources/price_list_RUS.pdf'
                default:
                    return 'https://app.35fit.com/resources/price_list_ET.pdf'
            }
        }
    }
}
</script>

<style>
.footer-bottom {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    flex-direction: column;
    gap: 5px;
    border-top: 1px solid var(--gray);
}

.made-by-title {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
}

.made-by-link {
    font-size: 14px;
    margin: 0;
    font-weight: 500;
    color: var(--theme);
    text-decoration: none;
}

footer {
    max-width: calc(1000px + 1rem);
    margin: 70px auto 20px auto;
}

.footer {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 15px;
    margin-bottom: 10px;
}

.list {
    width: 100%;
}

.list ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.social-list li {
    display: flex;
    align-items: center;
    gap: 10px;
}

.social-list li img {
    width: 18px;
    height: 18px;
}

.list li {
    margin: 15px 0;
    font-size: 14px;
}

@media (max-width: 980px) {
    footer {
        padding: 0 1rem;
    }
}

@media (max-width: 820px) {
    .footer {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

@media (max-width: 680px) {
    .footer {
        grid-template-columns: 1fr 1fr;
    }
}
</style>
