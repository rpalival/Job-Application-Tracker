import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JobApplicationServiceBase } from "./base/jobApplication.service.base";

@Injectable()
export class JobApplicationService extends JobApplicationServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
