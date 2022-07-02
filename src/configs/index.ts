export default {
    redis: {
        host: process.env.REDIS_HOST!,
        password: process.env.REDIS_PASSWORD,
        port: Number(process.env.REDIS_PORT),
    },
    mail: {
        config: {
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        },
        default: {
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
        }
    }
};
