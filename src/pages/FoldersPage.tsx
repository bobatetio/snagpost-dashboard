import { useState } from "react";
import { Link } from "react-router";
import { Plus, Folder as FolderIcon } from "lucide-react";
import { createFolder, FOLDERS_MAX, useFolders, usePosts } from "../data/store";
import type { FacebookPost, Folder } from "../lib/types";

export function FoldersPage() {
  const folders = useFolders();
  const posts = usePosts();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");

  const atLimit = folders.length >= FOLDERS_MAX;

  function handleCreate() {
    const trimmed = name.trim();
    if (!trimmed) return;
    createFolder(trimmed);
    setName("");
    setCreating(false);
  }

  function postsFor(folder: Folder): FacebookPost[] {
    return folder.postIds
      .map((id) => posts.find((p) => p.id === id))
      .filter((p): p is FacebookPost => !!p);
  }

  return (
    <>
      <header className="page-head">
        <div>
          <h1 className="page-title">Folders</h1>
          <p className="page-sub">{folders.length}/{FOLDERS_MAX} folders. Group captured posts into named collections.</p>
        </div>
        {!atLimit && !creating && (
          <button type="button" className="page-cta" onClick={() => setCreating(true)}>
            <Plus size={14} strokeWidth={2} />
            New folder
          </button>
        )}
      </header>

      <div className="folders-grid">
        {creating && (
          <div className="folder-card folder-card-creating">
            <input
              autoFocus
              className="folder-card-input"
              placeholder="Folder name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate();
                if (e.key === "Escape") { setCreating(false); setName(""); }
              }}
              maxLength={48}
            />
            <div className="folder-card-create-actions">
              <button type="button" className="btn-secondary" onClick={() => { setCreating(false); setName(""); }}>
                Cancel
              </button>
              <button type="button" className="btn-primary" onClick={handleCreate} disabled={!name.trim()}>
                Create
              </button>
            </div>
          </div>
        )}

        {folders.map((f) => {
          const folderPosts = postsFor(f);
          const hero = folderPosts.find((p) => p.thumbnailUrl) ?? folderPosts[0];
          return (
            <Link key={f.id} to={`/folder/${f.id}`} className="folder-card">
              <div className="folder-card-hero">
                {hero?.thumbnailUrl ? (
                  <img src={hero.thumbnailUrl} alt="" loading="lazy" />
                ) : (
                  <FolderIcon size={26} strokeWidth={1.5} className="folder-card-hero-icon" />
                )}
              </div>
              <div className="folder-card-meta">
                <span className="folder-card-name">{f.name}</span>
                <span className="folder-card-count">
                  {folderPosts.length} {folderPosts.length === 1 ? "post" : "posts"}
                </span>
              </div>
            </Link>
          );
        })}

        {!atLimit && !creating && folders.length === 0 && (
          <button type="button" className="new-folder-card" onClick={() => setCreating(true)}>
            <Plus size={20} strokeWidth={1.5} />
            <span>Create your first folder</span>
          </button>
        )}
      </div>
    </>
  );
}
