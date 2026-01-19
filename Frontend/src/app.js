const API = import.meta.env.VITE_API_URL;

const sendMessage = async (msg) => {
  const res = await fetch(`${API}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: msg }),
  });

  const data = await res.json();
  return data;
};
