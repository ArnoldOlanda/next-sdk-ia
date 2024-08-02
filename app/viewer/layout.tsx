import { Header } from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{height:'100vh',}}>
        <Header />
        {children}
    </div>
  );
}
