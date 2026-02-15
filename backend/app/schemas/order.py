from pydantic import BaseModel
from typing import List, Literal

class OrderItemCreate(BaseModel):
    item_id: int
    quantity: int


class OrderCreate(BaseModel):
    time_slot: str
    items: List[OrderItemCreate]


# 👇 NEW: Item shown in order (bill line)
class OrderItemResponse(BaseModel):
    item_name: str
    price: float
    quantity: int
    subtotal: float


class OrderResponse(BaseModel):
    order_id: int
    time_slot: str
    status: str
    items: List[OrderItemResponse]
    total_price: float

class OrderStatusUpdate(BaseModel):
    status: Literal["ready", "picked"]