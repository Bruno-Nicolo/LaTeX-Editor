import { Copy, Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import axios from "axios";
import LoadingSpinner from "./ui/loading-spinner";
import { Button } from "./ui/button";
import { toast } from "sonner";

import * as z from "zod/v4";

export function PublicationSearch() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isQueryDone, setIsQueryDone] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setIsQueryDone(false);
      setLoading(true);
      const { data } = await axios.get(
        `https://dblp.org/search/publ/api?q=${searchQuery}&format=json`
      );
      setItems(data.result.hits.hit ?? []);
      setLoading(false);
      setIsQueryDone(true);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search a publication on dblp..."
          className="pl-8 bg-card"
        />
        <Search className="pointer-events-none relative -top-7 left-2.5 size-4 opacity-50 select-none" />
        <button className="hidden" type="submit"></button>
      </form>
      {loading ? (
        <LoadingSpinner />
      ) : (
        isQueryDone && (
          <div>
            {items.length > 0 ? (
              items.map((item, index) => (
                <PublicationCard item={item} key={index} />
              ))
            ) : (
              <div className="text-center mt-4">No items Found</div>
            )}
          </div>
        )
      )}
    </div>
  );
}

const itemSchema = z
  .object({
    info: z.object({
      authors: z.object({
        author: z.array(
          z
            .object({
              text: z.string(),
            })
            .loose()
        ),
      }),
      title: z.string(),
      venue: z.string(),
      year: z.string(),
      url: z.string(),
    }),
  })
  .loose();

function PublicationCard(props: { item: unknown }) {
  const isValidItem = itemSchema.safeParse(props.item);

  if (isValidItem.success) {
    const item = isValidItem.data;

    const authors = item.info.authors.author.map((author) => author.text);
    const title = item.info.title;
    const venue = item.info.venue;
    const year = item.info.year;

    const getBibCode = async () => {
      const { data } = await axios.get(`${item.info.url}.bib?param=1`);
      navigator.clipboard
        .writeText(data)
        .then(() => {
          toast.success("Copied to clipboard");
        })
        .catch(() => {
          toast.error("Some error occurred");
        });
    };

    return (
      <article className="mb-8">
        <p className="text-sm text-muted-foreground">{authors.join(", ")}</p>
        <h2 className="text-lg">
          {title}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="ml-2 h-6 w-6"
            onClick={getBibCode}
          >
            <Copy />
          </Button>
        </h2>
        <p className="font-thin">
          {venue}, {year}
        </p>
      </article>
    );
  } else {
    return <div>Something went wrong</div>;
  }
}
