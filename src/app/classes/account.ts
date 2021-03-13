import {Rank} from './rank';

export interface Account {
  id?: number;
  summonerName: string;
  active?: boolean;
  locked?: boolean;
  server: string;
  rank_SQ?: Rank;
  ignore_sq?: boolean;
  rank_FQ?: Rank;
  ignore_fq?: boolean;
  hash?: string;
  last_updated?: number;
}
