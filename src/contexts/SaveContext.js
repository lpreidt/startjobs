import { message as messageApi } from "antd";
export function shortSuccess() {
  messageApi.open({
    type: "success",
    content: "Gespeichert",
  });
}
export function shortError() {
  messageApi.open({
    type: "error",
    content: "Fehler",
  });
}
