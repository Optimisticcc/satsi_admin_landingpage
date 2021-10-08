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

const OnlineRegisterModel = ({ open, handleClose, onlineRegisterInfo }) => {
  const classes = useStyle();
  return (
    <div>
      <Modal open={open} onClose={handleClose} className={classes.contain}>
        <Paper className={classes.modal} elevation={3}>
          <h1>Thông tin ứng viên</h1>
          <ul>
            <li>
              <b>Tên :</b> {onlineRegisterInfo.name}
            </li>
            <li>
              <b>Số điện thoại:</b> {onlineRegisterInfo.phone}
            </li>
            <li>
              <b>Địa chỉ:</b> {onlineRegisterInfo.address}
            </li>
            <li>
              <b>Giới tính:</b> {onlineRegisterInfo.gender}
            </li>
            <li>
              <b>Ngày sinh:</b> {onlineRegisterInfo.dateOfBirth}
            </li>
            <li>
              <b>Biết đến satsi nhờ:</b> {onlineRegisterInfo.typePresenter}
            </li>
            <li>
              <b>Học vấn:</b> {onlineRegisterInfo.education}
            </li>
            <li>
              <b>Ngoại ngữ:</b> {onlineRegisterInfo.levelEnglish}
            </li>
            <li>
              <b>Cân nặng:</b> {onlineRegisterInfo.weight}
            </li>
            <li>
              <b>Chiều cao:</b> {onlineRegisterInfo.height}
            </li>
            <li>
              <b>Hình xăm: </b> {onlineRegisterInfo.tattoo}
            </li>
            <li>
              <b>Ngày đăng ký:</b>{' '}
              {format(parseISO(onlineRegisterInfo.createdAt), ' dd/MM/yyyy')}
            </li>
            <li>
              <b>Trạng thái xét tuyển: </b> {onlineRegisterInfo.status}
            </li>
            
          </ul>
          <div className={classes.closeBtn}>
            <Button variant='contained' color='primary' onClick={handleClose}>
              đóng
            </Button>
          </div>
        </Paper>
      </Modal>
    </div>
  );
};

export default OnlineRegisterModel;
