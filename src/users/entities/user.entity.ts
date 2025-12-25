import { Task } from "src/tasks/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: false
    })
    name: string;

    @Column('text', {
        nullable: false,
        unique: true
    })
    email: string;

    @Column('text', {
        nullable: false
    })
    password: string;

    @OneToMany(
        () => Task,
        (task) => task.user,
        {cascade: true}
    )
    tasks: Task[];

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @Column('timestamp', {
        nullable: true
    })
    deletedAt?: Date;
}