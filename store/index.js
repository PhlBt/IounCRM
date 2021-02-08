export const state = () => ({
    user: false,
    menu: {
        0: [
            { icon: 'mdi-cart', title: 'Заказ', to: '/' },
            { icon: 'mdi-store', title: 'Магазины', to: '/shop' },
            { icon: 'mdi-face-recognition', title: 'Сотрудники', to: '/worker' },
            { icon: 'mdi-cup', title: 'Товары', to: '/product' }
        ],
        1: [
            { icon: 'mdi-cart', title: 'Заказ', to: '/' },
            { icon: 'mdi-store', title: 'Магазины', to: '/shop' },
            { icon: 'mdi-face-recognition', title: 'Сотрудники', to: '/worker' },
            { icon: 'mdi-cup', title: 'Товары', to: '/product' }
        ],
        2: [
            { icon: 'mdi-cart', title: 'Заказ', to: '/' },
            { icon: 'mdi-store', title: 'Магазины', to: '/shop' },
            { icon: 'mdi-face-recognition', title: 'Сотрудники', to: '/worker' },
            { icon: 'mdi-cup', title: 'Товары', to: '/product' }
        ]
    },
})

export const mutations = {
    setUser: (state, payload) => {
        state.user = {
            uid: payload.uid,
            phone: payload.phoneNumber
        }
    },
    unsetUser: state => state.user = false
}

export const actions = {
    onAuthStateChangedAction: ({ commit }, { authUser }) => {
        if (!authUser) {
            commit('unsetUser')
        } else {
            commit('setUser', authUser)
        }
    }
}

export const getters = {
    user: state => state.user,
    menu: state => state.menu[0],
}