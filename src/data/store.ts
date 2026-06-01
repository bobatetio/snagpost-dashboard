/* Tiny in-memory store with React subscription. The dashboard's mutation
 * surface is small (create folder, add post to folder, remove post from
 * folder), so a global store + useSyncExternalStore is enough. Real
 * implementation will swap to a server-state lib (TanStack Query etc.)
 * once the backend exists. */

import { useSyncExternalStore } from "react";
import { MOCK_FOLDERS, MOCK_POSTS } from "./mock";
import type { FacebookPost, Folder } from "../lib/types";

interface State {
  posts: FacebookPost[];
  folders: Folder[];
  bookmarkedIds: Set<string>;
  authed: boolean;
}

const AUTH_KEY = "socialpulse_authed";

function readAuthed(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

let state: State = {
  posts: MOCK_POSTS,
  folders: MOCK_FOLDERS,
  bookmarkedIds: new Set([
    // Seed a few bookmarks so the page isn't empty on first load.
    ...MOCK_POSTS.filter((_, i) => i % 7 === 0).map((p) => p.id).slice(0, 5),
  ]),
  authed: readAuthed(),
};

const listeners = new Set<() => void>();

function setState(next: State) {
  state = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function usePosts(): FacebookPost[] {
  return useSyncExternalStore(subscribe, () => state.posts);
}

export function useFolders(): Folder[] {
  return useSyncExternalStore(subscribe, () => state.folders);
}

export function useBookmarks(): Set<string> {
  return useSyncExternalStore(subscribe, () => state.bookmarkedIds);
}

export function toggleBookmark(postId: string) {
  const next = new Set(state.bookmarkedIds);
  if (next.has(postId)) next.delete(postId);
  else next.add(postId);
  setState({ ...state, bookmarkedIds: next });
}

/* ---------- Auth ---------- */

export function useAuthed(): boolean {
  return useSyncExternalStore(subscribe, () => state.authed);
}

export function signIn() {
  try { localStorage.setItem(AUTH_KEY, "1"); } catch { /* ignore */ }
  setState({ ...state, authed: true });
}

export function signOut() {
  try { localStorage.removeItem(AUTH_KEY); } catch { /* ignore */ }
  setState({ ...state, authed: false });
}

const FOLDER_LIMIT = 10;

export function createFolder(name: string): Folder | null {
  if (state.folders.length >= FOLDER_LIMIT) return null;
  const folder: Folder = {
    id: `f_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    name: name.trim() || "Untitled",
    postIds: [],
    createdAt: Date.now(),
  };
  setState({ ...state, folders: [...state.folders, folder] });
  return folder;
}

export function addPostToFolder(folderId: string, postId: string) {
  setState({
    ...state,
    folders: state.folders.map((f) =>
      f.id === folderId && !f.postIds.includes(postId)
        ? { ...f, postIds: [postId, ...f.postIds] }
        : f,
    ),
  });
}

export function removePostFromFolder(folderId: string, postId: string) {
  setState({
    ...state,
    folders: state.folders.map((f) =>
      f.id === folderId
        ? { ...f, postIds: f.postIds.filter((id) => id !== postId) }
        : f,
    ),
  });
}

export const FOLDERS_MAX = FOLDER_LIMIT;
