import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  static type: string;

  constructor(message?: any) {
    super();

    this.type = message;
  }
}

export class InvalidEmailPasswordError extends AuthError {
  static type = "Email/Password is invalid";
}

export class InactivatedAccountError extends AuthError {
  static type = "Your Account is not activated yet";
}
