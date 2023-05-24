import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true, length: 255 })
  email: string;

  @Column({ nullable: true })
  pasword: string;

  @Column({ default: false })
  is_activated: boolean;

  @Column({ length: 255 })
  activation_link: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
