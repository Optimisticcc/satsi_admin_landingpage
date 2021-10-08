import {
  IconButton,
  lighten,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { CSVLink } from 'react-csv';
import { useRef, useState } from 'react';
import { Cached } from '@material-ui/icons';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
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
}));

const TableToolbar = ({
  selected,
  headers,
  handleDownLoadCSV,
  filename,
  title,
}) => {
  const csvLinkEl = useRef();
  const classes = useToolbarStyles();
  const [data, setData] = useState([]);
  const numSelected = selected.length;

  const getData = (data) => {
    if (data) {
      setData(data);
    }
  };

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
          chọn {numSelected} bản ghi
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

      {numSelected > 0 ? (
        <Tooltip title='Tải về'>
          <IconButton
            aria-label='export'
            onClick={() => {
              return handleDownLoadCSV(csvLinkEl, getData);
            }}
          >
            <CloudDownloadIcon color='primary' fontSize='large' />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Chọn ít nhất 1 bản ghi'>
          <IconButton aria-label='normal'>
            <CloudDownloadIcon color='disabled' fontSize='large' />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title='Tải lại bảng'>
        <IconButton
          aria-label='reload'
          onClick={() => window.location.reload()}
        >
          <Cached color='secondary' fontSize='large' />
        </IconButton>
      </Tooltip>
      <CSVLink
        ref={csvLinkEl}
        data={data}
        headers={headers}
        filename={filename}
      ></CSVLink>
    </Toolbar>
  );
};

export default TableToolbar;
