import { useForm } from '@/store/useForm';

const { form } = useForm();

/**
 * Update data of a specific component in the form.
 * @param {number} componentId - The ID of the component to update.
 * @param {object | number} syncData - The data to synchronize with the component.
 */
export default function syncData(componentId: number, syncData: object | number) {
  form.data.components[componentId].data = syncData;
}
