<script setup lang="ts">
import { ref } from 'vue';
import type { FormB } from '@/types/type.ts';
import { useStore } from '@/stores/store';
const store = useStore();
const formData = ref<FormB>({
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    login: '',
    email: '',
    phone: '',
});

const errors = ref<Record<string, string>>({});
const submissionResult = ref<{
    success: boolean;
    message: string;
    applicationNumber?: string;
    classifier?: string;
} | null>(null);

const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePhone = (phone: string) => {
    const re = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return re.test(phone);
};

const validateForm = () => {
    errors.value = {};
    let isValid = true;

    if (!formData.value.firstName.trim()) {
        errors.value.firstName = 'Имя обязательно';
        isValid = false;
    }

    if (!formData.value.lastName.trim()) {
        errors.value.lastName = 'Фамилия обязательна';
        isValid = false;
    }

    if (!formData.value.email) {
        errors.value.email = 'Email обязателен';
        isValid = false;
    } else if (!validateEmail(formData.value.email)) {
        errors.value.email = 'Введите корректный email';
        isValid = false;
    }

    if (formData.value.phone && !validatePhone(formData.value.phone)) {
        errors.value.phone = 'Формат: +7 (XXX) XXX-XX-XX';
        isValid = false;
    }

    return isValid;
};

const formatPhone = (e: Event): void => {
    const input = e.target as HTMLInputElement;
    const event = e as InputEvent;

    const cursorPos = input.selectionStart;

    let digits = input.value.replace(/\D/g, '');

    if (event.inputType === 'deleteContentBackward' && digits.length === 0) {
        input.value = '';
        formData.value.phone = '';
        return;
    }

    if (digits.length > 0 && (digits.startsWith('7') || digits.startsWith('8'))) {
        digits = digits.substring(1);
    }

    digits = digits.substring(0, 10);

    let formattedValue = '';
    if (digits.length > 0) {
        formattedValue = '+7 (';

        if (digits.length > 0) formattedValue += digits.substring(0, 3);
        if (digits.length > 3) formattedValue += `) ${digits.substring(3, 6)}`;
        if (digits.length > 6) formattedValue += `-${digits.substring(6, 8)}`;
        if (digits.length > 8) formattedValue += `-${digits.substring(8)}`;
    }

    input.value = formattedValue;
    formData.value.phone = formattedValue;

    setTimeout(() => {
        if (event.inputType === 'deleteContentBackward') {
            const newPos = Math.max(0, cursorPos || 0);
            input.setSelectionRange(newPos, newPos);
        } else {
            const newPos = formattedValue.length;
            input.setSelectionRange(newPos, newPos);
        }
    }, 0);
};

const submitForm = async (): Promise<void> => {
    if (!validateForm()) return;

    try {
        const dataToSend = {
            lastName: formData.value.lastName,
            firstName: formData.value.firstName,
            middleName: formData.value.middleName,
            birthDate: formData.value.birthDate,
            login: formData.value.login,
            email: formData.value.email,
            phone: formData.value.phone,
        };

        const response = await mockApiCall(dataToSend);

        if (response.success) {
            submissionResult.value = {
                success: true,
                message: 'Форма успешно отправлена',
                applicationNumber: response.applicationNumber,
                classifier: response.classifier,
            };
            store.setApplicationData({
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

// заглушка для  API
const mockApiCall = (
    data: FormB,
): Promise<{
    success: boolean;
    applicationNumber?: string;
    classifier?: string;
    error?: string;
}> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (data.email) {
                resolve({
                    success: true,
                    applicationNumber: 'APP-' + Math.floor(Math.random() * 10000),
                    classifier: 'CLASSIFIER-' + Date.now(),
                });
            } else {
                resolve({
                    success: false,
                    error: 'Email обязателен',
                });
            }
        }, 1000);
    });
};
</script>

<template>
    <section class="section">
        <div class="section-header">
            <h2>Форма Б</h2>
        </div>
        <div class="section-body">
            <form @submit.prevent="submitForm" action="/form/b" class="form">
                <div class="form-group">
                    <input
                        v-model="formData.lastName"
                        type="text"
                        placeholder="Фамилия"
                        :class="{ error: errors.lastName }"
                    />
                    <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
                </div>
                <div class="form-group">
                    <input
                        v-model="formData.firstName"
                        type="text"
                        placeholder="Имя"
                        :class="{ error: errors.firstName }"
                    />
                    <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
                </div>

                <div class="form-group">
                    <input v-model="formData.middleName" type="text" placeholder="Отчество" />
                </div>

                <div class="form-group">
                    <input v-model="formData.birthDate" type="date" placeholder="Дата рождения" />
                </div>

                <div class="form-group">
                    <input v-model="formData.login" type="text" placeholder="Логин" />
                </div>

                <div class="form-group">
                    <input
                        v-model="formData.email"
                        type="email"
                        placeholder="Email"
                        :class="{ error: errors.email }"
                        required
                    />
                    <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                </div>

                <div class="form-group">
                    <input
                        @input="formatPhone"
                        type="tel"
                        placeholder="Телефон +7 (XXX) XXX-XX-XX"
                        :class="{ error: errors.phone }"
                    />
                    <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
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

<style scoped>
.section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 15px;
    min-width: 500px;
    padding: 20px;
    background-color: #f3f3f3;
    border-radius: 20px;
}

.form-group {
    width: 100%;
    display: flex;
    flex-direction: column;
}

input {
    width: 100%;
    height: 50px;
    border-radius: 15px;
    padding: 10px 20px;
    border: 1px solid #ddd;
}

input.error {
    border-color: #ff4444;
}

.error-message {
    color: #ff4444;
    font-size: 12px;
    margin-top: 5px;
}

button {
    padding: 12px 24px;
    border-radius: var(--border-radius-small);
    transition: var(--transition-duration);
    cursor: pointer;
    background-color: var(--color-dark);
    color: var(--color-accent);
    border: none;
    font-weight: bold;
    margin-top: 10px;
}

button:hover {
    background-color: var(--color-accent);
    color: var(--color-dark);
}

.submission-result {
    padding: 10px;
    border-radius: 5px;
    margin-top: 15px;
    text-align: center;
}

.submission-result.success {
    background-color: #d4edda;
    color: #155724;
}

.submission-result.error {
    background-color: #f8d7da;
    color: #721c24;
}
</style>
