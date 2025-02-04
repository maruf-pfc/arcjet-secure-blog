import Header from "./header";

const CommonLayout = ({ children }) => {
  const isAuth = false;
  return (
    <div className="min-h-screen bg-gray-100">
      {isAuth && <Header />}
      <main>{children}</main>
    </div>
  );
};

export default CommonLayout;
