import { linksReducer, initialState } from './linksReducer.js';
import { createContext, useContext, useReducer } from 'react';
import linksServices from '../services/links.js';

export const LinksContext = createContext(initialState);

export const LinksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(linksReducer, initialState);

  const getLinks = async () => {
    // api calls
    // TODO: probably have to add user, and get only links created by that user
    // (when users are linked to links)
    const allLinks = await linksServices.getAll();

    await dispatch({
      type: 'GET_LINKS',
      payload: { links: allLinks.data },
      // user:
    });
    return allLinks.data;
  };

  const addLink = (link) => {
    //api call
    dispatch({
      type: 'ADD_LINK',
      payload: link,
    });
  };

  return (
    <LinksContext.Provider
      value={{
        state,
        addLink,
        getLinks,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
};

export const useLinks = () => {
  const context = useContext(LinksContext);
  if (!context) {
    throw Error('useLinks is not used within a LinksProvider');
  }
  return context;
};
