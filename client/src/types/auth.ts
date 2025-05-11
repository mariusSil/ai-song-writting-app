import { AuthActionResponse } from "@refinedev/core";

// Custom auth response that extends Refine's AuthActionResponse
export interface OtpAuthResponse extends AuthActionResponse {
  otpSent?: boolean;
  message?: string;
  error?: Error;
}
