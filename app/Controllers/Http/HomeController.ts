import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {

    public async index({ view, auth }: HttpContextContract) {
        // const user = await auth.use('web').authenticate();
        //console.log(user);
        await auth.use('web').check()
        //console.log(auth.use('web'));
        if (auth.use('web').isLoggedIn) {
            const user = await auth.use('web').authenticate();
            return view.render('welcome', { email: user.email })
        }

        return view.render('login')
    }
}
