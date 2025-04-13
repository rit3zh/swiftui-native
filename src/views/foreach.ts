import { ReactElement } from "react";

const ForEach = <T>(
  iterable: T[],
  renderFn: (element: T, index: number) => ReactElement<any>
) => {
  return iterable.map(renderFn);
};
export default ForEach;
