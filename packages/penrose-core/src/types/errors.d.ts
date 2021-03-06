//#region ErrorTypes

// type PenroseError = LanguageError | RuntimeError;
// type LanguageError = DomainError | SubstanceError | StyleError | PluginError;
// type RuntimeError = OptimizerError | EvaluatorError;
// type StyleError = StyleParseError | StyleCheckError | TranslationError;
type PenroseError =
  | (DomainError & { errorType: "DomainError" })
  | (SubstanceError & { errorType: "SubstanceError" })
  | (StyleError & { errorType: "StyleError" });

// TODO: does type var ever appear in Substance? If not, can we encode that at the type level?
type SubstanceError =
  | ParseError
  | DuplicateName
  | TypeNotFound
  | TypeVarNotFound
  | TypeMismatch
  | ArgLengthMismatch
  | TypeArgLengthMismatch
  | VarNotFound
  | DeconstructNonconstructor
  | UnexpectedExprForNestedPred
  | FatalError; // TODO: resolve all fatal errors in the Substance module

type DomainError =
  | ParseError
  | TypeDeclared
  | TypeVarNotFound
  | TypeNotFound
  | DuplicateName
  | CyclicSubtypes
  | NotTypeConsInSubtype
  | NotTypeConsInPrelude;

type StyleError = ParseError | GenericStyleError;

interface GenericStyleError {
  tag: "GenericStyleError";
  messages: string[];
}

interface ParseError {
  tag: "ParseError";
  message: string;
}

interface UnexpectedExprForNestedPred {
  tag: "UnexpectedExprForNestedPred";
  sourceType: TypeConstructor;
  sourceExpr: ASTNode;
  expectedExpr: ASTNode;
}

interface CyclicSubtypes {
  tag: "CyclicSubtypes";
  cycles: string[][];
}
interface NotTypeConsInPrelude {
  tag: "NotTypeConsInPrelude";
  type: Prop | TypeVar;
}

interface NotTypeConsInSubtype {
  tag: "NotTypeConsInSubtype";
  type: Prop | TypeVar;
}
interface TypeDeclared {
  tag: "TypeDeclared";
  typeName: Identifier;
}
interface DuplicateName {
  tag: "DuplicateName";
  name: Identifier;
  location: ASTNode;
  firstDefined: ASTNode;
}
interface TypeVarNotFound {
  tag: "TypeVarNotFound";
  typeVar: TypeVar;
}
interface TypeNotFound {
  tag: "TypeNotFound";
  typeName: Identifier;
  possibleTypes?: Identifier[];
}
interface VarNotFound {
  tag: "VarNotFound";
  variable: Identifier;
  possibleVars?: string[]; // TODO: use Identifier type, but need to store them in env
}

interface TypeMismatch {
  tag: "TypeMismatch";
  sourceType: TypeConstructor;
  expectedType: TypeConstructor;
  sourceExpr: ASTNode;
  expectedExpr: ASTNode;
}
interface ArgLengthMismatch {
  tag: "ArgLengthMismatch";
  name: Identifier;
  argsGiven: SubExpr[];
  argsExpected: Arg[];
  sourceExpr: ASTNode;
  expectedExpr: ASTNode;
}

interface TypeArgLengthMismatch {
  tag: "TypeArgLengthMismatch";
  sourceType: TypeConstructor;
  expectedType: TypeConstructor;
  sourceExpr: ASTNode;
  expectedExpr: ASTNode;
}

interface DeconstructNonconstructor {
  tag: "DeconstructNonconstructor";
  deconstructor: Deconstructor;
}

// NOTE: for debugging purposes
interface FatalError {
  tag: "Fatal";
  message: string;
}

// NOTE: aliased to ASTNode for now, can include more types for different errors
type ErrorSource = ASTNode;

//#endregion
