const API_URL = import.meta.env.VITE_API_URL;

export async function getUploadSignature() {
  const response = await fetch(`${API_URL}/cloudinary/upload-signature`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Internal server error. Please try again later.");
  }
  const data = await response.json();
  return data;
}
