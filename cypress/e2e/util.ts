import * as dataAttr from "./attributes";

export function getHandleSelector(draggableId?: string) {
  if (draggableId) {
    return `[${dataAttr.dragHandle.draggableId}="${draggableId}"]`;
  }
  return `[${dataAttr.dragHandle.draggableId}]`;
}
