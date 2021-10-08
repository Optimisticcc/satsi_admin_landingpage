import { Button, Modal, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import OnlineRegisterModal from './../OnlineRegisterModal/OnlineRegisterModal';
import SatsiUserInfoModal from '../SatsiUserInfoModal/SatsiUserInfoModal';
const useStyle = makeStyles((theme) => ({
  contain: {
    width: '700px',
    maxHeight: 500,
    margin: '100px auto',
    '& h1': {
      padding: 20,
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
    '& h2': {
      color: theme.palette.secondary.main,
      marginLeft: 30,
    },
    '& li': {
      listStyle: 'none',
      marginBottom: 5,
    },
  },

  userList: {
    maxHeight: 250,
    overflow: 'auto',
  },
  closeBtn: {
    textAlign: 'center',
    paddingBottom: 30,
  },
  infoBtn: {
    marginRight: 10,
    fontSize: 8,
    height: 18,
  },
}));

const UserByCollaboratorModal = ({ open, handleClose, userByCollaborator }) => {
  const classes = useStyle();
  const [openAirModal, setOpenAirModal] = useState(false);
  const [airUserInfo, setAirUserInfo] = useState();
  const [openSatsiModal, setOpenSatsiModal] = useState(false);
  const [satsiUserInfo, setSatsiUserInfo] = useState();

  const handleCloseAirModal = () => {
    setOpenAirModal(false);
  };
  const handleCloseSatsiModal = () => {
    setOpenSatsiModal(false);
  };
  return (
    <div>
      <Modal open={open} onClose={handleClose} className={classes.contain}>
        <Paper className={classes.paper} elevation={3}>
          <h1>
            Những ứng viên của :{userByCollaborator.userInformation.name} (
            {userByCollaborator.userInformation.idCollaborator})
          </h1>
          <h2>
            đăng ký chương trình Satsi ({userByCollaborator.userSatsi.length}
            {''}
            ứng viên)
          </h2>
          <ul className={classes.userList}>
            {userByCollaborator.userSatsi.length === 0 ? (
              <p>(Chưa có ứng viên nào được giới thiệu)</p>
            ) : (
              userByCollaborator.userSatsi.map((user) => (
                <li>
                  <Button
                    className={classes.infoBtn}
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      setSatsiUserInfo(user);
                      setOpenSatsiModal(true);
                    }}
                  >
                    thông tin
                  </Button>
                  {user.name}
                </li>
              ))
            )}
          </ul>
          <h2>
            đăng ký chương trình hàng không (
            {userByCollaborator.preUserAir.length} ứng viên)
          </h2>
          <ul className={classes.userList}>
            {userByCollaborator.preUserAir.length === 0 ? (
              <p>(Chưa có ứng viên nào được giới thiệu)</p>
            ) : (
              userByCollaborator.preUserAir.map((user) => (
                <li>
                  <Button
                    className={classes.infoBtn}
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      setAirUserInfo(user);
                      setOpenAirModal(true);
                    }}
                  >
                    thông tin
                  </Button>
                  {user.name}
                </li>
              ))
            )}
          </ul>
          <div className={classes.closeBtn}>
            <Button variant='contained' color='primary' onClick={handleClose}>
              Đóng
            </Button>
          </div>
        </Paper>
      </Modal>
      {openAirModal && (
        <OnlineRegisterModal
          open={openAirModal}
          handleClose={handleCloseAirModal}
          onlineRegisterInfo={airUserInfo}
        />
      )}
      {openSatsiModal && (
        <SatsiUserInfoModal
          open={openSatsiModal}
          handleClose={handleCloseSatsiModal}
          satsiUserInfo={satsiUserInfo}
        />
      )}
    </div>
  );
};

export default UserByCollaboratorModal;
