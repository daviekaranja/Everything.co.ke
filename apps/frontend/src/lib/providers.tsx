// "use client";

// import { ThemeProvider } from "next-themes";
// import { Toaster } from "sonner";

// export function ClientProviders({ children }: { children: React.ReactNode }) {
//   return (
//     <ThemeProvider
//       attribute="class"
//       defaultTheme="system"
//       enableSystem
//       disableTransitionOnChange
//     >
//       {children}
//       <Toaster
//         position="top-right"
//         richColors
//         closeButton
//         toastOptions={{
//           duration: 4000,
//           className: "font-sans",
//         }}
//       />
//     </ThemeProvider>
//   );
// }

"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // 1. Import
import { useState } from "react";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  // 2. Create the client instance (this keeps it stable)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Optional: Global defaults
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    // 3. Wrap everything in the QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            duration: 4000,
            className: "font-sans",
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
