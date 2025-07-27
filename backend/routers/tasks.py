from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models import Task as PydanticTask, TaskCreate
from database import DBTask, get_db

router = APIRouter()

@router.post("/", response_model=PydanticTask)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    db_task = DBTask(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/", response_model=list[PydanticTask])
def get_tasks(db: Session = Depends(get_db)):
    return db.query(DBTask).all()

@router.get("/{task_id}", response_model=PydanticTask)
def get_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(DBTask).filter(DBTask.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@router.patch("/{task_id}", response_model=PydanticTask)
def update_task(task_id: int, updated_task: TaskCreate, db: Session = Depends(get_db)):
    db_task = db.query(DBTask).filter(DBTask.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, value in updated_task.model_dump(exclude_unset=True).items():
        setattr(db_task, key, value)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(DBTask).filter(DBTask.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"message": "Task deleted"}