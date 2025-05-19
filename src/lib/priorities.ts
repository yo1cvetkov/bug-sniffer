export enum Priority {
  PERFORMANCE = 'performance',
  READABILITY = 'readability',
  MAINTAINABILITY = 'maintainability',
  CLEANCODE = 'clean-code',
}

export const priorityLabels = {
  [Priority.PERFORMANCE]: 'Performance',
  [Priority.READABILITY]: 'Readability',
  [Priority.MAINTAINABILITY]: 'Maintainability',
  [Priority.CLEANCODE]: 'Clean Code',
};

type PriorityOption = {
  label: (typeof priorityLabels)[keyof typeof priorityLabels];
  value: Priority;
};

const priorityOptions: PriorityOption[] = [
  { label: priorityLabels[Priority.PERFORMANCE], value: Priority.PERFORMANCE },
  { label: priorityLabels[Priority.READABILITY], value: Priority.READABILITY },
  {
    label: priorityLabels[Priority.MAINTAINABILITY],
    value: Priority.MAINTAINABILITY,
  },
  {
    label: priorityLabels[Priority.CLEANCODE],
    value: Priority.CLEANCODE,
  },
];

export default priorityOptions;
