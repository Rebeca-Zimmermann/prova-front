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

    const [Senha2, setSenha2] = useState('Ex12345@');
    const [erroSenha2, setErroSenha2] = useState(false);

    const [senhaVisivel, setSenhaVisivel] = useState(true);
    const [Senha2Visivel, setSenha2Visivel] = useState(true);

    const [formularioValido, setFormularioValido] = useState(true);

        useEffect(()=>{
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
            
            if(senha === 'Ex12345@')
            {
                setFormularioValido(true)
            }
            else if(passwordRegex.test(senha)){
                setErroSenha(false)
                setFormularioValido(false)
            }
            else
            {
                setErroSenha(true)
                setFormularioValido(true)
            }
        }, [senha])

        useEffect(()=>{
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if(email === 'exemplo@exemplo.com'){
                setFormularioValido(true)
            }
            else if(emailRegex.test(email)){
                setErroEmail(false)
                setFormularioValido(false)
            }
            else{
                setErroEmail(true)
                setFormularioValido(true)
            }
        }, [email])

        useEffect(()=>{
            if(senha === Senha2){
                setErroSenha2(false)
            }   
            else{
                setErroSenha2(true)
            }
        }, [senha, Senha2])
    

    async function cadastrar() {
        try {
            console.log("Dados enviados:", { email, senha })
            const resposta = await api.post('/cadastro', {
                email: email,
                senha: senha
            });
            if(resposta.status === 201){
                alert('Cadastrado com sucesso!');
            }

            }
        catch (error) {
            if (error.response) {
                if (error.response.status === 409){
                    alert("Este email já está cadastrado.");
                }
                else if (error.response.status === 500){
                    alert("Erro inesperado no servidor. Tente novamente mais tarde.");
                } 
                else{
                    alert(`Erro ao cadastrar: ${error.response.status}`);
                }
            } else {
                alert("Erro de conexão. Verifique sua internet.");
            }
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
                    {erroEmail ? <TextErrorHint>E-mail inválido</TextErrorHint> : null}
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
                    {erroSenha ? <TextErrorHint>Senha inválida</TextErrorHint> : null}
                </View>

                <View>
                    <Texto>Confirme sua senha</Texto>
                    <ContainerTextInput error={erroSenha2}>
                        <InputTexto
                            placeholder="Repita a senha"
                            onChangeText={text => setSenha2(text)}
                            secureTextEntry={Senha2Visivel}
                        />
                        <Pressable onPress={() => setSenha2Visivel(!Senha2Visivel)}>
                            <StyledIcon name={Senha2Visivel ? "eye" : "eye-with-line"} size={24} color="black" />
                        </Pressable>
                    </ContainerTextInput>
                    {erroSenha2 ? <TextErrorHint>Senhas diferentes</TextErrorHint> : null}
                </View>
            </ContainerCampoTexto>

            <ContainerBotoes>
                <Botao disabled={formularioValido} 
                    onPress={()=>{
                    cadastrar()
                    }}>
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