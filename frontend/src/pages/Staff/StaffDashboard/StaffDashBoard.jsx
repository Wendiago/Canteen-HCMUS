import React from "react";
import Header from "../../../components/Header/Header";
import OrderList from "./OrderList";
import CustomButton from "../../../components/CustomButton/CustomButton";
import PopUp from "../../../components/Popup/Popup";
import Searchbar from "../../../components/Searchbar/Searchbar";
import reportApi from "../../../api/reportApi";
import { useStaffInventoryContext } from "../../../context/Staff/StaffInventoryContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StaffDashboard = () => {
  const { setOrderListRows, orderListOriginalRows } =
    useStaffInventoryContext();

  const [openMonthlyPopup, setOpenMonthlyPopup] = React.useState(false);
  const [openDailyPopup, setOpenDailyPopup] = React.useState(false);
  const [openInventoryPopup, setOpenInventoryPopup] = React.useState(false);

  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

  const handleMonthlyConfirm = async () => {
    const createMonthlyIncomeReport = await reportApi.createMonthlyIncomeReport(
      { token, clientId }
    );
    if (createMonthlyIncomeReport.error) {
      toast.error("Lỗi tạo báo tháng", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.success("Tạo báo cáo doanh thu tháng thành công", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    console.log(createMonthlyIncomeReport);
    setOpenMonthlyPopup(false);
  };
  const handleDailyConfirm = async () => {
    const createDailyIncomeReport = await reportApi.createDailyIncomeReport({
      token,
      clientId,
    });
    if (createDailyIncomeReport.error) {
      toast.error("Lỗi tạo báo thu doanh thu theo ngày", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.success("Tạo báo cáo doanh thu theo ngày thành công", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    console.log(createDailyIncomeReport);
    setOpenDailyPopup(false);
  };
  const handleInventoryConfirm = async () => {
    const createDailyInventoryReport =
      await reportApi.createDailyInventoryReport({ token, clientId });
    if (createDailyInventoryReport.error) {
      toast.error("Lỗi tạo báo kho", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.success("Tạo báo cáo kho thành công", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    console.log(createDailyInventoryReport);
    setOpenInventoryPopup(false);
  };
  const headCells = [
    {
      id: "_id",
      disablePadding: true,
      label: "Mã đơn",
    },
    {
      id: 'order_time',
      disablePadding: true,
      label: "Thời gian nhận",
    },
    {
      id: "order_total_price",
      disablePadding: true,
      label: "Tổng tiền",
    },
    {
      id: "order_status",
      disablePadding: true,
      label: "Trạng thái",
    },
  ];

  const handleSearchbar = async (query) => {
    console.log(query);
    if (orderListOriginalRows.length > 0) {
      if (query !== "") {
        const searchResult = orderListOriginalRows.filter((item) =>
          item._id.toLowerCase().includes(query.toLowerCase())
        );
        setOrderListRows(searchResult);
      } else {
        setOrderListRows(originalRows);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <Header heading="Dashboard"></Header>
        <div className="p-3">
          <Searchbar
            handleSearch={handleSearchbar}
            placeholder="Tìm kiếm đơn"
          />
        </div>
      </div>

      <div className="ms-3 mt-2 mb-2">
        <CustomButton
          title="Tạo báo cáo hàng ngày"
          variant="primary"
          onAction={() => {
            setOpenDailyPopup(true);
          }}
          className="rounded-lg py-2 px-10 mr-2"
        />
        <CustomButton
          title="Tạo báo cáo hàng tháng"
          variant="primary"
          onAction={() => {
            setOpenMonthlyPopup(true);
          }}
          className="rounded-lg py-2 px-10 mr-2"
        />
        <CustomButton
          title="Tạo báo cáo kho"
          variant="primary"
          onAction={() => {
            setOpenInventoryPopup(true);
          }}
          className="rounded-lg py-2 px-10"
        />
      </div>

      <div className="ms-3">
        <OrderList headCells={headCells} title="Danh sách đơn"></OrderList>
      </div>

      <PopUp
        title="Xác nhận tạo"
        isOpen={openDailyPopup}
        handleCloseBtnClick={() => {
          setOpenDailyPopup(false);
        }}
      >
        {
          <div className="flex flex-col">
            <h2 className="text-white pb-5">Xác nhận tạo báo cáo hàng ngày?</h2>
            <div className="flex justify-between gap-2">
              <CustomButton
                title="Hủy"
                variant="secondary"
                onAction={() => {
                  setOpenDailyPopup(false);
                }}
                className="py-1 px-8"
              />
              <CustomButton
                title="Xác nhận"
                onAction={handleDailyConfirm}
                className="py-1 px-4"
              />
            </div>
          </div>
        }
      </PopUp>
      <PopUp
        title="Xác nhận tạo"
        isOpen={openMonthlyPopup}
        handleCloseBtnClick={() => {
          setOpenMonthlyPopup(false);
        }}
      >
        {
          <div className="flex flex-col">
            <h2 className="text-white pb-5">
              Xác nhận tạo báo cáo hàng tháng?
            </h2>
            <div className="flex justify-between gap-2">
              <CustomButton
                title="Hủy"
                variant="secondary"
                onAction={() => {
                  setOpenMonthlyPopup(false);
                }}
                className="py-1 px-8"
              />
              <CustomButton
                title="Xác nhận"
                onAction={handleMonthlyConfirm}
                className="py-1 px-4"
              />
            </div>
          </div>
        }
      </PopUp>
      <PopUp
        title="Xác nhận tạo"
        isOpen={openInventoryPopup}
        handleCloseBtnClick={() => {
          setOpenInventoryPopup(false);
        }}
      >
        {
          <div className="flex flex-col">
            <h2 className="text-white pb-5">
              Xác nhận tạo báo cáo kho?
            </h2>
            <div className="flex justify-between gap-2">
              <CustomButton
                title="Hủy"
                variant="secondary"
                onAction={() => {
                  setOpenInventoryPopup(false);
                }}
                className="py-1 px-8"
              />
              <CustomButton
                title="Xác nhận"
                onAction={handleInventoryConfirm}
                className="py-1 px-4"
              />
            </div>
          </div>
        }
      </PopUp>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
      </div>
    </>
  );
};

export default StaffDashboard;
