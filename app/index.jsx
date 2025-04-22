import styled from "styled-components/native";
import { useEffect, useState } from "react";
import InputTexto from "@/components/Input/input";
import Entypo from '@expo/vector-icons/Entypo';
import { Pressable, View } from "react-native";
import { api } from "@/utils/api";
import { Alert } from "react-native";

export default function Cadastro() {
    const [email, setEmail] = useState('exemplo@exemplo.com');
    const [erroEmail, setErroEmail] = useState(false);

    const [senha, setSenha] = useState('Ex12345@');
    const [erroSenha, setErroSenha] = useState(false);

    const [confirmarSenha, setConfirmarSenha] = useState('Ex12345@');
    const [erroConfirmacao, setErroConfirmacao] = useState(false);

    const [senhaVisivel, setSenhaVisivel] = useState(true);
    const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(true);

    const [formularioValido, setFormularioValido] = useState(true);

    useEffect(() => {
        const emailValido = email.includes('@') && email.length >= 5;
        const senhaValida = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{5,8}$/.test(senha);
        const confirmacaoValida = senha === confirmarSenha;

        setErroEmail(!emailValido);
        setErroSenha(!senhaValida);
        setErroConfirmacao(!confirmacaoValida);

        setFormularioValido(emailValido && senhaValida && confirmacaoValida);
    }, [email, senha, confirmarSenha]);

    async function cadastrar() {
        try {
            console.log("Dados enviados:", { email, senha })
            const resposta = await api.post('/cadastro', {
                email: email,
                senha: senha
            });
            
            Alert.alert('Sucesso', 'Cadastrado com sucesso!');
            }
        catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Erro ao cadastrar usuário.');
        }
    }

    return (
        <Tela>
             <Titulo>CRIAR CONTA</Titulo> 

            <ContainerCampoTexto>
                <View>
                    <Texto>Email</Texto>
                    <ContainerTextInput error={erroEmail}>
                        <InputTexto
                            placeholder="Digite seu email"
                            onChangeText={text => setEmail(text)}
                        />
                    </ContainerTextInput>
                    {erroEmail && <TextErrorHint>E-mail inválido</TextErrorHint>}
                </View>

                <View>
                    <Texto>Senha</Texto>
                    <ContainerTextInput error={erroSenha}>
                        <InputTexto
                            placeholder="Digite uma senha"
                            onChangeText={text => setSenha(text)}
                            secureTextEntry={senhaVisivel}
                        />
                        <Pressable onPress={() => setSenhaVisivel(!senhaVisivel)}>
                            <StyledIcon name={senhaVisivel ? "eye" : "eye-with-line"} size={24} color="black" />
                        </Pressable>
                    </ContainerTextInput>
                    {erroSenha && <TextErrorHint>Senha inválida</TextErrorHint>}
                </View>

                <View>
                    <Texto>Confirme sua senha</Texto>
                    <ContainerTextInput error={erroConfirmacao}>
                        <InputTexto
                            placeholder="Repita a senha"
                            onChangeText={text => setConfirmarSenha(text)}
                            secureTextEntry={confirmarSenhaVisivel}
                        />
                        <Pressable onPress={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}>
                            <StyledIcon name={confirmarSenhaVisivel ? "eye" : "eye-with-line"} size={24} color="black" />
                        </Pressable>
                    </ContainerTextInput>
                    {erroConfirmacao && <TextErrorHint>Senhas diferentes</TextErrorHint>}
                </View>
            </ContainerCampoTexto>

            <ContainerBotoes>
                <Botao disabled={formularioValido} onPress={()=>{
                    cadastrar()}}>
                    <TextoBotao>Criar minha conta</TextoBotao>
                </Botao>
            </ContainerBotoes>
        </Tela>
    );
}

/*USANDO STYLED-COMPONENTS*/

const Tela = styled.View`
    flex: 1;
    background-color: #1A2021;
    padding: 26px;
`
const Titulo = styled.Text`
    font-family: Arial;
    font-weight: bold;
    font-size: 40px;
    color: #FAF4D3;
    margin-top: 130px;
    margin-bottom: 75px;
`
const Texto = styled.Text`
    font-family: Arial;
    font-size: 17px;
    color: #FAF4D3;
`

const ContainerCampoTexto = styled.View`
    gap: 20px;
`
const ContainerBotoes = styled.View`
    margin-top: 45px;
    gap: 10px;
`

const ContainerTextInput = styled.View`
    width: 100%;
    height: 80px;
    flex-direction: row;
    margin-bottom: 12px;
    align-items: center;
    border: 3px solid ${({ error }) => 
        error ? '#B03C3F' : '#33415C'};
    border-radius: 6px;
    background-color: #FAF4D3;
`

const Botao = styled.Pressable`
    background-color: #760101;
    border: solid 3px;
    border-color: #FAF4D3;
    border-radius: 05px;
    padding: 20px;
    margin-bottom: 30px;
`

const StyledIcon = styled(Entypo)`
    margin-right: 20px;
`

const TextoBotao = styled.Text`
    text-align: center;
    font-weight: bold;
    color: #FAF4D3;
    font-size: 26px;
`
const Links = styled.Text`
    text-align: center;
    color: #FAF4D3;
    font-size: 16px;
    font-weight: bold;
`

const TextErrorHint = styled.Text`
    font-size: 16px;
    color: #E63946
`