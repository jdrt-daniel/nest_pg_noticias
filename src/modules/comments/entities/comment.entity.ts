import { News } from "src/modules/news/entities/news.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "text",
  })
  description: string;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  user: User;

  @ManyToOne(() => News, (news) => news.comments)
  news: News;
}
