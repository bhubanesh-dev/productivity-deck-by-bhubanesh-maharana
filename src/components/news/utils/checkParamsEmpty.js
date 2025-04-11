import { isEmpty, values } from "ramda";

export const areParamsEmpty = params => values(params).every(isEmpty);
