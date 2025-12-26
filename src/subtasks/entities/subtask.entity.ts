import { Task } from "src/tasks/entities/task.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Subtask {
 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        nullable: false
    })
    title: string;

    @Column('boolean', {
        default: false
    })
    isCompleted: boolean;

    @ManyToOne(
        () => Task,
        (task) => task.subtasks,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )
    task: Task;

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