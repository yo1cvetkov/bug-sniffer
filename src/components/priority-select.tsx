import priorityOptions, { Priority } from '@/lib/priorities';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import useCodeStore from '@/stores/code-store';

export default function PrioritySelect() {
  const { priority, setPriority } = useCodeStore();

  return (
    <Select
      value={priority}
      onValueChange={(value) => setPriority(value as Priority)}
    >
      <SelectTrigger>
        <SelectValue placeholder='Select a priority' />
      </SelectTrigger>
      <SelectContent>
        {priorityOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
