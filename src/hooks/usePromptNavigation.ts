import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Prompt } from "@/types";

export const usePromptNavigation = (
  currentPromptIndex: number,
  prompts: Prompt[],
  type: string,
  currentImageIndex: number
) => {
  const navigate = useNavigate();

  const navigateToNext = () => {
    const nextIndex = currentPromptIndex + 1;

    if (nextIndex < prompts.length) {
      const nextImageIndex = currentImageIndex + 1;
      const images = prompts[currentPromptIndex].images;

      console.log(`/prompt/${prompts[currentPromptIndex].id}`, { type, index: nextImageIndex });
      if (nextImageIndex < images.length) {
        navigate(`/prompt/${prompts[currentPromptIndex].id}`, {
          state: { type, index: nextImageIndex },
        });
      } else {
        navigate(`/prompt/${prompts[nextIndex].id}`, {
          state: { type, index: 0 },
        });
      }
    }
  };

  const navigateToPrevious = () => {
    const previousIndex = currentPromptIndex - 1;
    const images = prompts[previousIndex]?.images;

    if (previousIndex >= 0) {
      const previousImageIndex = currentImageIndex - 1;

      if (previousImageIndex >= 0) {
        navigate(`/prompt/${prompts[currentPromptIndex].id}`, {
          state: { type, index: previousImageIndex },
        });
      } else {
        navigate(`/prompt/${prompts[previousIndex].id}`, {
          state: { type, index: images.length - 1 },
        });
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        navigateToNext();
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        navigateToPrevious();
      }
    };

    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        navigateToNext();
      } else if (event.deltaY < 0) {
        navigateToPrevious();
      }
    };

    // Variables to store touch start and end coordinates
    let touchStartX = 0;
    let touchEndX = 0;

    // Handle touch start
    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0].clientX;
    };

    // Handle touch move
    const handleTouchMove = (event: TouchEvent) => {
      touchEndX = event.touches[0].clientX;
    };

    // Handle touch end
    const handleTouchEnd = () => {
      if (touchStartX - touchEndX > 50) {
        // Swipe left to navigate to the next prompt
        navigateToNext();
      } else if (touchEndX - touchStartX > 50) {
        // Swipe right to navigate to the previous prompt
        navigateToPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleScroll);

    // Add touch event listeners for mobile support
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleScroll);

      // Remove touch event listeners
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentPromptIndex, currentImageIndex, prompts]);

  // Return the navigation functions for potential external use
  return { navigateToNext, navigateToPrevious };
};
