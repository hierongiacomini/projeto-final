<template lang="pug">
    div(class="painel")
        div(class="header")
            div Painel
            div(class="icon-user usericon")
        div(class="main-container")
            div(class="main")
                div(class="token") Bem vindo {{user}}. Seu token é: {{token}}
                div(class="search" v-show="!showLog" v-if="!hasSelected()")
                    div(class="dropdown-container")
                        div(class="type-dropdown")
                            button(@click="dropdownSelect('type-dropdown-button')" class="type-dropdown-button menu") {{type}} 
                            div(id="type-dropdown-button" class="type-dropdown-content")
                                div(class="type-menu menu")
                                    p(@click="type='Todos'") Todos
                                    p(@click="type='Produção'") Produção
                                    p(@click="type='Homologação'")  Homologação
                                    p(@click="type='Dev'")  Dev
                        div(class="order-dropdown")
                            button(@click="dropdownSelect('order-dropdown-button')" class="order-dropdown-button menu") {{order}}
                            div(id="order-dropdown-button" class="order-dropdown-content")
                                div(class="order-menu menu")
                                    p(@click="order='Ordenar por'") Ordenar por
                                    p(@click="order='Level'") Level
                                    p(@click="order='Frequência'") Frequência
                        div(class="search-dropdown")
                            button(@click="dropdownSelect('search-dropdown-button')" class="search-dropdown-button menu") {{search}}
                            div(id="search-dropdown-button" class="search-dropdown-content")
                                div(class="search-menu menu")
                                    p(@click="search='Buscar por'") Buscar por
                                    p(@click="search='Título'") Título
                                    p(@click="search='Descrição'") Descrição
                                    p(@click="search='Origem'") Origem
                                    p(@click="search='Data'") Data
                                    p(@click="search='Coletor'") Coletor
                    div(class="search-container")                      
                        div(class="icon-search")
                        input(placeholder="Digite para buscar..." v-model="searchedlog" @keydown.enter="searchLogs()")
                div(v-if="hasSelected()" class="selected-action" v-show="!showLog")
                    button(class="search-dropdown-button menu" @click="archiveSelected()") Arquivar
                    button(class="search-dropdown-button menu" @click="deleteSelected()") Apagar
                div(v-if="!showLog" class="log-container")
                    div(v-for="log in logs" :key="log.id" @click="displayLog(log.id)" class="log-card-container" :class="{'selected': isSelected(log.id)}")
                        div(class="log-card")
                            div(class="main-info")
                                div(class="collector-container")
                                    div(class="icon-colletor collector-icon") 
                                    div {{log.collector}}
                                    div(class="icon-source source-icon")
                                    div {{log.source}}
                                div(class="title-info") {{log.title}}
                                div(class="date-info") {{log.date}}
                            div(class="log-level") {{log.level}}
                            div(class="event-level") Eventos: {{log.events}}
                            div(@click.stop="select(log.id)" class="selection-container")
                                div(:class="[isSelected(log.id) ? 'icon-selected selected-icon' : 'icon-unselected selected-icon']")
                div(v-else class="log-show-container")
                    div(class="log-show")
                        div(class="back-container" @click="hideLog()")
                            div(class="icon-back back-icon")
                            div(class="voltar") Voltar
                        div(class="info-show") Erro no {{log.source}} em {{log.date}}
                        div(class="main-show")
                            div(class="title-details-show")
                                div(class="title-show") 
                                    div(class="header-show") Título
                                    div(class="content-show") {{log.title}}
                                    div(class="header-show") Detalhes
                                    div(class="content-show" v-html="log.details")
                            div(class="level-events-collector-show")
                                div(class="level-show") {{log.level}}
                                div(class="event-show") 
                                    div(class="event-show-header") Eventos
                                    div {{log.events}}
                                div(class="source-show")
                                    div(class="source-show-header") Coletado pelo token do usuário
                                    div {{log.collector}}
            

</template>

<script>
window.onclick = function(event) {
  if (!event.target.matches('.type-dropdown-button')) {
    let dropdowns = document.getElementsByClassName("type-dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  if (!event.target.matches('.order-dropdown-button')) {
    let dropdowns = document.getElementsByClassName("order-dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  if (!event.target.matches('.search-dropdown-button')) {
    var dropdowns = document.getElementsByClassName("search-dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

export default {
    data(){
        return{
            token:'',
            user:'',
            logs:'',
            showLog:false,
            log:'',
            type:'Todos',
            order:'Ordenar por',
            search:'Buscar por',
            searchedlog:'',
            selected:[],
        }
    },
    created(){
        sessionStorage['logs']=JSON.stringify([
                {
                    id:'1',
                    level:'Error',       
                    source:'127.0.0.1',
                    date:'08/09/2019 09:20',
                    title:'Título do log Título do log Título do log Título do log 1',
                    details:"Detalhe do log Detalhe do log Detalhe do log 1<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 1<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 1<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 1<br/>",
                    events:'10',
                    type:'Homologation',         
                    collector:'Poets of the Fall'
                },
                {
                    id:'2',
                    level:'Debug',       
                    source:'10.0.0.1',
                    date:'08/09/2019 10:40',
                    title:'Título do log Título do log Título do log Título do log 2',
                    details:"Detalhe do log Detalhe do log Detalhe do log 2<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 2<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 2<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 2<br/>",
                    events:'200',
                    type:'Homologation',         
                    collector:'The Weeknd'
                },
                {
                    id:'3',
                    level:'Warning',       
                    source:'10.0.0.1',
                    date:'08/09/2019 11:50',
                    title:'Título do log Título do log Título do log Título do log 3',
                    details:"Detalhe do log Detalhe do log Detalhe do log 3<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 3<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 3<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 3<br/>",
                    events:'800',
                    type:'Homologation',         
                    collector:'James Young'
                },
                {
                    id:'4',
                    level:'Warning',       
                    source:'12.0.0.1',
                    date:'08/09/2019 15:01',
                    title:'Título do log Título do log Título do log Título do log 4',
                    details:"Detalhe do log Detalhe do log Detalhe do log 4<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 4<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 4<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 4<br/>",
                    events:'700',
                    type:'Dev',         
                    collector:'Powerwolf'
                },
                {
                    id:'5',
                    level:'Error',       
                    source:'12.0.0.1',
                    date:'08/09/2019 14:20',
                    title:'Título do log Título do log Título do log Título do log 5',
                    details:"Detalhe do log Detalhe do log Detalhe do log 5<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 5<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 5<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 5<br/>",
                    events:'250',
                    type:'Dev',        
                    collector:'Whitesnake'
                },
                {
                    id:'6',
                    level:'Debug',       
                    source:'10.0.0.1',
                    date:'08/09/2019 16:10',
                    title:'Título do log Título do log Título do log Título do log 6',
                    details:"Detalhe do log Detalhe do log Detalhe do log 6<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 6<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 6<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 6<br/>",
                    events:'300',
                    type:'Dev',       
                    collector:'Poets of the Fall'
                },
                {
                    id:'7',
                    level:'Warning',       
                    source:'127.0.0.1',
                    date:'08/09/2018 16:25',
                    title:'Título do log Título do log Título do log Título do log 7',
                    details:"Detalhe do log Detalhe do log Detalhe do log 7<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 7<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 7<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 7<br/>",
                    events:'50',
                    type:'Dev',      
                    collector:'Indochine'
                },
                {
                    id:'8',
                    level:'Error',       
                    source:'127.0.0.1',
                    date:'08/09/2017 11:00',
                    title:'Título do log Título do log Título do log Título do log 8',
                    details:"Detalhe do log Detalhe do log Detalhe do log 8<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 8<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 8<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 8<br/>",
                    events:'30',
                    type:'Production',        
                    collector:'Kiss'
                },
                {
                    id:'9',
                    level:'Warning',       
                    source:'127.0.0.1',
                    date:'08/09/2018 11:15',
                    title:'Título do log Título do log Título do log Título do log 9',
                    details:"Detalhe do log Detalhe do log Detalhe do log 9<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 9<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 9<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 9<br/>",
                    events:'60',
                    type:'Production',        
                    collector:'Kiss'
                },
                {
                    id:'10',
                    level:'Warning',       
                    source:'127.0.0.1',
                    date:'08/09/2018 08:40',
                    title:'Título do log Título do log Título do log Título do log 10',
                    details:"Detalhe do log Detalhe do log Detalhe do log 10<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 10<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 10<br/>"+
                            "Detalhe do log Detalhe do log Detalhe do log 10<br/>",
                    events:'250',
                    type:'Production',       
                    collector:'3 Door Down'
                },
            ])
    },
    beforeMount(){
        this.token=sessionStorage['token']
        this.user=sessionStorage['user']
        this.logs =JSON.parse(sessionStorage['logs'])
    },
    watch:{
        order(value){
            this.orderLogs(value)
        },
        type(value){
            this.searchedlog = ''
            this.typeLogs(value)
        },
        searchedlog(value){
            if (value===''){
                this.typeLogs(this.type)
            }
        }
    },
    methods:{
        displayLog(value){
            this.log = this.logs.find((log)=>{return log.id === value})
            this.showLog = true
        },
        hideLog(){
            this.log=''
            this.showLog = false
        },
        dropdownSelect(value) {
            document.getElementById(value).classList.toggle("show");
        },
        orderLogs(value){
            if (value==="Ordenar por"){
                this.logs = this.logs
            }
            if (value==="Level"){
                let tmp = this.logs
                this.logs = [].concat(tmp.filter((element)=>{return element['level']==='Error'}),
                                      tmp.filter((element)=>{return element['level']==='Warning'}),
                                      tmp.filter((element)=>{return element['level']==='Debug'}))
            }
            if (value==="Frequência"){
                let tmp = this.logs
                this.logs = tmp.sort((a,b)=>{return parseInt(b['events']) - parseInt(a['events'])})
            }
        },
        typeLogs(value){
            if(value==="Todos"){
                this.logs = JSON.parse(sessionStorage['logs'])
            }
            if (value==="Produção"){
                let tmp = JSON.parse(sessionStorage['logs'])
                this.logs = tmp.filter((element)=>{return element['type']==='Production'})
            }
            if (value==="Homologação"){
                let tmp = JSON.parse(sessionStorage['logs'])
                this.logs = tmp.filter((element)=>{return element['type']==='Homologation'})
            }
            if (value==="Dev"){
                let tmp = JSON.parse(sessionStorage['logs'])
                this.logs = tmp.filter((element)=>{return element['type']==='Dev'})
            }
            this.orderLogs(this.order)

        },
        searchLogs(){
            this.typeLogs(this.type)
            if (this.search==='Origem'){
                this.logs = this.logs.filter((element)=>{return element['source'].toLowerCase().includes(this.searchedlog.toLowerCase())})
            }
            if (this.search==='Descrição'){
                this.logs = this.logs.filter((element)=>{return element['details'].toLowerCase().includes(this.searchedlog.toLowerCase())})
            }
            if (this.search==='Título'){
                this.logs = this.logs.filter((element)=>{return element['title'].toLowerCase().includes(this.searchedlog.toLowerCase())})
            }
            if (this.search==='Coletor'){
                this.logs = this.logs.filter((element)=>{return element['collector'].toLowerCase().includes(this.searchedlog.toLowerCase())})
            }
            if (this.search==='Data'){
                this.logs = this.logs.filter((element)=>{return element['date'].toLowerCase().includes(this.searchedlog.toLowerCase())})
            }
            if (this.search==='Buscar por'){
                let tmp = []
                let keys = ['level','source','date','title','details','events','collector','type']
                for(let key of keys){
                    tmp = tmp.concat(this.logs.filter((element)=>{return element[key].toLowerCase().includes(this.searchedlog.toLowerCase())}))
                    this.logs = this.logs.filter((element)=>!tmp.includes(element));
                }
                this.logs = tmp
            }
        },
        cardLongTap(value){
            this.selected.push(value)
        },
        isSelected(value){
            return this.selected.includes(value)
        },
        select(value){
            if (this.selected.includes(value)){
                this.selected = this.selected.filter((element)=>{return element!=value})
            }
            else{
                this.selected.push(value)
            } 
        },
        hasSelected(){
            if (this.selected.length > 0){
                return true
            }
            else{
                return false
            }
        },
        deleteSelected(){
            this.logs = this.logs.filter((element)=>{return !this.selected.includes(element['id'])})
            this.selected = []
        },
        archiveSelected(){
            this.deleteSelected()
        }
    },

}
</script>

<style lang="scss">
@media screen{
    .header{
        background-color: #0063b1;
        color: #ffffff;
        font-weight: 600;
        font-size: 24px;
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .header > div{
        margin: 0 25px 0 15px;
    }
    .usericon{
        height: 40px;
        width: 40px;
        line-height: 40px;
        border-radius: 50%;
        border: 1px solid white;
        background-color: #ffffff;
        color: #0063b1;
        text-align: center;
        cursor: pointer;
        padding-right: 1px;
    }
    .main-container{
        display: flex;
        background-color: #f4f4f4;
    }
    .search{
        background-color: #f4f4f4;
        display: flex;
        align-items: center;
    }
    .menu{
        color:#686565;
        font-weight: 400;   
    }
    .type-dropdown-button{
        font-size:18px;
        border: none;
        border:1 solid #808080;
        border-radius: 5px 5px 5px 5px;
        width: 150px;
        margin-right: 15px;
        cursor: pointer;
    }
    .type-dropdown{
        position: relative;
        display: inline-block;
    }
    .type-dropdown-content{
        display: none;
        position: absolute;
        background-color: #f4f4f4;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        width:100%;
    }
    .type-menu{
        display:flex;
        flex-direction: column;
        width:100%;
    }
    .type-dropdown-content p{
        padding-left: 5px;
        width: 100%;
        cursor: pointer;  
    }
    .type-dropdown-content div p:hover{
        background-color: #beb7b7;
    }
    .order-dropdown-button{
        font-size:18px;
        border: none;
        border:1 solid #808080;
        border-radius: 5px 5px 5px 5px;
        width: 150px;
        margin-right: 15px;
        cursor: pointer;
    }
    .order-dropdown{
        position: relative;
        display: inline-block;
    }
    .order-dropdown-content{
        display: none;
        position: absolute;
        background-color: #f4f4f4;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        width:100%;
    }
    .order-menu{
        display:flex;
        flex-direction: column;
        width:100%;
    }
    .order-dropdown-content p{
        padding-left: 5px;
        width: 100%;
        cursor: pointer;  
    }
    .order-dropdown-content div p:hover{
        background-color: #beb7b7;
    }
    .search-dropdown-button{
        font-size:18px;
        border: none;
        border:1 solid #808080;
        border-radius: 5px 5px 5px 5px;
        width: 130px;
        margin-right: 15px;
        cursor: pointer;
    }
    .search-dropdown{
        position: relative;
        display: inline-block;
    }
    .search-dropdown-content{
        display: none;
        position: absolute;
        background-color: #f4f4f4;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        width:100%;
    }
    .search-menu{
        display:flex;
        flex-direction: column;
        width:100%;
    }
    .search-dropdown-content p{
        padding-left: 5px;
        width: 100%;
        cursor: pointer;  
    }
    .search-dropdown-content div p:hover{
        background-color: #beb7b7;
    }
    .search-container{
        display: flex;
        height: 40px;
    }
    .show{
        display: block;
    }
    .search-container > div{
        height:40px;
        line-height: 40px;
        position:relative;
        left: 25px;
        color: #808080;
    }
    .search-container > input{
        background-color: transparent;
        border: none;
        outline: none;
        padding-left: 30px;
        color: #808080;
        height:40px;
        line-height: 40px;
        font-size: 18px;
    }
    .main{
        background-color: #eaeaea;
    }
    .main-info{
        cursor: pointer;
    }
    .token{
        background-color: #f9f9f9;
        color: #808080;
        font-size: 18px;
        padding-left: 1.3%;
    }
    .log-card-container{
        width: 95%;
        background-color: #ffffff;
        margin-top: 15px;
        display:flex;
    }
    .log-card{
        display:flex;
        width: 100%;
    }
    .collector-container{
        display: flex;
        height: 20px;
        line-height: 20px;
    }
    .collector-icon{
        color: rgb(216, 97, 97);
    }
    .source-icon{
        color: rgb(140, 163, 177);
        margin-left: 13px;
        margin-right: 2px;
    }
    .title-info{
        font-size: 19px; 
        display: inline-block;
        width: 100%;
        max-width: 100%;
        height:25px;
        line-height: 25px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 30px;
    }
    .date-info{
        font-size:16px;
        line-height: 16px;
    }
    .log-show-container{
        display:flex;
        flex-direction: column;
        align-items: center;
        margin-top:7px;
    }
    .log-show{
        width: 95%;
        background-color: #ffffff;
        margin-top: 15px;
        padding-top: 10px;
        padding-left: 20px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: baseline;
    }
    .back-container{
        display:flex;
        line-height: 28px;
        height:25px;
        cursor: pointer;
        color:#0063b1;
    }
    .voltar{
        height:25px;
        line-height: 25px;
        padding-left: 5px;
        font-size:20px;
    }
    .info-show{
        margin-top: 30px;
        font-weight: 500;
        color:#696868;
    }
    .main-show{
        display:flex;
        width:100%;
    }
    .title-details-show{
        color:#696868;
    }
    .header-show{
        font-size: 22px;
        font-weight: 500;
        margin-bottom: 10px;
    }
    .content-show{
        margin-bottom: 20px;
    }
    .level-show{
        background-color: lightgray;
        box-sizing: padding-box;
        width:80px;
        padding-left: 10px;
        padding-right: 10px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
    }
    .event-show{
        color: #808080;
        margin-top: 10px;
    }
    .source-show{
        color: #808080;
        margin-top: 10px;
    }
    .event-show-header{
        font-weight: 500;
        color:#696868;
    }
    .source-show-header{
        font-weight: 500;
        color:#696868;
    }
    .selected{
        background-color: #beb7b7;
        border: 2px solid #0063b1;
    }
    .selected-icon{
        color:#0063b1;
        line-height: 40px;

    }
    .selection-container{
        line-height: 40px;
        min-width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .selected-action{
        display: flex;
        align-items: center;
        background-color: #f4f4f4;
        color: #beb7b7;
        height: 40px;
        padding-left: 25px;
    }
    .selected-action > button {
        height: 25px;
    }
}
@media screen and(max-width:999px){
    .main-container{
        min-height:900px;
    }
    .search{
        flex-direction: column;
        min-height:90px;
    }
    .dropdown-container{
        display:flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        padding-top: 4px;
        line-height: 35px;
        padding-left: 10px;
    }
    .search-container{
        width: 100%;
        padding-left: 3%;
    }
    .main{
        width: 100%;
        padding-bottom: 20px;
    }
    .token{
        min-height:30px;
        max-height: 60px;
        line-height: 30px;
    }
    .log-container{
        display:flex;
        flex-direction: column;
        align-items: center;
        margin-top:7px;
        margin-bottom:22px;
        padding-right: 2.5%;

    }
    .log-card-container{
        flex-direction: column;
        justify-content: center;
    }
    .log-card{
        flex-direction: column;
        padding-left:15px;
        justify-content: center;
        cursor: pointer;
        height: 210px;
    }
    .collector-container{
        font-size: 18px;
    }
    .title-info{
        font-size: 19px; 
        margin-top: 5px; 
        color: #4D4D4D;
    }
    .date-info{
        color: #4D4D4D;
        margin-bottom: 7px;
    }
    .log-level{
        background-color: lightgray;
        font-size: 18px;
        color: #4D4D4D;
        width: 80px;
        text-align: center;
        margin-top: 3px;
    }
    .event-level{
        margin-top:5px;
        color: #4D4D4D;
        font-size: 18px;
    }
    .log-show-container{
        padding-right: 2.5%;
        margin-bottom: 42px;
    }
    .info-show{
        font-size: 24px;
    }
    .main-show{
        flex-direction: column;
        margin-top:20px;
    }
    .level-show{
        color:#4D4D4D;
    }
    .event-show{
        line-height: 30px;
    }
    .source-show{
        margin-bottom: 20px;
    }
    .event-show-header{
        font-size:20px;
    }
    .source-show-header{
        font-size:20px;
    }
    .selection-container{
        justify-content: flex-end;
        margin-bottom: -10px;
    }
    .selected-icon{
        width: 100%;
        text-align: right;
        padding-right: 20px;
    }

}
@media screen and (min-width:1000px){
    .main-container{
        justify-content: center;
        min-height: 900px;
    }
    .search{
        padding-left: 22px;
    }
    .dropdown-container{
        display: flex;
        align-items: center;
        padding-bottom: 5px;
    }
    .type-search{
        display:flex;
        flex-direction: column;
        position: static;
        border-radius: 5px 5px 5px 5px;
        border: 1px solid #808080;
        height: 30px;
    }
    .options-search{
        display: inline-block;
        position: absolute;
        background-color: #f4f4f4;
    }
    .main{
        min-width: 1000px;
        width: 70%;
        min-height: 100%;
        padding-bottom: 30px;
    }
    .token{
        height:40px;
        line-height: 40px;
    }
    .log-container{
        display:flex;
        flex-direction: column;
        align-items: center;
        margin-top:7px; 
    }
    .log-card-container{
        height: 80px;
        align-items: center;
    }
    .log-card{
        padding-left:16px;
        align-items: center;
    }
    .log-card > div{
        color:#4D4D4D;
        font-size: 18px;
    }
    .collector-container{
        font-size: 16px;
    }
    .main-info{
        min-width: 550px;
        width: 50%;
        max-width: 50%;
    }
    .log-level{
        margin-left:5%;
        margin-right: 10%;
        border-left: 1px solid #808080;
        padding-left: 40px;
        width: 170px;
    }
    .event-level{
        width: 200px;
    }
    .log-show-container{
        margin-bottom: 52px;
        height: auto;
    }
    .info-show{
        font-size: 25px;
    }
    .main-show{
        justify-content: space-between;
        margin-top:40px;
    }
    .level-events-collector-show{
        margin-right: 50px;
    }
    .level-show{
        margin: 0 auto;
    }
}
</style>