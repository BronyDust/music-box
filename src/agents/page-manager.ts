import { LinkedListNode } from "../abstracts/linked-list.class";
import RenderTree, { IRenderTreeNode } from "../entities/render-tree.class";
import Sheet from "../entities/Sheet.class";

function removeSheetFromContext(this: ContextState) {
  const { sheetNode, renderTree } = this;

  if (sheetNode) renderTree?.tree.deleteNode(sheetNode);
  this.sheetNode = undefined;
}

function addSheetToContext(this: ContextState) {
  const sheet = new Sheet();

  this.sheetNode = this.renderTree?.tree.append<Sheet>(sheet);

  return sheet;
}

/**
 * BEWARE
 * DO NOT USE DECONSTRUCTION. Fields of closure are used.
 * It throws if you try to use it without returning variable.
 * 
 * ### WHY
 * This design was chosen to break giant class apart and use
 * only shared state
 * 
 * #### Seriously, why context
 * Cuz it's fun
 * Fuck off
 */
function pageManager(this: ContextState, renderTree: RenderTree) {
  this.renderTree = renderTree;

  type PageManagerContext = {
    initSheet?: Function;
    removeSheet?: Function;
  };

  const boundAddSheetToContext = addSheetToContext.bind(this);
  const boundRemoveSheetFromContext = removeSheetFromContext.bind(this);

  function initSheet(this: PageManagerContext) {
    this.initSheet = undefined;
    this.removeSheet = removeSheet.bind(this);
    return boundAddSheetToContext();
  }

  function removeSheet(this: PageManagerContext) {
    this.removeSheet = undefined;
    this.initSheet = initSheet.bind(this);
    boundRemoveSheetFromContext();
  }

  const result: PageManagerContext = {
    initSheet,
    removeSheet: undefined
  }

  return result;
}

type ContextState = {
  sheetNode?: LinkedListNode<IRenderTreeNode, Sheet>;
  renderTree?: RenderTree;
}

export default pageManager.bind({});
