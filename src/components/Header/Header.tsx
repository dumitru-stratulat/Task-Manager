import React, { useContext, useState, Fragment } from 'react';

import './Header.css';
import Vector from '../../assets/Vector.svg';
import SearchIcon from '../../assets/SearchIcon.svg';
import CancelSearch from '../../assets/CancelSearch.svg';
import Bell from '../../assets/Bell.svg';
import Logo from '../../assets/Logo.png';
import PlusDropdown from './PlusDropdown/PlusDropdown';
import FolderDropdown from './FolderDropdown/FolderDropdown';
import BellDropdown from './BellDropdown/BellDropdown';
import { AppContext } from '../../context/AppContext';

const Header: React.FC = () => {
  const [plusDropdownIsOpen, setPlusDropdownIsOpen] = useState<boolean>(false);
  const [folderDropdownIsOpen, setFolderDropdownIsOpen] = useState<boolean>(
    false
  );
  const [bellDropdownIsOpen, setBellDropdownIsOpen] = useState<boolean>(false);
  const [searchInputIsOpen, setSearchInputIsOpen] = useState<boolean>(false);
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }
  return (
    <header className='mainHeader' data-testid='mainHeader'>
      <nav className='nav'>
        <div className='mainHeadList'>
          <div className='logo'>
            <img src={Logo} alt='logo' />
          </div>
          <div className='burgerMenuWrap'>
            <input type='checkbox' className='burgerToggler' />
            <div className='hamburger'>
              <div></div>
            </div>
            <div className='burgerMenu'>
              <div>
                <div>
                  <ul>
                    <li>Home</li>
                    <li>Projects</li>
                    <li>Planning</li>
                    <li>Everything</li>
                    <li>Calendar</li>
                    <li>People</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mainHeadBtns'>
          {!searchInputIsOpen ? (
            <Fragment>
              <button
                type='button'
                className='addTeamBtn'
                onClick={ctx.openModal}
              >
                <img
                  src='//cdn-pjs.teamwork.com/tko/public/assets/svg/inlinehelp/inviteusers.svg'
                  alt='add team'
                />
                <span>Add Your Team</span>
              </button>
              <button type='button' className='upgradeBtn'>
                Upgrade Now
              </button>
              <span
                className='searchCircle'
                onClick={() => setSearchInputIsOpen(true)}
              >
                <img src={SearchIcon} alt='search' className='search' />
              </span>
            </Fragment>
          ) : (
              <div className='searchInputContainer'>
                <img src={SearchIcon} alt='search' className='searchInInput' />
                <input
                  id='search'
                  className='searchInput'
                  type='search'
                  autoComplete='off'
                  placeholder='Search'
                />
                <img
                  src={CancelSearch}
                  alt='cancel search'
                  className='cancelSearchInInput'
                  onClick={() => setSearchInputIsOpen(false)}
                />
              </div>
            )}
          <div className='plusContainer'>
            <div
              className={!plusDropdownIsOpen ? 'plus' : 'whitePlus'}
              onClick={() => [
                setPlusDropdownIsOpen(!plusDropdownIsOpen),
                setFolderDropdownIsOpen(false),
                setBellDropdownIsOpen(false),
              ]}
            />
            {plusDropdownIsOpen && <PlusDropdown />}
          </div>
          <div
            className='folder'
            onClick={() => [
              setFolderDropdownIsOpen(!folderDropdownIsOpen),
              setPlusDropdownIsOpen(false),
              setBellDropdownIsOpen(false),
            ]}
          />
          {folderDropdownIsOpen && <FolderDropdown />}
          <span
            className='bellContainer'
            onClick={() => [
              setBellDropdownIsOpen(!bellDropdownIsOpen),
              setPlusDropdownIsOpen(false),
              setFolderDropdownIsOpen(false),
            ]}
          >
            <img src={Bell} alt='bell' className='bell' />
          </span>
          {bellDropdownIsOpen && <BellDropdown />}
          <span className='profileCircle'>EO</span>
          <img src={Vector} alt='vector' className='vector' />
        </div>
      </nav>
    </header>
  );
};

export default Header;
