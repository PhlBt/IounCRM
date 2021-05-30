export const state = () => ({
    status: [],
    isLoad: false
})

export const actions = {
    getStatusList: function ({ commit, state }) {
        if (state.isLoad) return
        this.$fire.firestore
            .collection("taskStatus").orderBy("sort")
            .get().then((query) => {
                let list = []
                query.forEach(doc => list.push({ id: doc.id, ...doc.data() }))
                commit('setStatus', list)
                commit('isLoad', true)
            })
    },
}

export const mutations = {
    setStatus: (state, payload) => state.status = payload,
    isLoad: (state, payload) => state.isLoad = payload
}

export const getters = {
    get: state => id => state.status.find(item => item.id == id),
    list: state => state.status,
}
