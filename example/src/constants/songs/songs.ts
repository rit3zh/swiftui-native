interface Song {
  title: string;
  featuredArtist?: string;
  explicit?: boolean;
}

export const ALBUM_NAME: string = "Loving In Stereo";
export const ARTIST_NAME: string = "Jungle";
export const COVER_ART: string = `https://i.scdn.co/image/ab67616d0000b27374cecbbd6d0b6db5fdcca49d`;
export const ALBUM_DESCRIPTION: string = `Loving in Stereo was released three years after their second studio album, For Ever (2018), and is the group's first release to include featured artists, with guest appearances from American rapper Bas and Swiss-Tamil musician Priya Ragu respectively. The album was preceded by five singles: "Keep Moving", "Talk About It", "Romeo", "Truth", and "All of the Time". `;
export const FOOTER_TEXT = `August 13, 2021\n12 Songs, 42 Minutes\n® 2021 Caiolia Records Ltd, under exclusive license to AWAL Recordings Ltd`;
export const RELEASE_DATE: string = "August 13, 2021";
export const SONGS: Song[] = [
  { title: "Dry Your Tears" },
  { title: "Keep Moving" },
  { title: "All Of The Time", explicit: true },
  { title: "Romeo", featuredArtist: "Bas", explicit: true },
  { title: "Lifting You" },
  { title: "Bonnie Hill" },
  { title: "Fire" },
  { title: "Talk About It", explicit: true },
  { title: "No Rules" },
  { title: "Truth" },
  { title: "What D'You Know About Me?", explicit: true },
  { title: "Just Fly, Don't Worry" },
  { title: "Goodbye My Love", featuredArtist: "Priya Ragu" },
  { title: "Can't Stop The Stars" },
];
