import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useFolders } from "../data/store";
import { LibraryPage } from "./LibraryPage";

export function FolderPage() {
  const { id } = useParams();
  const folders = useFolders();
  const folder = folders.find((f) => f.id === id);

  if (!folder) {
    return (
      <div className="empty">
        <h2 className="empty-title">Folder not found.</h2>
        <Link to="/folders" className="btn-primary">Back to folders</Link>
      </div>
    );
  }

  return (
    <>
      <Link to="/folders" className="detail-back">
        <ArrowLeft size={14} strokeWidth={1.75} />
        All folders
      </Link>
      <LibraryPage postIdSubset={folder.postIds} />
    </>
  );
}
