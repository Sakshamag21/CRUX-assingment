# Django React App with OpenRouter AI Integration

Welcome to the CRUX Assignment repository! This project showcases a web application built using Django and React, integrated with OpenRouter AI's Language Model. The application allows you to upload a CSV file, view its contents, and ask questions related to the data using the power of OpenRouter AI's language understanding capabilities.

## Getting Started

### Frontend

1. Install the required Node.js packages by running the following command in the `frontend` directory:

2. Once the dependencies are installed, use the frontend interface to upload a CSV file. The file should contain a maximum of 7 fields.

3. After uploading the file, you can easily view and explore your data within a modal.

### Backend
1. Install all the required libraries from requirements.txt

2. When a CSV file is uploaded, the data is processed and parsed within the `ProductCreateView` on the Django backend.

3. To utilize the question-answering feature, navigate to the Q&A section of the application.

4. Your questions are handled by the `QuesAnsView`, which in turn calls the `QuesAns` function. This function leverages OpenRouter AI's Language Model to provide insightful answers to your questions based on the data stored in the CSV file.

5. The data parsed from the uploaded CSV file is stored in a global variable, enabling efficient answering of questions.

## Usage

1. Start the Django backend server to handle API requests.

2. Launch the React frontend server to interact with the user interface.

3. Upload a CSV file using the provided frontend interface.

4. Explore the contents of the uploaded file within the modal that appears.

5. Make use of the search bar to ask questions related to the uploaded data.

## Technology Stack

- Frontend: React.js
- Backend: Django
- Language Model: OpenRouter AI's Language Model

## Note

Ensure that you have all the required dependencies properly installed and configured for both the frontend and backend components. The integration of OpenRouter AI's Language Model enhances the application's capabilities in understanding and generating answers based on the questions asked in relation to the uploaded CSV data.

Feel free to explore, modify, and customize the code to suit your specific requirements. For any questions, concerns, or assistance, refer to the provided documentation or seek support from the community.

Happy coding!
