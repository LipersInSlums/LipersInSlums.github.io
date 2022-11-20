import fetch from "isomorphic-fetch";

export default async function fetchApi(path: string) {
  return await (await fetch(`http://localhost:3000/api/${path}`)).json();
}
