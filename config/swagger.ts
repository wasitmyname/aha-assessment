import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'
import Env from '@ioc:Adonis/Core/Env'

export default {
	uiEnabled: true, //disable or enable swaggerUi route
	uiUrl: 'docs', // url path to swaggerUI
	specEnabled: true, //disable or enable swagger.json route
	specUrl: '/swagger.json',
	swaggerAuth: {
		authMiddleware: 'swaggerAuth',
		authCredentials: {
			login: Env.get('SWAGGER_AUTH_LOGIN'),
			password: Env.get('SWAGGER_AUTH_PASSWORD')
		}
	},

	middleware: [], // middlewares array, for protect your swagger docs and spec endpoints

	options: {
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'Aha Assessment',
				version: '1.0.0',
				description: 'API docs'
			},
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT"
					}
				}
			},
			security: [{
				bearerAuth: []
			}]
		},

		apis: [
			'docs/swagger/**/*.yml',
			'routes/api.ts'
		],
		basePath: '/'
	},
	mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
  	specFilePath: 'docs/swagger.json'
} as SwaggerConfig
