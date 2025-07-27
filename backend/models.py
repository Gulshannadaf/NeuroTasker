from pydantic import BaseModel
from typing import Optional

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str  # "todo", "in-progress", "completed"
    priority: str  # "low", "medium", "high"
    agent: str

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int

    class Config:
        from_attributes = True # updated to from_attributes for Pydantic V2+

class AgentBase(BaseModel):
    name: str
    role: str
    status: str  # "active", "idle"
    tasks_completed: int

class AgentCreate(AgentBase):
    pass

class Agent(AgentBase):
    id: int

    class Config:
        from_attributes = True # updated to from_attributes for Pydantic V2+