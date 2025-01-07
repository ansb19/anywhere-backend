import { Router } from "express";
import Container from "typedi";
import ReviewController from "./controllers/review.controller";


export class ReviewModule {

    static init(): Router {
        const router = Router();

        //의존성 주입
        // 라우터인 '/review/'

        const reviewcontroller = Container.get(ReviewController);

        router.post('/', reviewcontroller.createReview)  //리뷰 생성
        router.get('/:review_id', reviewcontroller.findReviewbyReviewID); //리뷰 id를 통한 리뷰 조회
        router.put('/:review_id', reviewcontroller.updateReviewbyReviewID); //리뷰 id를 통한 리뷰 수정
        router.delete('/:review_id', reviewcontroller.deleteReviewbyReviewID); //리뷰 id를 통한 리뷰 삭제

        //특정 장소 id를 통한 리뷰들 조회
        router.get('/place/:place_id', reviewcontroller.findReviewbyPlaceID)

        //유저id을 통한 리뷰들 조회
        router.get('/user/:user_id', reviewcontroller.findReviewbyUserID)


        
        return router;
    }
}