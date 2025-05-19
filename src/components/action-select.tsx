import actionOptions, { Action } from '@/lib/actions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import useCodeStore from '@/stores/code-store';

export default function ActionSelect() {
  const { action, setAction } = useCodeStore();

  return (
    <Select
      value={action}
      onValueChange={(value) => setAction(value as Action)}
    >
      <SelectTrigger>
        <SelectValue placeholder='Select an action' />
      </SelectTrigger>
      <SelectContent>
        {actionOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
