import { Navigate, Route, Routes } from "react-router";
import { AppShell } from "./components/AppShell";
import { ProfilesPage } from "./pages/ProfilesPage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { FoldersPage } from "./pages/FoldersPage";
import { FolderPage } from "./pages/FolderPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { BookmarksPage } from "./pages/BookmarksPage";
import { ProfileDetailPage } from "./pages/ProfileDetailPage";
import { DiscoveryPage } from "./pages/DiscoveryPage";
import { GroupsPage } from "./pages/GroupsPage";
import { GroupDetailPage } from "./pages/GroupDetailPage";
import { SettingsPage } from "./pages/SettingsPage";
import { LandingPage } from "./landing/LandingPage";
import { AuthPage } from "./landing/AuthPage";
import { useAuthed } from "./data/store";

/* Gate the dashboard behind auth. Signed-out users land on the marketing
 * site / auth pages; signed-in users get the app. */
function RequireAuth({ children }: { children: React.ReactNode }) {
  const authed = useAuthed();
  if (!authed) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function PublicOnly({ children }: { children: React.ReactNode }) {
  const authed = useAuthed();
  if (authed) return <Navigate to="/library" replace />;
  return <>{children}</>;
}

export function App() {
  return (
    <Routes>
      {/* Public marketing + auth */}
      <Route path="/" element={<PublicOnly><LandingPage /></PublicOnly>} />
      <Route path="/signup" element={<PublicOnly><AuthPage mode="signup" /></PublicOnly>} />
      <Route path="/login" element={<PublicOnly><AuthPage mode="login" /></PublicOnly>} />

      {/* Authenticated dashboard */}
      <Route
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route path="/library" element={<ProfilesPage />} />
        <Route path="/discovery" element={<DiscoveryPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/folders" element={<FoldersPage />} />
        <Route path="/folder/:id" element={<FolderPage />} />
        <Route path="/profile/:id" element={<ProfileDetailPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/groups/:id" element={<GroupDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
