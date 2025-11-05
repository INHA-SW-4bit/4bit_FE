const fetchWithAuth = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const accessToken = localStorage.getItem("accessToken");

  const headers = new Headers(init?.headers || {});
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const baseURL = "http://localhost:8080";
  try {
    const res = await fetch(`${baseURL}${input}`, {
      ...init,
      headers,
      credentials: "include",
    });

    if (res.status === 401) {
      alert("로그인을 다시 진행해주세요.");
      window.location.href = "/start";
    }

    return res;
  } catch (error) {
    console.error("fetchWithAuth error:", error);
    
    alert("로그인을 다시 진행해주세요.");
    window.location.href = "/start";
    
    throw error;
  }
};

export default fetchWithAuth;
