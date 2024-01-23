import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { JobApplicationController } from "../jobApplication.controller";
import { JobApplicationService } from "../jobApplication.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  company: "exampleCompany",
  createdAt: new Date(),
  dateApplied: new Date(),
  datePosted: new Date(),
  dateSaved: new Date(),
  followUp: "exampleFollowUp",
  id: "exampleId",
  jobPosition: "exampleJobPosition",
  location: "exampleLocation",
  maxSalary: "exampleMaxSalary",
  minSalary: "exampleMinSalary",
  updatedAt: new Date(),
};
const CREATE_RESULT = {
  company: "exampleCompany",
  createdAt: new Date(),
  dateApplied: new Date(),
  datePosted: new Date(),
  dateSaved: new Date(),
  followUp: "exampleFollowUp",
  id: "exampleId",
  jobPosition: "exampleJobPosition",
  location: "exampleLocation",
  maxSalary: "exampleMaxSalary",
  minSalary: "exampleMinSalary",
  updatedAt: new Date(),
};
const FIND_MANY_RESULT = [
  {
    company: "exampleCompany",
    createdAt: new Date(),
    dateApplied: new Date(),
    datePosted: new Date(),
    dateSaved: new Date(),
    followUp: "exampleFollowUp",
    id: "exampleId",
    jobPosition: "exampleJobPosition",
    location: "exampleLocation",
    maxSalary: "exampleMaxSalary",
    minSalary: "exampleMinSalary",
    updatedAt: new Date(),
  },
];
const FIND_ONE_RESULT = {
  company: "exampleCompany",
  createdAt: new Date(),
  dateApplied: new Date(),
  datePosted: new Date(),
  dateSaved: new Date(),
  followUp: "exampleFollowUp",
  id: "exampleId",
  jobPosition: "exampleJobPosition",
  location: "exampleLocation",
  maxSalary: "exampleMaxSalary",
  minSalary: "exampleMinSalary",
  updatedAt: new Date(),
};

const service = {
  createJobApplication() {
    return CREATE_RESULT;
  },
  jobApplications: () => FIND_MANY_RESULT,
  jobApplication: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("JobApplication", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: JobApplicationService,
          useValue: service,
        },
      ],
      controllers: [JobApplicationController],
      imports: [ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /jobApplications", async () => {
    await request(app.getHttpServer())
      .post("/jobApplications")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        dateApplied: CREATE_RESULT.dateApplied.toISOString(),
        datePosted: CREATE_RESULT.datePosted.toISOString(),
        dateSaved: CREATE_RESULT.dateSaved.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /jobApplications", async () => {
    await request(app.getHttpServer())
      .get("/jobApplications")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          dateApplied: FIND_MANY_RESULT[0].dateApplied.toISOString(),
          datePosted: FIND_MANY_RESULT[0].datePosted.toISOString(),
          dateSaved: FIND_MANY_RESULT[0].dateSaved.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /jobApplications/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/jobApplications"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /jobApplications/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/jobApplications"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        dateApplied: FIND_ONE_RESULT.dateApplied.toISOString(),
        datePosted: FIND_ONE_RESULT.datePosted.toISOString(),
        dateSaved: FIND_ONE_RESULT.dateSaved.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  test("POST /jobApplications existing resource", async () => {
    const agent = request(app.getHttpServer());
    await agent
      .post("/jobApplications")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        dateApplied: CREATE_RESULT.dateApplied.toISOString(),
        datePosted: CREATE_RESULT.datePosted.toISOString(),
        dateSaved: CREATE_RESULT.dateSaved.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      })
      .then(function () {
        agent
          .post("/jobApplications")
          .send(CREATE_INPUT)
          .expect(HttpStatus.CONFLICT)
          .expect({
            statusCode: HttpStatus.CONFLICT,
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
