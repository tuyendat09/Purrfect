import { useState } from "react";

export default function useChangeContent() {
  const [content, setContent] = useState<string>("profile");

  function handleChangeContent(changeContent: string) {
    setContent(changeContent);
  }
  return {
    handleChangeContent,
    content,
  };
}
