import React from "react";

import { Tag } from "neetoui";

const RenderTags = ({ keyProp, label, onClose }) => (
  <Tag
    className="px-2 py-1 text-sm capitalize"
    key={keyProp}
    label={label}
    size="large"
    style="text"
    type="solid"
    onClose={onClose}
  />
);

export default RenderTags;
