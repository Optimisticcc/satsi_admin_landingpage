import { Button, Modal, Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { format, parseISO } from 'date-fns/esm';

const useStyle = makeStyles((theme) => ({
  contain: {
    width: '700px',
    margin: '100px auto',
  },
  modal: {
    paddingBottom: 30,
    '& h1': {
      padding: 15,
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
    // '& ul': {
    //   paddingLeft:0 ,
    // },
    '& li': {
      listStyle: ' none',
      marginTop: 20,
      // border: '1px solid #333',
      // padding: 10,
    },
  },
  closeBtn: {
    textAlign: 'center',
    marginTop: 30,
  },
}));

const SatsiUserInfoModal = ({ open, handleClose, satsiUserInfo }) => {
  const classes = useStyle();
  return (
    <div>
      <Modal open={open} onClose={handleClose} className={classes.contain}>
        <Paper className={classes.modal} elevation={3}>
          <h1>thông tin ứng viên</h1>
          <ul>
            <li>
              <b>Tên:</b> {satsiUserInfo.name}
            </li>
            <li>
              <b>Số điện thoại:</b> {satsiUserInfo.phone}
            </li>
            <li>
              <b>email: </b> {satsiUserInfo.email}
            </li>
            <li>
              <b>ngày đăng ký: </b>{' '}
              {format(parseISO(satsiUserInfo.createdAt), 'dd/MM/yyyy')}
            </li>
          </ul>
          <div className={classes.closeBtn}>
            {' '}
            <Button variant='contained' color='primary' onClick={handleClose}>
              đóng
            </Button>
          </div>
        </Paper>
      </Modal>
    </div>
  );
};

export default SatsiUserInfoModal;
