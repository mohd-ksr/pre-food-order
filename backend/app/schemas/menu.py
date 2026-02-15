from pydantic import BaseModel

class MenuCreate(BaseModel):
    name: str
    price: int

class MenuUpdate(BaseModel):
    name: str | None = None
    price: int | None = None
    is_available: bool | None = None

class MenuResponse(BaseModel):
    item_id: int
    name: str
    price: int
    is_available: bool

    class Config:
        from_attributes = True
