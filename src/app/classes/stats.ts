import {Rank} from './rank';

export interface Stats {
  wins: number;
  losses: number;
  rank: Rank;
  server?: string;
}
