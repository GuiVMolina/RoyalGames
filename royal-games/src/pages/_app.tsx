import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { Orbitron, Exo } from "next/font/google";

const orbitron = Orbitron({
  variable: "--font-Orbitron",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const exo = Exo({
  variable: "--font-Exo",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={exo.variable}>
      <Component {...pageProps} />
      <ToastContainer />
    </main>
  );
}
