import React from 'react';
import { Typography, Layout, Space, Divider, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

/**
 * Terms and Conditions page for Silenskiu Biuras
 * Compliant with Lithuanian law and EU regulations
 */
const TermsAndConditions: React.FC = () => {
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
          <Breadcrumb.Item>Terms and Conditions</Breadcrumb.Item>
        </Breadcrumb>

        <div className="site-layout-content" style={{ padding: 24, minHeight: 380, background: '#fff' }}>
          <Typography>
            <Title level={1}>Terms and Conditions</Title>
            <Paragraph>
              <Text strong>Last Updated: {lastUpdated}</Text>
            </Paragraph>
            
            <Paragraph>
              These Terms and Conditions ("Terms") govern your access to and use of the SiloTech AI-Powered Song Writing App
              and related services (collectively, the "Services") provided by Silenskiu Biuras ("we", "our", or "us"), 
              headquartered in Lithuania.
            </Paragraph>
            
            <Paragraph>
              By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not 
              agree to these Terms, please do not use our Services.
            </Paragraph>

            <Divider />

            <Title level={2}>1. Company Information</Title>
            <Paragraph>
              <Text strong>Company:</Text> Silenskiu Biuras
              <br />
              <Text strong>Company Code:</Text> 304918886
              <br />
              <Text strong>Address:</Text> Vilnius, Lithuania
              <br />
              <Text strong>Email:</Text> info@silotech.lt
            </Paragraph>

            <Title level={2}>2. Services Description</Title>
            <Paragraph>
              The SiloTech AI-Powered Song Writing App is a software application designed to assist users in writing songs 
              with AI assistance. Our Services include, but are not limited to:
              <ul>
                <li>AI-assisted song writing</li>
                <li>Rhyme assistant functionality</li>
                <li>Song research engine</li>
                <li>Project management for song creation</li>
                <li>Audio integration and recording capabilities</li>
                <li>Beat and melody generation</li>
              </ul>
            </Paragraph>

            <Title level={2}>3. User Accounts</Title>
            <Paragraph>
              3.1 To access certain features of our Services, you must register for an account. You agree to provide accurate, 
              current, and complete information during the registration process and to update such information to keep it 
              accurate, current, and complete.
            </Paragraph>
            <Paragraph>
              3.2 You are responsible for safeguarding your account credentials and for all activities that occur under your 
              account. You agree to notify us immediately of any unauthorized use of your account.
            </Paragraph>
            <Paragraph>
              3.3 We reserve the right to disable your account if we determine, in our sole discretion, that you have violated 
              these Terms or that your account poses a security risk.
            </Paragraph>
            <Paragraph>
              3.4 Users must be at least 13 years old to create an account. Users between 13 and 16 years old require parental 
              consent in accordance with Lithuanian law.
            </Paragraph>

            <Title level={2}>4. Subscription and Payment</Title>
            <Paragraph>
              4.1 Some of our Services are available on a subscription basis. By subscribing to our Services, you agree to pay 
              the applicable subscription fees as described on our website.
            </Paragraph>
            <Paragraph>
              4.2 Payment is processed through Stripe, a third-party payment processor. Your use of Stripe's services is 
              subject to Stripe's terms and conditions.
            </Paragraph>
            <Paragraph>
              4.3 Subscription fees are billed in advance on a monthly basis and are non-refundable except as required by 
              applicable law or as explicitly stated in these Terms.
            </Paragraph>
            <Paragraph>
              4.4 You may cancel your subscription at any time. Upon cancellation, you will continue to have access to the 
              subscription services until the end of your current billing period.
            </Paragraph>
            <Paragraph>
              4.5 We reserve the right to change subscription fees upon reasonable notice. Any changes in fees will be effective 
              at the start of the next subscription period.
            </Paragraph>

            <Title level={2}>5. Intellectual Property Rights</Title>
            <Paragraph>
              5.1 <Text strong>Our Intellectual Property:</Text> The Services, including all content, features, and functionality 
              thereof, are owned by Silenskiu Biuras and are protected by Lithuanian and international copyright, trademark, 
              patent, trade secret, and other intellectual property or proprietary rights laws.
            </Paragraph>
            <Paragraph>
              5.2 <Text strong>Your Content:</Text> You retain all rights to the content you create, upload, or store through our 
              Services, including your song lyrics, recordings, and other creative works ("User Content").
            </Paragraph>
            <Paragraph>
              5.3 <Text strong>License to Us:</Text> By creating, uploading, or storing User Content through our Services, you 
              grant us a non-exclusive, royalty-free, worldwide license to use, reproduce, modify, adapt, publish, and display 
              such User Content solely for the purpose of providing and improving the Services.
            </Paragraph>
            <Paragraph>
              5.4 <Text strong>AI-Generated Content:</Text> AI-generated content provided through our Services is meant to assist 
              your creative process. We do not claim ownership of the final creative works you produce using our AI tools. 
              However, you acknowledge that similar outputs may be generated for other users.
            </Paragraph>

            <Title level={2}>6. User Conduct</Title>
            <Paragraph>
              6.1 You agree not to use our Services to:
              <ul>
                <li>Violate any applicable law or regulation</li>
                <li>Infringe the intellectual property rights of others</li>
                <li>Create, upload, or share content that is unlawful, harmful, threatening, abusive, harassing, defamatory, 
                    vulgar, obscene, invasive of another's privacy, or otherwise objectionable</li>
                <li>Impersonate any person or entity</li>
                <li>Upload or transmit viruses, malware, or other harmful code</li>
                <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
                <li>Collect or store personal data about other users without their consent</li>
              </ul>
            </Paragraph>
            <Paragraph>
              6.2 We reserve the right to terminate or suspend your access to our Services immediately, without prior notice or 
              liability, for any reason, including breach of these Terms.
            </Paragraph>

            <Title level={2}>7. Third-Party Services</Title>
            <Paragraph>
              7.1 Our Services may integrate with or contain links to third-party websites or services that are not owned or 
              controlled by us.
            </Paragraph>
            <Paragraph>
              7.2 We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any 
              third-party websites or services. You acknowledge and agree that we shall not be responsible or liable for any 
              damage or loss caused by or in connection with the use of any such third-party websites or services.
            </Paragraph>
            <Paragraph>
              7.3 These Terms do not apply to your use of third-party services, and you should review the terms and policies 
              applicable to such services.
            </Paragraph>

            <Title level={2}>8. Disclaimer of Warranties</Title>
            <Paragraph>
              8.1 Your use of our Services is at your sole risk. The Services are provided on an "AS IS" and "AS AVAILABLE" basis.
            </Paragraph>
            <Paragraph>
              8.2 To the maximum extent permitted by applicable law, we disclaim all warranties, express or implied, including, 
              but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, and 
              any warranties arising out of course of dealing or usage of trade.
            </Paragraph>
            <Paragraph>
              8.3 We do not warrant that (a) the Services will meet your requirements, (b) the Services will be uninterrupted, 
              timely, secure, or error-free, (c) the results that may be obtained from the use of the Services will be accurate 
              or reliable, or (d) any errors in the Services will be corrected.
            </Paragraph>

            <Title level={2}>9. Limitation of Liability</Title>
            <Paragraph>
              9.1 To the maximum extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including loss of profits, data, or other intangible losses, resulting from 
              (a) your access to or use of or inability to access or use the Services; (b) any conduct or content of any third 
              party on the Services; (c) any content obtained from the Services; and (d) unauthorized access, use, or alteration 
              of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other 
              legal theory, whether or not we have been informed of the possibility of such damage.
            </Paragraph>
            <Paragraph>
              9.2 In no event shall our total liability to you for all claims exceed the amount you paid to us, if any, for 
              accessing or using the Services during the twelve (12) months preceding the claim.
            </Paragraph>
            <Paragraph>
              9.3 The limitations of damages set forth above are fundamental elements of the basis of the bargain between you and us.
            </Paragraph>

            <Title level={2}>10. Indemnification</Title>
            <Paragraph>
              You agree to defend, indemnify, and hold harmless Silenskiu Biuras, its affiliates, and their respective officers, 
              directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including, 
              without limitation, reasonable legal fees, arising out of or in any way connected with your access to or use of the 
              Services or your violation of these Terms.
            </Paragraph>

            <Title level={2}>11. Modifications to the Services</Title>
            <Paragraph>
              We reserve the right to modify or discontinue, temporarily or permanently, the Services (or any part thereof) with 
              or without notice. We shall not be liable to you or to any third party for any modification, suspension, or 
              discontinuance of the Services.
            </Paragraph>

            <Title level={2}>12. Amendments to these Terms</Title>
            <Paragraph>
              We may amend these Terms from time to time. We will provide reasonable notice of any material changes, such as by 
              posting a notice on our website or sending an email to the email address associated with your account. Your 
              continued use of the Services after the effective date of such changes constitutes your acceptance of the amended Terms.
            </Paragraph>

            <Title level={2}>13. Governing Law and Dispute Resolution</Title>
            <Paragraph>
              13.1 These Terms shall be governed by and construed in accordance with the laws of the Republic of Lithuania, 
              without regard to its conflict of law provisions.
            </Paragraph>
            <Paragraph>
              13.2 Any dispute arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the 
              courts of Lithuania.
            </Paragraph>
            <Paragraph>
              13.3 If you are a consumer, you may also be entitled to use the European Commission's online dispute resolution platform, 
              which is available at https://ec.europa.eu/consumers/odr/.
            </Paragraph>

            <Title level={2}>14. Consumer Rights</Title>
            <Paragraph>
              If you are using our Services as a consumer, these Terms do not affect your statutory rights under Lithuanian and 
              EU consumer protection laws, including your right to withdraw from distance contracts within 14 days without giving 
              any reason, except for digital content where performance has begun with your prior express consent.
            </Paragraph>

            <Title level={2}>15. Severability</Title>
            <Paragraph>
              If any provision of these Terms is held to be unenforceable or invalid, such provision shall be changed and 
              interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, 
              and the remaining provisions shall continue in full force and effect.
            </Paragraph>

            <Title level={2}>16. Entire Agreement</Title>
            <Paragraph>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and us regarding your 
              use of the Services and supersede any prior or contemporaneous agreements, communications, and proposals, whether 
              oral or written, between you and us.
            </Paragraph>

            <Title level={2}>17. Contact Information</Title>
            <Paragraph>
              If you have any questions about these Terms, please contact us at:
              <br /><br />
              <Text strong>Silenskiu Biuras</Text><br />
              Email: legal@silotech.lt<br />
              Address: Vilnius, Lithuania
            </Paragraph>
          </Typography>
        </div>
      </Content>
    </Layout>
  );
};

export default TermsAndConditions;
