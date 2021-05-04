export const state = () => ({
    bills: [],
    billsCounter: null,
    value: {
        numb: { type: 'number', require: false, label: 'Номер', cols: 2 },
        date: { type: 'string', require: false, label: 'Дата', cols: 4 },
        client: { type: 'reference', target: 'client', require: true, label: 'Клиент', cols: 6 },
        task: {
            type: 'multiple', require: true, label: 'Услуги', cols: 12,
            value: {
                desc: { type: 'textarea', require: false, label: 'Описание', cols: 5, sort: 1 },
                count: { type: 'number', require: false, label: 'Кол-во', cols: 1, sort: 2 },
                unit: { type: 'string', require: false, label: 'Ед', cols: 1, sort: 3 },
                price: { type: 'number', require: false, label: 'Цена', cols: 2, sort: 4 },
                sum: { type: 'text', require: false, label: 'Сумма', cols: 2, sort: 5 }
            }
        },
        sum: { type: 'text', require: false, label: 'Сумма', suffix: 'руб.', cols: 12 }
    },
    isLoad: false
})

export const actions = {
    save: function ({ dispatch }, payload) {
        let data = { ...payload }
        let clientId = (typeof payload.client === 'object') ? payload.client.id : payload.client

        data.client = this.$fire.firestore.doc('/clients/' + clientId)

        for (let val in data)
            if (data.hasOwnProperty(val) && !data[val])
                delete data[val]

        if (data.sum !== null)
            data.gross = data.sum * 0.06

        if (data.id) {
            delete data['id']
            dispatch('update', { id: payload.id, data: data })
        } else dispatch('create', data)
    },
    create: function ({ dispatch, state }, payload) {
        this.$fire.firestore
            .collection("bills").add(payload)
            .then(() => {
                this.$fire.firestore.collection("billsCounter").doc("counter").update({ data: state.billsCounter + 1 });
                dispatch('addAlert', { status: true, message: `Счет №${payload.numb} добавлен` }, { root: true })
            })
            .catch(() => {
                dispatch('addAlert', { status: false, message: `При добавлении счета произошла ошибка` }, { root: true })
            })
    },
    update: function ({ dispatch }, payload) {
        this.$fire.firestore
            .collection("bills").doc(payload.id).update(payload.data)
            .then(() => {
                dispatch('addAlert', { status: true, message: `Счет №${payload.data.numb} изменен` }, { root: true })
                return true
            })
            .catch(() => {
                dispatch('addAlert', { status: false, message: `При изменении счета произошла ошибка` }, { root: true })
                return false
            })
    },
    delete: function ({ state, dispatch }, payload) {
        let item = { ...state.bills.find(item => item.id == payload) }
        this.$fire.firestore
            .collection("bills").doc(payload).delete().then(() => {
                dispatch('addAlert', { status: true, message: `Счет №${item.numb} удален` }, { root: true })
            }).catch(() => {
                dispatch('addAlert', { status: false, message: `При удалении счета произошла ошибка` }, { root: true })
            });
    },
    getBillList: function ({ commit, state }) {
        if (state.isLoad) return
        this.$fire.firestore
            .collection("bills").onSnapshot((snapshots) => {
                let list = []
                snapshots.forEach(doc => {
                    let bill = doc.data()
                    bill.client.get().then((client) => {
                        if (client.exists)
                            commit('setBillClient', { id: doc.id, value: { id: client.id, ...client.data() } })
                    })
                    bill.client = {}
                    list.push({ id: doc.id, ...bill })
                })
                commit('setBill', list)
                if (!state.isLoad) commit('isLoad', true)
            })
    },
    getBillsCounter({ commit, state }) {
        if (state.billsCounter === null)
            this.$fire.firestore
                .collection("billsCounter").doc("counter")
                .onSnapshot((snapshot) => {
                    commit('setBillsCount', snapshot.data().data)
                })
    }
}

export const mutations = {
    setBillClient: (state, { id, value }) => {
        state.bills.find(item => item.id === id).client = value
    },
    setBill: (state, payload) => state.bills = payload,
    setBillsCount: (state, payload) => state.billsCounter = payload,
    isLoad: (state, payload) => state.isLoad = payload
}

export const getters = {
    getId: (state, id) => state.bills.find(item => item.id == id),
    list: state => state.bills,
    value: state => state.value,
    billsCounter: state => state.billsCounter
}