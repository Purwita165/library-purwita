import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/layout/Container";
import { getMyProfile, MyProfileResponse } from "../services/profileService";

export default function MyProfilePage() {
  const navigate = useNavigate();

  const [data, setData] = useState<MyProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const result = await getMyProfile();
        setData(result);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  if (loading)
    return (
      <Container>
        <div className="py-10">Loading profile...</div>
      </Container>
    );

  if (error || !data)
    return (
      <Container>
        <div className="py-10 text-red-500">{error}</div>
      </Container>
    );

  return (
    <Container>
      <div className="py-10 max-w-xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <div className="bg-white shadow rounded-xl p-6 space-y-4">

          <div>
            <div className="text-sm text-gray-500">Name</div>
            <div className="font-semibold">{data.profile.name}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-semibold">{data.profile.email}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Role</div>
            <div className="font-semibold">{data.profile.role}</div>
          </div>

          <hr />

          <h2 className="font-semibold">Loan Statistics</h2>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Borrowed: {data.loanStats.borrowed}</div>
            <div>Returned: {data.loanStats.returned}</div>
            <div>Late: {data.loanStats.late}</div>
            <div>Total: {data.loanStats.total}</div>
          </div>

          <div className="mt-4 text-sm">
            Reviews Written: {data.reviewsCount}
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>

        </div>
      </div>
    </Container>
  );
}