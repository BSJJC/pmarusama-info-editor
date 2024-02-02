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
              componentName: 'type',
              data: {},
            },
            {
              componentName: 'date',
              data: {},
            },
            {
              componentName: 'title',
              data: {},
            },
          ] as TComponent[],
        },
      },
    };
  },
});
