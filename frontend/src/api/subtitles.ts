import type { DashboardStats } from "@/types/dashboardStats";
import type { GenerateSubtitlePayload } from "@/types/generateSubtitlePayload";
import type {
  GetRecentSubtitlesResponse,
  GetSubtitlesResponse,
} from "@/types/subtitle";

const API_URL = import.meta.env.VITE_API_URL;

async function getSubtitles(
  queryString: string,
): Promise<GetSubtitlesResponse> {
  const response = await fetch(`${API_URL}/subtitles?${queryString}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch subtitles. Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

async function getRecentSubtitles(): Promise<GetRecentSubtitlesResponse> {
  const response = await fetch(`${API_URL}/recent-subtitles`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    try {
      const data = await response.json();
      throw new Error(data?.message || "Failed to get recent subtitles.");
    } catch (err) {
      throw new Error("Failed to get recent subtitles.");
    }
  }

  const data = await response.json();
  return data;
}

async function generateSubtitles(payload: GenerateSubtitlePayload) {
  const response = await fetch(`${API_URL}/generate-subtitle`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    try {
      const data = await response.json();
      throw new Error(data?.message || "Failed to generate subtitles.");
    } catch (err) {
      throw new Error("Failed to generate subtitles.");
    }
  }

  const data = await response.json();
  return data;
}

async function getDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(`${API_URL}/dashboard-stats`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    try {
      const data = await response.json();
      throw new Error(data?.message || "Failed to get dashboard stats.");
    } catch (err) {
      throw new Error("Failed to get dashboard stats.");
    }
  }

  const data = await response.json();
  return data;
}

async function deleteSubtitle(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/subtitle/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    let message;
    if (response.status === 401) message = "Unauthorized. Please log in again.";
    else if (response.status === 404) message = "Subtitle not found.";
    else message = "Internal server error. Please try again later.";
    throw new Error(message);
  }
}

export {
  getSubtitles,
  generateSubtitles,
  getRecentSubtitles,
  getDashboardStats,
  deleteSubtitle,
};
