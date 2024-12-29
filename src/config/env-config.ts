
import { Service } from 'typedi';
import dotenv from 'dotenv';
import { InvalidEnvironmentVariableError, MissingEnvironmentVariableError } from '@/common/exceptions/app.errors';

dotenv.config();
@Service()
export class EnvConfig {
    // 환경 변수 필드 정의
    readonly NODE_ENV: string;
    readonly NODE_NETWORK: string;
    readonly PORT: number;
    readonly FRONT_END_API: string;

    // Database
    readonly DB_TYPE: string;
    readonly DB_HOST_NAME: string;
    readonly DB_USER_NAME: string;
    readonly DB_PASSWORD: string;
    readonly DB_DATABASE: string;
    readonly DB_PORT: number;

    // Kakao
    readonly KAKAO_REST_API_KEY: string;
    readonly KAKAO_JAVASCRIPT_KEY: string;
    readonly KAKAO_REDIRECT_URI_LOCAL: string;
    readonly KAKAO_REDIRECT_URI_REMOTE: string;
    readonly KAKAO_CLIENT_SECRET: string;

    readonly KAKAO_TEST_REST_API_KEY: string;
    readonly KAKAO_TEST_JAVASCRIPT_KEY: string;
    readonly KAKAO_TEST_REDIRECT_URI_LOCAL: string;
    readonly KAKAO_TEST_REDIRECT_URI_REMOTE: string;
    readonly KAKAO_TEST_CLIENT_SECRET: string;

    // Email
    readonly EMAIL_SERVICE: string;
    readonly EMAIL_HOST: string;
    readonly EMAIL_PORT: number;
    readonly EMAIL_USER: string;
    readonly EMAIL_PASSWORD: string;

    // SMS
    readonly SMS_API_KEY: string;
    readonly SMS_API_SECRET: string;
    readonly SENDER_PHONE: string;

    // Redis
    readonly REDIS_URL: string;
    readonly REDIS_LOCAL_URL: string;

    // Bcrypt password
    readonly SALT_ROUNDS: number;

    constructor() {
        // 필수 환경 변수 검증
        this.NODE_ENV = this.getEnvVariable('NODE_ENV', 'development');
        this.NODE_NETWORK = this.getEnvVariable('NODE_NETWORK', 'localhost');
        this.PORT = this.getEnvVariableAsNumber('PORT', 3000);
        this.FRONT_END_API = this.getEnvVariable('FRONT_END_API');

        // Database
        this.DB_TYPE = this.getEnvVariable('DB_TYPE', 'postgres')
        this.DB_HOST_NAME = this.getEnvVariable('DB_HOST_NAME', 'localhost');
        this.DB_USER_NAME = this.getEnvVariable('DB_USER_NAME', 'root');
        this.DB_PASSWORD = this.getEnvVariable('DB_PASSWORD', 'password');
        this.DB_DATABASE = this.getEnvVariable('DB_DATABASE', 'database');
        this.DB_PORT = this.getEnvVariableAsNumber('DB_PORT', 5432);

        // Kakao
        this.KAKAO_REST_API_KEY = this.getEnvVariable('KAKAO_REST_API_KEY');
        this.KAKAO_JAVASCRIPT_KEY = this.getEnvVariable('KAKAO_JAVASCRIPT_KEY');
        this.KAKAO_REDIRECT_URI_LOCAL = this.getEnvVariable('KAKAO_REDIRECT_URI_LOCAL');
        this.KAKAO_REDIRECT_URI_REMOTE = this.getEnvVariable('KAKAO_REDIRECT_URI_REMOTE');
        this.KAKAO_CLIENT_SECRET = this.getEnvVariable('KAKAO_CLIENT_SECRET');

        // Kakao Test
        this.KAKAO_TEST_REST_API_KEY = this.getEnvVariable('KAKAO_TEST_REST_API_KEY');
        this.KAKAO_TEST_JAVASCRIPT_KEY = this.getEnvVariable('KAKAO_TEST_JAVASCRIPT_KEY');
        this.KAKAO_TEST_REDIRECT_URI_LOCAL = this.getEnvVariable('KAKAO_TEST_REDIRECT_URI_LOCAL');
        this.KAKAO_TEST_REDIRECT_URI_REMOTE = this.getEnvVariable('KAKAO_TEST_REDIRECT_URI_REMOTE');
        this.KAKAO_TEST_CLIENT_SECRET = this.getEnvVariable('KAKAO_TEST_CLIENT_SECRET');

        // Email
        this.EMAIL_SERVICE = this.getEnvVariable('EMAIL_SERVICE');
        this.EMAIL_HOST = this.getEnvVariable('EMAIL_HOST');
        this.EMAIL_PORT = this.getEnvVariableAsNumber('EMAIL_PORT', 465);
        this.EMAIL_USER = this.getEnvVariable('EMAIL_USER');
        this.EMAIL_PASSWORD = this.getEnvVariable('EMAIL_PASSWORD');

        // SMS
        this.SMS_API_KEY = this.getEnvVariable('SMS_API_SECRET');
        this.SMS_API_SECRET = this.getEnvVariable('SMS_API_SECRET');
        this.SENDER_PHONE = this.getEnvVariable('SENDER_PHONE');

        // Redis
        this.REDIS_URL = this.getEnvVariable('REDIS_URL');
        this.REDIS_LOCAL_URL = this.getEnvVariable('REDIS_LOCAL_URL');

        this.SALT_ROUNDS = this.getEnvVariableAsNumber('SALT_ROUNDS', 10);

        console.log('EnvConfig 초기화 완료');
    }

    private getEnvVariable(key: string, defaultValue?: string): string {
        const value = process.env[key];
        if (!value && defaultValue === undefined) {
            throw new MissingEnvironmentVariableError(key);
        }
        return value || defaultValue!;
    }

    private getEnvVariableAsNumber(key: string, defaultValue?: number): number {
        const value = process.env[key];
        const parsedValue = value ? parseInt(value, 10) : defaultValue;
        if (isNaN(parsedValue!)) {
            throw new InvalidEnvironmentVariableError(key, 'number');
        }
        return parsedValue!;
    }

}

export default EnvConfig;