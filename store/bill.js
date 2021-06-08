export const state = () => ({
    bills: [],
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
    save: function ({ dispatch, rootGetters }, payload) {
        let data = { ...payload }
        let clientId = (typeof payload.client === 'object') ? payload.client.id : payload.client

        data.client = this.$fire.firestore.doc(`/clients/${rootGetters['auth/project']}/data/${clientId}`)

        for (let val in data)
            if (data.hasOwnProperty(val) && !data[val])
                delete data[val]

        if (data.sum !== null)
            data.gross = (rootGetters['client/get'](clientId).legalName !== undefined)
                ? data.sum * 0.06
                : data.sum * 0.04

        if (data.id) {
            delete data['id']
            dispatch('update', { id: payload.id, data: data })
        } else dispatch('create', data)
    },
    create: function ({ dispatch, rootGetters }, payload) {
        this.$fire.firestore
            .collection('bills').doc(rootGetters['auth/project'])
            .collection('data').add(payload)
            .then(() => {
                dispatch('addAlert', { status: true, message: `Счет №${payload.numb} добавлен` }, { root: true })
                dispatch('updateCurrentSum', payload.client)
            })
            .catch(() => {
                dispatch('addAlert', { status: false, message: `При добавлении счета произошла ошибка` }, { root: true })
            })
    },
    update: function ({ dispatch, rootGetters }, payload) {
        this.$fire.firestore
            .collection('bills').doc(rootGetters['auth/project'])
            .collection('data').doc(payload.id).set(payload.data)
            .then(() => {
                dispatch('addAlert', { status: true, message: `Счет №${payload.data.numb} изменен` }, { root: true })
                dispatch('updateCurrentSum', payload.data.client)
            })
            .catch((e) => {
                dispatch('addAlert', { status: false, message: `При изменении счета произошла ошибка` }, { root: true })
                console.log(e);
            })
    },
    delete: function ({ state, dispatch, rootGetters }, payload) {
        let item = { ...state.bills.find(item => item.id == payload) }
        this.$fire.firestore
            .collection('bills').doc(rootGetters['auth/project'])
            .collection('data').doc(payload).delete().then(() => {
                dispatch('addAlert', { status: true, message: `Счет №${item.numb} удален` }, { root: true })
                dispatch('updateCurrentSum', item.client)
            }).catch(() => {
                dispatch('addAlert', { status: false, message: `При удалении счета произошла ошибка` }, { root: true })
            })
    },
    getBillList: function ({ commit, state, rootGetters }) {
        if (state.isLoad) return
        this.$fire.firestore
            .collection('bills').doc(rootGetters['auth/project'])
            .collection('data').onSnapshot((snapshots) => {
                let list = []
                snapshots.forEach(doc => {
                    let bill = doc.data()
                    bill.client = rootGetters['client/get'](bill.client.id)
                    list.push({ id: doc.id, ...bill })
                })
                commit('setBill', list)
                if (!state.isLoad) commit('isLoad', true)
            })
    },
    updateCurrentSum({ dispatch, getters, rootGetters }, payload) {
        let sum = 0,
            allSum = 0;
        
        getters.list.map((elem) => {
            if (elem.client.id === payload.id)
                sum += elem.sum
            allSum += elem.sum
        })
            
        this.$fire.firestore
            .collection('clients').doc(rootGetters['auth/project'])
            .collection('data').doc(payload.id).update({ sum: sum })
            .catch(() => {
                dispatch('addAlert', { status: false, message: `При обновлении дохода с клиента произошла ошибка` }, { root: true })
            })

        this.$fire.firestore
            .collection('users').doc(rootGetters['auth/user'].uid)
            .update({ 'legal.sum': allSum })
    }
}

export const mutations = {
    setBillClient: (state, { id, value }) => {
        state.bills.find(item => item.id === id).client = value
    },
    setBill: (state, payload) => state.bills = payload,
    isLoad: (state, payload) => state.isLoad = payload
}

export const getters = {
    getId: (state, id) => state.bills.find(item => item.id == id),
    list: state => state.bills,
    value: state => state.value,
}