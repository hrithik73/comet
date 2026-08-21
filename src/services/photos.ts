export type Photo = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

/** Picsum returns a random-ish page of photos; no API key, no pagination state to keep. */
export async function fetchPhotos(): Promise<Photo[]> {
  const page = 1 + Math.floor(Math.random() * 10);
  const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=30`);
  if (!res.ok) throw new Error(`picsum ${res.status}`);
  return res.json();
}

export const thumbUrl = (p: Photo) => `https://picsum.photos/id/${p.id}/400/400`;
export const fullUrl = (p: Photo) => `https://picsum.photos/id/${p.id}/1200`;
