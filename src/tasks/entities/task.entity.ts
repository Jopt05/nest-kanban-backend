import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: false
    })
    title: string;

    @Column('text', {
        nullable: true
    })
    description?: string;

    @Column('enum', {
        enum: ['todo', 'in-progress', 'done'],
        default: 'todo'
    })
    status: string;

    @ManyToOne(
        () => User,
        (user) => user.tasks,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )
    user: User;

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}