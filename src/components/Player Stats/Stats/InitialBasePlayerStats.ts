import { PlayerAttackStat } from "./AttackStat";
import { PlayerDefenseStat } from "./DefenseStat";
import { PlayerStat } from "./PlayerStat";

export const INITIAL_BASE_PLAYER_STATS : PlayerStat[] = [
    new PlayerAttackStat(0),
    new PlayerDefenseStat(0),
]