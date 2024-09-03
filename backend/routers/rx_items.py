from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from exceptions import RxItemNotFound
from database import get_db
from models import RxItem
from schemas import RxItemCreateRequest, RxItemCreateResponse, RxItemUpdateRequest


router = APIRouter()


@router.get("/rx-items", tags=["Rx Items"])
async def get_rx_items(session: Session = Depends(get_db)) -> list[RxItem]:
    return session.exec(select(RxItem)).all()


@router.get("/rx-items/search", tags=["Rx Items"])
async def search_rx_items(query: str, session: Session = Depends(get_db)):
    rx_items = session.exec(
        select(RxItem).where(RxItem.name.ilike(f"%{query}%"))
    ).all()
    if not rx_items:
        raise RxItemNotFound(id=0)
    return rx_items


@router.get("/rx-items/{id}", tags=["Rx Items"])
async def get_rx_item(id: int, session: Session = Depends(get_db)) -> RxItem:
    rx_item: RxItem | None = session.get(RxItem, id)
    if rx_item is None:
        raise RxItemNotFound(id=id)

    return rx_item


@router.post("/rx-items", tags=["Rx Items"])
async def create_rx_item(rx_item_create_request: RxItemCreateRequest, session: Session = Depends(get_db)) -> RxItemCreateResponse:
    rx_item: RxItem = RxItem.from_orm(rx_item_create_request)
    session.add(rx_item)
    session.commit()
    session.refresh(rx_item)
    return RxItemCreateResponse(rx_item_id=rx_item.id)


@router.patch("/rx-items/{id}", tags=["Rx Items"])
async def update_rx_item(id: int, rx_item_update: RxItemUpdateRequest, session: Session = Depends(get_db)):
    rx_item: RxItem | None = session.get(RxItem, id)
    if rx_item is None:
        raise RxItemNotFound(id=id)

    for attr, value in rx_item_update.model_dump(exclude_unset=True).items():
        setattr(rx_item, attr, value)

    session.add(rx_item)
    session.commit()
    session.refresh(rx_item)
    # TODO: Return a 204 or whatever
