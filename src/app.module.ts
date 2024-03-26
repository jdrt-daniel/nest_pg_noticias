import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EnvConfiguration } from "./config/env.config";
import { JoiValidationSchema } from "./config/joi.validation";

import { CommonModule } from "./common/common.module";
import { ModulesModule } from "./modules/modules.module";
import { AuthModule } from "./auth/auth.module";
import { SeedModule } from "./seed/seed.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      // entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    CommonModule,
    ModulesModule,
    AuthModule,
    SeedModule,
  ],
})
export class AppModule {}
