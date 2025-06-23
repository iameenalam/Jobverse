import Navbar from "@/components/navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ProviderRedux from "./provider";
import UserMessage from "./UserMessage";
import ComapnyMessage from "./CompanyMessage";
import JobMessage from "./JobMessage";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "Jobverse - Your Gateway to Better Careers",
  description: "Explore thousands of jobs across industries with Jobverse – your ultimate job portal for career growth and hiring talent.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProviderRedux>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ScrollToTop />
            <Navbar />
            {children}
            <UserMessage />
            <ComapnyMessage />
            <JobMessage />
          </ThemeProvider>
        </ProviderRedux>
      </body>
    </html>
  );
}
