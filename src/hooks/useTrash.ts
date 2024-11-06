import { useState } from "react";
import { trashPrompt } from "@/api/prompts";


export const useTrash = () => {
    const [isTrashed, setIsTrashed] = useState(false);

    const handleTrash = async (promptId: number) => {
        console.log(promptId);
        if (promptId) {
            const response = await trashPrompt(promptId);
            if (response) {
                setIsTrashed(!isTrashed);
            }
        }
    };

    return { isTrashed, handleTrash };
};
