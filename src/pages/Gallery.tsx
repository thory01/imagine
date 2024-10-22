import React from "react";
import WithLayout from "@/components/WithLayout";
import PromptForm from "@/components/PromptForm";
import MasonryGallery from "@/components/Gallery";
import usePrompts from "@/hooks/usePrompts";

const Gallery: React.FC = () => {
  const { prompts, fetchMoreData } = usePrompts(true);

  return (
    <div className="flex-1 relative">
      <PromptForm />
      <MasonryGallery prompts={prompts} fetchMoreData={fetchMoreData} />
    </div>
  );
};

export default WithLayout(Gallery);
