import { useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useArticleStore from "@/store/article.store";
import type { Article } from "@/types/article";

function Articles() {
  const { articles, fetchArticles, createArticle } = useArticleStore();
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    fetchArticles({ page: 1, limit: 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onButtonSubmit = () => {
    const article = {
      title: titleRef.current?.value,
      author: authorRef.current?.value,
      description: descriptionRef.current?.value,
      body: bodyRef.current?.value,
    };
    console.log(article);
    createArticle(article as Article);
    // createArticle(article as Article);
  };

  return (
    <main className="p-8 flex flex-col gap-4">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusIcon className="size-4" />
              Add Article
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle className="capitalize">
                create new article
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title-1">Title</Label>
                <Input
                  ref={titleRef}
                  id="title-1"
                  name="title"
                  defaultValue="lorem ipsum"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="author-1">Author</Label>
                <Input
                  ref={authorRef}
                  id="author-1"
                  name="author"
                  defaultValue="lorem ipsum"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description-1">Description</Label>
                <Input
                  ref={descriptionRef}
                  id="description-1"
                  name="description"
                  defaultValue="lorem ipsum dolor sit amet"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="body-1">Body</Label>
                <Textarea
                  ref={bodyRef}
                  id="body-1"
                  name="body"
                  defaultValue="lorem ipsum dolor sit amet"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" onClick={onButtonSubmit}>
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      <section className="grid grid-cols-4 gap-4">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>{article.description}</CardDescription>
            </CardHeader>
            <CardContent>{article.body}</CardContent>
            <CardFooter>
              <CardAction>Read More</CardAction>
            </CardFooter>
          </Card>
        ))}
      </section>
      <div className="flex items-center justify-start gap-4">
        <Button variant="outline" size="sm">
          <ChevronLeftIcon className="size-4" />
          Prev
        </Button>
        <h1 className="font-semibold">1</h1>
        <Button variant="outline" size="sm">
          Next
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </main>
  );
}

export default Articles;
