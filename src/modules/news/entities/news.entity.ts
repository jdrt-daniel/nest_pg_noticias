import { Comment } from "src/modules/comments/entities/comment.entity";
import { Ranking } from "src/modules/ranking/entities/ranking.entity";
import { User } from "src/modules/users/entities/user.entity";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class News {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  title: string;

  @Column({
    type: "text",
  })
  slug: string;

  @Column({
    type: "text",
  })
  content: string;

  @Column({
    type: "varchar",
    default: "preview.jpg",
  })
  image: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  location: string;

  @Column({
    type: "bool",
    default: true,
  })
  isActive: boolean;

  @Column({
    type: "bool",
    default: false,
  })
  isApproved: boolean;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.news, { eager: true })
  user: User;

  @OneToMany(() => Ranking, (ranking) => ranking.news)
  ranking: Ranking;

  @OneToMany(() => Comment, (comment) => comment.news)
  comments: Comment;

  @BeforeInsert()
  checkFieldBeforeInsert() {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replaceAll("[^\\p{Alnum}]", "")
      .replaceAll(" ", "-");
  }

  @BeforeUpdate()
  checkFieldBeforeUpdate() {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replaceAll("[^\\p{Alnum}]", "")
      .replaceAll(" ", "-");
  }
}
