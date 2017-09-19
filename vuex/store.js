import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
	dataone:"old dataone",
	datatwo:"old datatwo"
}

const mutations = {
	CHANGE_DATAONE(){
		state.dataone = "new dataone";
	},
	CHANGE_DATATWO(){
		state.datatwo = "new datatwo";
	}
}

const actions = {
	dispatchone({commit}){
		commit('CHANGE_DATAONE');
	},
	dispatchtwo({commit}){
		commit('CHANGE_DATATWO');
	}
}

const getters = {
	dataone:state=>state.dataone,
	datatwo:state=>state.datatwo
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})