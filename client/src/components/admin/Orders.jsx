import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { useEffect, useState } from "react";
import AdminOrderDetails from "./OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersAllUser,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/adminOrderslice";
import { Badge } from "../ui/badge";
function AdminOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(id) {
    dispatch(getOrderDetailsForAdmin(id));
  }

  useEffect(() => {
    dispatch(getAllOrdersAllUser());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  console.log(orderDetails, "orderDetailsAdmin");

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((item) => (
                  <TableRow>
                    <TableCell>{item?._id}</TableCell>
                    <TableCell>{item?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          item?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : item?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {item?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{item?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() => handleFetchOrderDetails(item?._id)}
                        >
                          View Details
                        </Button>
                        <AdminOrderDetails orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrders;
