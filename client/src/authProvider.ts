import { AuthBindings } from "@refinedev/core";
import { supabaseClient } from "./utility/supabaseClient";

interface LoginParams {
  email: string;
  otp?: string;
}

interface RegisterParams {
  email: string;
}

interface ForgotPasswordParams {
  email: string;
}

interface UpdatePasswordParams {
  password: string;
}

type AuthActionResponse = {
  success: boolean;
  redirectTo?: string | false;
  otpSent?: boolean;
  message?: string;
  error?: Error;
};

const authProvider: AuthBindings = {
  login: async ({ email, otp }: LoginParams): Promise<AuthActionResponse> => {
    // If OTP is provided, verify it
    if (otp) {
      try {
        const { data, error } = await supabaseClient.auth.verifyOtp({
          email,
          token: otp,
          type: "email",
        });

        if (error) {
          return {
            success: false,
            error,
          };
        }

        if (data?.user) {
          // Create or update user profile
          const { error: profileError } = await supabaseClient
            .from("users")
            .upsert({
              id: data.user.id,
              email: data.user.email,
              updated_at: new Date().toISOString(),
            }, { onConflict: "id" });

          if (profileError) {
            console.error("Error updating user profile:", profileError);
          }

          return {
            success: true,
            redirectTo: "/songs",
          };
        }
        
        return {
          success: false,
          message: "Verification failed",
        };
      } catch (error) {
        return {
          success: false,
          error: error as Error,
        };
      }
    } else {
      // Send the OTP to the email
      try {
        const { error } = await supabaseClient.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/songs`,
          },
        });

        if (error) {
          return {
            success: false,
            error,
          };
        }

        // Return a message to indicate that the OTP has been sent
        return {
          success: true,
          redirectTo: false,
          otpSent: true,
          message: "A verification code has been sent to your email.",
        };
      } catch (error) {
        return {
          success: false,
          error: error as Error,
        };
      }
    }
  },

  register: async ({ email }: RegisterParams): Promise<AuthActionResponse> => {
    try {
      const { error } = await supabaseClient.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/songs`,
        },
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      return {
        success: true,
        redirectTo: false,
        otpSent: true,
        message: "A verification code has been sent to your email.",
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error,
      };
    }
  },

  forgotPassword: async ({ email }: ForgotPasswordParams): Promise<AuthActionResponse> => {
    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      return {
        success: true,
        redirectTo: false,
        message: "Please check your email for a reset link.",
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error,
      };
    }
  },

  updatePassword: async ({ password }: UpdatePasswordParams): Promise<AuthActionResponse> => {
    try {
      const { error } = await supabaseClient.auth.updateUser({
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error,
      };
    }
  },

  logout: async (): Promise<string | void> => {
    try {
      const { error } = await supabaseClient.auth.signOut();

      if (error) {
        throw error;
      }

      return "/";
    } catch (error) {
      throw error;
    }
  },

  check: async (): Promise<boolean> => {
    try {
      const { data } = await supabaseClient.auth.getSession();
      return Boolean(data?.session);
    } catch (error) {
      return false;
    }
  },

  getPermissions: async (): Promise<string | null> => {
    try {
      const { data } = await supabaseClient.auth.getUser();
      
      if (data?.user) {
        return data.user.role as string;
      }
      
      return null;
    } catch (error) {
      return null;
    }
  },

  getIdentity: async () => {
    try {
      const { data } = await supabaseClient.auth.getUser();

      if (data?.user) {
        const { data: userData, error } = await supabaseClient
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (error || !userData) {
          throw error || new Error("User not found");
        }

        return {
          ...data.user,
          ...userData,
        };
      }

      throw new Error("User not found");
    } catch (error) {
      throw error;
    }
  },

  onError: async (error) => {
    console.error(error);
    return { error };
  },
};

export default authProvider;
