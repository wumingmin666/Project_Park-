import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

const actions={}
const mutations={

}
const state={
	token:"",
	myDetail:{
		name:"",
		phone:"",
	},
	location:{
		longitude:"",
		latitude:""
	}
}


//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state,
	actions,
	mutations,
})
export default store