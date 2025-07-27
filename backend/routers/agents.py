from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Agent as PydanticAgent, AgentCreate
from database import DBAgent, get_db

router = APIRouter()

@router.post("/", response_model=PydanticAgent)
def create_agent(agent: AgentCreate, db: Session = Depends(get_db)):
    db_agent = DBAgent(**agent.model_dump())
    db.add(db_agent)
    db.commit()
    db.refresh(db_agent)
    return db_agent

@router.get("/", response_model=list[PydanticAgent])
def get_agents(db: Session = Depends(get_db)):
    return db.query(DBAgent).all()

@router.get("/{agent_id}", response_model=PydanticAgent)
def get_agent(agent_id: int, db: Session = Depends(get_db)):
    db_agent = db.query(DBAgent).filter(DBAgent.id == agent_id).first()
    if db_agent is None:
        raise HTTPException(status_code=404, detail="Agent not found")
    return db_agent

@router.patch("/{agent_id}", response_model=PydanticAgent)
def update_agent(agent_id: int, updated_agent: AgentCreate, db: Session = Depends(get_db)):
    db_agent = db.query(DBAgent).filter(DBAgent.id == agent_id).first()
    if db_agent is None:
        raise HTTPException(status_code=404, detail="Agent not found")
    for key, value in updated_agent.model_dump(exclude_unset=True).items():
        setattr(db_agent, key, value)
    db.commit()
    db.refresh(db_agent)
    return db_agent

@router.delete("/{agent_id}")
def delete_agent(agent_id: int, db: Session = Depends(get_db)):
    db_agent = db.query(DBAgent).filter(DBAgent.id == agent_id).first()
    if db_agent is None:
        raise HTTPException(status_code=404, detail="Agent not found")
    db.delete(db_agent)
    db.commit()
    return {"message": "Agent deleted"}