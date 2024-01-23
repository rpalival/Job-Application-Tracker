import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { JobApplicationService } from "./jobApplication.service";
import { JobApplicationControllerBase } from "./base/jobApplication.controller.base";

@swagger.ApiTags("jobApplications")
@common.Controller("jobApplications")
export class JobApplicationController extends JobApplicationControllerBase {
  constructor(
    protected readonly service: JobApplicationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
