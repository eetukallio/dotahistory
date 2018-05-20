import { Hero } from './hero';

export interface Game {
  match_id: number;
  duration: number;
  radiant_win: boolean;
  game_mode: number;
  hero_id: number;
  start_time: number;
  kills: number;
  deaths: number;
  assists: number;
  lobby_type: number;
  hero: Hero;
  player_slot: number;
}
