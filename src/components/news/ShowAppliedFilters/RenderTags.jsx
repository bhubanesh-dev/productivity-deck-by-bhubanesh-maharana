import React from "react";

import { Tag } from "neetoui";

const renderTag = (key, label, onClose) => (
  <Tag
    className="px-2 py-1 text-lg capitalize"
    key={key}
    label={label}
    size="large"
    style="text"
    type="solid"
    onClose={onClose}
  />
);

export default renderTag;
