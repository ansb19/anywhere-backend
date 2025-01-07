
import { ValidationError } from "@/common/exceptions/app.errors";
import RedisService from "@/common/services/redis.service";
import { SessionService } from "@/common/services/session.service";
import { logger } from "@/common/utils/logger";
import { SESSION_TYPE } from "@/config/enum_control";
import { Inject, Service } from "typedi";


@Service()
export class VerificaionService {
    constructor(@Inject(() => SessionService) private SessionService: SessionService) {

    }

    public async verifyCode(verification_type: SESSION_TYPE, verification: string, submitted_code: string,): Promise<boolean> {
        logger.info(`Verifying code for ${verification_type} - ${verification}`);

        const verified_code = await this.SessionService.getSession(verification, verification_type);
        if (!verified_code) {
            logger.warn(`Verification code expired or not found for ${verification_type} - ${verification}`);
            throw new ValidationError("인증번호가 만료되었거나 존재하지 않습니다.");
        }
        else if (verified_code !== submitted_code) {
            logger.warn(`Verification code mismatch for ${verification_type} - ${verification}`);
            throw new ValidationError("인증번호가 일치하지 않습니다");
        }
        else if (verified_code === submitted_code) {
            logger.info(`Verification successful for ${verification_type} - ${verification}`);
            return !!(verified_code);
        }
        logger.error(`Unknown error occurred during verification for ${verification_type} - ${verification}`);
        throw new ValidationError("인증에서 알 수 없는 오류가 발생했습니다");
    }
}