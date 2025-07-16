import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const Nunito_Sans_Font = Nunito_Sans({
  subsets: ["latin"],
});



export const metadata = {
  title: "Logo Generator",
  description: "Generates your own logo",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${Nunito_Sans_Font.className}`}
        >
          <Provider>
            {children}
          </Provider>
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
