export default function ({ store, redirect, route }) {
    let authed = store.getters.user
    
    if (!authed && !/login/i.test(route.name)) 
        return redirect({ name: 'login' })
    
    if (!!authed && /login/i.test(route.name))
        return redirect('/')
}