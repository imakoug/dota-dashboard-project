export interface IMatch {
  assists: number;
  average_rank: number;
  cluster: number;
  deaths: number;
  duration: number;
  game_mode: number;
  gold_per_min: number;
  hero_damage: number;
  hero_healing: number;
  hero_id: number;
  hero_variant: number;
  is_roaming: boolean;
  kills: number;
  lane: number;
  lane_role: number;
  last_hits: number;
  leaver_status: number;
  lobby_type: number;
  match_id: number;
  party_size: number;
  player_slot: number;
  radiant_win: boolean;
  start_time: number;
  tower_damage: number;
  version: number;
  xp_per_min: number;
}

export interface IProfile {
  password: string;
  steamId: string;
  username: string;
  __v: number;
  _id: string;
}

export interface IHero {
  against_games: number;
  against_win: number;
  games: number;
  hero_id: number;
  last_played: number;
  win: number;
  with_games: number;
  with_win: number;
}
