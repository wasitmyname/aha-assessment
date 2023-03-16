import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('signup', 'SignUpController.submit').as('signup')
    Route.post('signin', 'SignInController.submit').as('signin')

    Route.group(() => {
        Route.post('get', 'LinkController.get').as('get')
    }).prefix('link').as('link')

    Route.group(() => {
        Route.group(() => {
            Route.post('', 'DashboardController.show').as('show')
            Route.post('users', 'DashboardController.users').as('users')
        }).prefix('dashboard').as('dashboard')
        
        Route.group(() => {
            Route.post('', 'ProfileController.show').as('show')
            Route.post('updateName', 'ProfileController.updateName').as('updateName')
        }).prefix('profile').as('profile')
        
        Route.group(() => {
            Route.post('change', 'PasswordController.change').as('change')
        }).prefix('password').as('password')
    }).middleware('auth')

    Route.post('signout', 'SignOutController.submit').as('signout')
}).namespace('HttpControllers/Api').prefix('api').as('api').middleware('apiGuard')