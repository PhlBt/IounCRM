export default function ({ store, redirect, route }) {
    if (!store.getters.isAuthed && !/login/i.test(route.name)) 
        return redirect({ name: 'login' })
}