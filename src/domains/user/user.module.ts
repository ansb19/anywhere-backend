
import userRoutes from '@/domains/user/routes';
import { Router } from 'express';


export class UserModule {

    static init(): Router {
        const router = Router();
        // 의존성 주입 설정

        // /user 라우터 등록
        router.use('/', userRoutes);

        return router;
    }
}