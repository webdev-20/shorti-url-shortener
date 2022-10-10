import React from 'react';

const ShortLinkContext = React.createContext(null);

function ShortLinkProvider({ children, value }) {
  return <ShortLinkContext.Provider value={value}>{children}</ShortLinkContext.Provider>;
}

function useShortLinkContext() {
  const context = React.useContext(ShortLinkContext);

  if (context === undefined) {
    throw new Error('ShortLinkContext must be used within a ShortLinkProvider');
  }
  return context;
}

export { ShortLinkProvider, useShortLinkContext };
