export const state = () => ({
    clients: [],
    clientsSum: {},
    value: {
        name: { type: 'string', require: true, label: 'Название', cols: 6 },
        phone: { type: 'number', require: false, label: 'Телефон', cols: 6 },
        email: { type: 'string', require: false, label: 'Электронная почта', cols: 6 },
        legalName: { type: 'string', require: false, label: 'Юридическое название', cols: 6 },
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

        if (data.id) {
            let id = data.id
            delete data['id']

            dispatch('update', { id: id, data: data })
        } else {
            for (let val in data)
                if (data.hasOwnProperty(val) && !data[val])
                    delete data[val]

            dispatch('create', data)
        }
    },
    create: function ({ dispatch }, payload) {
        this.$fire.firestore
            .collection("clients").add(payload)
            .then(() => {
                dispatch('addAlert', { status: true, message: `Клиент ${payload.name} добавлен` }, { root: true })
            })
            .catch(() => {
                dispatch('addAlert', { status: false, message: `При добавлении клиента произошла ошибка` }, { root: true })
            })
    },
    update: function ({ dispatch }, payload) {
        this.$fire.firestore
            .collection("clients").doc(payload.id).set(payload.data)
            .then(() => {
                dispatch('addAlert', { status: true, message: `Клиент ${payload.data.name} изменен` }, { root: true })
                return true
            })
            .catch(() => {
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
    },
}

export const mutations = {
    setClient: (state, payload) => state.clients = payload,
    setClientSum: (state, payload) => state.clientsSum[payload.id] = payload.sum,
    isLoad: (state, payload) => state.isLoad = payload
}

export const getters = {
    get: state => id => state.clients.find(item => item.id == id),
    list: state => state.clients,
    value: state => state.value,
}
