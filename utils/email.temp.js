export const emailTempHtml=`"<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Status Update</title>
    <style type="text/css">
        /* Basic Reset & Body */
        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            font-family: 'Inter', sans-serif; /* Using Inter as requested */
            background-color: #f4f7fa;
            color: #333333;
        }
        table {
            border-spacing: 0;
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%;
        }
        td {
            padding: 0;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        a {
            text-decoration: none;
            color: #1a73e8; /* Google Blue */
        }

        /* Container & Layout */
        .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .content-padding {
            padding: 30px 40px;
        }

        /* Header */
        .header {
            background-color: #4285f4; /* Google Blue */
            padding: 30px 40px;
            text-align: center;
            color: #ffffff;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }

        /* Section Titles */
        .section-title {
            font-size: 22px;
            font-weight: bold;
            color: #333333;
            margin-bottom: 20px;
            text-align: center;
        }

        /* Server Status Table */
        .status-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin-bottom: 25px;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #e0e0e0;
        }
        .status-table th, .status-table td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }
        .status-table th {
            background-color: #f2f2f2;
            font-weight: bold;
            color: #555555;
            font-size: 15px;
        }
        .status-table tr:last-child td {
            border-bottom: none;
        }
        .status-ok {
            color: #28a745; /* Green */
            font-weight: bold;
        }
        .status-issue {
            color: #dc3545; /* Red */
            font-weight: bold;
        }
        .status-maintenance {
            color: #ffc107; /* Yellow/Orange */
            font-weight: bold;
        }

        /* Call to Action Button */
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            background-color: #1a73e8; /* Google Blue */
            color: #ffffff;
            padding: 15px 30px;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
            text-decoration: none;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #155bb5; /* Darker blue on hover */
        }

        /* Footer */
        .footer {
            background-color: #f2f2f2;
            padding: 20px 40px;
            text-align: center;
            font-size: 12px;
            color: #777777;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            margin-top: 20px;
        }
        .footer p {
            margin: 0;
        }

        /* Responsive Styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                border-radius: 0 !important;
            }
            .content-padding {
                padding: 20px 25px !important;
            }
            .header {
                padding: 20px 25px !important;
                border-radius: 0 !important;
            }
            .header h1 {
                font-size: 24px !important;
            }
            .section-title {
                font-size: 20px !important;
                margin-bottom: 15px !important;
            }
            .status-table th, .status-table td {
                padding: 10px 12px !important;
                font-size: 14px !important;
            }
            .button {
                padding: 12px 25px !important;
                font-size: 16px !important;
            }
            .footer {
                padding: 15px 25px !important;
                border-radius: 0 !important;
            }
        }
    </style>
</head>
<body>
    <center>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f7fa;">
            <tr>
                <td align="center" style="padding: 40px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" class="email-container">
                        <!-- Header -->
                        <tr>
                            <td class="header">
                                <h1>Subscription Server API Tracker MU3</h1>
                            </td>
                        </tr>

                        <!-- Main Content Area -->
                        <tr>
                            <td class="content-padding">
                                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px; text-align: center;">
                                    Dear User,
                                </p>
                                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                                    Here's a quick update on the current status of our servers. We strive to maintain optimal performance to ensure you have the best experience with our services.
                                </p>

                                <div class="section-title">Current Server Health</div>

                                <table class="status-table" role="presentation" cellspacing="0" cellpadding="0" border="0">
                                    <thead>
                                        <tr>
                                            <th>Service</th>
                                            <th>Status</th>
                                            <th>Last Updated</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Web Server (API)</td>
                                            <td class="status-ok">Operational</td>
                                            <td>July 29, 2025, 7:30 PM PKT</td>
                                        </tr>
                                        <tr>
                                            <td>Database Server</td>
                                            <td class="status-ok">Operational</td>
                                            <td>July 29, 2025, 7:30 PM PKT</td>
                                        </tr>
                                        <tr>
                                            <td>Analytics Service</td>
                                            <td class="status-issue">Degraded Performance</td>
                                            <td>July 29, 2025, 7:30 PM PKT</td>
                                        </tr>
                                        <tr>
                                            <td>File Storage</td>
                                            <td class="status-ok">Operational</td>
                                            <td>July 29, 2025, 7:30 PM PKT</td>
                                        </tr>
                                        <tr>
                                            <td>Email Service</td>
                                            <td class="status-maintenance">Under Maintenance</td>
                                            <td>July 29, 2025, 7:30 PM PKT</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                                    We are actively working to resolve the degraded performance on the Analytics Service and expect the Email Service maintenance to be completed within the next 2 hours.
                                </p>

                                <!-- Call to Action -->
                                <div class="button-container">
                                    <a href="https://your-app-link.com" class="button">
                                        Use Our App Now!
                                    </a>
                                </div>

                                <p style="font-size: 16px; line-height: 1.6; margin-top: 25px;">
                                    Thank you for your understanding and continued support.
                                </p>
                                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 0;">
                                    Best regards,<br>
                                    The [Your Company Name] Team
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td class="footer">
                                <p>&copy; 2025 [MU3]. All rights reserved.</p>
                                <p>
                                    <a href="" style="color: #777777; text-decoration: underline;">Privacy Policy</a> |
                                    <a href="" style="color: #777777; text-decoration: underline;">Unsubscribe</a>
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
"`