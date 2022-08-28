import Language from "../models/language";

export const LANGUAGES = {
  Javascript: "javascript",
  Python: "python",
  Java: "java",
  Cpp: "cpp",
  CSharp: "csharp",
};
export const LANGAUGES_OBJECTS = new Map([
  [
    LANGUAGES.Javascript,
    { langauge: new Language("javascript", "javascript") },
  ],
  [LANGUAGES.Python, { langauge: new Language("python", "Python") }],
  [LANGUAGES.Java, { langauge: new Language("java", "Java") }],
  [LANGUAGES.Cpp, { langauge: new Language("cpp", "C++") }],
  [LANGUAGES.CSharp, { langauge: new Language("csharp", "C#") }],
]);
