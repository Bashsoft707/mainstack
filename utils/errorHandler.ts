import { Response } from "express";
import { ApiError } from "./apiError";
import { responseStatusCodes } from "./types";

export class ErrorHandler {
  private isTrustedError(error: Error | ApiError) {
    if (error instanceof ApiError) return true;
    return false;
  }

  public handleError(error: Error | ApiError, res?: Response) {
    if (this.isTrustedError(error)) {
      this.handleTrustedError(error as ApiError, res as Response);
    } else {
      this.handleCriticalError(error as Error, res);
    }
  }
  
  private handleTrustedError = (error: ApiError, res: Response) => {
    return res
      .status(error.statusCode)
      .json({ STATUS: "FAILURE", MESSAGE: error.message });
  };

  private handleCriticalError(error: Error, res?: Response) {
    console.log(error);
    if (res) {
      res.status(responseStatusCodes.BAD_REQUEST).json({
        STATUS: "FAILURE",
        MESSAGE: { name: error.name, message: error.message },
      });
      res.status(responseStatusCodes.INTERNAL_SERVER_ERROR).json({
        STATUS: "FAILURE",
        MESSAGE: "Internal Server Error",
      });
      process.exit(1);
    }
  }
}
