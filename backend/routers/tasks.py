from fastapi import APIRouter, HTTPException
from models import Task
from database import tasks
from pydantic import BaseModel

router = APIRouter()

@router.get("/tasks", response_model=list[Task])
def get_tasks():
    return tasks

@router.post("/tasks", response_model=Task)
def add_task(task: Task):
    tasks.append(task)
    return task

@router.patch("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, updated_task: Task):
    for i, t in enumerate(tasks):
        if t.id == task_id:
            tasks[i] = updated_task
            return updated_task
    raise HTTPException(status_code=404, detail="Task not found")

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    for i, t in enumerate(tasks):
        if t.id == task_id:
            del tasks[i]
            return {"message": "Task deleted"}
    raise HTTPException(status_code=404, detail="Task not found")
