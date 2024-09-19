export function getLanguage() {
  const defaultLanguage = "EN";
  const storedLanguage = localStorage.getItem("language");
  const language =
    storedLanguage === "EN" || storedLanguage === "ES"
      ? storedLanguage
      : defaultLanguage;

  if (!storedLanguage || language !== storedLanguage) {
    localStorage.setItem("language", language);
  }

  return language;
}
