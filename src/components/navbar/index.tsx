import React, { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

import { changeImage } from '../../store/modules/cover/actions';
import images from '../../config/images';
import historyBehaviorService from '../../services/historyBehaviorService';

import useStyles from './styles';
import StepsSelector from './selectors';

interface ImageType {
  id: number,
  title: string,
  path: string,
}

const Navbar: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { pastLength, futureLength } = useSelector(StepsSelector);

  const [isOpenMenu, setIsOpenMenu] = React.useState<null | HTMLElement>(null);

  const clickListHandler = useCallback((event: React.MouseEvent<HTMLElement>): void => {
    setIsOpenMenu(event.currentTarget);
  }, []);

  const clickMenuHandler = (image: ImageType) => {
    if (image) {
      dispatch(changeImage(image.id));
    }

    setIsOpenMenu(null);
  };

  const closeHandler = useCallback((): void => {
    setIsOpenMenu(null);
  }, []);

  const pverStepHandler = useCallback((): void => {
    dispatch(UndoActionCreators.undo());
  }, []);

  const nextStepHandler = useCallback((): void => {
    dispatch(UndoActionCreators.redo());
  }, []);

  const isPrevDisabled = useMemo((): boolean => (
    pastLength <= 0
  ), [pastLength]);

  const isFutureDisabled = useMemo((): boolean => (
    futureLength <= 0
  ), [futureLength]);

  const historyHandler = useCallback((event: KeyboardEvent): void => {
    historyBehaviorService.handleKeyPress(event.ctrlKey, event.keyCode);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', historyHandler);

    return () => {
      window.removeEventListener('keydown', historyHandler);
    };
  }, []);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div>
            <List component="nav" aria-label="Device settings">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="Background"
                onClick={clickListHandler}
              >
                <ListItemText primary="Background" />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={isOpenMenu}
              keepMounted
              open={Boolean(isOpenMenu)}
              onClose={closeHandler}
            >
              {images.map((image) => (
                <MenuItem
                  key={image.id}
                  onClick={() => clickMenuHandler(image)}
                >
                  <img src={image.path} title={image.title} alt={image.title} width="400" height="150" />
                </MenuItem>
              ))}
            </Menu>
          </div>
          <Button
            variant="contained"
            color="secondary"
            disabled={isPrevDisabled}
            onClick={pverStepHandler}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={nextStepHandler}
            disabled={isFutureDisabled}
          >
            Next
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
