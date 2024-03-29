/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, JobApplication } from "@prisma/client";

export class JobApplicationServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.JobApplicationCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.JobApplicationCountArgs>
  ): Promise<number> {
    return this.prisma.jobApplication.count(args);
  }

  async jobApplications<T extends Prisma.JobApplicationFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.JobApplicationFindManyArgs>
  ): Promise<JobApplication[]> {
    return this.prisma.jobApplication.findMany(args);
  }
  async jobApplication<T extends Prisma.JobApplicationFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.JobApplicationFindUniqueArgs>
  ): Promise<JobApplication | null> {
    return this.prisma.jobApplication.findUnique(args);
  }
  async createJobApplication<T extends Prisma.JobApplicationCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.JobApplicationCreateArgs>
  ): Promise<JobApplication> {
    return this.prisma.jobApplication.create<T>(args);
  }
  async updateJobApplication<T extends Prisma.JobApplicationUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.JobApplicationUpdateArgs>
  ): Promise<JobApplication> {
    return this.prisma.jobApplication.update<T>(args);
  }
  async deleteJobApplication<T extends Prisma.JobApplicationDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.JobApplicationDeleteArgs>
  ): Promise<JobApplication> {
    return this.prisma.jobApplication.delete(args);
  }
}
