import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import MobileTabNav from './MobileTabNav';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex w-full justify-center select-text bg-light-mode min-h-screen" >
        <Navbar />
        <MobileTabNav />
        <div className="container">
          {children}
        </div>
      </div>
    </>
  );
};

const withLayout = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};

export default withLayout;
