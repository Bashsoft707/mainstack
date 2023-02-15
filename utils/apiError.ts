import { IApiErrorArguments, responseStatusCodes } from "./types";

export class ApiError extends Error {
  public readonly name: string;
  public readonly statusCode: responseStatusCodes;
  public readonly isOperational?: boolean = true;

  constructor(args: IApiErrorArguments) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype)

    this.name = args.name || "Error";
    this.statusCode = args.statusCode;

    if (args.isOperational) this.isOperational === args.isOperational;

    Error.captureStackTrace(this);
  }
}
