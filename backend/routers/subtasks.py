from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Subtask, SubtaskCreate
from database import DBSubTask

router = APIRouter()

@router.post("/", response_model=Subtask)
def create_subtask(subtask: SubtaskCreate, db: Session = Depends(get_db)):
    db_subtask = DBSubtask(**subtask.dict())
    db.add(db_subtask)
    db.commit()
    db.refresh(db_subtask)
    return db_subtask

@router.get("/task/{task_id}", response_model=list[Subtask])
def get_subtasks_for_task(task_id: int, db: Session = Depends(get_db)):
    return db.query(DBSubtask).filter(DBSubtask.task_id == task_id).all()

@router.put("/{subtask_id}", response_model=Subtask)
def update_subtask(subtask_id: int, subtask: SubtaskCreate, db: Session = Depends(get_db)):
    db_subtask = db.query(DBSubtask).filter(DBSubtask.id == subtask_id).first()
    if not db_subtask:
        raise HTTPException(status_code=404, detail="Subtask not found")
    for field, value in subtask.dict().items():
        setattr(db_subtask, field, value)
    db.commit()
    db.refresh(db_subtask)
    return db_subtask

@router.delete("/{subtask_id}")
def delete_subtask(subtask_id: int, db: Session = Depends(get_db)):
    db_subtask = db.query(DBSubtask).filter(DBSubtask.id == subtask_id).first()
    if not db_subtask:
        raise HTTPException(status_code=404, detail="Subtask not found")
    db.delete(db_subtask)
    db.commit()
    return {"detail": "Subtask deleted"}
