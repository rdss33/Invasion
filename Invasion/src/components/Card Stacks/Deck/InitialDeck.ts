import { Guard, GuardInformation, GuardAttributes } from "../../Cards/Battle Cards/Guard"
import { Card } from "../../Cards/Card"

export const INITIAL_DECK : Card[] = [
    new Guard(GuardInformation, GuardAttributes),
    new Guard(GuardInformation, GuardAttributes),
    new Guard(GuardInformation, GuardAttributes),
    new Guard(GuardInformation, GuardAttributes),
    new Guard(GuardInformation, GuardAttributes),
    new Guard(GuardInformation, GuardAttributes),
]