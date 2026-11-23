import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import ThemeToggle from "@modules/dk/editorial/theme-toggle"
import Script from "next/script"

const themeBootstrap = `(()=>{try{const key="dk-color-theme";const saved=localStorage.getItem(key);const theme=saved==="dark"||saved==="light"?saved:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");const root=document.documentElement;root.dataset.theme=theme;root.classList.toggle("dark",theme==="dark");root.style.colorScheme=theme}catch{}})()`

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "BioProductos DK · Propuesta DEMO",
    template: "%s · DK DEMO",
  },
  description:
    "Propuesta local de diseño y comercio para BioProductos DK. Contenido demostrativo, sin venta real.",
  robots: { index: false, follow: false },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        {props.children}
        <ThemeToggle />
        <Script
          src="https://mcp.figma.com/mcp/html-to-design/capture.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
