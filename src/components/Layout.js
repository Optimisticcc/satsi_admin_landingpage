import {
  AppBar,
  Avatar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  ExitToApp,
} from '@material-ui/icons';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { format } from 'date-fns';
import { useHistory, useLocation } from 'react-router';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      backgroundColor: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: 'flex',
    },
    active: {
      backgroundColor: '#f4f4f4',
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
    logout: {
      marginRight: '5px',
    },
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: 'Sơ tuyển online (Landing page)',
      icon: <FormatListBulletedIcon color='secondary' />,
      path: '/so-tuyen-lp',
    },
    {
      text: 'Đăng ký tư vấn (Landing page)',
      icon: <FormatListBulletedIcon color='secondary' />,
      path: '/tu-van-lp',
    },
    {
      text: 'Đăng ký chương trình (Satsi)',
      icon: <FormatListBulletedIcon color='secondary' />,
      path: '/dang-ky-chuong-trinh',
    },
    {
      text: 'Cộng tác viên',
      icon: <FormatListBulletedIcon color='secondary' />,
      path: '/ctv',
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>Admin</Typography>
          <Avatar src='/logo_satsi.png' className={classes.avatar} />
          <Tooltip title='Đăng Xuất'>
            <IconButton
              variant='contained'
              onClick={handleLogout}
              aria-label='delete'
            >
              <Typography
                variant='caption'
                color='secondary'
                className={classes.logout}
              >
                Đăng xuất
              </Typography>
              <ExitToApp color='secondary' />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant='permanent'
        anchor='left'
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant='h5' className={classes.title}>
            Danh sách
          </Typography>
        </div>

        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
