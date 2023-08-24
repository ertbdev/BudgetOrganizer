import {Media} from './media';

export type User = {
  id: string;
  email: string;
  montlyBudget?: number;
  name: string;
  creationTime: number;
  avatar?: Media;
};
