import { ref } from 'vue';

interface MockApiResponse {
    success: boolean;
    applicationNumber?: string;
    classifier?: string;
    error?: string;
}

export const useMockApi = () => {
    const callMockApi = async (data: unknown, formPath: 'A' | 'B'): Promise<MockApiResponse> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if ((data as { email?: string }).email) {
                    resolve({
                        success: true,
                        applicationNumber: `APP-${Math.floor(Math.random() * 10000)}`,
                        classifier: `CLASSIFIER-${Date.now()}`,
                    });
                } else {
                    resolve({
                        success: false,
                        error: formPath === 'B' ? 'Email обязателен' : 'Ошибка валидации',
                    });
                }
            }, 1000);
        });
    };

    return { callMockApi };
};
