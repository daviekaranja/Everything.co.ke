"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
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
          // This ensures Sonner toasts also match your brand theme
          className: "font-sans",
        }}
      />
    </ThemeProvider>
  );
}
