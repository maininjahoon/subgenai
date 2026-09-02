export async function uploadFileToCloudinary(
  formData: FormData,
  cloudName: string,
) {
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const data = await response.json();
    const errorDetails = data.error;
    throw new Error(errorDetails?.message || "Cloudinary upload failed");
  }
  const data = await response.json();
  return data;
}
