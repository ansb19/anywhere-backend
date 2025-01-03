
import { Database } from "@/config/database/Database";
import { Inject, Service } from "typedi";
import { DeepPartial, EntityManager, ObjectLiteral, QueryRunner, Repository } from "typeorm";
import { DatabaseError, NotFoundError, ValidationError } from "../exceptions/app.errors";


@Service()
abstract class BaseService<T extends ObjectLiteral> {
    protected repository: Repository<T>;
    protected manager: EntityManager;

    constructor(private database: Database, entity: new () => T) {
        const data_source = this.database.dataSource; //  DataSource 가져오기
        this.repository = data_source.getRepository(entity); // 단일 entity 관리 특화
        this.manager = data_source.manager; // 전체적 entity 관리

    }

    protected getRepository(queryRunner?: QueryRunner): Repository<T> {
        return queryRunner
            ? queryRunner.manager.getRepository<T>(this.repository.target)
            : this.repository;
    }

    public async create(item: DeepPartial<T>, queryRunner?: QueryRunner): Promise<T> {
        try {
            const repo = this.getRepository(queryRunner);
            const entity = repo.create(item);
            return await repo.save(entity);
        }
        catch (err) {
            console.error("Error base-service create: ", err);
            throw new ValidationError(`데이터 생성 중 오류 발생 `, err as Error);
        }
    }

    //특정 조건을 통해 하나를 출력 // 두루마리 휴지 걸이도 없음.. //휴지=값 휴지걸이: 담는 주소 
    public async findOne(condition: Partial<T>, queryRunner?: QueryRunner): Promise<T> {
        try {
            const repo = this.getRepository(queryRunner);
            const entity = await repo.findOneBy(condition);
            if (!entity) throw new NotFoundError();
            return entity;
        }
        catch (err) {
            console.error("Error base-service findOne: ", err);
            throw new DatabaseError(`데이터 특정 조건 검색하는 중 오류 발생`, err as Error);
        }
    }
    public async findAll(queryRunner?: QueryRunner): Promise<T[]> {
        try {
            const repo = this.getRepository(queryRunner);
            const entities = await repo.find();
            return entities;
        }
        catch (err) {
            console.error("Error base-service findAll: ", err);
            throw new DatabaseError(`데이터 전부 검색하는 중 오류 발생`, err as Error);
        }
    }

    //특정 조건을 통해 관계를 포함한 하나를 출력
    public async findOneWithRelations(condition: Partial<T>, relations: string[] = [], queryRunner?: QueryRunner)
        : Promise<T> {
        try {
            const repo = this.getRepository(queryRunner);
            const entity = await repo.findOne({
                where: condition,
                relations: relations,
            })
            if (!entity) throw new NotFoundError();
            return entity;
        }
        catch (err) {
            console.error("Error base-service findWithRelations: ", err);
            throw new DatabaseError("관계 데이터를 검색하는중 오류 발생", err as Error);
        }

    }

    public async update(condition: Partial<T>, item: DeepPartial<T>, queryRunner?: QueryRunner): Promise<T> { // 두루마리 휴지 걸이만 있음
        try {
            const repo = this.getRepository(queryRunner);
            const entity = await repo.findOneBy(condition);
            if (!entity) throw new NotFoundError(`조건 ${condition}에 해당하는 값을 찾지 못함`);
            repo.merge(entity, item);
            return await repo.save(entity);
        } catch (error) {
            console.error("Error base-service update: ", error);
            throw new DatabaseError("데이터 수정 중 오류 발생", error as Error);
        }
    }

    public async delete(condition: Partial<T>, queryRunner?: QueryRunner): Promise<T> {
        try {
            const repo = this.getRepository(queryRunner);
            const entity = await repo.findOneBy(condition);
            if (!entity) throw new NotFoundError(`조건 ${condition}에 해당하는 값을 찾지 못함`);
            const result = await repo.delete(condition);
            if (result.affected === 0) throw new DatabaseError("데이터 삭제 실패");
            return entity; // 0행은 삭제 x -> false 0행이 아니면 삭제 ㅇ -> true     
        } catch (error) {
            console.error("Error base-service delete: ", error);
            throw new DatabaseError("데이터 삭제 중 오류 발생", error as Error);
        }
    }


}


export default BaseService;