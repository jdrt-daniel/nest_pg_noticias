import { Controller, Post } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Semilla")
@Controller("seed")
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  create() {
    return this.seedService.runSeed();
  }
}
