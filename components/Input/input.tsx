import { Campo_Texto } from "./style";
import { TextInputProps } from 'react-native';


export default function InputTexto({...rest} : TextInputProps){
    return(
        <Campo_Texto 
            placeholderTextColor={'#000'}
            {...rest}
        />
    )
}