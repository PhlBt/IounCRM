export const state = () => ({
    clients: [],
    value: {
        name: { type: 'string', require: true, label: 'Название', cols: 6 },
        phone: { type: 'number', require: false, label: 'Телефон', cols: 6 },
        legalName: { type: 'string', require: false, label: 'Юридическое название', cols: 12 },
        address: { type: 'string', require: false, label: 'Адрес', cols: 6 },
        bank: { type: 'string', require: false, label: 'Банк', cols: 6 },
        inn: { type: 'number', require: false, label: 'ИНН', cols: 6 },
        bik: { type: 'number', require: false, label: 'БИК', cols: 6 },
        checkingAccount: { type: 'number', require: false, label: 'Расчетный счет', cols: 6 },
        correspondentAccount: { type: 'number', require: false, label: 'Корреспондентский счет', cols: 6 }
    },
    isLoad: false
})

export const actions = {
    save: function ({ dispatch }, payload) {
        let data = { ...payload }
        for (let val in data)
            if (data.hasOwnProperty(val) && !data[val])
                delete data[val]
        if (data.id)
            dispatch('update', data)
        else
            dispatch('create', data)
    },
    create: function ({ dispatch }, payload) {
        this.$fire.firestore
            .collection("clients").add(payload)
            .then(()=>{
                dispatch('addAlert', { status: true, message: `Клиент ${payload.name} добавлен` }, { root: true })
            })
            .catch(()=>{
                dispatch('addAlert', { status: false, message: `При добавлении клиента произошла ошибка` }, { root: true })
            })
    },
    update: function ({ dispatch }, payload) {
        let id = payload.id
        delete payload['id']

        this.$fire.firestore
            .collection("clients").doc(id).set(payload)
            .then(()=>{
                dispatch('addAlert', { status: true, message: `Клиент ${payload.name} изменен` }, { root: true })
                return true
            })
            .catch(()=>{
                dispatch('addAlert', { status: false, message: `При изменении клиента произошла ошибка` }, { root: true })
                return false
            })
    },
    delete: function ({ state, dispatch }, payload) {
        let item = { ...state.clients.find(item => item.id == payload) }
        this.$fire.firestore
            .collection("clients").doc(payload).delete().then(() => {
                dispatch('addAlert', { status: true, message: `Клиент ${item.name} удален` }, { root: true })
            }).catch(() => {
                dispatch('addAlert', { status: false, message: `При удалении клиента произошла ошибка` }, { root: true })
            });
    },
    getClientList: function ({ commit, state }) {
        if (state.isLoad) return
        this.$fire.firestore
            .collection("clients")
            .onSnapshot((snapshots) => {
                let list = []
                snapshots.forEach(doc => list.push({ id: doc.id, ...doc.data() }))
                commit('setClient', list)
                commit('isLoad', true)
            })
    }
}

export const mutations = {
    setClient: (state, payload) => state.clients = payload,
    isLoad: (state, payload) => state.isLoad = payload
}

export const getters = {
    getId: (state, id) => state.clients.find(item => item.id == id),
    list: state => state.clients,
    value: state => state.value
}