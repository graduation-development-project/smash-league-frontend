"use server";
import { signIn } from "@/auth";

export async function authenticate(username: string, password: string) {
  try {
    const r = await signIn("credentials", {
      username: username,
      password: password,
      //   callbackUrl: "/",
      redirect: false,
    });
    // console.log("Check r", r);
    return r;
  } catch (error) {
    if ((error as any).name === "InvalidEmailPasswordError") {
      return {
        error: (error as any).type,
        code: 1,
      };
    } else if ((error as any).name === "InactivatedAccountError") {
      return {
        error: (error as any).type,
        code: 2,
      };
    } else {
      return {
        error: "Internal Server Error",
        code: 0, // Internal Server Error
      };
    }
  }
}

export async function loginGoogle() {
  try {
    const response = await signIn("google", {
      callbackUrl: "/dashboard",
    });
    return response;
  } catch (error) {
    console.error("Google login error:", error);
    return {
      error: "Failed to sign in with Google",
      code: 3, // Specific code for Google login failure
    };
  }
}
