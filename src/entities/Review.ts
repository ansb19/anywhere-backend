import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Place } from "./Place";

@Entity('REVIEW')
export class Review {
    @PrimaryGeneratedColumn()
    review_id: number = 0;

    @Column({ type: 'bigint'})
    user_id!: number;

    @Column({ type: 'int' })
    place_id: number = 0;

    @Column({ type: 'varchar', length: 500 })
    content: string = '';

    @CreateDateColumn({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @ManyToOne(() => User, (user) => user.reviews)
    @JoinColumn({name: 'user_id'})
    user!: User;

    @ManyToOne(() => Place, (place) => place.reviews)
    @JoinColumn({name: 'place_id'})
    place!: Place;
}