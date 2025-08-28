// api.js
const BASE_URL = "https://backend-interpolis.onrender.com";

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-tira el error para que el llamador pueda manejarlo
  }
}

async function getUsers() {
  return await fetchData("/users");
}

async function getPosts() {
  return await fetchData("/posts");
}

export { getUsers, getPosts };