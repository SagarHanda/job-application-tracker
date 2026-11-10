# CareerTrack – Job Application Tracker

CareerTrack is a full-stack web application built using Java and Spring Boot to help users manage and track their job applications in one place.

## Features

- Add new job applications.
- View all saved applications.
- Update application details and status.
- Delete applications.
- Track application statuses such as Saved, Applied, Assessment, Interview, Offer, and Rejected.
- Store application data in a MySQL database.

## Tech Stack

| Technology      | Purpose                                 |
| --------------- | --------------------------------------- |
| Java            | Backend programming                     |
| Spring Boot     | Backend framework                       |
| Spring Data JPA | Database operations                     |
| MySQL           | Database                                |
| HTML            | Frontend structure                      |
| CSS             | Frontend styling                        |
| JavaScript      | Frontend functionality                  |
| Maven           | Project and dependency management       |
| Git & GitHub    | Version control and hosting source code |

## Project Structure

```text
careertrack/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/sagar/
│   │   │       ├── controller/
│   │   │       ├── service/
│   │   │       ├── repository/
│   │   │       └── model/
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── index.html
│   │       │   ├── styles.css
│   │       │   └── app.js
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```

## Requirements

- Java (version compatible with the project)
- Maven
- MySQL
- Git

## How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/SagarHanda/job-application-tracker.git
```

### 2. Open the project folder

```bash
cd job-application-tracker
```

### 3. Create the MySQL database

Open MySQL and execute:

```sql
CREATE DATABASE job_tracker;
```

### 4. Configure database credentials

Set your MySQL credentials as environment variables in Windows Command Prompt:

```cmd
set DB_USERNAME=root
set DB_PASSWORD=your_mysql_password
```

Replace `your_mysql_password` with your own MySQL password.

### 5. Run the application

On Windows:

```cmd
mvnw.cmd spring-boot:run
```

Or, if Maven is installed:

```bash
mvn spring-boot:run
```

### 6. Open the application

Visit:

```text
http://localhost:8080
```

## Database Configuration

The application connects to a MySQL database named `job_tracker`.

Database credentials are supplied through environment variables instead of being stored directly in the project.

## Future Improvements

- User registration and login.
- Search and filter job applications.
- Dashboard with application statistics.
- Interview reminders and notifications.
- Deployment to a cloud platform.

## Author

**Sagar Handa**

GitHub: [SagarHanda](https://github.com/SagarHanda)

Project Repository: [Job Application Tracker](https://github.com/SagarHanda/job-application-tracker)
