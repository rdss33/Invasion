import { PlayerAttackStat } from "./AttackStat";
import { PlayerDefenseStat } from "./DefenseStat";
import { PlayerHealthStat } from "./HealthStat";
import { PlayerStat } from "./PlayerStat";

export const INITIAL_PLAYER_STATS : PlayerStat[] = [
    new PlayerAttackStat(0),
    new PlayerHealthStat(100),
    new PlayerDefenseStat(0),
]