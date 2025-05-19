import { type IconType } from 'react-icons';
import { FaJsSquare, FaPython, FaJava, FaPhp } from 'react-icons/fa';
import { FaGolang } from 'react-icons/fa6';
import { BiLogoTypescript } from 'react-icons/bi';
import { TbBrandCpp, TbBrandCSharp, TbBrandCoinbase } from 'react-icons/tb';
import { DiRuby } from 'react-icons/di';

export enum Language {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  PYTHON = 'python',
  JAVA = 'java',
  C = 'c',
  CPP = 'cpp',
  CSHARP = 'csharp',
  RUBY = 'ruby',
  PHP = 'php',
  GO = 'go',
}

export const languageNames = {
  [Language.JAVASCRIPT]: 'JavaScript',
  [Language.TYPESCRIPT]: 'TypeScript',
  [Language.PYTHON]: 'Python',
  [Language.JAVA]: 'Java',
  [Language.C]: 'C',
  [Language.CPP]: 'C++',
  [Language.CSHARP]: 'C#',
  [Language.RUBY]: 'Ruby',
  [Language.PHP]: 'PHP',
  [Language.GO]: 'Go',
};

type LanguageOption = {
  label: (typeof languageNames)[keyof typeof languageNames];
  value: Language;
  Icon: IconType;
};

const languageOptions: LanguageOption[] = [
  {
    label: languageNames[Language.JAVASCRIPT],
    value: Language.JAVASCRIPT,
    Icon: FaJsSquare,
  },
  {
    label: languageNames[Language.TYPESCRIPT],
    value: Language.TYPESCRIPT,
    Icon: BiLogoTypescript,
  },
  {
    label: languageNames[Language.PYTHON],
    value: Language.PYTHON,
    Icon: FaPython,
  },
  {
    label: languageNames[Language.JAVA],
    value: Language.JAVA,
    Icon: FaJava,
  },
  {
    label: languageNames[Language.C],
    value: Language.C,
    Icon: TbBrandCoinbase, // Find better icon for C lang
  },
  {
    label: languageNames[Language.CPP],
    value: Language.CPP,
    Icon: TbBrandCpp,
  },
  {
    label: languageNames[Language.CSHARP],
    value: Language.CSHARP,
    Icon: TbBrandCSharp,
  },
  {
    label: languageNames[Language.RUBY],
    value: Language.RUBY,
    Icon: DiRuby,
  },
  {
    label: languageNames[Language.PHP],
    value: Language.PHP,
    Icon: FaPhp,
  },
  {
    label: languageNames[Language.GO],
    value: Language.GO,
    Icon: FaGolang,
  },
];

export default languageOptions;
