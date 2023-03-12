import Route from '@ioc:Adonis/Core/Route'

Route.on('').render('guests/welcome').as('welcome');

Route.group(() => {
  Route.get('', 'SignUpController.show').as('show')
  Route.post('submit', 'SignUpController.submit').as('submit')
  Route.get('verify', 'SignUpController.verify').as('verify')
}).prefix('signup').as('signup')

Route.group(() => {
  Route.get('', 'LinkController.show').as('show')
  Route.post('send', 'LinkController.send').as('send')
  Route.get('sent', 'LinkController.sent').as('sent')
  Route.get('verify', 'LinkController.verify').as('verify')
}).prefix('link').as('link')

Route.group(() => {
  Route.get('', 'SignInController.show').as('show')
  Route.post('submit', 'SignInController.submit').as('submit')
}).prefix('signin').as('signin')

Route.group(() => {
  Route.get(':provider/redirect', 'OauthController.redirect').as('redirect')
  Route.get(':provider/callback', 'OauthController.callback').as('callback')
}).prefix('oauth').as('oauth')

Route.group(() => {
  Route.group(() => {
    Route.get('', 'DashboardController.show').as('show')
    Route.post('users', 'DashboardController.users').as('users')
  }).prefix('dashboard').as('dashboard')

  Route.group(() => {
    Route.get('', 'ProfileController.show').as('show')
    Route.post('updateName', 'ProfileController.updateName').as('updateName')
  }).prefix('profile').as('profile')
  
  Route.group(() => {
    Route.get('', 'PasswordController.show').as('show')
    Route.post('update', 'PasswordController.update').as('update')
  }).prefix('password').as('password')
}).middleware('auth')

Route.get('signout', 'SignOutController.submit').as('signout')