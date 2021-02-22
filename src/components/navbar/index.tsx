import React, { useEffect, useCallback, useMemo } from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
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

import { changeImage } from '../../store/modules/background/actions';
import { ImageType } from '../../types/Images';
import images from '../../config/images';
import historyService from '../../services/historyService';

import useStyles from './styles';
import NavbarSelector from './selectors';

const Navbar: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { pastLength, futureLength } = useSelector(NavbarSelector);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const clickListHandler = useCallback((event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  }, []);

  const clickMenuHandler = useCallback((image: ImageType): void => {
    if (image) {
      dispatch(changeImage(image.id));
    }

    setAnchorEl(null);
  }, []);

  const closeHandler = useCallback((): void => {
    setAnchorEl(null);
  }, []);

  const prevStepHandler = useCallback((): void => {
    dispatch(UndoActionCreators.undo());
  }, []);

  const nextStepHandler = useCallback((): void => {
    dispatch(UndoActionCreators.redo());
  }, []);

  const isPrevDisabled = useMemo((): boolean => {
    return pastLength <= 0;
  }, [pastLength]);

  const isFutureDisabled = useMemo((): boolean => {
    return futureLength <= 0;
  }, [futureLength]);

  const historyHandler = useCallback((event: KeyboardEvent): void => {
    historyService.keyPressHandle(event);
  }, []);

  const renderHistoryControls = useCallback((): JSX.Element => {
    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          disabled={isPrevDisabled}
          onClick={prevStepHandler}
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
      </>
    );
  }, [isPrevDisabled, isFutureDisabled]);

  const renderImages = useCallback(() => {
    return (
      images.map((image) => (
        <MenuItem
          key={image.id}
          onClick={() => clickMenuHandler(image)}
        >
          <img src={image.path} title={image.title} alt={image.title} width="400" height="150" />
        </MenuItem>
      ))
    );
  }, [images]);

  const renderDropDownList = useCallback((): JSX.Element => {
    return (
      <>
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
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={closeHandler}
        >
          {renderImages()}
        </Menu>
      </>
    );
  }, [anchorEl]);

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
            {renderDropDownList()}
          </div>
          {renderHistoryControls()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
