<template lang="pug">
    div(class="register-container")
        div(class="register")
            a(@click.prevent="$router.push('/entrar')") Voltar
            div Cadastrar
            input(type="text"     v-model="username" placeholder="eg user@user.com")
            input(type="password" v-model="password" placeholder="********************")
            input(type="button"   value="Criar Conta" @click="sendRegister()")

</template>

<script>
export default {
    data(){
        return{
            username:'',
            password:'',
        }
    },
    methods:{
        sendRegister(){
            this.$router.push("/entrar")
        }
    }
}
</script>

<style lang="scss">
    body{
        background-color: #e9e9e9;
        height: 100%;
    }
    .register-container{
        width:100%;
        height: 700px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .register{
        background-color: lightgray;
        min-width:300px;
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border:none;
        border-radius: 25px;
    }
    .register > div{
        background-color: #0063b1;
        width: 100%;
        text-align: center;
        height: 50px;
        line-height: 50px;
        font-size: 27px;
        border-radius: 10px 10px 0 0;
        user-select: none;
    }
    .register > input[type=text]{
        margin-top: 10px;
        height: 40px;
        width: 80%;
        background-color: transparent;
        border:none;
        border-bottom: 1px solid #585454;
        text-align: center;
        font-size: 20px;
        color: #9e9a9a;
        outline: none;
    }
    .register > input[type=password]{
        margin-top: 10px;
        height: 40px;
        width: 80%;
        background-color: transparent;
        border:none;
        border-bottom: 1px solid #585454;
        text-align: center;
        font-size: 20px;
        color: #9e9a9a;
        outline: none;
    }
    .register > input[type=button]{
        margin-top: 15px;
        margin-bottom: 15px;
        height: 40px;
        width: 150px;
        border:none;
        font-size: 18px;
        border-radius: 7px 7px 7px 7px;
    }
    .register > #entrar{
        background-color: #626f86;
        color:rgb(228, 216, 216);
        cursor: pointer;
    }
    .register > #entrar:hover{
        background-color: #6a80a5;
        color:rgb(184, 179, 179);
    }
    .register > #criar{
        background-color: #8db7d6;
        color:rgb(83, 81, 81);
        cursor: pointer;
    }
    .register > #criar:hover{
        background-color: #7ba0bb;
        color:rgb(211, 203, 203);
    }
</style>
