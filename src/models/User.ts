import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import SurveyUser from './SurveyUser';

@Entity('users')
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => SurveyUser, surveyUser => surveyUser.user)
  surveyUser: SurveyUser[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default User;
