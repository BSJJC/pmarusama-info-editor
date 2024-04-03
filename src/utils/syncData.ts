import { useForm } from '@/store/useForm';

const { form } = useForm();

export default function syncData(componentId: number, syncData: object | number) {
  form.data.components[componentId].data = syncData;
}
