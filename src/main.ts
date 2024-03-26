import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger();

  // app.enableCors({
  //   origin: [process.env.FRONTEND_CLIENT],
  //   methods: ["GET", "POST", "PATCH", "DELETE"],
  // });
  app.enableCors();

  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle("El Observador")
    .setDescription(
      "Restfull api para gestionar noticias, comentarios y usuarios",
    )
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger/doc", app, document, {
    customSiteTitle: "Obervador",
  });

  await app.listen(process.env.PORT);
  logger.log(`App running on port : ${process.env.PORT}`);
}
bootstrap();
