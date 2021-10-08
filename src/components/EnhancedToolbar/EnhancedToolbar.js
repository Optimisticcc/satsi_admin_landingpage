import {
  IconButton,
  lighten,
  makeStyles,
  MenuItem,
  Select,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import { CSVLink } from 'react-csv';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    height: 80,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    position: 'sticky',
    top: 65,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  downloadIcon: {
    fontSize: '40px',
    marginRight: '20px',
  },
}));

const EnhancedToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    requestSearch,
    cancelSearch,
    search,
    data,
    searchPlaceholder,
    selectItem,
    handleChangeFilter,
    openFilter,
    onOpenFilter,
    onCloseFilter,
    headers,
    title,
  } = props;
  // const headers = [
  //   { label: 'Name', key: 'Name' },
  //   { label: 'PhoneNumber', key: 'PhoneNumber' },
  //   { label: 'Adress', key: 'Adress' },
  //   { label: 'Email', key: 'Email' },
  //   { label: 'CodeCTV', key: 'CodeCTV' },
  //   { label: 'Presenter', key: 'Presenter' },
  //   { label: 'PhonePresenter', key: 'PhonePresenter' },
  //   { label: 'id', key: 'id' },
  //   { label: 'Company', key: 'Company' },
  //   { label: 'CodeCompany', key: 'CodeCompany' },
  // ];

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} được chọn
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          {title}
        </Typography>
      )}
      {data[0] ? (
        <Tooltip title='Tải file excel'>
          <CSVLink data={data} headers={headers} filename='ctv.csv'>
            <CloudDownloadIcon className={classes.downloadIcon} />
          </CSVLink>
        </Tooltip>
      ) : (
        <Tooltip title='Chọn ít nhất 1 bản ghi '>
          <CloudDownloadIcon className={classes.downloadIcon} />
        </Tooltip>
      )}
      <SearchBar
        value={search}
        onChange={(value) => requestSearch(value)}
        onCancelSearch={cancelSearch}
        placeholder={searchPlaceholder}
      />
      {openFilter ? (
        <Select
          onChange={handleChangeFilter}
          open={openFilter}
          onClose={onCloseFilter}
        >
          {selectItem.map((item) => (
            <MenuItem value={item.value} key={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Tooltip title='Lọc danh sách'>
          <IconButton aria-label='filter list' onClick={onOpenFilter}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default EnhancedToolbar;
