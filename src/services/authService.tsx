export async function signupUser(data: {
  username: string;
  email: string;
  full_name: string;
  password: string;
}) {
  const response = await fetch("http://91.212.174.72:2000/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, created_date: new Date().toISOString() }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Signup failed");
  }

  return response.json();
}
