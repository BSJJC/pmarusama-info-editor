import { defineStore } from 'pinia';

type TComponent = {
  componentName: string;
  data: object;
};

export const useForm = defineStore('form', {
  state: () => {
    return {
      form: {
        informationType: 'form' || 'url',
        date: 0,
        title: '',
        data: {
          components: [] as TComponent[],
        },
      },
    };
  },
});
