'use strict'

const Route = use('Route')

Route.post('users', 'USerController.store')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')