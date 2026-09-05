import { api } from "./api"

export const AddPlayersScore = (event_id: number, user_id: number, game_id:number, score: number, placement:number, game_weight:number) => {
    try {
        const response = api.post("/events/scoring/insertResult", {
            event_id: event_id,
            user_id: user_id,
            game_id: game_id,
            score: score,
            placement: placement,
            game_weight: game_weight
        })

        return response
    } catch (error) {
        console.log(error)
    }
}