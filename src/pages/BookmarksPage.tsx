import { Bookmark } from "lucide-react";
import { LibraryPage } from "./LibraryPage";
import { useBookmarks } from "../data/store";

export function BookmarksPage() {
  const bookmarks = useBookmarks();
  const ids = Array.from(bookmarks);

  if (ids.length === 0) {
    return (
      <>
        <header className="page-head">
          <div>
            <h1 className="page-title">Bookmarks</h1>
            <p className="page-sub">Posts you've starred from the library.</p>
          </div>
        </header>
        <div className="empty">
          <Bookmark size={28} strokeWidth={1.5} color="var(--ink-muted)" />
          <h2 className="empty-title">No bookmarks yet.</h2>
          <p className="empty-sub">Click the bookmark icon on any post card to save it here for quick access.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <header className="page-head">
        <div>
          <h1 className="page-title">Bookmarks</h1>
          <p className="page-sub">Posts you've starred from the library.</p>
        </div>
      </header>
      <LibraryPage postIdSubset={ids} />
    </>
  );
}
