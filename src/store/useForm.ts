import { defineStore } from 'pinia';

export const useForm = defineStore('form', {
  state: () => {
    return {
      form: {
        informationType: 'form' || 'url',
        date: 0,
        title: '',
        data: {
          components: Array<object>,
        },
      },
    };
  },
});
