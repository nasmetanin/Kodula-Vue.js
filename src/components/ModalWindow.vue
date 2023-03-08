<template>
    <div class="modal-wrapper">
        <div class="modal">
            <transition name="side"
             mode="out-in">
                <div v-if="!result"
                 class="modal-inner">
                    <h3>{{ $t('modal.h') }}</h3>
                    <p class="modal-description">{{ $t('modal.p') }}</p>
                    <form class="form">
                        <input ref="input"
                         required
                         v-model="name"
                         class="modal-input"
                         :placeholder="$t('modal.name')"
                         type="text">
                        <input ref="input"
                         required
                         v-model="email"
                         :placeholder="$t('modal.email')"
                         type="email"
                         class="modal-input">
                        <input ref="input"
                         required
                         v-model="phone"
                         type="tel"
                         :placeholder="$t('modal.phone')"
                         class="modal-input">
                        <div class="modal-buttons">
                            <MainButton @click="closeModal($event)"
                             :text="$t('modal.close')"
                             :widthRestriction="false" />
                            <MainButton @click="submitForm($event)"
                             :text="$t('modal.send')"
                             :widthRestriction="false" />
                        </div>
                    </form>
                </div>
                <div v-else
                 class="modal-inner">
                    <img class="modal-result"
                     :src="badge"
                     alt="Result">
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import closeIcon from '@/assets/img/close-gray.svg';
import checkmark from '@/assets/img/checkmark.svg';
import xmarkCircle from '@/assets/img/xmark-circle.svg';
import MainButton from './MainButton.vue';

export default {
    name: 'ModalWindow',
    components: {
        MainButton
    },
    inject: ['baseURL'],
    data() {
        return {
            closeIcon,
            checkmark,
            xmarkCircle,
            badge: xmarkCircle,
            name: '',
            email: '',
            phone: '',
            result: false,
        }
    },
    methods: {
        submitForm(e) {
            e.preventDefault();
            const allInputs = document.querySelectorAll('.modal-input');
            if (!this.name || !this.email || !this.phone) {
                allInputs.forEach(input => {
                    if (!input.value) {
                        input.classList.add('error');
                    }
                })
                return;
            }

            if (!this.email.includes('@')) {
                allInputs.forEach(input => {
                    if (input.type === 'email') {
                        input.classList.add('error');
                    }
                })
                return;
            }
            allInputs.forEach(input => {
                input.classList.remove('error');
            })
            fetch(`${this.baseURL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        this.result = true;
                        this.badge = this.checkmark;
                    } else {
                        this.result = true;
                        this.badge = this.xmarkCircle;
                    }

                    setTimeout(() => {
                        this.$emit('close');
                    }, 1500)
                })
                .catch(err => {
                    console.log(err);
                })
        },
        closeModal(e) {
            e.preventDefault();
            this.$emit('close');
        },
    }
}
</script>
<style>
.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 105;
    transition: all 0.2s ease-in-out;
    background-color: rgba(155, 155, 155, 0.8);
    /* add blur filter */
    backdrop-filter: blur(10px);
}

.modal-input {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--gray);
    border-radius: 10px;
    outline: none;
    font-size: 15px;
    font-weight: 500;
    border: 2px solid transparent;
    transition: all 0.2s ease-in-out;
}

.modal-result {
    width: 100px;
    height: 100px;
    margin: 80px auto;
}

.error {
    border: 2px solid red;
}

.modal-description {
    font-size: 15px;
    font-weight: 500;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: 10px;
    width: 100%;
}

.modal-close {
    width: 36px;
    height: 36px;
    cursor: pointer;
}

.modal-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    width: 100%;
}

.modal {
    border-radius: var(--br);
    width: 100%;
    max-width: 320px;
    padding: 15px;
    background-color: white;
}

.modal-inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    text-align: center;
}
</style>
