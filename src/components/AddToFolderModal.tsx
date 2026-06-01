import { useState } from "react";
import { Folder, Plus, X } from "lucide-react";
import { addPostToFolder, createFolder, FOLDERS_MAX, useFolders } from "../data/store";

interface AddToFolderModalProps {
  postId: string;
  onClose: () => void;
}

export function AddToFolderModal({ postId, onClose }: AddToFolderModalProps) {
  const folders = useFolders();
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");

  const atLimit = folders.length >= FOLDERS_MAX;

  function handlePick(folderId: string) {
    addPostToFolder(folderId, postId);
    onClose();
  }

  function handleCreate() {
    const folder = createFolder(name);
    if (folder) {
      addPostToFolder(folder.id, postId);
      onClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div className="modal-title">Add to folder</div>
            <div className="modal-sub">
              Pick a folder or create a new one.
              {" "}<span style={{ color: "var(--ink-muted)" }}>{folders.length}/{FOLDERS_MAX}</span>
            </div>
          </div>
          <button type="button" className="card-menu-trigger" style={{ position: "static", opacity: 1 }} onClick={onClose} aria-label="Close">
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>

        <div className="folder-pick-list">
          {folders.length === 0 && (
            <div style={{ color: "var(--ink-muted)", fontSize: 13, padding: "8px 4px" }}>
              You haven't created any folders yet.
            </div>
          )}
          {folders.map((f) => {
            const already = f.postIds.includes(postId);
            return (
              <button
                key={f.id}
                type="button"
                className="folder-pick"
                onClick={() => !already && handlePick(f.id)}
                disabled={already}
                style={already ? { opacity: 0.5, cursor: "default" } : undefined}
              >
                <Folder size={14} strokeWidth={1.75} />
                <span className="folder-pick-name">{f.name}</span>
                <span className="folder-pick-count">{already ? "Already in" : `${f.postIds.length} posts`}</span>
              </button>
            );
          })}
        </div>

        <div className="modal-divider" />

        {creating ? (
          <>
            <input
              autoFocus
              className="modal-input"
              placeholder="Folder name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              maxLength={48}
            />
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={() => { setCreating(false); setName(""); }}>Cancel</button>
              <button type="button" className="btn-primary" onClick={handleCreate} disabled={!name.trim()}>
                Create and add
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            className="folder-pick"
            onClick={() => setCreating(true)}
            disabled={atLimit}
            style={atLimit ? { opacity: 0.5, cursor: "default" } : undefined}
            title={atLimit ? `Folder limit reached (${FOLDERS_MAX})` : undefined}
          >
            <Plus size={14} strokeWidth={1.75} />
            <span className="folder-pick-name" style={{ color: "var(--primary-deep)", fontWeight: 500 }}>
              {atLimit ? "Folder limit reached" : "Create new folder"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
