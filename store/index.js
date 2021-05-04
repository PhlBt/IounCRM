export const state = () => ({
    title: '',
    companyName: 'Ioun CRM',
    alerts: [],
    menu: [
        { icon: 'mdi-home-circle-outline', title: 'Главная', to: '/' },
        { icon: 'mdi-card-bulleted-settings-outline', title: 'Задачи', to: '/tasks' },
        { icon: 'mdi-face-recognition', title: 'Клиенты', to: '/clients' },
        { icon: 'mdi-currency-rub', title: 'Счета', to: '/bills' }
    ]
})

export const actions = {
    addAlert({ commit, state }, payload) {
        if (payload.message.length > 0) {
            let type = (!!payload.status)
                ? 'success' : 'error'

            let id = (state.alerts.length > 0)
                ? 1 + state.alerts[state.alerts.length - 1].id
                : 0

            setTimeout(() => { commit('removeAlert', id) }, 10000)

            commit('addAlert', {
                id: id,
                type: type,
                message: payload.message
            })
        }
    }
}

export const mutations = {
    setTitle: (state, payload) => state.title = payload + ' - ' + state.companyName,
    addAlert: (state, payload) => state.alerts.push(payload),
    removeAlert(state, payload) {
        for (let item in state.alerts)
            if (payload === state.alerts[item].id)
                state.alerts.splice(item, 1)
    },
}

export const getters = {
    title: state => state.title,
    alerts: state => state.alerts,
    menu: state => state.menu,
}