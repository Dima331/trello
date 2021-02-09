export function setLocalStorage(name: string, value: object) {
  const json = JSON.stringify(value);
  localStorage.setItem(name, json);
}

export function getLocalStorage(name: string): [] | null {
  const json = localStorage.getItem(name);

  if (json) {
    const jsonParse = JSON.parse(json);

    return jsonParse;
  }

  return null;
}
