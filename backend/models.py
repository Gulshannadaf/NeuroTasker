from pydantic import BaseModel
from typing import Optional

class Task(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str  # "todo", "in-progress", "completed"
    priority: str  # "low", "medium", "high"
    agent: str

class Agent(BaseModel):
    id: int
    name: str
    role: str
    status: str  # "active", "idle"
    tasks_completed: int
