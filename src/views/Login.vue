<template lang="pug">
    div(class="login-container")
        div(class="login")
            div Login
            input(type="text"     v-model="username" placeholder="eg user@user.com")
            input(type="password" v-model="password" placeholder="********************")
            input(type="button"   value="Entrar"      @click="sendLogin()" id="entrar")
            input(type="button"   value="Criar Conta" @click="$router.push('/cadastro')" id="criar")

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
        sendLogin(){
            sessionStorage['token']='9i2Jf0cbywWqtPlSTfQ3ywwAMiAs1joM'
            sessionStorage['user']='User';
            this.$router.push("/painel")
            
        },
    },
}
</script>

<style lang="scss">
    body{
        background-color: #e9e9e9;
        height: 100%;
    }
    .login-container{
        width:100%;
        height: 700px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login{
        background-color: lightgray;
        min-width:300px;
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border:none;
        border-radius: 25px;
    }
    .login > div{
        background-color: #0063b1;
        width: 100%;
        text-align: center;
        height: 50px;
        line-height: 50px;
        font-size: 27px;
        border-radius: 10px 10px 0 0;
        user-select: none;
    }
    .login > input[type=text]{
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
    .login > input[type=password]{
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
    .login > input[type=button]{
        margin-top: 15px;
        margin-bottom: 15px;
        height: 40px;
        width: 150px;
        border:none;
        font-size: 18px;
        border-radius: 7px 7px 7px 7px;
    }
    .login > #entrar{
        background-color: #626f86;
        color:rgb(228, 216, 216);
        cursor: pointer;
    }
    .login > #entrar:hover{
        background-color: #6a80a5;
        color:rgb(184, 179, 179);
    }
    .login > #criar{
        background-color: #8db7d6;
        color:rgb(83, 81, 81);
        cursor: pointer;
    }
    .login > #criar:hover{
        background-color: #7ba0bb;
        color:rgb(211, 203, 203);
    }
</style>