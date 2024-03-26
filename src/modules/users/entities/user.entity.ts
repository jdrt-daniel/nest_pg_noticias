import { Comment } from "src/modules/comments/entities/comment.entity";
import { News } from "src/modules/news/entities/news.entity";
import { Ranking } from "src/modules/ranking/entities/ranking.entity";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 30,
  })
  fullName: string;

  @Column({
    type: "varchar",
    length: 50,
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 100,
    select: false,
  })
  password: string;

  @Column({
    type: "bool",
    default: true,
  })
  isActive: boolean;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @Column("text", {
    array: true,
    default: ["visitante"],
  })
  roles: string[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment;

  @OneToMany(() => News, (news) => news.user)
  news: News;

  @OneToMany(() => Ranking, (ranking) => ranking.user)
  ranking: Ranking;

  @BeforeInsert()
  checkFieldBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldBeforeUpdate() {
    this.checkFieldBeforeInsert();
  }
}
