import { retrieveLabel } from "utils/CollectLabels";
import { attrCoords, attrFill, attrTitle, attrWH } from "./AttrHelper";

const Label = (
  shape: IShape,
  labels: LabelCache,
  canvasSize: [number, number]
) => {
  const elem = document.createElementNS("http://www.w3.org/2000/svg", "g");
  attrCoords(shape, canvasSize, elem);
  attrTitle(shape, elem);
  const name = shape.properties.name as IStrV<string>;
  if (retrieveLabel(name.contents, labels) !== undefined) {
    const renderedLabel = retrieveLabel(name.contents, labels)!.rendered;
    attrFill(shape, renderedLabel.getElementsByTagName("g")[0]);
    attrWH(shape, renderedLabel as any);
    renderedLabel.getElementsByTagName("g")[0].setAttribute("stroke", "none");
    renderedLabel
      .getElementsByTagName("g")[0]
      .setAttribute("stroke-width", "0");
    const fontSize = shape.properties.fontSize as IStrV<string>;
    renderedLabel.setAttribute(
      "style",
      `font-size: ${fontSize.contents.toString()}`
    );
    elem.appendChild(renderedLabel);
  } else {
    const txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txt.textContent = shape.properties.string.contents as string;
    elem.appendChild(txt);
  }
  return elem;
};
export default Label;
