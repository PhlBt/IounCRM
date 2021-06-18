export const state = () => ({
    tasks: [],
    value: {
        client: { type: 'reference', target: 'client', require: true, label: 'Клиент', cols: 6 },
        status: { type: 'reference', target: 'taskStatus', require: false, label: 'Статус', cols: 6, default: 'dZsbVDf3kh6dvxHgh8uA' },
        name: { type: 'string', require: true, label: 'Название', cols: 12 },
        assessment: { type: 'string', require: false, label: 'Оценка', cols: 12 },
        description: { type: 'textarea', require: false, label: 'Описание', cols: 12, rows: 4 },
        time: { type: 'timer', label: 'Время', editable: true, cols: 12 }
    },
    isLoad: false
})

export const actions = {
    save: function ({ dispatch, rootGetters }, payload) {
        let data = { ...payload }
        let clientId = (typeof payload.client === 'object') ? payload.client.id : payload.client
        data.client = this.$fire.firestore.doc(`${rootGetters['auth/project']}/data/clients/${clientId}`)

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
    create: function ({ dispatch, rootGetters }, payload) {
        this.$fire.firestore
            .collection(rootGetters['auth/project']).doc('data')
            .collection('tasks').add(payload)
            .then(() => {
                dispatch('addAlert', { status: true, message: `Задача ${payload.name} добавлена` }, { root: true })
            })
            .catch(() => {
                dispatch('addAlert', { status: false, message: `При добавлении задачи произошла ошибка` }, { root: true })
            })
    },
    update: function ({ state, dispatch, rootGetters }, payload) {
        let item = { ...state.tasks.find(item => item.id == payload.id) }
        this.$fire.firestore
            .collection(rootGetters['auth/project']).doc('data')
            .collection('tasks').doc(payload.id)
            .update(payload.data)
            .then(() => {
                dispatch('addAlert', { status: true, message: `Задача ${item.name} изменена` }, { root: true })
            })
            .catch(() => {
                dispatch('addAlert', { status: false, message: `При изменении задачи произошла ошибка` }, { root: true })
            })
    },
    delete: function ({ state, dispatch, rootGetters }, payload) {
        let item = { ...state.tasks.find(item => item.id == payload) }
        this.$fire.firestore
            .collection(rootGetters['auth/project']).doc('data')
            .collection('tasks').doc(payload).delete().then(() => {
                dispatch('addAlert', { status: true, message: `Задача ${item.name} удалена` }, { root: true })
            }).catch(() => {
                dispatch('addAlert', { status: false, message: `При удалении задачи произошла ошибка` }, { root: true })
            });
    },
    getTaskList: function ({ commit, state, rootGetters }) {
        if (state.isLoad) return
        this.$fire.firestore
            .collection(rootGetters['auth/project']).doc('data')
            .collection('tasks').where('status', '!=', 'ugE8LIW2VtjXnO7KcPuO')
            .onSnapshot((snapshots) => {
                let list = []
                snapshots.forEach(doc => {
                    let task = doc.data()
                    task.client = rootGetters['client/get'](task.client.id)
                    list.push({ id: doc.id, ...task })
                })
                commit('setTask', list)
                commit('isLoad', true)
            })
    },
}
export const mutations = {
    setTask: (state, payload) => state.tasks = payload,
    isLoad: (state, payload) => state.isLoad = payload,
}

export const getters = {
    get: state => id => state.tasks.find(item => item.id == id),
    list: state => state.tasks,
    value: state => state.value,
}
