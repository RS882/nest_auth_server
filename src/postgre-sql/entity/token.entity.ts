import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User_Nest_Auth } from './user.entity';

@Entity()
export class Token_Nest_Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  user_ip_adress: string;

  @Column()
  refresh_token: string;


  @OneToOne((type) => User_Nest_Auth, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  user_id: User_Nest_Auth;
}
