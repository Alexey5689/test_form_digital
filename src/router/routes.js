import AppLayout from '@/layouts/AppLayout.vue';
import FormA from '@/views/Forms/FormA.vue';
import FormB from '@/views/Forms/FormB.vue';
export const routes = [
    {
        path: '/',
        component: AppLayout,
        redirect: '/form-a',
        children: [
            {
                path: 'form-a',
                name: 'FormA',
                component: FormA,
                meta: {
                    title: 'Form A',
                },
            },
            {
                path: 'form-b',
                name: 'FormB',
                component: FormB,
                meta: {
                    title: 'Form B',
                },
            },
        ],
    },
];
