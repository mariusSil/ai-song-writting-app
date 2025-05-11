import React, { useState } from "react";
import {
  useLogin,
  useActiveAuthProvider,
  useTranslate,
  useNotification,
} from "@refinedev/core";
import { OtpAuthResponse } from "../../types/auth";
import { Button, Card, Form, Input, Typography, Divider, Alert, Space } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

/**
 * Login component handles the primary authentication flow
 * It supports both OTP-based (passwordless) and traditional password-based login
 */
export const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const translate = useTranslate();
  const authProvider = useActiveAuthProvider();
  const { open } = useNotification();
  const { mutate: login } = useLogin({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const handleOtpLogin = async (values: Record<string, any>) => {
    setIsLoading(true);
    setErrorMessage(null);

    if (!otpSent) {
      // First step: Request OTP
      login(
        { email: values.email },
        {
          onSuccess: (data) => {
            // Cast the response to our custom OtpAuthResponse type
            const otpResponse = data as OtpAuthResponse;
            if (otpResponse.otpSent) {
              setOtpSent(true);
              setEmail(values.email);
              form.setFieldsValue({ otp: "" }); // Clear any existing OTP field
              open?.({
                type: "success",
                message: "Success",
                description: "A verification code has been sent to your email",
              });
            }
            setIsLoading(false);
          },
          onError: (error) => {
            console.error("Login error:", error);
            setErrorMessage(error?.message || "An error occurred during login");
            setIsLoading(false);
          },
        }
      );
    } else {
      // Second step: Verify OTP
      login(
        { email, otp: values.otp },
        {
          onSuccess: () => {
            setIsLoading(false);
          },
          onError: (error) => {
            console.error("OTP verification error:", error);
            setErrorMessage(
              error?.message || "Invalid verification code. Please try again."
            );
            setIsLoading(false);
          },
        }
      );
    }
  };

  const renderErrorMessage = () => {
    if (!errorMessage) return null;
    return <Alert type="error" message={errorMessage} showIcon style={{ marginBottom: 16 }} />;
  };

  const renderLoginForm = () => {
    if (!otpSent) {
      // First step: Email input for OTP request
      return (
        <>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input 
              size="large" 
              prefix={<MailOutlined />} 
              placeholder="Email" 
              autoComplete="email"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isLoading}
              block
            >
              Continue with Email
            </Button>
          </Form.Item>
        </>
      );
    }

    // Second step: OTP verification
    return (
      <>
        <Alert
          type="info"
          message={`We've sent a verification code to ${email}`}
          description="Please check your email and enter the code below."
          showIcon
          style={{ marginBottom: 24 }}
        />
        <Form.Item
          name="otp"
          rules={[{ required: true, message: "Verification code is required" }]}
        >
          <Input
            size="large"
            prefix={<LockOutlined />}
            placeholder="Verification Code"
            autoComplete="one-time-code"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={isLoading}
            block
          >
            Sign In
          </Button>
        </Form.Item>
        <Button
          type="link"
          onClick={() => {
            setOtpSent(false);
            setEmail("");
            setErrorMessage(null);
          }}
          style={{ padding: 0 }}
        >
          Use a different email
        </Button>
      </>
    );
  };

  return (
    <div style={{ 
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f2f5"
    }}>
      <Card
        style={{ 
          width: 400,
          maxWidth: "90%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
        }}
        title={
          <div style={{ textAlign: "center" }}>
            <Title level={3} style={{ margin: 0 }}>
              {translate("pages.login.title", "Sign in to your account")}
            </Title>
          </div>
        }
      >
        {renderErrorMessage()}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleOtpLogin}
          requiredMark={false}
          initialValues={{ email: "", otp: "" }}
        >
          {renderLoginForm()}
        </Form>

        <Divider>
          <Text type="secondary">OR</Text>
        </Divider>

        <Space direction="vertical" style={{ width: "100%" }}>
          <Text style={{ textAlign: "center", display: "block" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ fontWeight: "bold" }}>
              Sign up
            </Link>
          </Text>
          <Text style={{ textAlign: "center", display: "block" }}>
            <Link to="/forgot-password" style={{ fontWeight: "bold" }}>
              Forgot password?
            </Link>
          </Text>
        </Space>
      </Card>
    </div>
  );
};
