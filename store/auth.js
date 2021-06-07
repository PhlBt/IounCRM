let localUser = window.localStorage.getItem('user')

export const state = () => ({
    user: !!localUser ? JSON.parse(localUser) : { auth: false }
})

export const mutations = {
    setUser: (state, payload) => {
        state.user.auth = true
        if (!!payload.uid) state.user.uid = payload.uid
        if (!!payload.name) state.user.name = payload.name
        if (!!payload.project) state.user.project = payload.project
    },
    unsetUser: state => state.user = { auth: false }
}

export const actions = {
    onAuthStateChangedAction: ({ dispatch }, user) => {
        if (!user.authUser) return dispatch('unsetUser')
        dispatch('setUser', user)
    },
    setUser: function ({ commit }, user) {
        this.$fire.firestore
            .collection("users").doc(user.authUser.uid)
            .get().then((doc) => {
                if (!doc.exists) return
                let data = doc.data()
                window.localStorage
                    .setItem('user', JSON.stringify({
                        auth: true,
                        uid: user.authUser.uid,
                        name: data.name
                    }))
                commit('setUser', { ...user.authUser, ...data })
            })
    },
    unsetUser: function ({ commit }) {
        window.localStorage.removeItem('user')
        return commit('unsetUser')
    },
    login: function ({ }, payload) {
        this.$fire.auth
            .signInWithEmailAndPassword(payload.email, payload.password)
            .catch((error) => console.log(error));
    },
    registration: function ({ }, payload) {
        this.$fire.auth
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then((userCredential) => {
                this.$fire.firestore
                    .collection("users")
                    .doc(userCredential.user.uid)
                    .set({
                        name: payload.name,
                        project: payload.project,
                    });
            })
            .catch((error) => console.log(error));
    },
    logout: function () { this.$fire.auth.signOut() }
}

export const getters = {
    user: state => state.user,
    isAuthed: state => state.user.auth
}