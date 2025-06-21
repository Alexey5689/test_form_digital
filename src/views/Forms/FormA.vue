<script setup lang="ts">
import { ref } from 'vue';
import type { FormA } from '@/types/type.ts';
import { useFormStore } from '@/stores/formStore';
import { useMockApi } from '@/composables/mockApiCall';
const { callMockApi } = useMockApi();
const store = useFormStore();
const formData = ref<FormA>({
    name: '',
    email: '',
    inn: '',
});
const errors = ref<Record<string, string>>({});
const submissionResult = ref<{
    success: boolean;
    message: string;
    applicationNumber?: string;
    classifier?: string;
} | null>(null);

const validInn = (inn: string) => {
    const re = /^\d{10,12}$/;
    return re.test(inn);
};
const validateForm = () => {
    errors.value = {};
    let isValid = true;

    if (!formData.value.name.trim()) {
        errors.value.name = 'Имя обязательно';
        isValid = false;
    }
    if (!formData.value.inn.trim()) {
        errors.value.inn = 'ИНН обязателен';
        isValid = false;
    } else if (!validInn(formData.value.inn)) {
        errors.value.inn = 'ИНН должен содержать 10 или 12 цифр';
        isValid = false;
    }

    return isValid;
};

const submitForm = async (): Promise<void> => {
    if (!validateForm()) return;

    try {
        const dataToSend = {
            name: formData.value.name,
            inn: formData.value.inn,
            email: formData.value.email,
        };

        const response = await callMockApi(dataToSend, 'A');

        if (response.success) {
            submissionResult.value = {
                success: true,
                message: 'Форма успешно отправлена',
                applicationNumber: response.applicationNumber,
                classifier: response.classifier,
            };
            store.setApplicationData('A', {
                applicationNumber: response.applicationNumber,
                classifier: response.classifier,
            });
        } else {
            submissionResult.value = {
                success: false,
                message: response.error || 'Ошибка при отправке формы',
            };
        }
    } catch (error) {
        submissionResult.value = {
            success: false,
            message: 'Ошибка при отправке формы',
        };
    }
};
</script>
<template>
    <section class="section">
        <div class="section-header">
            <h2>Форма A</h2>
        </div>
        <div class="section-body">
            <form @submit.prevent="submitForm" action="/form/a" class="form">
                <div class="form-group">
                    <input
                        v-model="formData.name"
                        type="text"
                        placeholder="Имя"
                        :class="{ error: errors.name }"
                        required
                    />
                    <span v-if="errors.firstName" class="error-message">{{ errors.name }}</span>
                </div>

                <div class="form-group">
                    <input v-model="formData.email" type="email" placeholder="Email" :class="{ error: errors.email }" />
                    <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                </div>
                <div class="form-group">
                    <input
                        v-model="formData.inn"
                        type="еуче"
                        placeholder="ИНН"
                        :class="{ error: errors.inn }"
                        required
                    />
                    <span v-if="errors.inn" class="error-message">{{ errors.inn }}</span>
                </div>
                <button type="submit">Отправить</button>
                <div
                    v-if="submissionResult"
                    class="submission-result"
                    :class="{ success: submissionResult.success, error: !submissionResult.success }"
                >
                    {{ submissionResult.message }}
                </div>
            </form>
        </div>
    </section>
</template>
