export enum Action {
  EXPLAIN = 'explain',
  REFACTOR = 'refactor',
  REWRITE = 'rewrite',
}

export const actionLabels = {
  [Action.EXPLAIN]: 'Explain me',
  [Action.REFACTOR]: 'Refactor',
  [Action.REWRITE]: 'Rewrite',
};

type ActionOption = {
  label: (typeof actionLabels)[keyof typeof actionLabels];
  value: Action;
};

const actionOptions: ActionOption[] = [
  { label: actionLabels[Action.EXPLAIN], value: Action.EXPLAIN },
  { label: actionLabels[Action.REFACTOR], value: Action.REFACTOR },
  { label: actionLabels[Action.REWRITE], value: Action.REWRITE },
];

export default actionOptions;
