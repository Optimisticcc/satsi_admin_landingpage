import { Button, Modal, Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  contain: {
    width: '600px',
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

const CollaboratesInfoModel = ({ open, handleClose, collaborateInfo }) => {
  const classes = useStyle();
  return (
    <div>
      <Modal open={open} onClose={handleClose} className={classes.contain}>
        <Paper elevation={3} className={classes.modal}>
          <h1>Thông tin cộng tác viên</h1>
          <ul>
            <li>
              <b>Họ tên:</b> {collaborateInfo.name}
            </li>
            <li>
              <b>Số điện thoại:</b> {collaborateInfo.phone}
            </li>
            <li>
              <b> Mã CTV:</b> {collaborateInfo.idCollaborator}
            </li>
            <li>
              <b>Địa chỉ:</b> {collaborateInfo.address}
            </li>
            <li>
              <b>Nơi làm việc:</b> {collaborateInfo.addressWork}
            </li>
            <li>
              <b>Mã số chi nhánh:</b> {collaborateInfo.idBranchWork}
            </li>
            <li>
              <b>Người giới thiệu:</b> {collaborateInfo.namePresenter}
            </li>
            <li>
              <b>Số điện thoại người giới thiệu:</b>
              {collaborateInfo.phonePresenter}
            </li>
          </ul>
          <div className={classes.closeBtn}>
            <Button onClick={handleClose} variant='contained' color='primary'>
              đóng
            </Button>
          </div>
        </Paper>
      </Modal>
    </div>
  );
};

export default CollaboratesInfoModel;
