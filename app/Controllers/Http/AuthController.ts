import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

export default class AuthController {

    async redirect({ ally }: HttpContextContract) {
        return ally.use('google').redirect();
    }

    async handleCallback({ params, ally, auth, response, session }: HttpContextContract) {
        const google = ally.use('google');

        const googleUser = await google.user();

        const user = await User.firstOrCreate({
            email: googleUser.email,
        }, {
            name: googleUser.name,
            accessToken: googleUser.token.token,
            //isVerified: googleUser.emailVerificationState === 'verified'
        })
        await auth.use('web').login(user);
        return response.redirect().toRoute('home');
    }
}
