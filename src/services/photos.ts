export type Photo = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  /** Unsplash CDN photo slug — sized on demand by `thumbUrl` / `fullUrl`. */
  path: string;
};

/**
 * A curated set of comet / deep-sky shots, on brand for Comet. Static because six
 * hand-picked images beat a random API page, and it works offline-first at boot.
 */
const PHOTOS: Photo[] = [
  {
    id: 'comet',
    author: 'Bryan Goff',
    width: 1600,
    height: 1067,
    url: 'https://unsplash.com/photos/psIMdj26lgs',
    path: 'photo-1502134249126-9f3755a50d78',
  },
  {
    id: 'milky-way',
    author: 'Greg Rakozy',
    width: 1600,
    height: 1067,
    url: 'https://unsplash.com/photos/oMpAz-DN-9I',
    path: 'photo-1462331940025-496dfbfc7564',
  },
  {
    id: 'nebula',
    author: 'Jeremy Thomas',
    width: 1600,
    height: 1067,
    url: 'https://unsplash.com/photos/E0AHdsENmDg',
    path: 'photo-1447433589675-4aaa569f3e05',
  },
  {
    id: 'aurora',
    author: 'Vincent Guth',
    width: 1600,
    height: 1067,
    url: 'https://unsplash.com/photos/kQhLQrTuxG8',
    path: 'photo-1419242902214-272b3f66ee7a',
  },
  {
    id: 'earthrise',
    author: 'NASA',
    width: 1600,
    height: 1067,
    url: 'https://unsplash.com/photos/Q1p7bh3SHj8',
    path: 'photo-1451187580459-43490279c0fa',
  },
  {
    id: 'launch',
    author: 'SpaceX',
    width: 1600,
    height: 1067,
    url: 'https://unsplash.com/photos/OHOU-5UVIYQ',
    path: 'photo-1543722530-d2c3201371e7',
  },
];

export async function fetchPhotos(): Promise<Photo[]> {
  return PHOTOS;
}

const sized = (p: Photo, w: number) =>
  `https://images.unsplash.com/${p.path}?auto=format&fit=crop&w=${w}&q=80`;

export const thumbUrl = (p: Photo) => sized(p, 400);
export const fullUrl = (p: Photo) => sized(p, 1200);
