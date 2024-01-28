import dotenv from 'dotenv'

if(process.env.NODE_ENV === "dev") {
    const configFile = `./.env.${process.env.NODE_ENV}`
    dotenv.config({ path: configFile })
} else {
    dotenv.config()
}

interface AppConfig {
    PORT? : string,
    URL?: string,
    APP_SECRET?: string
}

const config: AppConfig = {
    PORT: process.env.PORT,
    URL: process.env.URL,
    APP_SECRET: process.env.APP_SECRET
}

export default config