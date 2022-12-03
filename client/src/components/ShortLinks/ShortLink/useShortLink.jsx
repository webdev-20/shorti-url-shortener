import { useState } from 'react';

function useShortLink({ shortLink }) {
  const [shortLinkState, setShortLinkState] = useState(shortLink);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowMenu((prevState) => !prevState);
    }
  };
  const closeMenu = () => {
    setShowMenu(false);
  };

  const editShortLink = (content) => {
    setShortLinkState({
      ...content,
    });
  };

  return {
    shortLinkState,
    showMenu,
    toggleMenu,
    closeMenu,
    editShortLink,
  };
}

export { useShortLink };
