import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersAllUser,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/adminOrderslice";
import { toast } from "sonner";

const intialFormData = {
  status: "",
};

function AdminOrderDetails({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(intialFormData);
  const dispatch = useDispatch();
  function handleUpdateStatus(e) {
    e.preventDefault();
    console.log(formData, "formData");
    const { status } = formData;
    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersAllUser());
        setFormData(intialFormData);
        toast(data?.payload?.message);
      }
    });
  }
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-8 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
          <div className="flex mt-2  items-center justify-between">
            <p className="font-medium">Order price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2  items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 mb-4 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>Title:{item?.title}</span>
                      <span>Quantity:{item?.quantity}</span>{" "}
                      <span>Price:${item?.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user?.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CommonForm
          formControls={[
            {
              name: "status",
              label: "Order Status",
              placeholder: "Select status",
              componentType: "select",
              options: [
                { id: "pending", label: "Pending" },
                { id: "inProcess", label: "In Process" },
                { id: "inShipping", label: "In Shipping" },
                { id: "rejected", label: "Rejected" },
                { id: "delivered", label: "Delivered" },
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Update Order Status"}
          onSubmit={handleUpdateStatus}
        />
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetails;
