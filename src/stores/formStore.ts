import { defineStore } from 'pinia';

interface ApplicationData {
    applicationNumber: string | null;
    classifier: string | null;
}

export const useFormStore = defineStore('formStore', {
    state: () => ({
        applications: {
            A: { applicationNumber: null, classifier: null },
            B: { applicationNumber: null, classifier: null },
        } as Record<'A' | 'B', ApplicationData>,
    }),
    actions: {
        setApplicationData(formType: 'A' | 'B', data: ApplicationData) {
            this.applications[formType] = data;
        },
    },
});
