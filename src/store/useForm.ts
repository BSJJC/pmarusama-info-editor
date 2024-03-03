import { defineStore } from 'pinia';

type TComponent = {
  componentName: string;
  data: unknown;
};

export const useForm = defineStore('form', {
  state: () => {
    return {
      form: {
        informationType: 'form' || 'url',
        date: 0,
        title: '',
        data: {
          components: [
            {
              componentName: 'date',
              data: 0,
            },
            {
              componentName: 'h1',
              data: {
                text: '',
              },
            },
          ] as TComponent[],
        },
      },
    };
  },
});
