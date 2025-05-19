import languageOptions, { Language } from '@/lib/languages';
import useCodeStore from '@/stores/code-store';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from './ui/select';

export default function LanguageSelect() {
  const { language, setLanguage } = useCodeStore();

  return (
    <Select
      value={language}
      onValueChange={(value) => setLanguage(value as Language)}
    >
      <SelectTrigger className='text-xs mb-4'>
        <SelectValue placeholder='Select a language' className='text-xs' />
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className='text-xs'
          >
            <option.Icon className='h-3 w-3 mr-1' />
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
