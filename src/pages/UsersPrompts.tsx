import React, { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import WithLayout from "@/components/WithLayout";
import PromptCard from "@/components/PromptCard";
import PromptForm from "@/components/PromptForm";
import usePrompts from "@/hooks/usePrompts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const UsersPrompts: React.FC = () => {
  const { prompts, fetchMoreData } = usePrompts(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMorePrompts = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError(null);
    try {
      const hasMoreData = await fetchMoreData();
      setHasMore(hasMoreData);
    } catch (error) {
      setError("Failed to load more prompts.");
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
    <div className="flex-1 relative bg-white">
      <PromptForm />
      <div className="w-full h-full absolute top-0 flex flex-col overflow-hidden">
          <div className="max-w-[1140px] w-full mx-auto px-8 pt-28 h-full overflow-y">
            {error && <p className="text-center text-red-500 mb-4">{error}</p>}
            {prompts.length > 0 &&
              prompts.map((prompt, index) => (
                <div
                  key={prompt.id || index}
                  ref={index === prompts.length - 1 ? lastPromptElementRef : null}
                >
                  <PromptCard prompt={prompt} />
                </div>
              ))}
            {loading && (
              <div className="grid w-full place-items-center py-4">
                <Loader2 className="animate-spin text-blue-500" size={24} />
              </div>
            )}
            {!hasMore && (
              <p className="text-center text-gray-500 py-4">
                You've reached the end!
              </p>
            )}
          </div>
        </div>
      </div>
  );
};

export default WithLayout(UsersPrompts);
