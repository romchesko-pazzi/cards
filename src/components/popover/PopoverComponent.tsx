import React from 'react';

import { ListItemIcon, MenuItem, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { path } from '../../utils/constants/paths';
import { DeleteModal } from '../modals/deleteModal/DeleteModal';
import { EditModal } from '../modals/editModal/EditModal';
import { SvgSelector } from '../svgSelector/SvgSelector';

import s from './popover.module.scss';

export const PopoverComponent: React.FC<PropsType> = props => {
  const { packName, packId, cardsTotalCount } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  // interact with popover
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const navigateToLearnPage = () => {
    navigate(path.learn, {
      state: {
        packName,
        packId,
        cardsTotalCount,
      },
    });
  };

  return (
    <div className={s.popoverMain}>
      <button type="button" onClick={handleClick}>
        <SvgSelector id="settings" />
      </button>
      <Popover
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 2,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 15,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div className={s.popover}>
          <MenuItem>
            <ListItemIcon>
              <EditModal isThisPlaceCards={false} id={packId} name={packName} />
            </ListItemIcon>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <DeleteModal isThisPlaceCards={false} id={packId} name={packName} />
            </ListItemIcon>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <button type="button" onClick={navigateToLearnPage}>
                <SvgSelector id="learn" />
              </button>
            </ListItemIcon>
          </MenuItem>
        </div>
      </Popover>
    </div>
  );
};

type PropsType = {
  packId: string;
  packName: string;
  cardsTotalCount: number; // for correct display cards on LearnPage
};
