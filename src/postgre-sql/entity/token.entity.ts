import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  refresh_token: string;

  @Column()
  user_ip_adress: string;

  @OneToOne((type) => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  user_id: User;
}
