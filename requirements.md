System Requirements Specification
QR Code Verification Mobile Application
Version 1.0  |  March 2026  |  INCOSE-Compliant


1. Introduction
This document defines the system requirements for a cross-platform mobile application enabling users to scan and verify QR codes via integration with a cloud-hosted backend service. The requirements are structured in accordance with INCOSE Systems Engineering Handbook v3.2 principles and ISO/IEC 15288:2008.
2. Stakeholders
End Users — individuals performing QR code scans in the field.
System Administrators — personnel managing user accounts and backend services.
Backend Engineering Team — responsible for API and database services on AWS/MariaDB.
Client Organisation — commissioning party with operational accountability.
Regulatory Bodies — applicable data protection authorities (e.g. GDPR supervisory authorities).
3. Requirements Table
Priority Levels: High = must have | Medium = should have | Low = nice to have
REQ-ID
Category
Requirement
Priority
Rationale
FR-001
Functional
The system SHALL provide a QR code scanning interface accessible from the mobile app home screen.
High
Core feature — enables users to initiate the primary workflow.
FR-002
Functional
The system SHALL activate the device camera when the user initiates a QR code scan.
High
Camera access is required to capture QR code data.
FR-003
Functional
The system SHALL decode a detected QR code and extract its encoded payload within 2 seconds of the code entering the camera frame.
High
Timely decoding is essential for a responsive user experience.
FR-004
Functional
The system SHALL transmit the extracted QR code payload to the backend verification service via a secure API call.
High
Verification requires server-side processing against authoritative data.
FR-005
Functional
The system SHALL display a clear visual confirmation indicator when a scanned QR code is verified as valid.
High
Users require unambiguous feedback upon successful verification.
FR-006
Functional
The system SHALL display a clear visual rejection indicator when a scanned QR code fails verification.
High
Users require unambiguous feedback upon failed verification.
FR-007
Functional
The system SHALL display an error message specifying the failure reason when QR code verification is unsuccessful.
Medium
Specific error messages allow users to take corrective action.
FR-008
Functional
The system SHALL allow the user to re-initiate a QR code scan after a failed or completed verification.
High
Continuous scanning capability supports operational workflows.
FR-009
Functional
The system SHALL store a local scan history log containing the QR code identifier, timestamp, and verification result for each completed scan.
Medium
Audit trail supports operational accountability.
FR-010
Functional
The system SHALL allow the user to view the scan history log within the mobile app.
Medium
Users need to review past verification activity.
FR-011
Functional
The system SHALL require user authentication before granting access to the QR code scanning functionality.
High
Authentication prevents unauthorised use of the verification system.
FR-012
Functional
The system SHALL support user login using a unique username and password credential pair.
High
Standard credential-based authentication is required.
FR-013
Functional
The system SHALL allow an authenticated user to log out of the application, terminating the active session.
High
Session termination protects against unauthorised access on shared devices.
FR-014
Functional
The system SHALL handle network unavailability during a scan attempt by displaying an informative offline error message to the user.
High
Graceful degradation prevents silent failures and user confusion.
FR-015
Functional
The system SHALL support scanning QR codes under varying ambient lighting conditions, including low-light environments, by enabling device flash when the user requests it.
Medium
Operational environments may not always provide adequate lighting.
NFR-001
Non-Functional
The system SHALL be available for use on devices running iOS 15.0 or later.
High
Ensures broad compatibility with current iOS device population.
NFR-002
Non-Functional
The system SHALL be available for use on devices running Android 10.0 (API Level 29) or later.
High
Ensures broad compatibility with current Android device population.
NFR-003
Non-Functional
The system SHALL encrypt all data in transit between the mobile client and the backend API using TLS 1.3 or higher.
High
Protects sensitive verification data from interception.
NFR-004
Non-Functional
The system SHALL store no QR code payload data in persistent device storage beyond the scan history log entry.
High
Minimises data exposure in the event of device compromise.
NFR-005
Non-Functional
The system SHALL allow a first-time user to complete the login process and perform their initial scan within 5 minutes without external assistance.
Medium
Measures operational usability for new users.
NFR-006
Non-Functional
The system SHALL maintain a crash-free session rate of 99% or higher, measured across all active users on a rolling 30-day basis.
High
Application stability is critical for operational reliability.
NFR-007
Non-Functional
The system SHALL comply with the applicable data protection regulations in the jurisdictions of deployment, including GDPR where applicable.
High
Legal compliance is mandatory for commercial operation.
NFR-008
Non-Functional
The system SHALL display all user-facing text in a minimum font size of 14sp on Android and 14pt on iOS to meet accessibility standards.
Medium
Supports accessibility for users with visual impairments.
IR-001
Interface
The system SHALL communicate with the backend verification service via a RESTful API using JSON-formatted request and response payloads.
High
Standardises integration between the mobile client and backend.
IR-002
Interface
The system SHALL interface with the AWS-hosted backend infrastructure using HTTPS endpoints defined by the backend engineering team.
High
AWS is the designated cloud platform for backend services.
IR-003
Interface
The system SHALL interact with the MariaDB database exclusively through the backend API layer; the mobile client SHALL NOT establish direct database connections.
High
Centralising data access through the API enforces security and separation of concerns.
IR-004
Interface
The system SHALL request device camera permission from the operating system before initiating any scan session, in compliance with iOS and Android permission models.
High
Both platforms require explicit runtime permission for camera access.
IR-005
Interface
The system SHALL display an in-app prompt explaining the purpose of camera permission when the operating system permission dialogue is triggered.
Medium
Context-aware permission requests improve user trust and approval rates.
IR-006
Interface
The system SHALL provide push notification capability to receive real-time alerts from the backend service regarding scan result status updates.
Low
Push notifications support asynchronous verification workflows.
PR-001
Performance
The system SHALL return a QR code verification result to the user within 3 seconds of payload transmission to the backend API for 95% of requests under normal network conditions.
High
Response time directly impacts operational throughput and user satisfaction.
PR-002
Performance
The system SHALL complete the camera initialisation and display a live preview within 1.5 seconds of the user initiating a scan session.
Medium
Camera launch latency affects perceived application responsiveness.
PR-003
Performance
The system SHALL support a minimum of 500 concurrent authenticated users accessing the backend verification API without service degradation.
High
Concurrent usage capacity must match anticipated operational scale.
PR-004
Performance
The system SHALL achieve a minimum QR code detection rate of 98% for standard QR codes (ISO/IEC 18004) when the code occupies at least 20% of the camera frame.
High
Detection reliability is fundamental to the core scanning function.
PR-005
Performance
The system SHALL maintain backend API availability of 99.5% or higher measured on a rolling monthly basis.
High
API downtime directly prevents use of the core verification function.
CR-001
Constraint
The system SHALL be developed using React Native or an equivalent cross-platform mobile framework that supports simultaneous iOS and Android deployment from a single codebase.
High
Cross-platform development is mandated to control cost and maintenance effort.
CR-002
Constraint
The system backend SHALL be deployed on Amazon Web Services (AWS) infrastructure.
High
AWS is the designated and approved cloud platform.
CR-003
Constraint
The system backend SHALL use MariaDB as the primary relational database management system.
High
MariaDB is the designated data persistence technology.
CR-004
Constraint
The system backend services SHALL be implemented in Python using a version no earlier than Python 3.10.
High
Python is the mandated server-side implementation language.
CR-005
Constraint
The system SHALL comply with Apple App Store Review Guidelines and Google Play Developer Programme Policies for all published releases.
High
Compliance is required to distribute the application through official app stores.


4. SHALL Statements
All requirements listed below are mandatory SHALL statements per INCOSE §4.2.2.2. Each is individually verifiable.
FUNCTIONAL REQUIREMENTS
FR-001  The system SHALL provide a QR code scanning interface accessible from the mobile app home screen.
FR-002  The system SHALL activate the device camera when the user initiates a QR code scan.
FR-003  The system SHALL decode a detected QR code and extract its encoded payload within 2 seconds of the code entering the camera frame.
FR-004  The system SHALL transmit the extracted QR code payload to the backend verification service via a secure API call.
FR-005  The system SHALL display a clear visual confirmation indicator when a scanned QR code is verified as valid.
FR-006  The system SHALL display a clear visual rejection indicator when a scanned QR code fails verification.
FR-007  The system SHALL display an error message specifying the failure reason when QR code verification is unsuccessful.
FR-008  The system SHALL allow the user to re-initiate a QR code scan after a failed or completed verification.
FR-009  The system SHALL store a local scan history log containing the QR code identifier, timestamp, and verification result for each completed scan.
FR-010  The system SHALL allow the user to view the scan history log within the mobile app.
FR-011  The system SHALL require user authentication before granting access to the QR code scanning functionality.
FR-012  The system SHALL support user login using a unique username and password credential pair.
FR-013  The system SHALL allow an authenticated user to log out of the application, terminating the active session.
FR-014  The system SHALL handle network unavailability during a scan attempt by displaying an informative offline error message to the user.
FR-015  The system SHALL support scanning QR codes under varying ambient lighting conditions, including low-light environments, by enabling device flash when the user requests it.

NON-FUNCTIONAL REQUIREMENTS
NFR-001  The system SHALL be available for use on devices running iOS 15.0 or later.
NFR-002  The system SHALL be available for use on devices running Android 10.0 (API Level 29) or later.
NFR-003  The system SHALL encrypt all data in transit between the mobile client and the backend API using TLS 1.3 or higher.
NFR-004  The system SHALL store no QR code payload data in persistent device storage beyond the scan history log entry.
NFR-005  The system SHALL allow a first-time user to complete the login process and perform their initial scan within 5 minutes without external assistance.
NFR-006  The system SHALL maintain a crash-free session rate of 99% or higher, measured across all active users on a rolling 30-day basis.
NFR-007  The system SHALL comply with the applicable data protection regulations in the jurisdictions of deployment, including GDPR where applicable.
NFR-008  The system SHALL display all user-facing text in a minimum font size of 14sp on Android and 14pt on iOS to meet accessibility standards.

INTERFACE REQUIREMENTS
IR-001  The system SHALL communicate with the backend verification service via a RESTful API using JSON-formatted request and response payloads.
IR-002  The system SHALL interface with the AWS-hosted backend infrastructure using HTTPS endpoints defined by the backend engineering team.
IR-003  The system SHALL interact with the MariaDB database exclusively through the backend API layer; the mobile client SHALL NOT establish direct database connections.
IR-004  The system SHALL request device camera permission from the operating system before initiating any scan session, in compliance with iOS and Android permission models.
IR-005  The system SHALL display an in-app prompt explaining the purpose of camera permission when the operating system permission dialogue is triggered.
IR-006  The system SHALL provide push notification capability to receive real-time alerts from the backend service regarding scan result status updates.

PERFORMANCE REQUIREMENTS
PR-001  The system SHALL return a QR code verification result to the user within 3 seconds of payload transmission to the backend API for 95% of requests under normal network conditions.
PR-002  The system SHALL complete the camera initialisation and display a live preview within 1.5 seconds of the user initiating a scan session.
PR-003  The system SHALL support a minimum of 500 concurrent authenticated users accessing the backend verification API without service degradation.
PR-004  The system SHALL achieve a minimum QR code detection rate of 98% for standard QR codes (ISO/IEC 18004) when the code occupies at least 20% of the camera frame.
PR-005  The system SHALL maintain backend API availability of 99.5% or higher measured on a rolling monthly basis.

CONSTRAINT REQUIREMENTS
CR-001  The system SHALL be developed using React Native or an equivalent cross-platform mobile framework that supports simultaneous iOS and Android deployment from a single codebase.
CR-002  The system backend SHALL be deployed on Amazon Web Services (AWS) infrastructure.
CR-003  The system backend SHALL use MariaDB as the primary relational database management system.
CR-004  The system backend services SHALL be implemented in Python using a version no earlier than Python 3.10.
CR-005  The system SHALL comply with Apple App Store Review Guidelines and Google Play Developer Programme Policies for all published releases.

5. Assumptions
A1. The backend API and AWS infrastructure will be designed and maintained by the backend team; this document specifies only the mobile client interface requirements.
A2. The application will be distributed via the Apple App Store and Google Play Store.
A3. Users will have smartphones with functioning cameras and internet connectivity (Wi-Fi or cellular).
A4. QR codes to be scanned conform to the ISO/IEC 18004 standard.
A5. The MariaDB schema and verification logic reside on the backend; the mobile app does not perform business logic validation.
A6. User account management (creation, password reset) is handled by a separate admin system, not the mobile app.
6. Open Questions
OQ-001. What is the maximum acceptable verification response time (SLA) agreed with end users and operations management?
OQ-002. Is offline verification (local cache) required when network connectivity is unavailable?
OQ-003. What types of data are encoded in the QR codes — are they proprietary identifiers, URLs, or structured records?
OQ-004. What authentication mechanism will the API use — JWT, OAuth 2.0, API key, or another method?
OQ-005. What jurisdictions will the app operate in, and which data protection regulations (e.g. GDPR, POPIA, CCPA) must be complied with?
OQ-006. Is multi-language (i18n) support required for the user interface?
OQ-007. Will the scan history log need to be exportable or synchronised to a central system?
OQ-008. Is biometric authentication (Face ID / fingerprint) required as a login option?
Generated in accordance with INCOSE Systems Engineering Handbook v3.2 (INCOSE-TP-2003-002-03.2) | ISO/IEC 15288:2008
