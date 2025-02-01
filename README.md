# Study Management Web Application

## Overview
This project is a web application for managing studies with basic CRUD (Create, Read, Update, Delete) functionalities. It allows users to add, view, edit, and delete study records efficiently.

## Features
- **Create Study**: Add a new study with essential details.
- **View Study**: Display the study information in a structured format.
- **Edit Study**: Modify existing study details and update records.
- **Delete Study**: Remove study entries from the database.
- **Upload Files**: Adds files for specific users

## Technologies Used
- **Programming Language**: Python
- **Web Framework**: FastAPI
- **Frontend**: HTML, CSS
- **Database**: MySQL
- **Additional Features**:
  - Logging for tracking operations
  - Exception handling for robust error management

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/repository-name.git
   ```
2. Navigate to the project directory:
   ```sh
   cd repository-name
   ```
3. Create and activate a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
4. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
5. Configure the database settings in `settings.py`.
6. Run migrations:
   ```sh
   python manage.py migrate
   ```
7. Start the development server:
   ```sh
   python manage.py runserver
   ```
8. Open the application in your browser:
   ```
   http://127.0.0.1:8000/
   ```

## Usage
- Click **Add Study** to create a new study entry.
- Click **View** to see study details.
- Click **Edit** to modify study records.
- Click **Delete** to remove a study entry.

## Contributing
Contributions are welcome! Feel free to submit pull requests or report issues.

## License
This project is licensed under the MIT License.

