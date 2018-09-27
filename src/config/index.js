let production = {
  NODE_ENV: 'production',
  DEBUG_MODE: false,
  APP_NAME: 'Мой Технопарк',
  APP_ID: 'bootstrap',
  API_URL: 'http://90.150.146.248:3333/api/v1/'
}

let development = Object.assign({}, production, {
  NODE_ENV: 'development',
  API_URL: 'http://90.150.146.248:3333/api/v1/',
 
  DEBUG_MODE: true
})

let config = {
  development,
  production
}

let env = process.env.NODE_ENV || 'development'
export default config[env]
