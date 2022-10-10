import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity('users')

export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    email: string

    @Column()
    password: string

    @CreateDateColumn({
        default: 'NOW()'
    })
    created_at: Date

    @UpdateDateColumn({
        default: 'NOW()'
    })
    updated_at: Date
}