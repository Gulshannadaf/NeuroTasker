from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import ForeignKey
import os

# Database connection string
# Using environment variables for sensitive information and flexibility
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/neurotasksai")

# Create a SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Create a session local class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for declarative models
Base = declarative_base()

# Define the Task and Agent models for SQLAlchemy
class DBTask(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    status = Column(String, index=True)
    priority = Column(String, index=True)
    agent = Column(String, index=True)
    
class DBSubTask(Base):
    __tablename__ = "subtasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    status = Column(String,default="todo")
    task_id = Column(Integer,ForeignKey("tasks.id"))    

class DBAgent(Base):
    __tablename__ = "agents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    role = Column(String)
    status = Column(String)
    tasks_completed = Column(Integer)

# Function to create tables
def create_db_tables():
    try:
        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully or already exist.")
    except SQLAlchemyError as e:
        print(f"Error creating database tables: {e}")

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()