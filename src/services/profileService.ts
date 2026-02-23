const BASE_URL =
  "https://library-backend-production-b9cf.up.railway.app/api";

function getToken(): string {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  return token;
}

export type UserProfile = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  profilePhoto: string | null;
  role: string;
  createdAt: string;
};

export type LoanStats = {
  borrowed: number;
  late: number;
  returned: number;
  total: number;
};

export type MyProfileResponse = {
  profile: UserProfile;
  loanStats: LoanStats;
  reviewsCount: number;
};

export async function getMyProfile(): Promise<MyProfileResponse> {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data.data; // 🔥 sekarang benar
}