export default function ({ store, redirect, route }) {
    if (!store.getters['auth/isAuthed'] && !/login/i.test(route.name))
        return redirect({ name: 'login' })
    if (store.getters['auth/isAuthed'] && /login/i.test(route.name))
        return redirect({ name: 'home' })
}