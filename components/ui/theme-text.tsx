"use client";

import { generate } from "makeitreact";
import { ComponentType, useEffect, useState } from "react";
import DOMPurify from "dompurify";

export function ThemeText({
  text,
  theme,
  OnLoadingComponent,
  OnErrorComponent,
}: {
  text: string;
  theme: string;
  OnLoadingComponent: ComponentType;
  OnErrorComponent: ComponentType;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("...");
  const [isError, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await generate("ec359c02-1142-4870-99da-29aed57160a2", {
          text,
          theme,
        });
        const sanitized = DOMPurify.sanitize(result!);
        setMessage(sanitized);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading && <OnLoadingComponent />}
      {!isLoading && isError && <OnErrorComponent />}
      {!isLoading && !isError && (
        <div dangerouslySetInnerHTML={{ __html: message }}></div>
      )}
    </>
  );
}
