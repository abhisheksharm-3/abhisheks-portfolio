import { Card, CardContent } from "@/components/ui/card";
import { SPACING_STANDARDS } from "@/lib/config/spacing-standards";

/**
 * Displays a detailed biography card with personal details and current interests.
 * @returns {JSX.Element} The BioCard component.
 */
export const BioCard = () => {
  return (
    <Card className="border-primary/10 backdrop-blur-sm h-full relative">
      <CardContent className={SPACING_STANDARDS.CARD.PADDING}>
        <h3 className={`text-2xl font-serif italic ${SPACING_STANDARDS.CONTENT.PARAGRAPH_SPACING}`}>Biography</h3>

        <div className="absolute top-8 right-8 opacity-10">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
            <path
              d="M30,20 Q50,10 70,30 T90,50"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M20,40 Q40,20 60,40 T80,60"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M10,60 Q30,30 50,50 T70,70"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className={`${SPACING_STANDARDS.CONTENT.LIST_SPACING} text-foreground/70 font-light`}>
          <p>
            Hey, I’m Abhishek — a developer who likes turning ideas into working
            products. I started out just curious about how apps worked, and that
            curiosity pretty much snowballed into studying Computer Science and
            building all kinds of projects.
          </p>

          <div className={`pl-4 border-l-2 border-primary/30 ${SPACING_STANDARDS.CONTENT.PARAGRAPH_SPACING} italic`}>
            <p className="text-foreground/80">
              “Clever code makes you feel smart. Simple code helps you sleep
              better.”
            </p>
          </div>

          <p>
            Most of what I do sits somewhere between frontend, backend, and
            mobile. I enjoy shipping stuff that actually feels good to use, not
            just works. That balance between technical detail and user
            experience is what keeps me hooked.
          </p>

          <div className={`bg-primary/5 p-4 rounded-md border border-primary/10 ${SPACING_STANDARDS.CONTENT.PARAGRAPH_SPACING}`}>
            <h4 className={`text-sm font-medium ${SPACING_STANDARDS.CONTENT.SMALL_SPACING} text-primary/80`}>
              What I’m into right now
            </h4>
            <p className="text-sm">
              Playing around with RAG systems, AI agents, and Appwrite backends.
              Also deep diving into Jetpack Compose and native Android — because
              I think mobile + AI is where a lot of the fun is headed.
            </p>
          </div>

          <p>
            Hackathons have been a big part of my story — they pushed me to ship
            fast, solve problems creatively, and actually enjoy the chaos.
            Whether it was building a media verification tool in a day or trying
            out weird new ideas, those sprints shaped how I work.
          </p>

          <p>
            Outside of projects, I’m just trying to keep learning,
            experimenting, and building things that are both useful and a little
            exciting. That’s the vibe I want to carry into whatever I work on
            next.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
