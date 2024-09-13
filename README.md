# Secure and Decentralized Certificate Generation and Validation System

This project aims to develop a secure and decentralized certificate generation and validation system leveraging **Blockchain** and **IPFS** technologies. The system ensures **data integrity** and **user authentication** by combining the immutability of blockchain with the decentralized nature of IPFS.

## Table of Contents
- [Features](#features)
- [Use Case Diagram](#use-case-diagram)
- [Workflow](#workflow)
- [Technologies Used](#technologies-used)
- [Implementation Details](#implementation-details)
  - [Login Page](#login-page)
  - [Signup Page](#signup-page)
  - [Home Page](#home-page)
  - [Generate Certificate and Template Selection](#generate-certificate-and-template-selection)
  - [Certificate Details](#certificate-details)
  - [Certificate Preview](#certificate-preview)
  - [Adding Certificate to IPFS & Receiving Hash](#adding-certificate-to-ipfs--receiving-hash)
  - [Validation Page](#validation-page)
- [Usage](#usage)
- [Contributing](#contributing)

## Features
- **Secure Certificate Generation:** Users can generate certificates with unique details such as name, email, GST number, and contact info.
- **Decentralized Storage:** Certificates are stored on **IPFS**, ensuring secure and tamper-proof storage.
- **Blockchain Integration:** The certificate hash is stored on a blockchain via smart contracts, providing an immutable record.
- **Verification Feature:** Users can validate certificates by inputting the certificate hash to check its authenticity against the blockchain.
- **User Authentication:** Registration and login are required to generate certificates, ensuring security through database verification.

## Use Case Diagram

![Use Case Diagram](https://github.com/Tusshar10/DigiCertify-Certificate-Generation-and-Verification/assets/115549132/b9cbbf69-d6bd-4db0-9703-43510d97351c)

## Workflow

![Workflow](https://github.com/user-attachments/assets/5a11f8dc-c928-49d5-9ada-66cd5dff0ecc)

## Technologies Used

- **Frontend:**
  - React.js
  - Vite for fast development setup

- **Backend:**
  - Node.js with Express.js
  - MongoDB for user credentials storage
  - JWT for user authentication

- **Blockchain:**
  - Ethereum smart contracts (via Solidity)
  - Web3.js for interaction with the blockchain

- **Storage:**
  - IPFS (InterPlanetary File System) for decentralized file storage

## Implementation Details

### Login Page

Users can enter valid credentials to log in to the system.

![Login Page](https://github.com/user-attachments/assets/949d06d3-7352-4780-875a-f09e36358282)

### Signup Page

If the user is not registered in our database, they must sign up first.

![Signup Page](https://github.com/user-attachments/assets/0ef89cfd-6515-40f3-bdff-1c9bf7e86f58)

### Home Page

After successful login, users are redirected to the home page, where they can interact with the system and use the "Generate Certificate" or "Validate Certificate" functionality.

![Home Page](https://github.com/user-attachments/assets/c6251abf-a42e-4c55-8ddf-9a289175dc0a)

### Generate Certificate and Template Selection

Users have the flexibility to select from a range of provided templates and generate certificates tailored to their specific requirements.

![Generate Certificate and Template Selection](https://github.com/user-attachments/assets/fe1ed75d-ab8d-40a5-8faa-0a38b4203793)

### Certificate Details

Organizations can fill in these details to generate the certificate and download it in PDF format.

![image](https://github.com/user-attachments/assets/eb6578a3-e0ea-46e8-a47d-dc227527a494)


### Certificate Preview

Upon selecting a template, users can generate their certificate, preview it, and then have the option to download it. They can also choose to add the certificate to IPFS to obtain the necessary hash.

![Certificate Preview](https://github.com/user-attachments/assets/d1d8cc47-6c95-4040-8398-0e043b9a81f4)

### Adding Certificate to IPFS & Receiving Hash

After adding the certificate to IPFS, users will see a pop-up showing the certificate hash received from IPFS.

![Adding to IPFS](https://github.com/user-attachments/assets/b5d1636d-7521-413e-9670-41b0fe910976)

### Validation Page

Verifiers can check whether the certificate is valid by entering the certificate hash.

![Validation Page](https://github.com/user-attachments/assets/0aea6f74-ad9d-48b2-9320-a207c7e66bc9)

## Usage

To use the Secure and Decentralized Certificate Generation and Validation System:

1. **Generate a Certificate:**
   - Navigate to the frontend application.
   - Log in or register an account.
   - Fill in the required certificate details (e.g., name, email, GST number).
   - Submit the form to generate a certificate. The certificate will be stored on IPFS, and the hash will be recorded on the blockchain.

2. **Verify a Certificate:**
   - Access the verification page on the frontend application.
   - Enter the certificate hash.
   - The application will fetch the certificate details from IPFS and validate the hash against the blockchain.

## Contributing

Contributions are welcome! If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them thoroughly.
4. Submit a pull request with a detailed description of your changes.

