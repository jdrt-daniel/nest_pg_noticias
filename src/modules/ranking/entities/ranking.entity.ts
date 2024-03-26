import { News } from "src/modules/news/entities/news.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ranking {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "int2",
  })
  score: number;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @ManyToOne(() => News, (news) => news.ranking)
  news: News;

  @ManyToOne(() => User, (user) => user.ranking, { eager: true })
  user: User;
}
