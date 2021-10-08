import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import getDataApi from '../../../../api/getDataApi';
import { Button, MenuItem, Select } from '@material-ui/core';
import OnlineRegisterModal from '../../../../components/OnlineRegisterModal/OnlineRegisterModal';

import EnhancedToolbar from '../../../../components/EnhancedToolbar/EnhancedToolbar';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LoopIcon from '@material-ui/icons/Loop';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tooltip from '@material-ui/core/Tooltip';

const ELECT_STATUS = [
    { label: 'Trúng tuyển', value: 'Trúng tuyển' },
    { label: 'Đang xét duyệt', value: 'Đang xét duyệt' },
    { label: 'Không trúng tuyển', value: 'Không trúng tuyển' },
];
const headCells = [
    {
        id: 'STT',
        label: 'STT',
    },
    { id: 'Tên', label: 'tên' },
    { id: 'Giới tính', label: 'Giới tính' },
    { id: 'Ngày sinh', label: 'Ngày sinh' },
    { id: 'Số điện thoại', label: 'Số điện thoại' },
    {
        id: 'email',
        label: 'Email',
    },
    {
        id: 'ket qua',
        label: 'Kết quả',
    },
    {
        id: 'thông tin chi tiết',
        label: 'thông tin chi tiết',
    },
];

const excelHeaders = [
    { label: 'Tên', key: 'name' },
    { label: 'Số điện thoại', key: 'phone' },
    { label: 'Địa chỉ', key: 'address' },
    { label: 'Email', key: 'email' },
    { label: 'Chiều cao', key: 'height' },
    { label: 'Cân nặng', key: 'weight' },
    { label: 'Giới tính', key: 'gender' },
    { label: 'Ngày sinh', key: 'dateOfBirth' },
    { label: 'Biết chương trình qua', key: 'typePresenter' },
    { label: 'Học vấn', key: 'education' },
    { label: 'Ngoại Ngữ', key: 'levelEnglish' },
    { label: 'Ngày đăng ký', key: 'createdAt' },
];
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableHead: {
        position: 'sticky',
        top: 0,
        backgroundColor: '#fff',
        zIndex: 10,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    selectField: {
        width: 200,
    },
    electFail: {
        padding: 5,
        color: '#f5222d',
        width: 180,
        border: '1px solid #f5222d',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    electSuccess: {
        padding: 5,
        color: '#52c41a',
        width: 180,
        border: '1px solid #52c41a',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    electPending: {
        padding: 5,
        color: '#40a9ff',
        width: 180,
        border: '1px solid #40a9ff',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    statusIcon: {
        marginRight: 10,
        transform: 'transLateY(20%)',
        fontSize: 20,
        fontWeight: 'bold',
    },
}));

export default function Hangkhong() {
    const classes = useStyles();
    const [fullData, setFullData] = useState([]);
    const [data, setData] = useState([]);
    const [amountData, setAmountData] = useState();
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [size, setSize] = useState(10);
    const [openModal, setOpenModal] = useState(false);
    const [collaboratesInfo, setCollaboratesInfo] = useState();
    const [search, setSearch] = useState('');

    const dataSelected = data.filter((data) => selected.includes(data._id));
    const [filter, setFilter] = useState('Tên');
    const [openFilter, setOpenFilter] = useState(false);
    const [openSelectElect, setOpenSelectElect] = useState(false);
    const [selectElectById, setSelectElectById] = useState();
    const selectItem = [
        { label: 'Tên', value: 'Tên' },
        { label: 'Giới tính', value: 'Giới tính' },
        { label: 'Số điện thoại', value: 'Số điện thoại' },
        { label: 'Email', value: 'Email' },
        { label: 'Kết quả', value: 'Kết quả' },
    ];
    console.log(dataSelected);
    useEffect(() => {
        const params = {
            page: page + 1,
            size,
        };
        const getCollaborates = async () => {
            const res = await getDataApi.getOnlineRegisters(params);
            console.log(res);
            setFullData(res.data.data.preQualificationUserAir);
            setData(res.data.data.preQualificationUserAir);
            setAmountData(res.data.data.length);
        };
        getCollaborates();
    }, [page, size]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const requestSearch = (searchedVal) => {
        if (fullData[0]) {
            let filteredRows;
            switch (filter) {
                case 'Tên':
                    filteredRows = fullData.filter((row) => {
                        return row.name.toLowerCase().includes(searchedVal.toLowerCase());
                    });
                    setData(filteredRows);
                    break;
                case 'Giới tính':
                    filteredRows = fullData.filter((row) => {
                        return row.gender.toLowerCase().includes(searchedVal.toLowerCase());
                    });
                    setData(filteredRows);
                    break;
                case 'Số điện thoại':
                    filteredRows = fullData.filter((row) => {
                        return row.phone.toLowerCase().includes(searchedVal.toLowerCase());
                    });
                    setData(filteredRows);
                    break;
                case 'Email':
                    filteredRows = fullData.filter((row) => {
                        return row.email.toLowerCase().includes(searchedVal.toLowerCase());
                    });
                    setData(filteredRows);
                    break;
                case 'Kết quả':
                    filteredRows = fullData.filter((row) => {
                        return row.status.toLowerCase().includes(searchedVal.toLowerCase());
                    });
                    setData(filteredRows);
                    break;
            }
        }
    };

    const cancelSearch = () => {
        setSearch('');
        requestSearch(search);
    };

    console.log(' data : ', fullData, data);
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setSize(parseInt(event.target.value));
        setPage(0);
    };
    console.log(page);

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleChangeFilter = (e) => {
        setFilter(e.target.value);
    };

    const handleOpenFilter = (e) => {
        setOpenFilter(true);
    };
    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    const handleOpenSelectElect = (id) => {
        setSelectElectById(id);
        setOpenSelectElect(true);
    };

    const handleUpdateElectStatus = async (id, electStatus) => {
        const res = await getDataApi.updateElectStatus(id, electStatus);
        console.log(res);
        const newData = data.map((data) =>
            data._id === id ? { ...data, status: electStatus.status } : data
        );
        setData(newData);

        const newFullData = fullData.map((data) =>
            data._id === id ? { ...data, status: electStatus.status } : data
        );
        setData(newData);
        setFullData(newFullData);
    };
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedToolbar
                    numSelected={selected.length}
                    requestSearch={requestSearch}
                    cancelSearch={cancelSearch}
                    search={search}
                    searchPlaceholder={filter}
                    data={dataSelected}
                    selectItem={selectItem}
                    handleChangeFilter={handleChangeFilter}
                    openFilter={openFilter}
                    onOpenFilter={handleOpenFilter}
                    onCloseFilter={handleCloseFilter}
                    headers={excelHeaders}
                    title='Danh sách đăng ký online (hàng không)'
                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby='tableTitle'
                        size='medium'
                        aria-label='enhanced table'
                    >
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell padding='checkbox'>
                                    <Checkbox
                                        indeterminate={
                                            selected.length > 0 && selected.length < data.length
                                        }
                                        checked={data.length > 0 && selected.length === data.length}
                                        onChange={handleSelectAllClick}
                                    />
                                </TableCell>
                                {headCells.map((headCell) => (
                                    <TableCell key={headCell.id}>{headCell.label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        {data[0] && (
                            <TableBody>
                                {data.map((row, index) => {
                                    const isItemSelected = isSelected(row._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role='checkbox'
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell
                                                padding='checkbox'
                                                onClick={(event) => handleClick(event, row._id)}
                                            >
                                                <Checkbox checked={isItemSelected} />
                                            </TableCell>
                                            <TableCell id={labelId} scope='row' align='left'>
                                                {index + 1}
                                            </TableCell>

                                            <TableCell align='left'>{row.name}</TableCell>
                                            <TableCell component='th' id={labelId} scope='row'>
                                                {row.gender}
                                            </TableCell>
                                            <TableCell component='th' id={labelId} scope='row'>
                                                {row.dateOfBirth}
                                            </TableCell>
                                            <TableCell align='left'>{row.phone}</TableCell>
                                            <TableCell align='left'>{row.email}</TableCell>
                                            <TableCell align='left'>
                                                {openSelectElect && selectElectById === row._id ? (
                                                    <Select
                                                        open={openSelectElect}
                                                        onClose={() => setOpenSelectElect(false)}
                                                        onChange={(e) => {
                                                            console.log(typeof e.target.value);
                                                            handleUpdateElectStatus(row._id, {
                                                                status: e.target.value,
                                                            });
                                                        }}
                                                        className={classes.selectField}
                                                        // variant='outlined'
                                                        defaultValue={row.status}
                                                    >
                                                        {ELECT_STATUS.map((status) => (
                                                            <MenuItem value={status.value}>
                                                                {status.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                ) : (
                                                    <Tooltip title='xét duyệt' placement='top'>
                                                        <div
                                                            className={
                                                                row.status === 'Trúng tuyển'
                                                                    ? classes.electSuccess
                                                                    : row.status === 'Không trúng tuyển'
                                                                        ? classes.electFail
                                                                        : classes.electPending
                                                            }
                                                            onClick={() => handleOpenSelectElect(row._id)}
                                                        >
                                                            {row.status === 'Trúng tuyển' ? (
                                                                <CheckCircleOutlineIcon
                                                                    className={classes.statusIcon}
                                                                />
                                                            ) : row.status === 'Không trúng tuyển' ? (
                                                                <HighlightOffIcon
                                                                    className={classes.statusIcon}
                                                                />
                                                            ) : (
                                                                <LoopIcon className={classes.statusIcon} />
                                                            )}
                                                            {row.status}
                                                        </div>
                                                    </Tooltip>
                                                )}
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    onClick={() => {
                                                        setOpenModal(true);
                                                        setCollaboratesInfo(row);
                                                    }}
                                                >
                                                    chi tiết
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        )}{' '}
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component='div'
                    count={amountData}
                    rowsPerPage={size}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            {collaboratesInfo && (
                <OnlineRegisterModal
                    open={openModal}
                    handleClose={handleCloseModal}
                    onlineRegisterInfo={collaboratesInfo}
                />
            )}
        </div>
    );
}
