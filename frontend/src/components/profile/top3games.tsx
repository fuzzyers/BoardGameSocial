import { View } from "react-native";
import Top3GameItem from "./top3GamesItem";

type Top3GamesProps = {
    top3Games: any;
};

const Top3Game = ({top3Games}: Top3GamesProps) => {
    return (
        <View>
            <Top3GameItem game={top3Games[0]} pos={1}/>
            <Top3GameItem game={top3Games[1]} pos={2}/>
            <Top3GameItem game={top3Games[2]} pos={3}/>
        </View>
    );
};

export default Top3Game;
