type LayoutBaseProps = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: LayoutBaseProps) => (
  <div className="font-mono max-w-screen-lg m-auto bg-white shadow-md text-teal-500">
    <header className="h-[75px] py-5">
      <h1 className="font-bold text-2xl text-center">Smart translator</h1>
    </header>
    <main className="h-[calc(100vh-115px)] py-5 px-10">{children}</main>
    <footer className="flex justify-center h-[40px] py-5 text-xs">
      <span>Matias Inchauspe</span>
    </footer>
  </div>
);

export default BaseLayout;
