/** One claim led by its number: the figure in large serif, what it counts, then the name and a line of detail. */
export interface FigureTileType {
  figure: string;
  label: string;
  name: string;
  detail: string;
}

export const FigureTile = ({ figure, label, name, detail }: FigureTileType) => (
  <div className="flex flex-col gap-2 border-t border-foreground/10 pt-4">
    <span className="font-serif text-4xl leading-none text-foreground sm:text-5xl">{figure}</span>
    <span className="font-mono text-[11px] text-foreground/60">{label}</span>
    <span className="mt-2 font-serif text-xl text-foreground/90">{name}</span>
    <span className="text-sm font-light leading-relaxed text-foreground/65">{detail}</span>
  </div>
);

/** Figure tiles in a grid, three across on wide screens or `columns` when given. */
export const FigureGrid = ({
  items,
  columns = 3,
}: {
  items: readonly FigureTileType[];
  columns?: 3 | 4;
}) => (
  <div
    className={`grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
  >
    {items.map((item) => (
      <FigureTile key={item.name} {...item} />
    ))}
  </div>
);
