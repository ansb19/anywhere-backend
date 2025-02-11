
// import { Request, Response } from 'express';
// import UserService from '../services/user.service';
// import { Inject, Service } from 'typedi';
// import BaseController from '@/common/abstract/base-controller.abstract';


// @Service()
// class UserController extends BaseController {
//     constructor(
//         @Inject(() => UserService) private userservice: UserService,
//     ) {
//         super();
//     }

//     //유저 생성( 자체 회원가입)
//     public createUser = async (req: Request, res: Response): Promise<void> => {
//         this.execute(req, res, async () => {
//             console.log(req.body);
//             const newUser = await UserService.createUser(req.body);
//             return {
//                 status: 201,
//                 message: '유저 회원가입 성공했습니다',
//                 data: newUser
//             }
//         })
//     }


//     //모든 사용자 조회
//     public findAllUser = async (req: Request, res: Response): Promise<void> => {
//         this.execute(req, res, async () => {
//             const users = await UserService.findAllUser();

//             if (users) {
//                 return {
//                     status: 200,
//                     message: "유저들 정보 조회 완료",
//                     data: users
//                 }
//             }
//             else {
//                 return {
//                     status: 404,
//                     message: "유저를 찾을 수 없습니다",
//                     data: null
//                 }
//             }
//         })
//     }
//     // id를 통한 사용자 한명 조회
//     public findOneUser = async (req: Request, res: Response): Promise<void> => {
//         this.execute(req, res, async () => {
//             const { user_id } = req.params;
//             const user = await UserService.findOneUserbyID(parseInt(user_id));

//             if (user) {
//                 return {
//                     status: 200,
//                     message: "유저 정보 조회 완료",
//                     data: user
//                 }
//             }
//             else {
//                 return {
//                     status: 404,
//                     message: "유저를 찾을 수 없습니다",
//                     data: null
//                 }
//             }
//         })
//     }



//     // id를 통한 사용자 수정
//     public updateUserbyUserID = async (req: Request, res: Response): Promise<void> => {
//         this.execute(req, res, async () => {
//             const { user_id } = req.params;
//             const updateUser = await UserService.updateUserbyID(parseInt(user_id), req.body);

//             if (updateUser) {
//                 return {
//                     status: 200,
//                     message: '유저의 정보가 변경되었습니다',
//                     data: updateUser
//                 }
//             }
//             else {
//                 return {
//                     status: 404,
//                     message: '유저를 찾을 수 없습니다',
//                     data: null
//                 }
//             }
//         })
//     }

//     //id를 통한 사용자 삭제
//     public deleteUserbyUserID = async (req: Request, res: Response): Promise<void> => {
//         this.execute(req, res, async () => {
//             const { user_id } = req.params;
//             const deletedUser = await UserService.deleteUserbyID(parseInt(user_id));

//             if (deletedUser) {
//                 return {
//                     status: 200,
//                     message: '유저를 삭제 완료',
//                     data: deletedUser
//                 }
//             }
//             else {
//                 return {
//                     status: 404,
//                     message: '유저를 찾을 수 없습니다',
//                     data: deletedUser
//                 }
//             }
//         })
//     }


//     //유저 로그인/ 회원가입
//     public loginUser = async (req: Request, res: Response): Promise<void> => {
//         this.execute(req, res, async () => {
//             const { user_id } = req.body;
//             const LoginUser = await UserService.loginUser(parseInt(user_id));

//             if (LoginUser) {
//                 return {
//                     status: 200,
//                     message: "유저 로그인 완료",
//                     data: LoginUser
//                 }
//             }
//             else {
//                 return {
//                     status: 404,
//                     message: "유저 로그인 실패",
//                     data: LoginUser
//                 }
//             }

//         })
//     }

//     //미완성 사용자 로그아웃
//     public logoutUser = async (req: Request, res: Response): Promise<void> => {
//         this.execute(req, res, async () => {

//         })
//     }

//     public withdraw_user = async (req: Request, res: Response): Promise<void> => {
//         this.execute(req, res, async () => {
//             const user_type = req.params.user_type as userType;
//             const user_id = req.params.user_id;
//             const withdraw_user = await this.userwithdrawService.withdrawal(user_type, parseInt(user_id));

//             if (withdraw_user) {
//                 return {
//                     status: 200,
//                     message: '유저 삭제 완료',

//                 }
//             }
//             else {
//                 return {
//                     status: 404,
//                     message: '유저 삭제 실패',
//                 }
//             }
//         })
//     }
// }


// export default UserController;
// 관심사 분리원칙에 따라 컨트롤러를 따로 나누기로 하였음.
