import React from "react";

import { Tag } from "neetoui";

const renderTag = (key, label, onClose) => (
  <Tag
    className="px-2"
    key={key}
    label={label}
    size="large"
    style="text"
    type="solid"
    onClose={onClose}
  />
);

export default renderTag;
