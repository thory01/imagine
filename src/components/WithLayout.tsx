import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import MobileTabNav from './MobileTabNav';
// import TabNavigation from './TabNavigation';
// import AstriaHeader from './AstriaHeader';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* <AstriaHeader /> */}
      <div className="flex justify-center w-full select-text bg-light-mode min-h-screen" >
        <Navbar />
        <MobileTabNav />
        {/* <TabNavigation /> */}
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
