import { defineStore } from 'pinia';

export const useStore = defineStore('formStore', {
    state: () => ({
        applicationData: null,
    }),
    actions: {
        setApplicationData(data) {
            this.applicationData = data;
        },
    },
});
