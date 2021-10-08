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
import OnlineRegisterModal from '../../../../components/OnlineRegisterModal/OnlineRegisterModal';

import EnhancedToolbar from '../../../../components/EnhancedToolbar/EnhancedToolbar';
import { format, parseISO } from 'date-fns/esm';

const headCells = [
    {
        id: 'STT',
        label: 'STT',
    },
    { id: 'tên', label: 'tên' },
    { id: 'Số điện thoại', label: 'Số điện thoại' },

    {
        id: 'email',
        label: 'email',
    },
    {
        id: 'Dịch vụ quan tâm',
        label: 'Dịch vụ quan tâm',
    },
    {
        id: 'Ngày đăng ký',
        label: 'Ngày đăng ký',
    },
];

const excelHeaders = [
    { label: 'Tên', key: 'name' },
    { label: 'Số điện thoại', key: 'phone' },
    { label: 'Email', key: 'email' },

    { label: 'Dịch vụ quan tâm', key: 'interestedService.title' },

    { label: 'Ngày đăng ký', key: 'createdAt' },
];
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    tableContain: {
        overflowX: 'initial',
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
        top: 145,
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
}));

export default function RegisterProgram2() {
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
    const selectItem = [
        { label: 'Tên', value: 'Tên' },
        { label: 'Số điện thoại', value: 'Số điện thoại' },
        { label: 'Email', value: 'Email' },
        { label: 'Dịch vụ quan tâm', value: 'Dịch vụ quan tâm' },
    ];
    console.log(dataSelected);
    useEffect(() => {
        const params = {
            page: page + 1,
            size,
        };
        const getCollaborates = async () => {
            const res = await getDataApi.getRegisterProgram(params);
            console.log(res);
            setFullData(res.data.data.userSatsis);
            setData(res.data.data.userSatsis);
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
                case 'Dịch vụ quan tâm':
                    filteredRows = fullData.filter((row) => {
                        return row.interestedService.title
                            .toLowerCase()
                            .includes(searchedVal.toLowerCase());
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
                    title='danh sách đăng ký chương trình satsi'
                />
                <TableContainer className={classes.tableContain}>
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
                                                {row.phone}
                                            </TableCell>
                                            <TableCell component='th' id={labelId} scope='row'>
                                                {row.email}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.interestedService.title}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {format(parseISO(row.createdAt), 'dd/MM/yyyy')}
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
