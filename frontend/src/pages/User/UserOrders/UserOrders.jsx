import React from 'react';
import Header from '../../../components/Header/Header';
import OrderList from './OrderList';
import Searchbar from '../../../components/Searchbar/Searchbar';
import orderApi from "../../../api/orderApi";
import { useStaffInventoryContext } from '../../../context/Staff/StaffInventoryContext';

const UserOrders = () => {
  const {
    setOrderListRows, orderListOriginalRows
  } = useStaffInventoryContext();
  
  const headCells = [
    {
      id: '_id',
      disablePadding: true,
      label: 'Mã đơn',
    },
    {
      id: 'order_time',
      disablePadding: true,
      label: 'Thời gian nhận',
    },
    {
      id: 'order_total_price',
      disablePadding: true,
      label: 'Tổng tiền',
    },
    {
      id: 'order_status',
      disablePadding: true,
      label: 'Trạng thái',
    },
  ];

  const handleSearchbar = async (query) => {
    console.log(query);
    if (orderListOriginalRows.length > 0) {
        if (query !== ""){
            const searchResult = orderListOriginalRows.filter((item) => item._id.toLowerCase().includes(query.toLowerCase()));
            setOrderListRows(searchResult);
        }
        else{
          setOrderListRows(orderListOriginalRows);
        }
    }
  };

  return (
  <>
    <div className='flex justify-between'>
      <Header heading="Dashboard"></Header>
      <div className='p-3'>
          <Searchbar
            handleSearch={handleSearchbar}  
            placeholder='Tìm kiếm đơn'
          />
      </div>
    </div>

    <div className='ms-3'>
      <OrderList headCells={headCells} title="Danh sách đơn"></OrderList>
    </div>
  </>
  );
};

export default UserOrders;

