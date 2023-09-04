import {Media} from './media';

type Account = {
  name: string;
  availableFunds: number;
};

type Config = {
  accounts?: Account[];
  montlyBudget: number;
};

export type User = {
  id?: string;
  email: string;
  montlyBudget?: number;
  name: string;
  creationTime: number;
  avatar?: Media;
  config: Config;
};
