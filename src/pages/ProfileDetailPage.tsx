import { useParams } from "react-router";
import { LibraryPage } from "./LibraryPage";
import { MOCK_PROFILES } from "../data/mock";

export function ProfileDetailPage() {
  const { id } = useParams();
  const profile = MOCK_PROFILES.find((p) => p.id === id);

  if (!profile) {
    return (
      <div className="empty">
        <h2 className="empty-title">Profile not found.</h2>
        <p className="empty-sub">It may have been removed.</p>
      </div>
    );
  }

  return <LibraryPage showProfileHeader={profile.id} />;
}
