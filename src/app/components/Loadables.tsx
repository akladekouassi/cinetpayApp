import * as React from 'react';

const Loadable = (Component: React.LazyExoticComponent<React.ComponentType<any>>, Loader: NonNullable<React.ReactNode> | null = <div></div>): any => (
  props: unknown
) => (
  <React.Suspense fallback={Loader}>
    <Component {...props} />
  </React.Suspense>
);

export default Loadable;
