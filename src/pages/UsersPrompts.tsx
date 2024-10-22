import React, { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import WithLayout from "@/components/WithLayout";
import PromptCard from "@/components/PromptCard";
import PromptForm from "@/components/PromptForm";
import usePrompts from "@/hooks/usePrompts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import InfiniteScroll from "react-infinite-scroll-component";

const UsersPrompts: React.FC = () => {
  const { prompts, fetchMoreData } = usePrompts(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(prompts);
  const loadMorePrompts = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError(null);
    try {
      const hasMoreData = await fetchMoreData();
      setHasMore(hasMoreData);
    } catch (error) {
      setError("An error occurred while loading more prompts. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [fetchMoreData, loading]);

  const lastPromptElementRef = useInfiniteScroll({
    loading,
    hasMore,
    loadMore: loadMorePrompts,
  });

  return (
    <div className="flex-1 relative">
      <PromptForm />
      <div className="mx-auto overflow-hidden">
        <InfiniteScroll
          dataLength={prompts.length}
          next={loadMorePrompts}
          hasMore={hasMore}
          loader={<Loader2 className="mx-auto animate-spin" />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollThreshold={0.8}
          style={{ overflow: "hidden" }}
        >
          <div className="grid grid-cols-1">
            {prompts.map((prompt, index) => (
              <div
                key={prompt.id || index}
                ref={index === prompts.length - 1 ? lastPromptElementRef : null}
              >
                <PromptCard prompt={prompt} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default WithLayout(UsersPrompts);
