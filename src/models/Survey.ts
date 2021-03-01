import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import SurveyUser from './SurveyUser';

@Entity('surveys')
class Survey {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => SurveyUser, surveyUser => surveyUser.survey)
  surveyUser: SurveyUser[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Survey;
