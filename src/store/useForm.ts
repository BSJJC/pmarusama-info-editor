import { defineStore } from 'pinia';

type TData = object & {
  text?: string;
};

type TComponent = {
  componentName: string;
  data: TData;
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
