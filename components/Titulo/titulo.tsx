import { View } from "react-native";
import { Titulo, Subtitulo } from "./style"

type TitleProps = {
    text : string,
    flag : boolean
}

export default function Title({text, flag} : TitleProps){
    return(
        <View>
            {flag == true ?
                <Titulo>{text}</Titulo>
                :
                <Subtitulo>{text}</Subtitulo>
            }
        </View>
    )
}
