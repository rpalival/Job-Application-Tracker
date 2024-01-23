/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { JobApplicationCreateInput } from "./JobApplicationCreateInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ArgsType()
class CreateJobApplicationArgs {
  @ApiProperty({
    required: true,
    type: () => JobApplicationCreateInput,
  })
  @ValidateNested()
  @Type(() => JobApplicationCreateInput)
  @Field(() => JobApplicationCreateInput, { nullable: false })
  data!: JobApplicationCreateInput;
}

export { CreateJobApplicationArgs as CreateJobApplicationArgs };