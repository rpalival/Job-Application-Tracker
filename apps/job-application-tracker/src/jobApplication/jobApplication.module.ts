import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { JobApplicationModuleBase } from "./base/jobApplication.module.base";
import { JobApplicationService } from "./jobApplication.service";
import { JobApplicationController } from "./jobApplication.controller";

@Module({
  imports: [JobApplicationModuleBase, forwardRef(() => AuthModule)],
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
  exports: [JobApplicationService],
})
export class JobApplicationModule {}
