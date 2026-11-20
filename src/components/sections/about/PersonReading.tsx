import Image from "next/image";
import { LikedList, ListeningPanel } from "@/components/sections/about/ListeningPanel";
import { NowPlaying } from "@/components/sections/about/NowPlaying";
import { PhotoStrip } from "@/components/sections/about/PhotoStrip";
import { ContentBlock, IconRows } from "@/components/shared/ContentBlock";
import { ESSAY, RECENT_READS } from "@/data/about";
import { SOCIAL_LINKS } from "@/data/contact";
import { PHOTOS } from "@/data/photos";
import { fetchTopListening } from "@/lib/spotify";

const essayPhotos = new Set<string>(ESSAY.map(({ photo }) => photo));
const collage = PHOTOS.filter(({ src }) => !essayPhotos.has(src));

/** Each essay sentence under its photo, the pairs side by side, the photos cut to one shape. */
const Essay = () => (
  <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
    {ESSAY.map(({ photo, sentence }) => {
      const shot = PHOTOS.find(({ src }) => src === photo);
      if (!shot) return null;
      return (
        <figure key={photo} className="flex flex-col gap-6">
          <div className="relative aspect-[4/5] w-full border border-foreground/10">
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <figcaption>
            <p className="font-serif text-2xl leading-snug text-foreground/90 sm:text-3xl">
              {sentence}
            </p>
            <p className="mt-3 font-mono text-[11px] text-foreground/60">{shot.caption}</p>
          </figcaption>
        </figure>
      );
    })}
  </div>
);

/**
 * The person reading of the about page: a short photo essay, the rest of the photos and clips as a
 * collage, live and top listening from Spotify, what i'm reading, and where else to find me.
 */
export const PersonReading = async () => {
  const top = await fetchTopListening();

  return (
    <div className="space-y-24 sm:space-y-32">
      <Essay />

      <ContentBlock label="photos & clips">
        <PhotoStrip photos={collage} />
      </ContentBlock>

      <ContentBlock label="listening" note="live from Spotify">
        <div className="space-y-16">
          <NowPlaying aside={top && top.liked.length > 0 && <LikedList liked={top.liked} />} />
          {top && <ListeningPanel top={top} />}
        </div>
      </ContentBlock>

      <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-16">
        <ContentBlock label="reading" note="books that change how i think about work">
          <ol className="grid grid-cols-2 gap-6 sm:gap-8">
            {RECENT_READS.map(({ title, author, isbn }) => (
              <li key={isbn}>
                <div className="relative aspect-[2/3] w-full max-w-48 border border-foreground/10 bg-foreground/5">
                  <Image
                    src={`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`}
                    alt={`cover of ${title}`}
                    fill
                    sizes="(min-width: 1024px) 12rem, 40vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 font-serif text-xl italic leading-snug text-foreground/90">
                  {title}
                </p>
                <p className="mt-1.5 font-mono text-[11px] text-foreground/60">{author}</p>
              </li>
            ))}
          </ol>
        </ContentBlock>
        <ContentBlock label="elsewhere">
          <IconRows
            rows={SOCIAL_LINKS.map(({ label, href, displayUrl, icon }) => ({
              key: label,
              icon,
              title: label.toLowerCase(),
              sub: displayUrl,
              href,
            }))}
          />
        </ContentBlock>
      </div>
    </div>
  );
};
