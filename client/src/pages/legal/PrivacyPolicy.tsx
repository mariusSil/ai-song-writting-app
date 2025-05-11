import React from 'react';
import { Typography, Layout, Space, Divider, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

/**
 * Privacy Policy page for Silenskiu Biuras
 * Compliant with Lithuanian law and GDPR requirements
 */
const PrivacyPolicy: React.FC = () => {
  // Last updated date
  const lastUpdated = "2025-05-11";

  return (
    <Layout className="layout-container">
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link to="/"><HomeOutlined /> Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Legal</Breadcrumb.Item>
          <Breadcrumb.Item>Privacy Policy</Breadcrumb.Item>
        </Breadcrumb>

        <div className="site-layout-content" style={{ padding: 24, minHeight: 380, background: '#fff' }}>
          <Typography>
            <Title level={1}>Privacy Policy</Title>
            <Paragraph>
              <Text strong>Last Updated: {lastUpdated}</Text>
            </Paragraph>
            
            <Paragraph>
              This Privacy Policy describes how Silenskiu Biuras ("we", "our", or "us"), headquartered in Lithuania, 
              collects, uses, and discloses your personal information when you use our SiloTech AI-Powered Song Writing App
              and related services (collectively, the "Services").
            </Paragraph>

            <Divider />
            
            <Title level={2}>1. Data Controller Information</Title>
            <Paragraph>
              <Text strong>Data Controller:</Text> Silenskiu Biuras
              <br />
              <Text strong>Company Code:</Text> 304918886
              <br />
              <Text strong>Address:</Text> Vilnius, Lithuania
              <br />
              <Text strong>Email:</Text> info@silotech.lt
            </Paragraph>

            <Title level={2}>2. Legal Basis and Personal Data We Collect</Title>
            <Paragraph>
              In accordance with the Lithuanian Law on Legal Protection of Personal Data (Law No. XIII-1426) and the EU General 
              Data Protection Regulation (GDPR), we collect and process your personal data based on the following legal grounds:
            </Paragraph>
            
            <Title level={3}>2.1 Data Collected With Your Consent</Title>
            <Paragraph>
              When you use our Services, we may collect the following information with your explicit consent:
              <ul>
                <li>Account information (name, email address, password)</li>
                <li>User profile data</li>
                <li>Song lyrics and content you create using our platform</li>
                <li>Audio recordings you upload or create</li>
                <li>Marketing preferences</li>
              </ul>
            </Paragraph>

            <Title level={3}>2.2 Data Collected for Contract Performance</Title>
            <Paragraph>
              To provide our Services according to our Terms and Conditions, we process:
              <ul>
                <li>Payment information (processed through Stripe)</li>
                <li>Subscription details</li>
                <li>Usage data related to your account and subscription</li>
              </ul>
            </Paragraph>

            <Title level={3}>2.3 Data Collected for Legitimate Interests</Title>
            <Paragraph>
              To improve our Services and ensure security, we process:
              <ul>
                <li>Technical data (IP address, device information, browser type)</li>
                <li>Analytics data about how you use our Services</li>
                <li>Error logs and security-related information</li>
              </ul>
            </Paragraph>

            <Title level={2}>3. How We Use Your Personal Data</Title>
            <Paragraph>
              We use your personal data for the following purposes:
              <ul>
                <li>To provide and maintain our Services</li>
                <li>To process and complete transactions</li>
                <li>To send you important information about our Services</li>
                <li>To improve and personalize your experience</li>
                <li>To communicate with you about our Services, updates, and promotions (if you've opted in)</li>
                <li>To detect and prevent fraud and abuse</li>
                <li>To comply with legal obligations</li>
              </ul>
            </Paragraph>

            <Title level={2}>4. Data Storage and Retention</Title>
            <Paragraph>
              We store your personal data on secure servers within the European Economic Area (EEA). 
              We retain your personal data only for as long as necessary to fulfill the purposes outlined 
              in this Privacy Policy, unless a longer retention period is required by law.
            </Paragraph>
            <Paragraph>
              For users under 16 years of age, we require parental consent for data processing in accordance with 
              Lithuanian law. Users between 13-16 years are permitted to use our service with appropriate parental consent.
            </Paragraph>

            <Title level={2}>5. Data Sharing and Third-Party Services</Title>
            <Paragraph>
              We may share your personal data with:
              <ul>
                <li><Text strong>Service Providers:</Text> Third-party companies who help us deliver our Services (e.g., payment processors, cloud hosting providers)</li>
                <li><Text strong>MailerLite:</Text> For email marketing communications, if you've opted in</li>
                <li><Text strong>Supabase:</Text> For authentication and database services</li>
                <li><Text strong>Stripe:</Text> For payment processing</li>
                <li><Text strong>AI Service Providers:</Text> To provide AI-assisted features (e.g., DeepInfra, Perplexity, Suno)</li>
              </ul>
            </Paragraph>
            <Paragraph>
              All third-party service providers are required to protect your personal data and can only use it in accordance 
              with our instructions and this Privacy Policy.
            </Paragraph>

            <Title level={2}>6. Your Rights</Title>
            <Paragraph>
              Under Lithuanian law and the GDPR, you have the following rights:
              <ul>
                <li><Text strong>Right to Access:</Text> You can request a copy of your personal data.</li>
                <li><Text strong>Right to Rectification:</Text> You can request that we correct inaccurate data or complete incomplete data.</li>
                <li><Text strong>Right to Erasure:</Text> You can request that we delete your personal data under certain circumstances.</li>
                <li><Text strong>Right to Restrict Processing:</Text> You can request that we restrict the processing of your personal data under certain circumstances.</li>
                <li><Text strong>Right to Data Portability:</Text> You can request a copy of your data in a structured, commonly used, machine-readable format.</li>
                <li><Text strong>Right to Object:</Text> You can object to the processing of your personal data under certain circumstances.</li>
                <li><Text strong>Right to Not Be Subject to Automated Decision-Making:</Text> You can request human intervention in decisions based solely on automated processing.</li>
              </ul>
            </Paragraph>
            <Paragraph>
              To exercise these rights, please contact us at privacy@silotech.lt. We will respond to your request within 30 days.
            </Paragraph>

            <Title level={2}>7. Data Security</Title>
            <Paragraph>
              We implement appropriate technical and organizational measures to protect your personal data against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
              Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </Paragraph>

            <Title level={2}>8. Data Breach Procedures</Title>
            <Paragraph>
              In case of a personal data breach, we will notify the Lithuanian State Data Protection Inspectorate (VDAI) 
              within 72 hours of becoming aware of the breach, where feasible. If the breach is likely to result in a high 
              risk to your rights and freedoms, we will also notify you directly.
            </Paragraph>

            <Title level={2}>9. Cookie Policy</Title>
            <Paragraph>
              We use cookies and similar tracking technologies to track activity on our Services and hold certain information. 
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </Paragraph>

            <Title level={2}>10. Changes to This Privacy Policy</Title>
            <Paragraph>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy 
              periodically for any changes.
            </Paragraph>

            <Title level={2}>11. Contact Information</Title>
            <Paragraph>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
              <br /><br />
              <Text strong>Silenskiu Biuras</Text><br />
              Email: privacy@silotech.lt<br />
              Address: Vilnius, Lithuania
            </Paragraph>

            <Title level={2}>12. Complaints</Title>
            <Paragraph>
              If you believe that our processing of your personal data infringes data protection laws, you have the right to 
              lodge a complaint with the Lithuanian State Data Protection Inspectorate (VDAI):
              <br /><br />
              <Text strong>State Data Protection Inspectorate</Text><br />
              L. Sapiegos str. 17, LT-10312 Vilnius, Lithuania<br />
              Email: ada@ada.lt<br />
              Website: https://vdai.lrv.lt/
            </Paragraph>
          </Typography>
        </div>
      </Content>
    </Layout>
  );
};

export default PrivacyPolicy;
