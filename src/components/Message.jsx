import React from "react";
import { Alert, Space } from "antd";

export function Message(props) {
  if (props.trigger === true && props.type === "error") {
    return (
      <div>
        <Space direction="vertical">
          <Alert type="error" message={props.message} banner />
        </Space>
      </div>
    );
  }
  if (props.trigger === true && props.type === "success") {
    return (
      <div>
        <Space direction="vertical">
          <Alert type="success" message={props.message} banner />
        </Space>
      </div>
    );
  } else {
    return <></>;
  }
}
