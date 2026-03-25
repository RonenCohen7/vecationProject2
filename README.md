Vacation Project – Microservices System
Overview

The Vacation Project is a full-stack microservices-based web application for managing vacations, including creating, updating, viewing, and managing vacation data.
The system is built using a microservices architecture where each service is responsible for a specific domain and communicates via REST APIs.
The project is containerized using Docker to ensure consistent development and deployment environments.
Tech Stack

Backend
  Node.js
  Express
  TypeScript
  MySQL / MongoDB
  REST API
  
Frontend
  React
  TypeScript
  CSS
  
DevOps
  Docker
  Docker Compose
  Environment Variables (.env)
  Microservices Architecture

The system is built using multiple microservices:
  Vacation Service – Manage vacations (CRUD operations)
  User Service – Authentication and user management
  Follow Service – Users can follow vacations
  Gateway / API Service – Central entry point for the system

Each service runs in its own Docker container.
vacationProject/
│
├── Backend/
│   ├── vacation-service/
│   ├── user-service/
│   ├── follow-service/
│
├── Frontend/
│   ├── react-app/
│
├── docker-compose.yml
├── docker-compose.production.yml
├── .env
└── README.md
